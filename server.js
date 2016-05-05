const express = require('express');

const env = process.env.NODE_ENV || 'development';
const config = require('./config')[env];

const app = express();

require('./config/express')(app, config);

require('./config/routes')(app, config);

module.exports = app;
