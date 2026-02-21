import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vitest.base";

export default mergeConfig(
  base,
  defineConfig({
    test: {
      name: "integration",
      include: ["__tests__/integration/**/*.integration.test.ts"],
      setupFiles: [],
      testTimeout: 30000,
    },
  }),
);
