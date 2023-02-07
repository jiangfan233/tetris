const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");

// const TerserPlugin = require("terser-webpack-plugin");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// PWA
const { GenerateSW } = require("workbox-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest')

// const BundleAnalyzerPlugin =require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// 提取公共代码
// const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

module.exports = {
  // bad
  // entry: ["./src/main.tsx", "./sw.js"],
  entry: {
    main: "./src/main.tsx",
  },
  mode: "production",

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Test Build-俄罗斯方块",
      // excludeChunks: ["sw", "main"],
      template: "./template.html",
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

    new GenerateSW(),

    new WebpackPwaManifest({
      publicPath: ".",
      name: 'Tetris by jiangfan233',
      short_name: 'Tetris',
      display: "browser",
      start_url: "./index.html",
      description: 'Tetris - Progressive Web App!',
      background_color: '#ffffff',
      crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('./src/static/icon.png'),
          sizes: [96, 192, 256,] // multiple sizes
        },
      ]
    })

    // 打包速度优化，打包前对比文件改动
    // new webpack.DllPlugin({
    //   path: path.join(__dirname, './dll/[name].manifest.json'), // 生成对应的manifest.json，给webpack打包用
    //   name: '[name]',
    // }),
  ],

  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].bundle.js",
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
        test: /\.(gif|png|jpe?g|svg)$/i,
        
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                enabled: false,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: true,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
                enabled: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
                enabled: false,
              }
            }
          },
        ],
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
    splitChunks: {
      chunks: "all",
    },
    sideEffects: true,
    // production 环境默认开启，其他环境默认关闭
    concatenateModules: true,
    // 是否对未使用的导出进行内部分析
    innerGraph: false,
    minimize: true,
    minimizer: [
      // new TerserPlugin({
      //   include: /\.(js|css)$/i,
      //   // 是否提取注释
      //   extractComments: false,
      //   minify: TerserPlugin.swcMinify,
      //   terserOptions: {
      //     compress: true,
      //     keepClassnames: false,
      //     keepFnames: false,
      //     mangle: true,
      //   },
      // }),
      new UglifyJsPlugin({
        // 启用/禁用文件缓存。
        cache: true,
        // 多进程
        parallel: true,
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
          mangle: true, // 注意 `mangle.properties` 的默认值是 `false`。
          output: {
            // 是否保留注释
            comments: false,
          },
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      }),
    ],
    // 是否生成具有相对路径的记录，以便能够移动上下文文件夹。
    portableRecords: true,
  },
};
