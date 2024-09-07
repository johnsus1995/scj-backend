module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  // extends: "airbnb-base",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    // quotes: ["error", "double", { avoidEscape: true }],
    // "comma-dangle": ["error", "always-multiline"],
    // "implicit-arrow-linebreak": "off",
    // "arrow-body-style": "off"

  },
};
