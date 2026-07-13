# Google Ads Campaign — MCA Lead Gen
# Import this structure into Google Ads Editor or create manually
# — Max

## Campaign 1: Google Search — MCA Lead Gen

**Campaign type:** Search
**Bidding strategy:** Maximize Conversions (set target CPA = $20)
**Daily budget:** $75
**Target location:** United States
**Ad schedule:** Mon-Fri 6AM-9PM ET
**Device adjustment:** Mobile +20%

### Ad Group 1: Restaurant Funding (Budget: $15/day)
**Keywords (Exact + Phrase match):**
- "merchant cash advance restaurant"
- "restaurant funding"
- "restaurant business loan"
- "working capital restaurant"
- "MCA for restaurants"
- "restaurant financing"
- "business funding restaurant [city]" (for each of 40 cities)

**Ad copy:**
```
Headline 1: MCA for Restaurants
Headline 2: AI Shops 100+ Funders
Headline 3: No Hard Credit Pull · 24hr
Description: Get the best funding offer for your restaurant. One application, our AI shops 100+ funders. No paperwork. No hard credit pull.
Display URL: yournextfund.com/restaurant-funding
Final URL: https://mca-funnel-site.pages.dev/restaurant-mca-new-york-ny/
```
(Rotate Final URLs across cities for A/B testing)

### Ad Group 2: Construction Funding (Budget: $10/day)
**Keywords:**
- "construction business funding"
- "MCA construction company"
- "working capital construction"
- "construction loan fast"
- "contractor funding"
- "construction financing [city]"

**Ad copy:**
```
Headline 1: Funding for Construction
Headline 2: AI Shops 100+ Funders
Headline 3: No Hard Credit · 24hr Funding
Description: Get working capital for your construction company. One application, 100+ funders compared. No hard credit pull. Funded in 24 hours.
Final URL: https://mca-funnel-site.pages.dev/construction-mca-houston-tx/
```

### Ad Group 3: Trucking Funding (Budget: $10/day)
**Keywords:**
- "trucking company funding"
- "MCA trucking"
- "trucking working capital"
- "trucking business loan"
- "fleet funding"
- "trucking financing [city]"

**Ad copy:**
```
Headline 1: MCA for Trucking
Headline 2: AI Shops 100+ Funders
Headline 3: No Hard Credit · 24hr
Description: Get funding for your trucking company based on revenue, not credit. One application, 100+ funders. No hard credit pull. 24-hour funding.
Final URL: https://mca-funnel-site.pages.dev/trucking-mca-atlanta-ga/
```

### Ad Group 4: Generic MCA (Budget: $20/day)
**Keywords:**
- "merchant cash advance"
- "MCA broker"
- "business cash advance"
- "merchant cash advance fast"
- "MCA funding"
- "merchant advance"
- "business funding fast"
- "working capital loan"
- "small business funding"
- "business cash advance no credit check"

**Ad copy:**
```
Headline 1: Merchant Cash Advance
Headline 2: AI Shops 100+ Funders
Headline 3: No Hard Credit · 24hr Funding
Description: Get the best MCA offer. One application — our AI shops 100+ funders. No hard credit pull. Funding in 24 hours. $5K to $2M+.
Final URL: https://mca-funnel-site.pages.dev/restaurant-mca-new-york-ny/
```

### Ad Group 5: Medical Practice Funding (Budget: $10/day)
**Keywords:**
- "medical practice funding"
- "MCA medical practice"
- "doctor office financing"
- "medical business loan"
- "healthcare working capital"
- "medical clinic funding [city]"

### Ad Group 6: Auto Repair Funding (Budget: $10/day)
**Keywords:**
- "auto repair shop funding"
- "MCA auto repair"
- "auto shop financing"
- "mechanic business loan"
- "auto repair working capital"

## Campaign 2: Google Search — MCA by City (Budget: $50/day)

Create 10 ad groups, one per top city. Each with city-specific keywords.

### Cities & Budgets:
| City | Daily Budget | Sample Keywords |
|------|-------------|-----------------|
| New York | $8 | "MCA New York", "business funding NYC" |
| Los Angeles | $8 | "MCA Los Angeles", "business funding LA" |
| Chicago | $5 | "MCA Chicago", "business funding Chicago" |
| Houston | $5 | "MCA Houston", "business funding Houston" |
| Dallas | $5 | "MCA Dallas", "business funding Dallas" |
| Miami | $5 | "MCA Miami", "business funding Miami" |
| Atlanta | $4 | "MCA Atlanta", "business funding Atlanta" |
| Phoenix | $4 | "MCA Phoenix", "business funding Phoenix" |
| San Antonio | $3 | "MCA San Antonio" |
| Seattle | $3 | "MCA Seattle" |

Each ad group sends to the matching city page:
`https://mca-funnel-site.pages.dev/restaurant-mca-{city-slug}/`

## Campaign 3: Bing Ads (Import from Google)
- Import Campaign 1 & 2 directly via Bing Ads Editor
- Reduce all bids by 40% (Bing CPC is cheaper)
- Daily budget: $25 total

## Negative Keywords (Apply to ALL campaigns)
```
-free
-scam
-lawsuit
-complaints
-reviews
-alternative
-vs
-comparison
-definition
-wiki
-what is
-how does
```

## Conversion Tracking Setup
1. Create conversion action in Google Ads: "Lead Form Submit"
2. Value: $50
3. Count: One per click
4. Add the conversion ID to the gtag config in FunnelPage.astro
5. The form submit event is already wired: `gtag('event', 'generate_lead', {...})`

## Scaling Rules
- CPL < $15 → increase daily budget by 20%
- CPL > $35 → pause that ad group
- Conversion rate > 8% → scale aggressively
- Conversion rate < 2% → check landing page, improve form
- After 7 days of data → switch to Target CPA bidding at $20

— Max