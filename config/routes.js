const path = require('path');

module.exports = (app, config) => {
  const blogRoutes = require(path.join(config.rootPath, 'routes'));

  app.use('/api', blogRoutes);

  app.get('*', (req, res) => {
    res.render('index', { title: 'Thezanke.com' });
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (config.debug) {
    app.use((err, req, res) => {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
    });
  });
};
