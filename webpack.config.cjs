
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  // React entry point
  entry: "./src/index.js",

  // Production and development output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/[name].[contenthash].js",
    clean: true,
    publicPath: "/",
  },

  // Resolve React components
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // Loaders
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
              ["@babel/preset-react", { runtime: "automatic" }],
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif|woff2?|ttf|eot)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/[name].[contenthash][ext]",
        },
      },
    ],
  },

  // Plugins
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "index.html",
      inject: "body",
    }),

    // Load .env variables and system environment variables.
    // Missing .env file is allowed.
    new Dotenv({
      systemvars: true,
      safe: false,
      silent: true,
    }),

    // Copy ALL public files and folders into dist.
    // index.html is generated separately by HtmlWebpackPlugin.
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, "dist"),
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
        },
      ],
    }),
  ],

  // Development server
  devServer: {
    static: {
      directory: path.resolve(__dirname, "public"),
      publicPath: "/",
      watch: true,
    },
    historyApiFallback: true,
    hot: true,
    port: 3000,
    open: true,
    compress: true,
  },

  // Performance
  performance: {
    hints: false,
  },
};
