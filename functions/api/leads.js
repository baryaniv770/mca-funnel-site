// /api/leads — retrieve captured funnel leads
// — Steve (OpenClaw), 2026-10-15
//
// GET /api/leads?limit=50
// Header: X-Leads-Key: <value of LEADS_ADMIN_KEY env var>
//
// Returns the most recent captured leads (from the LEADS KV namespace).
// If LEADS_ADMIN_KEY is not configured (or wrong), returns 401.

const CACHE_KEY_PREFIX = 'lead:';
const MAX_LIST = 1000;

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

export async function onRequestGet({ request, env }) {
  const provided = request.headers.get('x-leads-key');
  const expected = (env && env.LEADS_ADMIN_KEY) || null;

  if (!expected) return json(503, { ok: false, error: 'Leads admin key not configured (set LEADS_ADMIN_KEY in the Pages project).' });
  if (!provided || provided !== expected) return json(401, { ok: false, error: 'Unauthorized.' });

  if (!env || !env.LEADS) {
    return json(503, { ok: false, error: 'LEADS KV binding missing. See functions/README or wrangler.toml.' });
  }

  const url = new URL(request.url);
  const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '50', 10) || 50, 1), MAX_LIST);
  const prefixFilter = url.searchParams.get('prefix') || null;

  const keys = await env.LEADS.list({ prefix: prefixFilter ? prefixFilter : undefined, limit: MAX_LIST });
  const recent = keys.keys
    .filter((k) => k.name.startsWith(CACHE_KEY_PREFIX))
    .sort((a, b) => (b.name > a.name ? 1 : -1))
    .slice(0, limit);

  const leads = [];
  for (const k of recent) {
    const raw = await env.LEADS.get(k.name);
    if (raw) {
      try { leads.push(JSON.parse(raw)); } catch { leads.push({ id: k.name, corrupt: true }); }
    }
  }

  return json(200, { ok: true, count: leads.length, total: keys.keys.length, leads });
}