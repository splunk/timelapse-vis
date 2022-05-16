const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('@splunk/webpack-configs/base.config').default;

// Set up an entry config by iterating over the files in the pages directory.
const entries = fs
    .readdirSync(path.join(__dirname, 'src/main/webapp/pages'))
    .filter((pageFile) => !/^\./.test(pageFile))
    .reduce((accum, page) => {
        accum[page] = path.join(__dirname, 'src/main/webapp/pages', page);
        return accum;
    }, {});

module.exports = (env, argv) => {
    const config = webpackMerge(baseConfig, {
        entry: entries,
        output: {
            path: path.join(__dirname, 'stage/appserver/static/pages/'),
            filename: '[name].js',
            chunkFilename: "[name].js",
        },
        plugins: [
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'src/main/resources/splunk'),
                    to: path.join(__dirname, 'stage'),
                },
            ]),
        ],
        module: {
            rules: [
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
            ],
          },
        performance: { hints: false },
        devtool: '',
        optimization: {
            splitChunks: {
                cacheGroups: {
                    default: false,
                    vendors: false,
                    // vendor chunk
                    vendor: {
                        name: 'vendor',
                        // sync + async chunks
                        chunks: 'all',
                        // import file path containing node_modules
                        test: /node_modules/,
                    },
                },
            },
        },
    });
    if (argv.mode === 'development') {
        config.devtool = 'source-map';
        config.optimization.minimize = false;
    }
    return config;
};
