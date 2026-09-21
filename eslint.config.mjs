import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      // Next.js recommended rules
      ...nextPlugin.configs.recommended.rules,
    },
  },
  {
    ignores: [".next/**", "node_modules/**", "*.js", "*.mjs"],
  },
];
