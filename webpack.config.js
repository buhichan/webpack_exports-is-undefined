const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

/**
 * @type {webpack.Configuration}
 */
const config = {
  mode: "development",
  output: {
    path: __dirname + "/build",
    library: "test",
    libraryTarget: "umd",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: "body",
    }),
  ],
  optimization: {
    usedExports: true,
    emitOnErrors: process.env.NODE_ENV !== "development",
    runtimeChunk: "single",
    nodeEnv: process.env.NODE_ENV,
    /**
     * 把不常更新的依赖移动到单独的vendors文件, 获得long term caching.
     */
    splitChunks: {
      cacheGroups: {
        default: {
          priority: -40,
          reuseExistingChunk: false,
        },
      },
    },
  },
};

module.exports = config;
