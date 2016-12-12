const path =  require('path');
const webpack = require('webpack');

const env = process.env.WEBPACK_ENV;
const BUILD = 'build';

module.exports = {
  devtool: 'eval-source-map',
  entry: './examples/index.jsx',
  output: {
    path: __dirname,
    filename: './index.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
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
