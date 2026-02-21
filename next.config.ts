import type { NextConfig } from "next";
import { siteConfig } from "@/lib/siteConfig";

const config: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: siteConfig.cdnDomain }],
  },
};

export default config;
