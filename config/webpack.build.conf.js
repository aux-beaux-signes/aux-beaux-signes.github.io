//- BUILD CONFIG -

const { merge } = require("webpack-merge");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

const DIR = {
  dev: "dev"
};

// CONFIG
const baseWebpackConfig = require("./webpack.base.conf");
const buildWebpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  output: {
    publicPath: "./"
  },
  optimization: {
    minimizer: [new TerserPlugin({ extractComments: false })] // clean 'LICENSE.txt' files
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["app.*.js", "app.*.css", "./index.html", "./assets/**"],
      verbose: true,
      dry: false
    }),
  ]
});

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
});