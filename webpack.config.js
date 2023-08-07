const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    publicPath: "/",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 5500,
    open: {
      app: {
        name: "google chrome",
      },
    },
  },
  module: {
    rules: [
      // 이미지 로더
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "assets/images/[name].[hash:8].[ext]",
            },
          },
        ],
      },
      // SVG 로더
      {
        test: /\.svg$/i,
        use: ["@svgr/webpack"],
      },
      // 웹폰트 로더
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "src/fonts/[name].[hash:8].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
      // SASS 로더
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "src/index.html",
    }),
  ],
};
