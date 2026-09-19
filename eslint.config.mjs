import nextPlugin from "@next/eslint-plugin-next";

/** @type {import("eslint").Linter.Config} */
export default [
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    extends: [
      "eslint:recommended",
      "plugin:@next/next/recommended",
    ],
    settings: {
      next: {
        rootDir: true,
      },
    },
    rules: {
      // Next.js recommended rules are included via the plugin
      // Add custom rules here if needed
    },
  },
];
