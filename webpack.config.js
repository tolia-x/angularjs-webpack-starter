'use strict';

// Modules
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/**
 * Env
 * Get npm lifecycle event to identify the environment
 */
const ENV = process.env.npm_lifecycle_event;
const isTest = ENV === 'test' || ENV === 'test-watch';
const isProd = ENV === 'build';

const paths = {
    src: path.join(__dirname, 'src'),
    release: path.join(__dirname, 'dist')
};

module.exports = function makeWebpackConfig() {

    const config = {};

    config.entry = {
        polyfills: path.join(paths.src, 'app', 'polyfills.js'),
        vendor: path.join(paths.src, 'app', 'vendor.js'),
        app: path.join(paths.src, 'app', 'index.js')
    };

    config.output = {
        path: paths.release,
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: '[name].js'
    };

    if (isTest) {
        config.devtool = 'inline-source-map';
    } else if (isProd) {
        config.devtool = 'source-map';
    } else {
        config.devtool = 'eval-source-map';
    }

    // Initialize module
    config.module = {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss'])
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', ['css', 'postcss', 'sass'])
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader'
            },
            {
                test: /\.html$/,
                loaders: ['raw']
            }
        ]
    };


    config.postcss = [
        autoprefixer({
            browsers: ['last 15 version']
        })
    ];

    config.plugins = [
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV)
            }
        }),

        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery'
        })
    ];

    config.plugins.push(
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin(),

        new ExtractTextPlugin('css/[name].css', {disable: false}),

        new CopyWebpackPlugin([{
            from: __dirname + '/src/public'
        }])
    );

    if (!isTest) {

    }

    if (isProd) {

    }

    config.devServer = {
        contentBase: './src/public',
        stats: 'minimal'
    };

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}