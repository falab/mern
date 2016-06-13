const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

module.exports = (app, config) => {
  // uncomment after placing your favicon in /static
  // app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
  app.use(config.logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  if (config.debug) {
    const webpack = require('webpack');
    const webpackMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');

    const cfg = require(path.join(config.rootPath, 'webpack.config.js'));

    const compiler = webpack(cfg);
    const middleware = webpackMiddleware(compiler, {
      publicPath: cfg.output.publicPath,
      contentBase: 'src',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
      },
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
  }

  app.use(express.static(path.join(config.rootPath, 'static')));
};
