import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "node",
    globals: true,
    fileParallelism: false,
    exclude: ["node_modules", "dist", ".turbo", ".next"],
    // Skip @t3-oss/env-nextjs validation in tests
    env: {
      SKIP_ENV_VALIDATION: "true",
    },
  },
});
