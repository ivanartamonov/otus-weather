const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'public/dist'),
    filename: 'bundle.js',
    clean: true
  },
  target: ['web', 'es5'],
  devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "public/index.html"),
      template: path.resolve(__dirname, "src/index.html")
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['public'] }
    }),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
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
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext]"
        }
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ]
  }
};