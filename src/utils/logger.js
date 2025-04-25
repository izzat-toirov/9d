// logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // minimal log darajasi
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(), // terminalga chiqarish
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }), // faqat xatoliklar
    new winston.transports.File({ filename: 'logs/combined.log' }), // barcha loglar
  ],
});

export default logger;
