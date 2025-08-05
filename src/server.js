const config = require('config');
const express = require('express');
const demoRoutes = require('./routes/demoRoutes');
const logger = require('./lib/logger');
const requestLogger = require('./lib/requestLogger');
const transactionIdLogger = require('./lib/transactionIdLogger');


const app = express();

// Add middleware
app.use(transactionIdLogger);
app.use(requestLogger);
app.use(express.json());

// Add routes
app.set('trust proxy', true);
app.use('/', demoRoutes);

app.use((req, res, next) => {
  const err = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  err.status = 404;
  next(err);
});

// Global error handler middleware
app.use((err, req, res, next) => {
  const transactionId = req.transactionId || 'unknown';
  logger.error(`[${transactionId}] ${req.ip} Error occurred: ${err.message}`);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});



// Start the server
app.listen(config.port, config.host, () => {
      console.log(`${config.appName} running on http://${config.host}:${config.port}`);
    });