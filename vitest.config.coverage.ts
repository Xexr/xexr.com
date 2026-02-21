import { defineConfig, mergeConfig } from "vitest/config";
import base from "./vitest.base";

export default mergeConfig(
  base,
  defineConfig({
    test: {
      name: "coverage",
      include: ["src/**/*.test.ts"],
      exclude: [
        "**/*.integration.test.ts",
        "**/*.e2e.test.ts",
        "**/*.performance.test.ts",
        "node_modules/**",
      ],
      setupFiles: ["__tests__/shared/setup.ts"],
      coverage: {
        enabled: true,
        provider: "v8",
        reporter: ["text", "json", "html"],
        reportsDirectory: "./coverage",
        // Per TESTING_UNIFIED.md - backend/library code only
        include: ["src/server/**/*.ts", "src/lib/**/*.ts"],
        exclude: [
          "**/*.test.ts",
          "**/*.d.ts",
          "**/node_modules/**",
          "**/__mocks__/**",
          "**/__tests__/**",
          "**/*.config.ts",
          "**/env.ts",
        ],
        thresholds: {
          // Per TESTING_UNIFIED.md - coverage fails build if not met
          branches: 50,
          functions: 60,
          lines: 55,
          statements: 55,
        },
      },
    },
  }),
);
