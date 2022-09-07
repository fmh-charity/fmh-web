import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyPlugin from "copy-webpack-plugin";
import * as webpack from "webpack";

const config: any = (env: any, args: any) => ({
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  optimization: {
    minimize: args?.mode === "production",
    moduleIds: "deterministic",
    runtimeChunk: {
      name: (entrypoint: any) => `runtimeChunk~${entrypoint.name}`,
    },
  },
  plugins: [
    new CleanWebpackPlugin({ dry: true }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env.API_PORT": 8080,
      "process.env.API_HOST": JSON.stringify("http://host.docker.internal:5000"),
      "process.env.API_SEED": webpack.DefinePlugin.runtimeValue(
        () => JSON.stringify(Math.random()),
        {
          // fileDependencies: [fileDep]
        }
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./src/template.html"),
      favicon: "./src/favicon.ico",
      filename: "index.html",
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets",
          to: "./assets",
          force: true,
          // noErrorOnMissing: true
        },
      ],
    }),
  ],
  devServer: {
    hot: true,
    // liveReload: false,
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "public"),
      },
    ],
    compress: true,
    port: 3001,
    historyApiFallback: true,
  },
  devtool: args?.mode === "production" ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          args?.mode === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-module-typescript-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          args?.mode === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.module\.less$/,
        use: [
          args?.mode === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          {
            loader: "css-modules-typescript-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          {
            loader: "less-loader",
            options: { lessOptions: { javascriptEnabled: true } },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        type: "asset/resource",
        generator: {
          filename: "images/[hash][ext][query]",
        },
      },
      {
        test: /\.(woff2|woff|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[hash][ext][query]",
        },
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.join(__dirname, "src"),
    },
  },
});

export default config;
