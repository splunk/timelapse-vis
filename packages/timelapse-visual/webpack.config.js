const path = require('path');
const webpackMerge = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        DashboardSelector: path.join(__dirname, 'src/DashboardSelector/DashboardSelector.jsx'),
        Documentation: path.join(__dirname, 'src/Documentation/Documentation.jsx'),
        ListDashboard: path.join(__dirname, 'src/ListDashboard/ListDashboard.jsx'),
        RangeSlider: path.join(__dirname, 'src/RangeSlider/RangeSlider.jsx'),
        TimelapseControls: path.join(__dirname, 'src/TimelapseControls/TimelapseControls.jsx'),

    },
    output: {
        path: path.join(__dirname),
    },
});
