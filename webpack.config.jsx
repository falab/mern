export default {
  entry: {
    app: [
      'webpack/hot/only-dev-server',
      'webpack-dev-server/client?http://localhost:8080',
      './app/application.jsx',
    ],
  },
  output: {
    publicPath: 'http://localhost:8080',
    filename: 'public/application.min.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: [
          'react-hot',
          'jsx',
          'babel',
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
