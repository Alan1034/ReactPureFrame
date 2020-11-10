const path = require("path");
const webpack = require("webpack");

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
        },'less-loader']
      }
    ]
  },
  resolve: { extensions: ['\*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    publicPath: "/dist/",
    filename: "bundle.js"
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};