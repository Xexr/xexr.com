import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

const eslintConfig = [
  {
    // Keep CLI and editor in sync for unused eslint-disable comments.
    linterOptions: { reportUnusedDisableDirectives: "warn" },
  },
  ...nextCoreWebVitals,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  {
    name: "poyzertech/custom",
    plugins: {
      "react-compiler": reactCompiler,
    },
    rules: {
      "react-compiler/react-compiler": "error",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@test/*", "@mocks/*"],
              message:
                "Do not import test helpers/mocks from production code. Allowed only in test/support files.",
            },
          ],
        },
      ],
    },
  },
  {
    name: "poyzertech/allow-test-aliases",
    files: ["**/*.test.{ts,tsx,js,jsx}", "__tests__/**", "__mocks__/**"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
  {
    ignores: [".next", "next-env.d.ts", "eslint.config.mjs", "coverage"],
  },
];

export default eslintConfig;
