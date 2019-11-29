const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: [
      "@babel/polyfill",
      './src/index.js',
      './src/selectExtension.js',
      './src/uriBuilder.js',
      './src/ApiFactory.js',
      './src/GetNewsRequest.js',
      '//src/PostNewsRequest.js',
      './src/ErrorHandler.js',
      '/src/ErrorHandlerPopUp.js',
      './styles.css'
    ],
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
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: './dist'
    }
  };