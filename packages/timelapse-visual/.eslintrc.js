module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    node: true,
  },
  ignorePatterns: [
    "timelapseds.ts",
    "TimelapseControls.tsx",
    "RangeSlider.tsx",
    "webpack.config.js",
  ],
};
