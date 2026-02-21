import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vitest.base";

export default mergeConfig(
  base,
  defineConfig({
    test: {
      name: "unit",
      include: ["src/**/*.test.ts"],
      exclude: [
        "**/*.integration.test.ts",
        "**/*.e2e.test.ts",
        "**/*.performance.test.ts",
        "node_modules/**",
      ],
      setupFiles: [],
    },
  }),
);
