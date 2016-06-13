import express from 'express';
import debugFactory from 'debug';
import http from 'http';

import configs from './config';
import expressConfig from './config/express';
import mongooseConfig from './config/mongoose';
import routesConfig from './config/routes';

const server = () => {
  const debug = debugFactory('api:server');
  const env = process.env.NODE_ENV || 'development';
  const config = configs[env];
  const app = express();

  expressConfig(app, config);
  mongooseConfig(config);
  routesConfig(app, config);

  app.set('port', config.port);

  const httpServer = http.createServer(app);

  httpServer.listen(config.port);

  httpServer.on('error', (error) => {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string'
      ? `Pipe ${config.port}`
      : `Port ${config.port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        config.logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        config.logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

  httpServer.on('listening', () => {
    const addr = httpServer.address();
    const bind = typeof addr === 'string'
      ? `pipe ${addr}`
      : `port ${addr.port}`;

    debug(`Listening on ${bind}`);
  });

  return httpServer;
};

export default server();
