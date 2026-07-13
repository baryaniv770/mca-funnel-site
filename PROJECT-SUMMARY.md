# MCA Funnel Site — Complete Project Summary
**Date:** July 13, 2026
**Built by:** Max (OpenClaw AI Agent)
**For:** YourNextFund — MCA Broker Lead Generation

---

## What We Built

A programmatic SEO funnel site with **4,800 lead capture pages** targeting 30 industries × 40 US cities × 4 funding types. Each page is SEO-optimized, has a lead form connected to our CRM, and is designed to capture hot MCA leads from Google Ads and organic search.

---

## Technical Architecture

| Component | Technology | Cost |
|-----------|-----------|------|
| Framework | Astro (static site generator) | $0 |
| Hosting | Cloudflare Pages (free tier) | $0/month |
| Domain | `funding.yournextfund.com` (CNAME on GoDaddy DNS) | $0 |
| SSL | Cloudflare auto-provisioned | $0 |
| Lead forms | POST to `https://yournextfund.com/api/apply` | $0 |
| Conversion tracking | Google Ads tag `AW-18319278108` | $0 |
| SEO schema | FinancialService + FAQPage on every page | $0 |
| Sitemap | Auto-generated, 4,801 URLs | $0 |
| GitHub repo | https://github.com/baryaniv770/mca-funnel-site | $0 |

**Total hosting cost: $0/month**

---

## Page Structure

### URL Formula
```
/[industry]-[funding-type]-[city]-[state]/
```

### Examples
- `funding.yournextfund.com/restaurant-mca-new-york-ny/`
- `funding.yournextfund.com/construction-working-capital-houston-tx/`
- `funding.yournextfund.com/trucking-mca-atlanta-ga/`
- `funding.yournextfund.com/medical-practice-line-of-credit-miami-fl/`

### Page Count Breakdown
- **30 industries** (restaurants, construction, trucking, medical, auto repair, etc.)
- **40 US cities** (New York, LA, Chicago, Houston, Miami, Atlanta, etc.)
- **4 funding types** (MCA, Working Capital, Line of Credit, Short-Term Loan)
- **Total: 30 × 40 × 4 = 4,800 pages**

---

## What Each Page Contains

1. **Branded hero section** matching YourNextFund design
2. **Lead capture form** with fields:
   - Business name
   - Contact name
   - Email
   - Phone
   - Funding amount ($5K-$25K, $25K-$100K, $100K-$500K, $500K+)
   - Time in business (0-6mo, 6-12mo, 1-2yr, 2+yr)
3. **Hidden tracking fields** sent to CRM:
   - `source_page` — which page converted (e.g., `restaurant-mca-new-york-ny`)
   - `industry` — which industry (e.g., `Restaurants`)
   - `city` — which city (e.g., `New York, NY`)
   - `funding_type` — which funding type (e.g., `Merchant Cash Advance`)
   - `lead_type` — `programmatic_seo`
4. **Industry-specific content** — unique copy for each industry
5. **City-specific stats** — local business counts
6. **4 FAQ sections** with Schema markup for Google rich results
7. **FinancialService + LocalBusiness schema** for local SEO
8. **Google Ads conversion tracking** — form submit fires conversion event
9. **4 funding product cards** (MCA, Working Capital, LOC, Short-Term Loan)
10. **Trust badges** (security, speed, human support, 100+ funders)
11. **CTA banner** — "Stop chasing lenders. Let your AI do it."
12. **Mobile-first responsive design**

---

## CRM Integration

All 4,800 forms POST to: `https://yournextfund.com/api/apply`

### Data sent on every form submit:
```
POST /api/apply
Content-Type: application/x-www-form-urlencoded

source_page=restaurant-mca-new-york-ny
industry=Restaurants
city=New York, NY
funding_type=Merchant Cash Advance
lead_type=programmatic_seo
business_name=Joe's Pizza
full_name=Joe Smith
email=joe@email.com
phone=555-123-4567
funding_amount=25000-100000
time_in_business=24+
```

This matches the existing `/api/apply` contract on yournextfund.com.

---

## Google Ads Setup

### Campaign Created
- **Campaign ID:** 24025843646
- **Customer ID:** 345-201-2511
- **Type:** Performance Max / Search
- **Conversion tag:** AW-18319278108 (installed on all 4,800 pages)
- **Status:** Live

### Ad Groups & Keywords (in GOOGLE-ADS-SETUP.md)
1. **Restaurant Funding** — `merchant cash advance restaurant`, `restaurant funding`, `restaurant business loan`, `working capital restaurant`, `restaurant financing`
2. **Construction Funding** — `construction business funding`, `MCA construction company`, `working capital construction`, `contractor funding`
3. **Trucking Funding** — `trucking company funding`, `MCA trucking`, `trucking working capital`, `fleet funding`
4. **Generic MCA** — `merchant cash advance`, `MCA broker`, `business cash advance`, `merchant cash advance fast`, `MCA funding`, `merchant advance`, `business funding fast`, `working capital loan`, `small business funding`, `business cash advance no credit check`
5. **Medical Practice** — `medical practice funding`, `MCA medical practice`, `doctor office financing`
6. **Auto Repair** — `auto repair shop funding`, `MCA auto repair`, `auto shop financing`

### Ad Copy
```
Headline 1: Merchant Cash Advance (or industry-specific)
Headline 2: AI Shops 100+ Funders
Headline 3: No Hard Credit Pull · 24hr
Description 1: Get the best MCA offer. One application — our AI shops 100+ funders. No hard credit pull.
Description 2: Funding in 24 hours. $5K to $2M+. See your offers in 60 seconds.
```

### Budget
- Google Ads: $75/day
- Target CPA: $20
- Expected leads: 3-5/day from Google

---

## Meta (Facebook/Instagram) Ads — Ready to Launch

Full setup in `META-ADS-SETUP.md`:
- 3 ad sets: Broad small business, Industry-specific, Retargeting
- 3 ad creatives with copy
- Daily budget: $40/day
- Expected leads: 2-4/day from Meta

---

## Bing Ads — Ready to Launch
- Import from Google Ads via Bing Ads Editor
- Daily budget: $15/day
- Expected leads: 1-3/day from Bing

---

## Total Lead Projection

| Channel | Daily Budget | Expected CPL | Leads/Day |
|---------|-------------|-------------|-----------|
| Google Search | $75 | $15-30 | 3-5 |
| Meta (FB/IG) | $40 | $8-20 | 2-4 |
| Bing | $15 | $5-12 | 1-3 |
| **Total** | **$130/day** | **$10-25 avg** | **6-12/day** |

**Monthly: 180-360 hot leads for ~$3,900/month ad spend**

---

## SEO / Organic (Free Traffic)

- **Sitemap submitted** to Google Search Console
- **4,801 pages** with unique content, schema markup, and local SEO
- **IndexNow** submitted to Bing/Google
- **Google Search Console** verified for `funding.yournextfund.com`
- Organic traffic will build over 2-6 months as Google indexes pages

---

## File Structure

```
mca-funnel-site/
├── astro.config.mjs           # Astro config with sitemap
├── package.json
├── .gitignore
├── DEPLOYMENT-GUIDE.md       # Full deployment instructions
├── GOOGLE-ADS-SETUP.md        # Google Ads campaign structure
├── META-ADS-SETUP.md          # Meta Ads campaign structure
├── scripts/
│   └── generate-data.mjs      # Generates 4,800 pages from data
├── src/
│   ├── data/
│   │   └── pages.json         # 10MB of page data (4,800 entries)
│   ├── layouts/
│   │   └── FunnelPage.astro   # Branded template with lead form
│   └── pages/
│       ├── [slug].astro       # Dynamic route → static pages
│       └── index.astro        # Homepage redirect
├── public/
│   ├── robots.txt             # Allow all + sitemap
│   ├── google2ddf40ec9d875fab.html  # GSC verification
│   └── mcafunnelpages2026.txt  # IndexNow key
├── ad-import/
│   └── google-ads-mca-campaigns.csv  # CSV for Google Ads Editor
└── dist/                      # 4,801 static HTML pages (built)
```

---

## Deployment Commands

```bash
# Build
cd /Users/yb/.openclaw/workspace/mca-funnel-site
npm run build

# Deploy to Cloudflare Pages
export CLOUDFLARE_API_TOKEN="your_token"
npx wrangler pages deploy dist --project-name=mca-funnel-site --branch=main

# Push to GitHub
git add -A
git commit -m "Update — Max"
git push
```

---

## Live URLs

- **Homepage:** https://funding.yournextfund.com/
- **Sample page:** https://funding.yournextfund.com/restaurant-mca-new-york-ny/
- **Sitemap:** https://funding.yournextfund.com/sitemap-index.xml
- **GitHub:** https://github.com/baryaniv770/mca-funnel-site
- **Google Ads:** Campaign ID 24025843646 (live)

---

## What's Next

1. ✅ 4,800 pages live
2. ✅ CRM integration connected
3. ✅ Google Ads campaign live
4. ✅ Google Search Console verified + sitemap submitted
5. ⬜ Meta Ads — setup ready in META-ADS-SETUP.md
6. ⬜ Bing Ads — import from Google Ads
7. ⬜ Add more ad assets in Google Ads (images, sitelinks) to fix warning
8. ⬜ Monitor leads in yournextfund.com CRM admin panel
9. ⬜ After 7 days of data — switch Google Ads to Target CPA bidding at $20

---

Built by Max ⚡ — OpenClaw AI Agent
July 13, 2026