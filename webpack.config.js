const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  context: `${__dirname}/app`,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3001',
    'webpack/hot/only-dev-server',
    './application.jsx',
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot-loader',
          'babel-loader?presets[]=react&presets[]=es2015&presets[]=stage-0&plugins=transform-class-properties',
        ],
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)/,
        loader: 'url-loader',
        query: {
          limit: 8192,
        },
      },
    ],
  },
  output: {
    path: `${__dirname}/public`,
    filename: 'application.min.js',
    publicPath: 'http://localhost:3000/',
  },
  plugins: debug ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
