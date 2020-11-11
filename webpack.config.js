const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack')
const config = {
  mode:'production',
  entry: path.join(__dirname, 'src/', 'index.js'),
  output: {
    // path.join() 拼接路径用
    // __dirname 当前文件的绝对路径
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        // sass-loader node-sass两个依赖都需要安装
        test: /\.(scss|sass)$/,
        // use: ['style-loader','css-loader', 'sass-loader']
        use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
        // use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: ['file-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader', // https://www.webpackjs.com/loaders/url-loader/ https://github.com/tcoopman/image-webpack-loader
          options: {
            outputPath: 'images',
            name: '[name]_[hash:6].[ext]',
            limit: 1024 * 5,
            encoding: true
          }
        }]
      },
      {
        // https://www.webpackjs.com/guides/asset-management/#%E5%8A%A0%E8%BD%BD%E6%95%B0%E6%8D%AE
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ] // 或者 'url-loader' 在的时候就不需要 file-loader
      },
      // {
      //   test: /\.html$/,
      //   // use: ['file-loader?name=[name]_main.[ext]',"extract-loader",{
      //   use: ['file-loader?name=main.[ext]',"extract-loader",{
      //     loader: 'html-loader',
      //     options: {
      //       attributes: {
      //         list: [
      //           {
      //             tag: 'img',
      //             attribute: 'src',
      //             type: 'src'
      //           },
      //           {
      //             tag: 'link',
      //             attribute: 'href',
      //             type: 'src'
      //           }
      //         ]
      //       }
      //     }
      //   }]
      // }

      {
        test: /\.html$/,
        // use: ['file-loader?name=[name]_main.[ext]',"extract-loader",{
        use: [{
          loader: 'html-loader',
          options: {
            attributes: {
              list: [
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src'
                }
                // {
                //   tag: 'link', link 在要配置 'file-loader?name=main.[ext]',"extract-loader", 不然会报错。。。
                //   attribute: 'href',
                //   type: 'src'
                // }
              ]
            }
          }
        }]
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin()
  ]
}

module.exports = config