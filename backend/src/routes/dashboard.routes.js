const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// @route   GET /api/dashboard/stats
// @desc    Get aggregated stats for dashboard
// @access  Private (Admin only)
router.get('/stats', verifyToken, dashboardController.getDashboardStats);

module.exports = router;
