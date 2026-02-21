import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vitest.base";

export default mergeConfig(
  base,
  defineConfig({
    test: {
      name: "e2e",
      include: ["__tests__/e2e/**/*.e2e.test.ts"],
      setupFiles: [],
      testTimeout: 60000,
      // Explicit for clarity: E2E tests must run sequentially
      fileParallelism: false,
    },
  }),
);
