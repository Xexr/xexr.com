// Central configuration for site-wide metadata and constants
export const siteConfig = {
  // Project details
  name: "xexr.com",
  tagline: "by Dane Poyzer",
  description:
    "Personal site by Dane Poyzer",
  url: "https://xexr.com",
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

  // Author
  author: {
    name: "Dane Poyzer",
    url: "https://xexr.com/about",
  },

  // Open Graph & icons
  ogImage: "https://project.poyzer.download/images/icon/icon_512.webp",

  // Social
  twitter: {
    creator: "@danepoyzer",
  },
  twitterHandle: "@danepoyzer",
  githubUrl: "https://github.com/Xexr",
  twitterUrl: "https://x.com/danepoyzer",
  substackUrl: "https://xexr.substack.com",

  // SEO
  keywords: [
    "AI",
    "indie hacker",
    "software development",
    "building in public",
    "AI orchestration",
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
