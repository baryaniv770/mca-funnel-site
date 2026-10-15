#!/bin/bash
# deploy-lead-fix.sh — deploys the funnel site + lead-capture functions to Cloudflare Pages
# — Steve (OpenClaw), 2026-10-15
#
# PREREQUISITE: CLOUDFLARE_API_TOKEN env var with these permissions:
#   Account: Cloudflare Pages — Edit
#   Account: Workers KV Storage — Edit
# If you don't have one: dash.cloudflare.com → My Profile → API Tokens →
#   Create Token → "Edit Cloudflare Workers" template (covers Pages + KV).
#
# USAGE:
#   export CLOUDFLARE_API_TOKEN="..."
#   bash scripts/deploy-lead-fix.sh
#
# WHAT IT DOES:
#   1. Ensures the "mca-funnel-site" KV namespace for leads exists (creates once, caches id in .kv-id)
#   2. Writes wrangler.toml with the LEADS KV binding (needed so functions/api/*.js can store leads)
#   3. Sets the LEADS_ADMIN_KEY secret (retrieval key for GET /api/leads)
#   4. Deploys dist/ (4,800 pages + robots.txt fix) + functions/ to Cloudflare Pages
#   5. Runs the QA lead POST and retrieval check

set -euo pipefail
cd "$(dirname "$0")/.."

PROJECT_NAME="mca-funnel-site"
KV_ID_FILE=".kv-leads-id"

if [ -z "${CLOUDFLARE_API_TOKEN:-}" ]; then
  echo "!! CLOUDFLARE_API_TOKEN not set — create one at dash.cloudflare.com → My Profile → API Tokens"
  exit 1
fi

echo "=== 1. KV namespace for leads ==="
if [ -f "$KV_ID_FILE" ]; then
  KV_ID=$(cat "$KV_ID_FILE")
  echo "reusing cached KV id: $KV_ID"
else
  KV_ID=$(npx wrangler kv namespace create LEADS 2>&1 | grep -oE '"id": *"[a-f0-9]+"' | head -1 | grep -oE '[a-f0-9]+' || true)
  if [ -z "$KV_ID" ]; then
    # id not in stdout (maybe exists already) — list and find it
    KV_ID=$(npx wrangler kv namespace list 2>/dev/null | python3 -c "
import json,sys
try:
    ns = json.load(sys.stdin)
    for n in ns:
        if 'mca-funnel-site_leads' in n.get('title','') or n.get('title') == 'LEADS':
            print(n['id']); break
except Exception:
    pass" || true)
  fi
  if [ -z "$KV_ID" ]; then
    echo "!! Could not create/find KV namespace. Create manually: npx wrangler kv namespace create LEADS"
    exit 1
  fi
  echo "$KV_ID" > "$KV_ID_FILE"
  echo "created/found KV id: $KV_ID"
fi

echo "=== 2. wrangler.toml with KV binding ==="
cat > wrangler.toml <<EOF
name = "$PROJECT_NAME"
pages_build_output_dir = "dist"

[[kv_namespaces]]
binding = "LEADS"
id = "$KV_ID"
EOF
echo "wrote wrangler.toml"

echo "=== 3. LEADS_ADMIN_KEY secret ==="
if [ -z "${LEADS_ADMIN_KEY:-}" ]; then
  LEADS_ADMIN_KEY=$(openssl rand -hex 24)
  echo "(generated a new key — save it! it's needed to read leads back)"
fi
echo "$LEADS_ADMIN_KEY" | npx wrangler pages secret put LEADS_ADMIN_KEY --project-name="$PROJECT_NAME" || \
  echo "!! secret put failed — set it in the Pages dashboard: Settings → Environment variables → LEADS_ADMIN_KEY"
echo "LEADS_ADMIN_KEY is: $LEADS_ADMIN_KEY (keep this private; use header X-Leads-Key to read /api/leads)"

echo "=== 4. Deploy ==="
npx wrangler pages deploy dist --project-name="$PROJECT_NAME" --branch=main

echo "=== 5. QA ==="
sleep 10
echo "--- POST /api/apply (QA lead) ---"
curl -s -m 20 -X POST "https://funding.yournextfund.com/api/apply" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "full_name=QA TEST LEAD - DO NOT CONTACT" \
  --data-urlencode "phone=555-0100" \
  --data-urlencode "email=qa-test@example.invalid" \
  --data-urlencode "source_page=qa-test" \
  --data-urlencode "lead_type=qa_test"
echo
echo "--- GET /api/leads (retrieval check) ---"
curl -s -m 20 "https://funding.yournextfund.com/api/leads?limit=10" -H "X-Leads-Key: $LEADS_ADMIN_KEY"
echo
echo "done — robots.txt check:"
curl -s -m 15 "https://funding.yournextfund.com/robots.txt"
echo