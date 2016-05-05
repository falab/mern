const path = require('path');
const rootPath = path.normalize(`${__dirname}/../`);

module.exports = {
  development: {
    rootPath,
    db: 'mongodb://localhost/thezanke',
    port: process.env.PORT || 3000,
    debug: true,
    logger: require('morgan'),
  },
};
