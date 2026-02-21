// Central configuration for site-wide metadata and constants
export const siteConfig = {
  // Project details
  name: "xexr.com",
  tagline: "by Dane Poyzer",
  description:
    "Personal site by Dane Poyzer",
  url: "https://xexrcom.vercel.app",
  manifestPath: "/site.webmanifest",

  // CDN/Assets - used for remote image patterns in next.config.ts
  cdnDomain: "poyzer.download",

  // Company legal info (for email footers, legal pages, etc.)
  company: {
    name: "Poyzer Tech Limited  ",
    registrationNumber: "15323923", // e.g., "CRN 15323923" - leave empty if not applicable
    address: "71-75 Shelton Street, Convent Garden, London, England, WC2H 9JQ", // Full registered address - leave empty if not applicable
    country: "United Kingdom",
  },

  // Emails
  supportEmail: "support@example.com",

  // Open Graph & icons
  ogImage: "https://project.poyzer.download/images/icon/icon_512.webp",

  // Social
  twitter: {
    creator: "@danepoyzer",
  },

  // SEO
  keywords: [
    "keyword 1",
    "keyword 2",
    "keyword 3",
    "keyword 4",
    "keyword 5",
    "keyword 6",
    "keyword 7",
    "keyword 8",
    "keyword 9",
    "keyword 10",
    "keyword 11",
    "keyword 12",
    "keyword phrase 1",
    "keyword phrase 2",
    "keyword phrase 3",
    "keyword phrase 4",
    "keyword phrase 5",
    "related term 1",
    "related term 2",
    "related term 3",
    "related term 4",
    "related term 5",
    "industry term 1",
    "industry term 2",
    "industry term 3",
    "industry term 4",
    "industry term 5",
    "action phrase 1",
    "action phrase 2",
    "action phrase 3",
    "action phrase 4",
    "specific feature 1",
    "specific feature 2",
    "specific feature 3",
    "specific feature 4",
    "specific feature 5",
  ],

  // Schema.org topics
  topics: [
    "Primary Topic",
    "Secondary Topic",
    "Topic Category 1",
    "Topic Category 2",
    "Topic Category 3",
    "Topic Category 4",
  ],
};
