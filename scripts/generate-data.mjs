// Generate MCA funnel page data: 30 industries × 35 cities = 1,050 pages
// — Max

import fs from 'fs';

const industries = [
  { slug: 'restaurant', name: 'Restaurants', icon: '🍽️', blurb: 'Restaurants face cash flow gaps between busy weekends and slow weekdays. Whether you need to cover payroll, upgrade kitchen equipment, or bridge a slow season, funding moves fast when your AI shops 100+ funders.' },
  { slug: 'construction', name: 'Construction Companies', icon: '🏗️', blurb: 'Construction runs on timing — materials, labor, and equipment all need cash before the next draw. Get working capital that keeps your crew moving without waiting on client invoices.' },
  { slug: 'medical-practice', name: 'Medical Practices', icon: '⚕️', blurb: 'Medical practices juggle insurance reimbursements, equipment costs, and payroll. Our AI matches you to funders who understand healthcare cash cycles and fund fast.' },
  { slug: 'trucking', name: 'Trucking Companies', icon: '🚚', blurb: 'Trucking means fuel costs, maintenance, and trailer payments that never wait. Get MCA funding based on your revenue — not your credit score — and keep your rigs rolling.' },
  { slug: 'auto-repair', name: 'Auto Repair Shops', icon: '🔧', blurb: 'Auto repair shops need parts, tools, and bay equipment. Funding in 24 hours means you never turn away a job because you can\'t stock parts.' },
  { slug: 'retail-store', name: 'Retail Stores', icon: '🏪', blurb: 'Retail lives on inventory cycles. Stock up for peak season, renovate your storefront, or bridge a slow month — all without a hard credit pull.' },
  { slug: 'salon-spa', name: 'Salons & Spas', icon: '💇', blurb: 'Salons and spas thrive on reputation and experience. Fund chair expansions, equipment upgrades, or marketing campaigns with working capital that moves as fast as your bookings.' },
  { slug: 'plumbing', name: 'Plumbing Contractors', icon: '🔩', blurb: 'Plumbing contractors need vehicles, tools, and materials on hand for every job. Get funded in 24 hours and never delay a project waiting on cash.' },
  { slug: 'electrician', name: 'Electrical Contractors', icon: '⚡', blurb: 'Electrical contractors carry inventory costs and labor overhead. Secure working capital to take on bigger jobs without tying up your own cash.' },
  { slug: 'hvac', name: 'HVAC Companies', icon: '🌡️', blurb: 'HVAC businesses need to stock parts and hire seasonal help. Get MCA funding based on your revenue and keep every service call covered.' },
  { slug: 'landscaping', name: 'Landscaping Companies', icon: '🌳', blurb: 'Landscaping is seasonal — equipment, labor, and materials all hit at once. Bridge the gap with working capital funded in 24 hours.' },
  { slug: 'roofing', name: 'Roofing Contractors', icon: '🏠', blurb: 'Roofing requires materials, crew, and insurance upfront on every job. Get funded fast and take on more contracts without cash flow stress.' },
  { slug: 'flooring', name: 'Flooring Companies', icon: '🪵', blurb: 'Flooring contractors need inventory and installation crews ready. Working capital in 24 hours keeps your pipeline full and jobs on schedule.' },
  { slug: 'painting', name: 'Painting Contractors', icon: '🎨', blurb: 'Painting contractors need supplies, equipment, and labor for every project. Get MCA funding to scale your crew and take on bigger jobs.' },
  { slug: 'cleaning-service', name: 'Cleaning Services', icon: '🧹', blurb: 'Cleaning businesses grow with equipment, supplies, and marketing. Fund your expansion with working capital — no hard credit pull required.' },
  { slug: 'catering', name: 'Catering Companies', icon: '🍽️', blurb: 'Catering requires upfront food costs, staff, and equipment for every event. Get funded in 24 hours and never turn down a big gig.' },
  { slug: 'bar-tavern', name: 'Bars & Taverns', icon: '🍺', blurb: 'Bars need inventory, renovations, and cash for licensing. MCA funding based on your daily card sales gets you capital without the bank wait.' },
  { slug: 'coffee-shop', name: 'Coffee Shops', icon: '☕', blurb: 'Coffee shops run on tight margins and need equipment, inventory, and marketing. Get working capital fast to roast your competition.' },
  { slug: 'fitness-gym', name: 'Fitness & Gyms', icon: '💪', blurb: 'Gyms need equipment upgrades, marketing, and cash flow between membership cycles. Fund your growth with MCA based on your revenue.' },
  { slug: 'dental-office', name: 'Dental Offices', icon: '🦷', blurb: 'Dental practices need equipment, staff, and technology investments. Our AI matches you to funders who understand healthcare cash cycles.' },
  { slug: 'veterinary', name: 'Veterinary Clinics', icon: '🐾', blurb: 'Vet clinics carry inventory, staff, and equipment costs. Get working capital that funds in 24 hours — no hard credit pull.' },
  { slug: 'pharmacy', name: 'Pharmacies', icon: '💊', blurb: 'Pharmacies need inventory, staffing, and compliance investments. MCA funding based on your revenue keeps your shelves stocked.' },
  { slug: 'manufacturing', name: 'Manufacturing', icon: '🏭', blurb: 'Manufacturing requires raw materials, equipment, and payroll. Get working capital that keeps your production line moving.' },
  { slug: 'wholesale', name: 'Wholesale Distributors', icon: '📦', blurb: 'Wholesale distributors need inventory and logistics cash. Fund your next bulk purchase with MCA funding in 24 hours.' },
  { slug: 'logistics', name: 'Logistics Companies', icon: '🚛', blurb: 'Logistics runs on fuel, fleet, and warehouse costs. Get working capital based on your revenue, not your credit score.' },
  { slug: 'technology', name: 'Technology Companies', icon: '💻', blurb: 'Tech companies need runway for development, hiring, and scaling. MCA funding bridges the gap between contracts and cash.' },
  { slug: 'real-estate', name: 'Real Estate Firms', icon: '🏘️', blurb: 'Real estate firms need capital for renovations, marketing, and bridge financing. Get funded fast without bank paperwork.' },
  { slug: 'insurance', name: 'Insurance Agencies', icon: '📋', blurb: 'Insurance agencies need cash flow for licensing, marketing, and growth. MCA funding based on your revenue keeps your agency expanding.' },
  { slug: 'accounting', name: 'Accounting Firms', icon: '📊', blurb: 'Accounting firms need technology, staffing, and marketing capital. Get working capital that funds in 24 hours.' },
  { slug: 'florist', name: 'Florists', icon: '💐', blurb: 'Florists face seasonal spikes and need inventory, cooler equipment, and delivery vehicles. Get MCA funding to bloom year-round.' }
];

const cities = [
  { slug: 'new-york-ny', name: 'New York', state: 'NY', population: '8.3M', businesses: '220,000+' },
  { slug: 'los-angeles-ca', name: 'Los Angeles', state: 'CA', population: '3.9M', businesses: '140,000+' },
  { slug: 'chicago-il', name: 'Chicago', state: 'IL', population: '2.7M', businesses: '95,000+' },
  { slug: 'houston-tx', name: 'Houston', state: 'TX', population: '2.3M', businesses: '85,000+' },
  { slug: 'phoenix-az', name: 'Phoenix', state: 'AZ', population: '1.6M', businesses: '55,000+' },
  { slug: 'philadelphia-pa', name: 'Philadelphia', state: 'PA', population: '1.6M', businesses: '52,000+' },
  { slug: 'san-antonio-tx', name: 'San Antonio', state: 'TX', population: '1.5M', businesses: '48,000+' },
  { slug: 'san-diego-ca', name: 'San Diego', state: 'CA', population: '1.4M', businesses: '46,000+' },
  { slug: 'dallas-tx', name: 'Dallas', state: 'TX', population: '1.3M', businesses: '50,000+' },
  { slug: 'san-jose-ca', name: 'San Jose', state: 'CA', population: '1.0M', businesses: '35,000+' },
  { slug: 'austin-tx', name: 'Austin', state: 'TX', population: '960K', businesses: '38,000+' },
  { slug: 'jacksonville-fl', name: 'Jacksonville', state: 'FL', population: '950K', businesses: '32,000+' },
  { slug: 'fort-worth-tx', name: 'Fort Worth', state: 'TX', population: '920K', businesses: '30,000+' },
  { slug: 'columbus-oh', name: 'Columbus', state: 'OH', population: '890K', businesses: '28,000+' },
  { slug: 'charlotte-nc', name: 'Charlotte', state: 'NC', population: '870K', businesses: '29,000+' },
  { slug: 'san-francisco-ca', name: 'San Francisco', state: 'CA', population: '870K', businesses: '34,000+' },
  { slug: 'indianapolis-in', name: 'Indianapolis', state: 'IN', population: '870K', businesses: '26,000+' },
  { slug: 'seattle-wa', name: 'Seattle', state: 'WA', population: '740K', businesses: '31,000+' },
  { slug: 'denver-co', name: 'Denver', state: 'CO', population: '715K', businesses: '27,000+' },
  { slug: 'washington-dc', name: 'Washington', state: 'DC', population: '670K', businesses: '25,000+' },
  { slug: 'boston-ma', name: 'Boston', state: 'MA', population: '650K', businesses: '28,000+' },
  { slug: 'el-paso-tx', name: 'El Paso', state: 'TX', population: '680K', businesses: '18,000+' },
  { slug: 'nashville-tn', name: 'Nashville', state: 'TN', population: '670K', businesses: '24,000+' },
  { slug: 'detroit-mi', name: 'Detroit', state: 'MI', population: '670K', businesses: '22,000+' },
  { slug: 'oklahoma-city-ok', name: 'Oklahoma City', state: 'OK', population: '655K', businesses: '19,000+' },
  { slug: 'portland-or', name: 'Portland', state: 'OR', population: '655K', businesses: '23,000+' },
  { slug: 'las-vegas-nv', name: 'Las Vegas', state: 'NV', population: '640K', businesses: '21,000+' },
  { slug: 'memphis-tn', name: 'Memphis', state: 'TN', population: '630K', businesses: '18,000+' },
  { slug: 'louisville-ky', name: 'Louisville', state: 'KY', population: '620K', businesses: '17,000+' },
  { slug: 'baltimore-md', name: 'Baltimore', state: 'MD', population: '610K', businesses: '19,000+' },
  { slug: 'milwaukee-wi', name: 'Milwaukee', state: 'WI', population: '590K', businesses: '16,000+' },
  { slug: 'albuquerque-nm', name: 'Albuquerque', state: 'NM', population: '560K', businesses: '15,000+' },
  { slug: 'tucson-az', name: 'Tucson', state: 'AZ', population: '545K', businesses: '14,000+' },
  { slug: 'fresno-ca', name: 'Fresno', state: 'CA', population: '540K', businesses: '14,000+' },
  { slug: 'sacramento-ca', name: 'Sacramento', state: 'CA', population: '525K', businesses: '17,000+' },
  { slug: 'kansas-city-mo', name: 'Kansas City', state: 'MO', population: '510K', businesses: '16,000+' },
  { slug: 'miami-fl', name: 'Miami', state: 'FL', population: '450K', businesses: '22,000+' },
  { slug: 'atlanta-ga', name: 'Atlanta', state: 'GA', population: '500K', businesses: '26,000+' },
  { slug: 'raleigh-nc', name: 'Raleigh', state: 'NC', population: '470K', businesses: '15,000+' },
  { slug: 'omaha-ne', name: 'Omaha', state: 'NE', population: '485K', businesses: '12,000+' }
];

const fundingTypes = [
  {
    name: 'Merchant Cash Advance',
    slug: 'mca',
    icon: '⚡',
    description: 'Get an advance on your future card sales. Fast funding, flexible repayment that follows your revenue.',
    bestFor: 'Businesses with steady card sales'
  },
  {
    name: 'Working Capital',
    slug: 'working-capital',
    icon: '📈',
    description: 'Short-term capital to cover payroll, inventory, and day-to-day operations. Funded in as little as 24 hours.',
    bestFor: 'Bridging cash flow gaps'
  },
  {
    name: 'Line of Credit',
    slug: 'line-of-credit',
    icon: '💳',
    description: 'Flexible capital you draw as you need it. Only pay for what you use. Perfect for managing seasonal fluctuations.',
    bestFor: 'Ongoing flexible access to cash'
  },
  {
    name: 'Short-Term Loan',
    slug: 'short-term-loan',
    icon: '💰',
    description: 'Fast lump-sum funding with clear terms. Fixed payments, no surprises. Funded in 24-48 hours.',
    bestFor: 'One-time investments'
  }
];

// Generate all pages: 30 industries × 35 cities × 1 MCA primary = 1,050 pages
// Plus 30 industries × 35 cities × 3 other funding types = 3,150 more pages
// Total: 4,200 pages for maximum coverage

const pages = [];
let id = 0;

for (const industry of industries) {
  for (const city of cities) {
    for (const funding of fundingTypes) {
      id++;
      const slug = `${industry.slug}-${funding.slug}-${city.slug}`;

      const title = `${funding.name} for ${industry.name} in ${city.name}, ${city.state}`;
      const metaDesc = `Get ${funding.name.toLowerCase()} for your ${industry.name.toLowerCase()} in ${city.name}, ${city.state}. Apply once — our AI shops 100+ funders to get you the best offer. No hard credit pull. Funding in 24 hours.`;

      pages.push({
        id,
        slug,
        industry,
        city,
        funding,
        title,
        metaDesc,
        url: `/${slug}/`,
        h1: `${funding.name} for ${industry.name} in ${city.name}, ${city.state}`,
        stats: city,
        // Add some variety for SEO
        faqSection: generateFAQ(industry, city, funding),
      });
    }
  }
}

function generateFAQ(industry, city, funding) {
  return [
    {
      q: `How fast can ${industry.name.toLowerCase()} in ${city.name} get ${funding.name}?`,
      a: `Our AI works your file the moment you apply. Most ${industry.name.toLowerCase()} in ${city.name} receive offers within 24 hours — sometimes same day. Upload your bank statements once and the AI handles the rest.`
    },
    {
      q: `What do ${industry.name.toLowerCase()} in ${city.name} need to qualify for ${funding.name}?`,
      a: `You need to be in business for at least 3-6 months with steady revenue. No hard credit pull required to see your options. Our AI reads your bank statements and matches you to funders who understand ${industry.name.toLowerCase()}.`
    },
    {
      q: `How much ${funding.name.toLowerCase()} can a ${industry.name.toLowerCase()} in ${city.name} get?`,
      a: `Funding ranges from $5,000 to $2,000,000+ depending on your revenue and business profile. ${city.name} has ${city.businesses} small businesses, and our AI works with 100+ funders to find the right match for yours.`
    },
    {
      q: `Is there a hard credit check to apply?`,
      a: `No. You can see your options with no hard credit pull. Our AI analyzes your bank statements and revenue — not just your credit score — to match you with funders likely to say yes.`
    }
  ];
}

// Save as JSON
fs.writeFileSync('./src/data/pages.json', JSON.stringify(pages, null, 0));
console.log(`Generated ${pages.length} pages`);
console.log(`Industries: ${industries.length}, Cities: ${cities.length}, Funding types: ${fundingTypes.length}`);
console.log(`File size: ${(fs.statSync('./src/data/pages.json').size / 1024 / 1024).toFixed(1)} MB`);