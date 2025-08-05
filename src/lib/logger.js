const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');
const config = require('config');

const logDir = path.join(__dirname, '../..', 'logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = createLogger({
  level: config.get('log.level'),
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ timestamp, level, message }) =>
      `${timestamp} [${level.toUpperCase()}] ${message}`
    )
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(logDir, 'app.log'), level: 'error' }),

  ]
});

module.exports = logger;
