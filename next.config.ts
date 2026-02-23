import type { NextConfig } from "next";
import { siteConfig } from "@/lib/siteConfig";

const isDev = process.argv.includes("dev");
const isBuild = process.argv.includes("build");
if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
  process.env.VELITE_STARTED = "1";
  import("velite")
    .then((m) => m.build({ watch: isDev, clean: !isDev }))
    .catch((e: unknown) => {
      console.error("Velite build failed:", e);
      process.exit(1);
    });
}

const config: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: siteConfig.cdnDomain }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "frame-src giscus.app",
              "connect-src 'self' https:",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [];
  },
};

export default config;
