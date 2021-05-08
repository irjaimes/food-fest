// webpack uses node.js to build the application so we can use npm modules and the require module
// any changes saved here require you to re-run the build so changes take place and main.bundle.js is updated with this changes
const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

// for basic configuration, webpack needs 3 properties: entry, output, mode
module.exports = {
  // the entry point is the roof of the bundle and the beginning of the dependecy graph
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /\.jpg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name(file) {
                return "[path][name].[ext]";
              },
              publicPath: function (url) {
                return url.replace("../", "/assets/");
              },
            },
          },
          {
            loader: "image-webpack-loader",
          },
        ],
      },
    ],
  },
  // make sure to install jquery and run the build again
  // because ProvidePlunin is built into webpack, so we need to be sure we're bringing webpack's methods and properties into the config file by importing it above
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static", // the report outputs to an HTML file in the dist folder
    }),
    new WebpackPwaManifest({
      name: "Food Event",
      short_name: "Foodies",
      description: "An app that allows you to view upcoming food events.",
      start_url: "../index.html",
      background_color: "#01579b",
      theme_color: "#ffffff",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("assets/img/icons/icon-512x512.png"),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
  mode: "development",
};
