const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, inquiryController.getAllInquiries);
router.post('/', inquiryController.createInquiry); // Public
router.put('/:id/status', verifyToken, inquiryController.updateInquiryStatus);
router.delete('/:id', verifyToken, inquiryController.deleteInquiry);

module.exports = router;
