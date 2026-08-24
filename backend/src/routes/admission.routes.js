const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admission.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.get('/', verifyToken, admissionController.getAllAdmissions);
router.post('/', admissionController.createAdmission); // Public
router.put('/:id/status', verifyToken, admissionController.updateAdmissionStatus);
router.delete('/:id', verifyToken, admissionController.deleteAdmission);

module.exports = router;
