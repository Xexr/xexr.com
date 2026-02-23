import "@/styles/globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import { type Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/lib/siteConfig";
import { metadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });


// Metadata is managed via src/lib/metadata.ts
export { metadata };

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": siteConfig.url,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.ogImage,
    description: siteConfig.description,
    knowsAbout: siteConfig.topics,
  };

  return (
    <html
      lang="en"
      className={cn("dark", geistSans.variable, geistMono.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
          {children}
          <Analytics />
      </body>
    </html>
  );
}
