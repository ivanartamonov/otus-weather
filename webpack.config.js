const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
    clean: true
  },
  target: ['web', 'es5'],
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "public/index.html"),
      template: path.resolve(__dirname, "src/index.html")
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};