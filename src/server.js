const config = require('config');
const express = require('express');
const demoRoutes = require('./routes/demoRoutes');

const app = express();

app.use('/', demoRoutes);

// Start the server
app.listen(config.port, config.host, () => {
      console.log(`${config.appName} running on http://${config.host}:${config.port}`);
    });