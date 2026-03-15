const express = require('express');
const { getAnalytics } = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/analytics', authenticateToken, authorizeAdmin, getAnalytics);

module.exports = router;