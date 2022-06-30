const path = require("path");
const fs = require('fs')
const webpack = require("webpack");
const defaultSettings = require('../settings.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotenv = require('dotenv')
const Dotenv = require('dotenv-webpack');

const name = defaultSettings.title || 'Base管理系统' // 标题
const CURRENT_ENV = process.env.CURRENT_ENV || 'prod'

//自动生成env文件路径，用.env.XXX中的XXX去匹配文件
const envConfigPath = {};
const fileDirectory = path.resolve(__dirname, '../')
if (fs.existsSync(fileDirectory)) {
  const files = fs.readdirSync(fileDirectory)
  const env = []
  files.forEach((item) => {
    if ((/\.env/.test(item))) {
      env.push(item)
    }
  })
  env.forEach((item) => {
    const envName = item.split(".")
    envConfigPath[envName[2]] = path.resolve(__dirname, `../${item}`)
  })
}
else {
  console.log(fileDirectory + "  Not Found!");
}

//写在.env文件内的变量并没有被打包前的webpack读取到，在webpack内使用需要手动加入环境变量
const envConfig = dotenv.parse(fs.readFileSync(envConfigPath[CURRENT_ENV]))
for (const k in envConfig) {
  process.env[k] = envConfig[k]
}


module.exports = {
  entry: "./src/index.js",
  // mode: "development" | "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          "thread-loader",// 多线程编译
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ],
      },
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', {

          loader: 'css-loader',
          options: {
            importLoaders: 1,
            modules: true
            // 0 => no loaders (default);
            // 1 => less-loader;
            // 2 => less-loader, some-loader
          }
        }, 'less-loader']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/'
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
            esModule: false
          }
        }
      },
    ]
  },
  resolve: { extensions: ['\*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, "../dist/"),
    publicPath: "./", //配置相对路径,如果使用服务器打开需要使用/，表示在引入静态资源时，从根路径开始引入，如果使用本地打开需要使用绝对路径./
    filename: "bundle.[hash].js" //文件名为bundle+hash值，方便配置全站加速
  },
  plugins: [new Dotenv({
    path: envConfigPath[CURRENT_ENV],
  }),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: name,
    favicon: path.resolve(__dirname, "../public/favicon.ico"),
    template: path.resolve(__dirname, "../public/index.html"),
  }),
  ]
};