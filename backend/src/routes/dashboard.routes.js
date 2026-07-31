const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
// We will eventually want an auth middleware here
// const { verifyToken } = require('../middleware/auth.middleware');

// @route   GET /api/dashboard/stats
// @desc    Get aggregated stats for dashboard
// @access  Private (Admin only)
router.get('/stats', dashboardController.getDashboardStats); // add verifyToken later

module.exports = router;
