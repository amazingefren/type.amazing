import * as path from "path";
import * as webpack from "webpack";
import Html from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import DartSass from "sass";

const htmlPlugin = new Html({
  template: "./static/index.html",
});

import "webpack-dev-server";

const config: webpack.Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(s(a|c)ss)$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: DartSass,
              sassOptions: {
                outputStyle: "compressed",
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    symlinks: false
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
    runtimeChunk: 'single',
    minimize: true,
    minimizer: [new TerserPlugin()],
    usedExports: true,
    // Tesitng
    splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
    ////////////////////////
  },
  plugins: [htmlPlugin],
};

export default config;
