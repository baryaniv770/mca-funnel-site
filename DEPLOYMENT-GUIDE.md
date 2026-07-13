# MCA Funnel Site — Paid Ads Strategy for Hot Leads
# — Max

## What We Built

- **4,800 static pages** targeting 30 industries × 40 cities × 4 funding types
- Each page has a lead capture form posting to yournextfund.com/apply
- SEO schema markup (FinancialService + FAQ) for Google rich results
- Sitemap auto-generated for Google Search Console
- Mobile-first design (most MCA leads come from mobile)

---

## DEPLOYMENT (15 min, $0)

### Step 1: Push to GitHub
```bash
cd /Users/yb/.openclaw/workspace/mca-funnel-site
git init
git add -A
git commit -m "4,800 MCA funnel pages — programmatic SEO — Max"
# Create a GitHub repo at https://github.com/new and push:
git remote add origin https://github.com/YOUR_USERNAME/mca-funnel-site.git
git push -u origin main
```

### Step 2: Deploy to Cloudflare Pages (FREE)
1. Go to https://dash.cloudflare.com → Workers & Pages → Create
2. Connect your GitHub repo
3. Framework preset: Astro
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click Deploy — 4,800 pages go live in ~2 minutes
7. Add custom domain: `funding.yournextfund.com` (or use main domain with a path)

### Step 3: Submit to Google
1. Go to https://search.google.com/search-console
2. Add property: `https://yournextfund.com` (or your subdomain)
3. Verify ownership (DNS TXT record)
4. Submit sitemap: `https://yournextfund.com/sitemap-index.xml`
5. Request indexing for top 20 priority pages (see below)

---

## PAID ADS STRATEGY — Hot Leads ASAP

### Phase 1: Google Search Ads (Day 1-7) — $50-100/day

**Why Google first:** MCA leads are high-intent. Someone searching "business funding restaurant Chicago" is actively looking. These convert.

#### Campaign Structure
```
Campaign: MCA Lead Gen — Search
├── Ad Group: Industry + City (30 ad groups, one per industry)
│   ├── Keywords: "[industry] funding [city]" × 40 cities
│   ├── Keywords: "[industry] MCA [city]"
│   ├── Keywords: "[industry] working capital [city]"
│   ├── Keywords: "business loan [industry] [city]"
│   └── Keywords: "merchant cash advance [city]"
├── Ad Group: Generic MCA (catch-all)
│   ├── Keywords: "merchant cash advance"
│   ├── Keywords: "business funding fast"
│   ├── Keywords: "working capital loan"
│   ├── Keywords: "small business funding"
│   └── Keywords: "MCA broker"
└── Ad Group: Competitor
    ├── Keywords: "alternative to [competitor]"
    └── Keywords: "[competitor] vs"
```

#### Ad Copy Template
```
Headline 1: MCA for [Industry] in [City]
Headline 2: AI Shops 100+ Funders For You
Headline 3: No Hard Credit Pull · 24hr Funding
Description: Get the best funding offer for your [industry] in [city].
One application, our AI shops 100+ funders. No paperwork chase.
No hard credit pull. See offers in 24 hours.
Display URL: yournextfund.com/[industry]-mca-[city]
Final URL: https://funding.yournextfund.com/[industry]-mca-[city]/
```

#### Targeting
- **Location:** United States (or specific cities for lower budget)
- **Demographics:** Business decision-makers (Google auto-detects)
- **Device:** Mobile priority (+20% bid adjustment for mobile)
- **Schedule:** Mon-Fri 6AM-9PM ET (business owners search during business hours)
- **Budget:** $50-100/day to start, $15-30 target CPL

#### Conversion Tracking
- Google Ads conversion: form submit on any /funding page
- Tag: `G-XXXXXXXXXX` (replace in page template)
- Value: $50 per lead (MCA leads worth much more, but Google needs a number for optimization)

### Phase 2: Meta (Facebook/Instagram) Ads (Day 3-14) — $30-50/day

**Why Meta:** MCA leads convert well on Meta because you can target business owners by behavior, not just search intent.

#### Campaign Structure
```
Campaign: MCA Lead Gen — Meta (Conversions objective)
├── Ad Set: Small Business Owners — Lookalike
│   ├── Audience: 1% lookalike of website visitors who submitted form
│   ├── Placements: Auto (Mobile feed priority)
│   └── Budget: $20/day
├── Ad Set: Business Page Admins — by City
│   ├── Targeting: Facebook Page Admins + Small Business Owners
│   ├── Interest: "Small business", "Entrepreneurship", "Business funding"
│   ├── Age: 25-65
│   ├── Geo: Top 20 cities from our page list
│   └── Budget: $20/day
└── Ad Set: Retargeting
    ├── Audience: Visited funding pages, didn't submit form
    ├── Duration: 30 days
    └── Budget: $10/day
```

#### Ad Creative
```
Image: Business owner looking at phone with "$50,000 FUNDED" notification
Headline: "Get funded in 24 hours — no hard credit pull"
Primary text: "Your AI funding team shops 100+ lenders to find your best offer.
One application. No paperwork. No hard credit pull.
See what your business qualifies for →"
CTA: "Learn More" → sends to a relevant funnel page based on city/industry
```

### Phase 3: Bing Ads (Day 7+) — $10-20/day

**Why Bing:** Cheaper CPC ($1-2 vs Google $3-8), less competition, older business owners use Bing (default on Windows).

```
Campaign: MCA Lead Gen — Bing
├── Import Google Ads campaign directly
├── Lower bids by 40% (Bing is cheaper)
└── Focus on top 10 cities first
```

---

## BUDGET BREAKDOWN

| Channel | Daily Budget | Monthly | Expected CPL | Expected Leads/day |
|---------|-------------|---------|-------------|-------------------|
| Google Search | $75/day | $2,250 | $15-30 | 3-5 |
| Meta (FB/IG) | $40/day | $1,200 | $8-20 | 2-4 |
| Bing | $15/day | $450 | $5-12 | 1-3 |
| **Total** | **$130/day** | **$3,900** | **$10-25 avg** | **6-12/day** |

**6-12 leads/day = 180-360 leads/month**

### Scaling Rules
- If CPL < $15 → increase budget 20%
- If CPL > $35 → pause ad group, refine keywords
- If conversion rate > 8% → scale that ad group aggressively
- If conversion rate < 2% → fix landing page (likely form too long or page too slow)

---

## PRIORITY PAGES TO INDEX FIRST

Submit these to Google Search Console manually for fastest indexing:

1. `restaurant-mca-new-york-ny/`
2. `restaurant-mca-houston-tx/`
3. `construction-mca-dallas-tx/`
4. `trucking-mca-atlanta-ga/`
5. `medical-practice-mca-miami-fl/`
6. `auto-repair-mca-chicago-il/`
7. `retail-store-mca-los-angeles-ca/`
8. `restaurant-working-capital-chicago-il/`
9. `construction-working-capital-houston-tx/`
10. `trucking-mca-dallas-tx/`

---

## LEAD ROUTING

All forms post to `https://yournextfund.com/apply` with hidden fields:
- `source_page` = the slug (e.g., `restaurant-mca-new-york-ny`)
- `industry` = e.g., "Restaurants"
- `city` = e.g., "New York, NY"
- `funding_type` = e.g., "Merchant Cash Advance"
- `lead_type` = "programmatic_seo"

This means every lead tells you exactly which page converted, so you know which ads to scale.

---

## FILE STRUCTURE

```
mca-funnel-site/
├── astro.config.mjs        # Astro config with sitemap
├── package.json
├── scripts/
│   └── generate-data.mjs   # Generates 4,800 pages from data
├── src/
│   ├── data/
│   │   └── pages.json      # 10MB of page data
│   ├── layouts/
│   │   └── FunnelPage.astro # Branded template with lead form
│   └── pages/
│       └── [slug].astro    # Dynamic route → static pages
├── public/
│   └── robots.txt
└── dist/                   # 4,800 static HTML pages (built)
```

— Max