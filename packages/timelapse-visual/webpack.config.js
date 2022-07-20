const path = require("path");
const webpackMerge = require("webpack-merge");
const baseComponentConfig =
  require("@splunk/webpack-configs/component.config").default;

module.exports = webpackMerge(baseComponentConfig, {
  entry: "src/index.ts",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js",
  },
  resolve: { extensions: [".js", ".jsx"] },
  mode: "development",
  optimization: {
    usedExports: true,
  },
});
