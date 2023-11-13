const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const srcPath = path.resolve(__dirname, './src');
const srcFontsPath = path.resolve(srcPath, 'assets/fonts');
const srcIconsPath = path.resolve(srcPath, 'assets/icons');
const srcImagesPath = path.resolve(srcPath, 'assets/images');
const srcStylesPath = path.resolve(srcPath, 'assets/styles');

const destPath = path.resolve(__dirname, './public');
const destIconsPath = 'assets/img/icons/[name].[hash][ext]';
const destImagesPath = 'assets/img/images/[name].[hash][ext]';
const destFontsPath = 'assets/fonts/[name].[hash][ext]';

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    devServer: {
        static: 'public',
        compress: true,
        port: 3000,
        open: true,
        hot: true,
    },
    stats: 'errors-only',
    entry: [
        path.resolve(srcPath, 'index.html')
    ],
    output: {
        path: destPath,
        publicPath: '/', // 'https://egorov-m.github.io/course-success-simple/'
    },
    module: {
        rules: [
            // rule for HTML files
            {
                include: srcPath,
                test: /\.html$/,
                use: {
                    loader: 'html-loader',
                },
            },
            // rule for CSS files
            {
                test: /\.css$/,
                include: srcStylesPath,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            // rules for image files
            {
                test: /\.(gif|png|jpe?g|webp)$/,
                include: srcImagesPath,
                type: 'asset/resource',
                generator: {
                    filename: destImagesPath,
                },
            },
            // rule for icon files
            {
                test: /\.(svg)$/,
                include: srcIconsPath,
                type: 'asset/resource',
                generator: {
                    filename: destIconsPath,
                },
            },
            // rule for font files
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                include: srcFontsPath,
                type: 'asset/resource',
                generator: {
                    filename: destFontsPath,
                },
            },
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [new CssMinimizerPlugin()], // it minifies css and optimize it with cssnano
    },
    plugins: [
        new CaseSensitivePathsPlugin(), // it fixes bugs between OS in caseSensitivePaths (since Windows isn't CaseSensitive but Linux is)
        new FriendlyErrorsWebpackPlugin(), // it provides user-friendly errors from webpack
        new HtmlWebpackPlugin({
            template: path.resolve(srcPath, 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            // it extracts css-code from js into splitted file
            filename: 'styles/[name].[fullhash].css',
        }),
        new CleanWebpackPlugin(),
        new webpack.ProgressPlugin(), // it shows progress of building
    ],
};
