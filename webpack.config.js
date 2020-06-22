const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/App.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-env'] }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: { extensions: ['\*', '.js', '.jsx'] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    libraryTarget: 'commonjs2',
    filename: "bundle.js"
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};