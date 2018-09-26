// Load module to show error when they are missing
var path = require('path');
var webpack = require('webpack');
var tsLoader = require('ts-loader');
var styleLoader = require('style-loader');
var cssLoader = require('css-loader');
var json = require("json-loader");
var OfflinePlugin = require("offline-plugin");

module.exports = [{
    target: "web",
    mode: "development",
    entry: {
        "bundle": __dirname + "/src/index.tsx",
    },

    output: {
        path: __dirname,
        filename: "[name].js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        modules: ['.', 'src', 'node_modules', 'style'],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css']
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" },
            {
                test: /\.(scss)$/,
                use: [{
                    loader: 'style-loader', // inject CSS to page
                }, {
                    loader: 'css-loader', // translates CSS into CommonJS modules
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'postcss-loader', // Run post css actions
                    options: {
                        plugins: function () { // post css plugins, can be exported to postcss.config.js
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        },
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader', // compiles SASS to CSS
                    options: {
                        sourceMap: true,
                        includePaths: ['.', "node_modules", "src"],
                    }
                }]
            },
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.*
    // externals: ['ws'],

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default'],
        }),
        new webpack.DefinePlugin({
            PACKAGE_VERSION: JSON.stringify(require("./package.json").version)
        }),
        new OfflinePlugin({
            responseStrategy: "network-first",
            excludes: ["**/*.map"],
            externals: [
                "https://use.fontawesome.com/releases/v5.3.1/css/all.css"
            ],
            autoUpdate: true,
        })
    ]
}];