const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demoController');

// Define routes for demo API
router.get('/demo', demoController.getDemoData);

// Export the router
module.exports = router;