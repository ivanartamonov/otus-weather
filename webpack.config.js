const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const mode = process.env.NODE_ENV;

module.exports = {
  entry: './src/index.html',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    clean: true
  },
  target: ['web', 'es5'],
  devtool: mode === 'production' ? 'source-map' : 'inline-source-map',
  devServer: {
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "public/index.html"),
      template: path.resolve(__dirname, "src/index.html")
    }),
    new MiniCssExtractPlugin()
  ],
  optimization: {
    minimizer: [
      `...`,
      // Don't work on production build
      //new CssMinimizerPlugin(),
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