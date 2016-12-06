const path =  require('path');
const webpack = require('webpack');

const env = process.env.WEBPACK_ENV;
const BUILD = 'build';

const plugins = [];
console.log(env);
if (env === BUILD) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({ minimize: true }));
}

module.exports = {
  devtool: 'eval-source-map',
  entry: './src/index.jsx',
  output: {
    path: __dirname,
    filename: './index.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: plugins.concat([

    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ]),
  module: {
    preLoaders: [{
      test: /\.jsx?$/,
      loaders: ['eslint'],
      exclude: '/node_modules/',
    }],
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  },
};
