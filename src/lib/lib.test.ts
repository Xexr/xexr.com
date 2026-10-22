import { beforeEach, describe, expect, it, vi } from "vitest";

const { env } = vi.hoisted(() => ({
  env: {
    NEXT_PUBLIC_URL: "https://xexr.com",
    NEXT_PUBLIC_VERCEL_ENV: "production",
    NEXT_PUBLIC_VERCEL_BRANCH_URL: "xexr-preview.vercel.app",
  },
}));
vi.mock("@/env", () => ({ env }));
import { getServerUrl } from "./lib";

describe("server URL selection", () => {
  beforeEach(() => {
    env.NEXT_PUBLIC_URL = "https://xexr.com";
    env.NEXT_PUBLIC_VERCEL_ENV = "production";
    env.NEXT_PUBLIC_VERCEL_BRANCH_URL = "xexr-preview.vercel.app";
  });

  it("keeps production requests on the configured public origin", () => {
    expect(getServerUrl().origin).toBe("https://xexr.com");
  });

  it("keeps preview requests on their HTTPS branch origin", () => {
    env.NEXT_PUBLIC_VERCEL_ENV = "preview";
    expect(getServerUrl().origin).toBe("https://xexr-preview.vercel.app");
  });

  it("allows the configured localhost origin during development", () => {
    env.NEXT_PUBLIC_VERCEL_ENV = "development";
    env.NEXT_PUBLIC_URL = "http://localhost:3005";
    expect(getServerUrl().origin).toBe("http://localhost:3005");
  });
});
