const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// 提取公共代码
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  entry: "./src/main.tsx",
  mode: "production",

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Test Build-俄罗斯方块",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CssMinimizerPlugin(),
    // 依赖分析图
    // new BundleAnalyzerPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    // new CommonsChunkPlugin({
    //   // 从哪些 Chunk 中提取
    //   chunks: ['a', 'b'],
    //   // 提取出的公共部分形成一个新的 Chunk，这个新 Chunk 的名称
    //   name: 'common'
    // })
  ],

  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    clean: true,
  },

  resolve: {
    // 指明第三方模块绝对路径，以减少寻找
    modules: [path.resolve(__dirname, "node_modules")],
    extensions: [".tsx", ".ts", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
      //   type: "asset/resource",
      // },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        // loader: 'url-loader?name=images/[name].[ext]',
        loader: "url-loader",
        options: {
          limit: 10,
          name: "imgs/[name].[ext]",
        },
      },
      {
        test: /\.(mp3)$/,
        loader: "url-loader",
        options: {
          name: "audios/[name].[ext]",
          limit: 10,
        },
      },
    ],
  },

  // 优化
  optimization: {
    // production 环境默认开启，其他环境默认关闭
    concatenateModules: true,
    // 是否对未使用的导出进行内部分析
    innerGraph: false,
    minimize: true,
    minimizer: [new TerserPlugin({
      include: /\.(js|css)$/i,
      // 是否提取注释
      extractComments: false,
    })],
    // 是否生成具有相对路径的记录，以便能够移动上下文文件夹。
    portableRecords: true,
  },

};
