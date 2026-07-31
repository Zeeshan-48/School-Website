const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiry.controller');

router.get('/', inquiryController.getAllInquiries);
router.post('/', inquiryController.createInquiry);
router.put('/:id/status', inquiryController.updateInquiryStatus);
router.delete('/:id', inquiryController.deleteInquiry);

module.exports = router;
