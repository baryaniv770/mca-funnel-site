import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://yournextfund.com',
  output: 'static',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/apply'),
      lastmod: new Date(),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});