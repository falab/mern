'use strict';

const mongoose = require('mongoose');

module.exports = (config) => {
  mongoose.connect(config.db);

  const db = mongoose.connection;

  db.on('error', () => { console.error('connection error...'); });
  db.once('open', () => { console.log('DB connection opened.'); });
};
