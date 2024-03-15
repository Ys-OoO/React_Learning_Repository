const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: 'development',
  entry: {
    index: __dirname + "/src/index.js",
    main: __dirname + "/src/main.js"
  },
  devServer: {
    static: './dist', //静态文件目录
    host: "localhost", //服务器域名
    port: "3001", // 端口
    open: true, //自动打开页面
    hot: true//开启热更新
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    clean: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'src/index.html'
  })],
  optimization: {
    splitChunks: {
      chunks: 'all'
      // chunks: 'async',
      // minSize: 20,
      // maxAsyncSize: 30,
      // minChunks: 2
    }
  }
}