import winston from 'winston';
import expressWinston from 'express-winston';
import 'winston-daily-rotate-file';

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/requests-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '1m',
      maxFiles: 3,
      zippedArchive: true,
      format: winston.format.json(),
    }),
  ],
});

export const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.DailyRotateFile({
      filename: 'logs/errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      maxSize: '1m',
      maxFiles: 3,
      zippedArchive: true,
      format: winston.format.json(),
    }),
  ],
  format: winston.format.json(),
});
