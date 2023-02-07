import winston from 'winston';
import { ENV } from '../../domain/common/utils/environment';

const level = ENV === 'production' ? 'info' : 'debug';

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'green',
});

const winstonLogger = winston.createLogger({
  level,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
  ],
});

export const logger = winstonLogger;
