module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      typescript: true,
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  env: {
    browser: true,
    amd: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
  ],
  "plugins": [
    "import",
    "simple-import-sort",
    "prettier",
    "@typescript-eslint",
  ],
  rules: {
    "prettier/prettier": [
      "error",
      {
        semi: true,
        singleQuote: false,
        trailingComma: "es5",
        arrowParens: "always",
        endOfLine: "auto",
        plugins: [
          require("prettier-plugin-tailwindcss")
        ],
      },
    ],
    "react/function-component-definition": [
      2,
      { namedComponents: "function-declaration" },
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "jsx-a11y/accessible-emoji": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-shadow": [
      "error",
      {
        builtinGlobals: true,
      },
    ],
    "import/no-cycle": "error",
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "no-redeclare": "off",
    "@typescript-eslint/no-redeclare": "error",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["hrefLeft", "hrefRight"],
        aspects: ["invalidHref", "preferButton"],
      },
    ],
  },
};
