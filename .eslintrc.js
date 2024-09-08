module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // extends: "airbnb-base",
  extends: ["eslint:recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "script",
  },
  rules: {
    // quotes: ["error", "double", { avoidEscape: true }],
    // "comma-dangle": ["error", "always-multiline"],
    // "implicit-arrow-linebreak": "off",
    // "arrow-body-style": "off",
    "no-unused-vars": ["warn"],
    "no-undef": "error",
    "import/no-unresolved": "off", // Disable if using CommonJS and not ES modules
    "no-unreachable": "off",
  },
};
