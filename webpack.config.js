/* global __dirname, require, module */

const webpack = require('webpack');

const { UglifyJsPlugin } = webpack.optimize;
const path = require('path');
const { env } = require('yargs').argv; // use --env with webpack 2

const libraryName = 'regent';

const plugins = [];
let outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = `${libraryName}.min.js`;
} else {
  outputFile = `${libraryName}.js`;
}

const config = {
  entry: `${__dirname}/src/index.js`,
  devtool: 'source-map',
  output: {
    path: `${__dirname}/lib`,
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins,
  externals: {
    'lodash.assign': 'lodash.assign',
    'lodash.every': 'lodash.every',
    'lodash.get': 'lodash.get',
    'lodash.includes': 'lodash.includes',
    'lodash.isequal': 'lodash.isequal',
    'lodash.isobject': 'lodash.isobject',
    'lodash.isstring': 'lodash.isstring',
    'lodash.set': 'lodash.set',
    'lodash.some': 'lodash.some',
  },
};

module.exports = config;
