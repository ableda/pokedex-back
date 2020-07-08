import morgan from 'morgan';
import { Logger } from 'winston';
import logger from '../logger';

export const httpLogger = morgan(
  ':remote-addr - [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":user-agent" - :response-time ms',
  {
    stream: {
      write: (message: string): Logger => logger.info(`${message.replace(/\n$/, '')}`),
    },
  },
);
