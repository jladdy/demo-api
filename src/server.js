const config = require('config');
const express = require('express');
const app = express();



// Start the server
app.listen(config.port, config.host, () => {
      console.log(`${config.appName} running on http://${config.host}:${config.port}`);
    });