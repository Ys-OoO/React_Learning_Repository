const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanDistPlugin } = require('./plugins/CleanDistPlugin');
const { JSGlobalVariablePlugin } = require('./plugins/JSGlobalVariablePlugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
module.exports = {
  mode: "development",
  // entry: [__dirname + "/src/index1.js", __dirname + "/src/index2.js"],
  entry: {
    appOne: __dirname + "/src/index1.js",
    appTwo: __dirname + "/src/index2.js",
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name]-[chunkhash].js",
    clean: true
  },
  devServer: {
    static: './dist', //静态文件目录
    host: "localhost", //服务器域名
    port: "3001", // 端口
    open: true, //自动打开页面
    hot: true//开启热更新
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
          // 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true, //开启缓存目录
            cacheCompression: false, //关闭缓存压缩
          }
        }],
      },
      {
        test: /\.json$/,
        use: [{
          loader: "upperCaseLoader",
          options: {
            key: false
          }
        }]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(
      {
        title: 'webpack-test',
        scriptLoading: 'defer',
        template: 'src/index.html'
      }),
    new MiniCssExtractPlugin(),
    // new DefinePlugin({
    //   env: JSON.stringify('dev')
    // }),
    // new ESLintWebpackPlugin({
    //   context: __dirname + "/src", //需要检查的文件，src下的文件将被检查,
    //   cache: true,
    //   cacheLocation: path.resolve(__dirname, '../node_modules/.cache/eslint-cache')
    // }),
    // new CleanDistPlugin(),
    // new JSGlobalVariablePlugin({ env: "dev" })
  ],
  optimization: {
    // usedExports: true, // tree shaking
    splitChunks: {
      chunks: "all",
      minSize: 0,
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}.js`
    },
    minimizer: [
      new TerserPlugin({
        parallel: true //默认为true，表示开启os.cpus().length - 1 个并发进程，也可以指定number表示进程数
      })
    ]
  }
};