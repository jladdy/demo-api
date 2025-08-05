const config = require('config');
const express = require('express');
const demoRoutes = require('./routes/demoRoutes');
const logger = require('./lib/logger');


const app = express();

// Add routes
app.use('/', demoRoutes);

// Start the server
app.listen(config.port, config.host, () => {
      console.log(`${config.appName} running on http://${config.host}:${config.port}`);
    });