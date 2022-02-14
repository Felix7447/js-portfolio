const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

/** @type {import('webpack').Configuration} */

module.exports = {// Webpack config needs an entry, output and resolve like this (JS config)
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    resolve: {
        extensions: ['.js'],   // depending on the extensions you'll have
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
        }
    },
    watch: true,
    module: { 
        rules: [
            {// this is for babel config
                test: /\.m?js$/, // This regular expression is to test mjs & js extensions
                exclude: /node_modules/, //To exclude extensions from node_modules. (if webpack reads this extensions, it can crash the app)
                use: {
                    loader: "babel-loader" // to use babel loader
                }
            },
            {// this is to css config and use css loader
                test: /\.css|\.styl$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'stylus-loader'
                ]
            },
            {// this is to image loaders
                test: /\.png/,
                type: 'asset/resource' 
            },
            {// To url fonts loader
                test: /\.(woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        esModule: false,
                    },
                },
                type: 'javascript/auto'
            }
        ]
    },
    plugins: [//To add plugins
        new HtmlWebpackPlugin({// To add html plugin config
            inject: true,
            template: './public/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "assets/[name].[contenthash].css"
        }),
        new CopyPlugin({
            patterns:[
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv()
    ],
}