const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/public/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  plugins: [HTMLWebpackPluginConfig],
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'public', 'lib'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: '/public',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'}
      }
    ]
  }
}