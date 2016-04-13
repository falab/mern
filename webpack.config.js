const webpack = require('webpack');
const debug = process.env.NODE_ENV !== 'production';

module.exports = {
  context: `${__dirname}/app`,
  devtool: debug ? 'inline-sourcemap' : null,
  entry: [
    // 'webpack-dev-server/client?http://0.0.0.0:3001',
    // 'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    './application.jsx',
  ],
  output: {
    path: `${__dirname}/public`,
    filename: 'application.min.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0', 'react-hmre'],
          plugins: ['transform-class-properties'],
        }
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
  plugins: debug ? [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
