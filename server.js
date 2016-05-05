const express = require('express');

const app = express();

module.exports = (config) => {
  require('./config/express')(app, config);
  require('./config/routes')(app, config);

  return app;
};
