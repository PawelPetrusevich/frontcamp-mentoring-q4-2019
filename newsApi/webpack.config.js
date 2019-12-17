const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
      index : [
        "@babel/polyfill",
        './src/index.js',
        './src/selectExtension.js',
        './src/uriBuilder.js',
        './src/repository/ApiFactory.js',
        './src/repository/GetNewsRequest.js',
        './src/repository/PostNewsRequest.js',
        './styles.css'
      ]
    },
    module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
          },
        ]
      },
      resolve: {
        extensions: ['*', '.js']
      },       
    plugins: [
      new ExtractTextPlugin("main.css"),
    ],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js'
    },
    devServer: {
      contentBase: './dist'
    }
  };