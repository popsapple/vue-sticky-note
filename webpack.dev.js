const path = require("path");
// 번들을 제공하기 위해 HTML 파일 작성을 대신 해주는 플러그인.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
module.exports = (function() {
  this.option = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
      contentBase: __dirname + "/example/",
      inline: true,
      hot: true,
      host: "localhost",
      watchContentBase: true,
      publicPath: "/",
      port: 5500
    },
    // 기본 재료가 되는 파일의 위치 지정 - 어디서부터 탐색해갈지
    entry: "./example/index.js",
    // 각 확장자 별로 어떤 걸 이용할지 지정
    module: {
      rules: [
        {
          test: /\.(css|less|scss)$/,
          use: [
            {
              loader: "style-loader" // creates style nodes from JS strings
            },
            {
              loader: "css-hot-loader" // hot loading
            },
            {
              loader: "css-loader" // translates CSS into CommonJS
            },
            {
              loader: "sass-loader" // compiles Less to CSS
            }
          ]
        },
        {
          test: /\.vue$/, // 확장자지정
          loader: ["vue-loader"] // 로더선택
        }
      ]
    },
    output: {
      filename: "mains.js",
      path: path.resolve(__dirname, "example"),
      publicPath: path.resolve(__dirname, "example")
    },
    // 웹펙에서 사용하는 부가능을 달아준다.
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: "Hello",
        inject: "body",
        template: path.resolve(__dirname, "example/index.html")
      })
    ]
  };
  return this.option;
})();
