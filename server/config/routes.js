import blogRoutes from '../routes';

export default function routesConfig(app, config) {
  app.use('/api', blogRoutes);

  app.get('*', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
            <meta charset="UTF-8">
            <meta name="HandheldFriendly" content="True">
            <meta name="MobileOptimized" content="320">
            <meta name="viewport" content="width=device-width">
            <title>NoMoRe</title>
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,300,300italic,400italic,500,500italic,700" rel="stylesheet" type="text/css">
        </head>
        <body>
            <div id="app"></div>
            <script src="/application.min.js"></script>
        </body>
      </html>
    `);
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
}
