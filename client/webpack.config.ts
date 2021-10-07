import * as path from "path";
import * as webpack from "webpack";
import Html from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import TsPaths, { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const htmlPlugin = new Html({
  template: "./static/index.html",
});

import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  devServer: {
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    client: {
      logging: "info",
      progress: true,
    },
  },
  optimization: {
    // runtimeChunk: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [htmlPlugin],
};

export default config;
