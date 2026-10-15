// /api/apply — lead capture endpoint for the MCA funnel (funding.yournextfund.com)
// — Steve (OpenClaw), 2026-10-15
//
// WHY THIS EXISTS:
//   The funnel forms used to POST straight to https://yournextfund.com/api/apply
//   (a Netlify function backed by the YNF CRM). That upstream has been returning
//   502 "Unable to save right now." on every submission (CRM intake auth broken),
//   which means every funnel lead was being LOST.
//
// WHAT THIS DOES:
//   1. ALWAYS stores the lead locally first (Cloudflare KV binding `LEADS`,
//      with a Cache API fallback when the KV binding is absent) — leads are
//      never lost again, even if the CRM upstream stays down.
//   2. Best-effort forwards the same payload to the yournextfund.com upstream
//      so the moment the CRM is repaired, leads start flowing into it again.
//      Forward failures never fail the request.
//   3. Returns {ok:true, leadId, captured, forwarded} so the frontend can show
//      a proper thank-you state.
//
// Retrieval: GET /api/leads with header `X-Leads-Key: $LEADS_ADMIN_KEY`
//   (or `wrangler kv key list --namespace-id=<id> --prefix "lead:"`).

const UPSTREAM_URL = 'https://yournextfund.com/api/apply';
const UPSTREAM_TIMEOUT_MS = 4000;
const CACHE_FALLBACK_TTL = 14 * 24 * 60 * 60; // 14 days, refreshed on each write
const CACHE_KEY_PREFIX = 'lead:';

const FORM_FIELDS = [
  'business_name', 'full_name', 'email', 'phone',
  'funding_amount', 'time_in_business',
  'source_page', 'industry', 'city', 'funding_type', 'lead_type',
  'source_url', 'name', 'company_website', // name/source_url for main-site-compat, honeypot
];

const REQUIRED = ['full_name', 'email', 'phone'];

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'access-control-allow-origin': '*',
    },
  });
}

async function readLead(request) {
  const contentType = (request.headers.get('content-type') || '').toLowerCase();
  const lead = {};

  if (contentType.includes('application/json')) {
    try {
      const parsed = await request.json();
      if (parsed && typeof parsed === 'object') {
        for (const k of FORM_FIELDS) if (parsed[k] != null) lead[k] = String(parsed[k]);
      }
    } catch { /* fall through with empty lead */ }
  } else {
    // application/x-www-form-urlencoded or multipart/form-data
    const fd = await request.formData();
    for (const k of FORM_FIELDS) {
      const v = fd.get(k);
      if (v != null && v !== '') lead[k] = String(v);
    }
  }

  // Headers the main site's site.js sends; keep for upstream passthrough.
  // Main-site JSON uses `name` where the funnel uses `full_name` — normalize.
  if (!lead.full_name && lead.name) { lead.full_name = lead.name; delete lead.name; }
  lead._session_id = request.headers.get('x-ynf-session-id') || null;
  lead._event_sequence = request.headers.get('x-ynf-event-sequence') || null;
  lead._origin = request.headers.get('origin') || null;
  lead._referer = request.headers.get('referer') || null;
  lead._user_agent = request.headers.get('user-agent') || null;
  return lead;
}

async function storeLead(env, lead, leadId) {
  const record = {
    id: leadId,
    ts: new Date().toISOString(),
    lead,
  };

  // Primary: KV (durable, listable)
  if (env && env.LEADS) {
    try {
      await env.LEADS.put(CACHE_KEY_PREFIX + leadId, JSON.stringify(record));
      return { stored: 'kv' };
    } catch (err) {
      // fall through to cache fallback
    }
  }

  // Fallback: Cache API (works with zero bindings; best-effort durability)
  try {
    const cache = caches.default;
    const key = new Request('https://funding.yournextfund.com/__leads__/' + CACHE_KEY_PREFIX + leadId);
    await cache.put(key, new Response(JSON.stringify(record), {
      headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${CACHE_FALLBACK_TTL}` },
    }));
    return { stored: 'cache' };
  } catch {
    return { stored: 'none' };
  }
}

async function forwardUpstream(request, lead) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    const body = new URLSearchParams();
    for (const k of FORM_FIELDS) {
      if (lead[k] != null) body.set(k, lead[k]);
    }
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    if (lead._session_id) headers['x-ynf-session-id'] = lead._session_id;
    if (lead._event_sequence) headers['x-ynf-event-sequence'] = lead._event_sequence;
    if (lead._origin) headers['origin'] = lead._origin;

    const res = await fetch(UPSTREAM_URL, {
      method: 'POST',
      headers,
      body: body.toString(),
      signal: controller.signal,
    });
    let upstreamResult = null;
    try { upstreamResult = await res.json(); } catch { upstreamResult = null; }
    return { ok: res.ok, status: res.status, result: upstreamResult };
  } catch (err) {
    return { ok: false, status: 0, error: String(err && err.message || err) };
  } finally {
    clearTimeout(timer);
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'Content-Type, x-ynf-session-id, x-ynf-event-sequence',
      'access-control-max-age': '86400',
    },
  });
}

export async function onRequestGet() {
  return json(405, { ok: false, error: 'Use POST.' });
}

export async function onRequestPost({ request, env, waitUntil }) {
  const lead = await readLead(request);
  const source = lead.source_page || lead.source_url || 'unknown';

  // Honeypot: silently accept but don't store obvious bot submissions.
  if (lead.company_website && lead.company_website.trim() !== '') {
    return json(200, { ok: true, leadId: 'honeypot', captured: false, forwarded: false, spam: true });
  }

  const missing = REQUIRED.filter((f) => !lead[f] || String(lead[f]).trim() === '');
  if (missing.length > 0) {
    return json(400, { ok: false, error: 'Missing required fields: ' + missing.join(', ') });
  }

  const leadId = Date.now().toString(36) + '-' + crypto.randomUUID().slice(0, 8);

  // 1) Capture FIRST — never lose the lead.
  const stored = await storeLead(env, lead, leadId);

  // 2) Best-effort forward to the (currently broken) yournextfund.com CRM pipeline.
  //    waitUntil keeps the fetch alive after we respond, so a slow upstream never
  //    costs the user a slow form.
  const forwardPromise = forwardUpstream(request, lead).then(async (fwd) => {
    // Annotate the stored record with the forward outcome when possible.
    if (env && env.LEADS && stored.stored === 'kv') {
      try {
        const key = CACHE_KEY_PREFIX + leadId;
        const prev = JSON.parse((await env.LEADS.get(key)) || '{}');
        prev.forwarded = fwd.ok;
        prev.forward_status = fwd.status;
        prev.forward_result = fwd.result || null;
        await env.LEADS.put(key, JSON.stringify(prev));
      } catch { /* annotation is best-effort */ }
    }
    return fwd;
  });
  const fwd = await Promise.race([
    forwardPromise,
    new Promise((resolve) => setTimeout(() => resolve({ ok: false, status: 0, error: 'timeout' }), UPSTREAM_TIMEOUT_MS + 1500)),
  ]);
  if (fwd && !fwd.ok && fwd.status === 0) {
    // Still pending — let it finish in the background.
    if (waitUntil) waitUntil(forwardPromise);
  }

  return json(200, {
    ok: true,
    leadId,
    captured: stored.stored !== 'none',
    storage: stored.stored,
    forwarded: !!(fwd && fwd.ok),
    source,
  });
}