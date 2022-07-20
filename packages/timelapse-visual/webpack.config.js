const path = require("path");
const webpackMerge = require("webpack-merge");
const baseComponentConfig =
  require("@splunk/webpack-configs/component.config").default;

module.exports = webpackMerge(baseComponentConfig, {
  entry: {
    DashboardSelector: path.join(
      __dirname,
      "src/DashboardSelector/DashboardSelector.tsx"
    ),
    Documentation: path.join(__dirname, "src/Documentation/Documentation.tsx"),
    ListDashboard: path.join(__dirname, "src/ListDashboard/ListDashboard.tsx"),
    RangeSlider: path.join(__dirname, "src/RangeSlider/RangeSlider.tsx"),
    TimelapseControls: path.join(
      __dirname,
      "src/TimelapseControls/TimelapseControls.tsx"
    ),
  },
  output: {
    path: path.join(__dirname),
    filename: "[name].js",
  },
  resolve: { extensions: [".js", ".jsx"] },
});
