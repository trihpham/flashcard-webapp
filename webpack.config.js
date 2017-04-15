var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const VENDOR_LIBS = [
    "axios",
    "classnames",
    "cors",
    "immutability-helper",
    "lodash",
    "query-string",
    "react",
    "react-addons-css-transition-group",
    "react-css-transition-replace",
    "react-dom",
    "react-modal",
    "react-radio-buttons",
    "react-redux",
    "react-router",
    "redux",
    "redux-form",
    "redux-thunk",
    "semantic-ui-react",
    "shortid"];
module.exports = {
    entry: {
        bundle: './src/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },

            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }

        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: './'
    }
};
