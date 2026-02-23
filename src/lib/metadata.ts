import type { Metadata } from "next";
import { siteConfig } from "./siteConfig";

export interface PageMetadataOptions {
  title: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  canonical?: string;
}

/**
 * Generate page-specific metadata with sensible defaults from siteConfig.
 * Use this in page.tsx files to set per-page SEO metadata.
 *
 * @example
 * // Basic page
 * export const metadata = generatePageMetadata({
 *   title: "Dashboard",
 *   description: "View your analytics and metrics",
 * });
 *
 * @example
 * // Article/post page
 * export const metadata = generatePageMetadata({
 *   title: "My Post",
 *   type: "article",
 *   publishedTime: "2026-01-15T00:00:00Z",
 *   authors: ["xexr"],
 *   tags: ["typescript", "nextjs"],
 *   canonical: "https://xexr.com/posts/my-post",
 * });
 */
export function generatePageMetadata({
  title,
  description,
  image,
  noIndex = false,
  type,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  canonical,
}: PageMetadataOptions): Metadata {
  const pageDescription = description ?? siteConfig.description;
  const pageImage = image ?? siteConfig.ogImage;

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          type: "article",
          title,
          description: pageDescription,
          images: [pageImage],
          publishedTime,
          modifiedTime,
          authors,
          tags,
        }
      : {
          title,
          description: pageDescription,
          images: [pageImage],
        };

  return {
    title,
    description: pageDescription,
    openGraph,
    twitter: {
      title,
      description: pageDescription,
      images: [pageImage],
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

// Next.js metadata configuration, centralized for easy customization
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `${siteConfig.name} | %s`,
  },
  applicationName: `${siteConfig.name} | ${siteConfig.tagline}`,
  description: siteConfig.description,
  manifest: siteConfig.manifestPath,
  openGraph: {
    title: siteConfig.name,
    type: "website",
    siteName: siteConfig.name,
    description: siteConfig.description,
    images: siteConfig.ogImage,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitter.creator,
    images: [siteConfig.ogImage],
  },
  appleWebApp: {
    title: siteConfig.name,
    statusBarStyle: "default",
    capable: true,
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  keywords: siteConfig.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon_32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon_16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: [{ url: "/favicon.ico", type: "image/x-icon" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
    other: [
      { rel: "icon", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};