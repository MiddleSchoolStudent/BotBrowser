const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.ts',
    output: {
        filename: 'bot-browser-ui.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        splitChunks: false,
        runtimeChunk: false,
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'bot-browser-ui.html',
            template: './src/index.html',
            inject: 'body',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'bot-browser-ui.html',
            template: './src/index.html',
            inject: 'body',
        }),
    ],
};
