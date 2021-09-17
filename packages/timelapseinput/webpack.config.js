const path = require('path');
const webpackMerge = require('webpack-merge');
const baseComponentConfig = require('@splunk/webpack-configs/component.config').default;

module.exports = webpackMerge(baseComponentConfig, {
    entry: {
        Timelapseinput: path.join(__dirname, 'src/Timelapseinput.jsx'),
    },
    output: {
        path: path.join(__dirname),
    },
});
