var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: "./client/index.js",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    hot: false
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
          loader: "html-loader",
          options: {
            minimize: true
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },  // creates style nodes from JS strings,
          { loader: "css-loader" }, // translates CSS into CommonJS
          { loader: "sass-loader" }// compiles Sass to CSS
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ],
    exprContextCritical: false
  }
};
