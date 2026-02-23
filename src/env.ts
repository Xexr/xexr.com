import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
    VERCEL_BRANCH_URL: z.string().optional(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  client: {
    NEXT_PUBLIC_URL: z.string(),
    NEXT_PUBLIC_VERCEL_ENV: z
      .enum(["development", "preview", "production"])
      .optional(),
    NEXT_PUBLIC_VERCEL_BRANCH_URL: z.string().optional(),
    NEXT_PUBLIC_GISCUS_REPO: z.string().optional(),
    NEXT_PUBLIC_GISCUS_REPO_ID: z.string().optional(),
    NEXT_PUBLIC_GISCUS_CATEGORY: z.string().optional(),
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: z.string().optional(),
  },

  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
    NEXT_PUBLIC_VERCEL_BRANCH_URL: process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL,
    NEXT_PUBLIC_GISCUS_REPO: process.env.NEXT_PUBLIC_GISCUS_REPO,
    NEXT_PUBLIC_GISCUS_REPO_ID: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
    NEXT_PUBLIC_GISCUS_CATEGORY: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_BRANCH_URL: process.env.VERCEL_BRANCH_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
