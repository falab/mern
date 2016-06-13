const path = require('path');
const rootPath = path.normalize(`${__dirname}/../../`);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

module.exports = {
  development: {
    rootPath,
    db: 'mongodb://localhost/thezanke',
    port: normalizePort(process.env.PORT || 3000),
    debug: true,
    logger: require('morgan'),
  },
};
