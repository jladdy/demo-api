const logger = require('./logger');

const requestLogger = (req, res, next) => {
  let ip = req.ip ||
           (req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0].trim() : null) ||
           req.connection.remoteAddress;

  const transactionId = req.transactionId || 'unknown';

  logger.info(`[${transactionId}] ${ip} Request received: ${req.method} ${req.originalUrl}`);

  if (process.env.NODE_ENV !== 'production' && req.body && Object.keys(req.body).length > 0) {
    const sanitizedBody = { ...req.body };
    if (sanitizedBody.password) sanitizedBody.password = '[SANITIZED]';
    logger.debug(`[${transactionId}] Request body: ${JSON.stringify(sanitizedBody)}`);
  }

  res.on('finish', () => {
    logger.info(`[${transactionId}] ${ip} Request handled: ${req.method} ${req.originalUrl} => ${res.statusCode}`);
  });

  next();
};

module.exports = requestLogger;