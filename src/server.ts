import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorlogger, logger } from './shared/logger';

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('database successfully connected here');
    server = app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    errorlogger.error('database faild', err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is Recived..');
  if (server) {
    server.close();
  }
});
