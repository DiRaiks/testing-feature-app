const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
    // context: path.resolve(__dirname, 'src'),
    entry: ['babel-polyfill', path.resolve(__dirname, 'src/index.js')],
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].[chunkhash].chunk.js',
        path: __dirname + '/dist',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
            }
        ]
    },
    devServer: {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        noInfo: false,
        stats: 'minimal',
        publicPath: '/',
        contentBase: path.join(__dirname, '/'),
        hot: true
    },
    plugins: []
};

// HTML Template
// ------------------------------------
config.plugins.push(new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: true,
    minify: {
        collapseWhitespace: true,
    },
    filename: './index.html'
}));

// Images
// ------------------------------------
config.module.rules.push({
    test    : /\.(png|jpg|gif|svg)$/,
    loader  : 'url-loader',
    options : {
        limit : 8192,
    },
});

// Styles
// ------------------------------------
config.plugins.push(new MiniCssExtractPlugin({
    filename: 'styles/[name].[contenthash].css',
    allChunks: true,
    chunkFilename: "[id].css",
    // disable: __DEV__,
}));

config.module.rules.push({
    test: /\.(sass|scss)$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        'sass-loader',
    ]
});
// config.plugins.push(extractStyles);

module.exports = config;