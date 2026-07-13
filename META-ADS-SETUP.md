# Meta (Facebook/Instagram) Ads — MCA Lead Gen
# — Max

## Campaign Setup

**Campaign objective:** Conversions
**Conversion event:** Lead Form Submit (on yournextfund.com pages)
**Daily budget:** $40 total

### Ad Set 1: Small Business Owners — Broad (Budget: $15/day)
- **Audience:** United States, Age 25-65
- **Interests:** Small business, Entrepreneurship, Business loans, Business funding, Working capital
- **Behaviors:** Facebook Page Admins, Business Page Admins
- **Placements:** Auto (Mobile feed priority — Instagram + Facebook)
- **Optimization:** Conversions (form submit)

### Ad Set 2: Industry-Specific (Budget: $15/day)
- **Audience:** Same as above
- **Additional interests (split into 3 ad groups):**
  - Group A: Restaurant owners, Food service, Hospitality
  - Group B: Construction, Contractors, Home improvement
  - Group C: Trucking, Logistics, Transportation
- **Each sends to matching funnel page**

### Ad Set 3: Retargeting (Budget: $10/day)
- **Audience:** Website visitors (last 30 days) who didn't submit form
- **Custom audience:** Created from Meta Pixel on pages
- **Ad creative:** testimonial + urgency message

## Ad Creative (3 variants to A/B test)

### Creative 1 — "Funded" Notification
```
Image: Business owner looking at phone, "$50,000 FUNDED" notification
Headline: "Get funded in 24 hours — no hard credit pull"
Primary text: "Your AI funding team shops 100+ lenders to find your best offer. One application. No paperwork. No hard credit pull. See what your business qualifies for →"
CTA: "Learn More"
Destination: https://mca-funnel-site.pages.dev/restaurant-mca-new-york-ny/
```

### Creative 2 — "Stop Chasing"
```
Image: Split screen — left side "Old way: stacks of paperwork", right side "YourNextFund: one click"
Headline: "Stop chasing lenders. Let AI do it."
Primary text: "One application. Our AI shops 100+ funders. You pick the best offer. No hard credit pull. Funding in 24 hours."
CTA: "Get Started"
Destination: https://mca-funnel-site.pages.dev/construction-mca-houston-tx/
```

### Creative 3 — "24 Hours"
```
Image: Clock with "24 HRS" and "$5K-$2M" text
Headline: "Business funding in 24 hours"
Primary text: "Restaurants, construction, trucking, medical — whatever your business, our AI finds the best funder. $5K to $2M+. No hard credit pull to see options."
CTA: "Apply Now"
Destination: https://mca-funnel-site.pages.dev/restaurant-working-capital-chicago-il/
```

## Meta Pixel Setup
1. Create Meta Pixel in Business Manager
2. Add pixel ID to FunnelPage.astro (replace `G-XXXXXXXXXX` section)
3. Set up Conversions API via Cloudflare Workers (optional, improves tracking)
4. Create Custom Audience: "Website Visitors 30 Days"
5. Create Lookalike Audience: 1% lookalike of form submitters

## Budget Allocation
| Ad Set | Daily | Monthly |
|--------|-------|---------|
| Broad Small Biz | $15 | $450 |
| Industry-Specific | $15 | $450 |
| Retargeting | $10 | $300 |
| **Total** | **$40** | **$1,200** |

— Max