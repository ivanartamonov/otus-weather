const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
  },
  plugins: [new HtmlWebpackPlugin({
    filename: path.resolve(__dirname, "public/index.html"),
    template: path.resolve(__dirname, "src/index.html")
  })],
};