import * as path from "path";
import { CheckerPlugin } from "awesome-typescript-loader";
import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as webpack from "webpack";

export const frontendConfigOutputPublicPath = "/static/";
const isProd = process.env.NODE_ENV === "production";

export const frontendConfig: webpack.Configuration = {
  entry: [
    ...(!isProd ? ["webpack-hot-middleware/client"] : []),
    path.resolve(__dirname, "../src/frontend", "index.ts")
  ],
  // Add .ts/.tsx to the resolve.extensions array.
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      tv: path.resolve(__dirname, "../src")
    }
  },
  devtool: "source-map",
  // Add the loader for .ts files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["env"]
            }
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              configFileName: path.resolve(__dirname, "../tsconfig.json")
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      APP_URL: JSON.stringify("http://localhost:3000")
    }),
    ...(isProd ? [new webpack.HotModuleReplacementPlugin()] : []),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  target: "web",
  output: {
    filename: "bundle-frontend.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: frontendConfigOutputPublicPath
  },
  watchOptions: {
    ignored: /node_modules/
  }
};

export default frontendConfig;
