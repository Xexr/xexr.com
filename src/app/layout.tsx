import "@/styles/globals.css";

import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { type Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { metadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import Footer from "./_components/Footer";
import VibeShell from "./_components/VibeShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

// Metadata is managed via src/lib/metadata.ts
export { metadata };

export const viewport: Viewport = {
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const vibeScript = `(function(){try{var v=localStorage.getItem("xexr-vibe");if(v)document.documentElement.style.setProperty("--accent",v)}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "xexr.com",
    url: "https://xexr.com",
    author: {
      "@type": "Person",
      name: "Dane Poyzer",
    },
  };

  return (
    <html
      lang="en"
      className={cn(plusJakartaSans.variable, jetbrainsMono.variable, "dark")}
      suppressHydrationWarning
    >
      <head>
        <meta name="darkreader-lock" />
        <script
          dangerouslySetInnerHTML={{ __html: vibeScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground flex min-h-screen flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-accent"
        >
          Skip to content
        </a>
        <NuqsAdapter>{children}</NuqsAdapter>
        <Footer />
        <VibeShell />
        <Analytics />
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
