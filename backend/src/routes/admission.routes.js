const express = require('express');
const router = express.Router();
const admissionController = require('../controllers/admission.controller');

router.get('/', admissionController.getAllAdmissions);
router.post('/', admissionController.createAdmission);
router.put('/:id/status', admissionController.updateAdmissionStatus);
router.delete('/:id', admissionController.deleteAdmission);

module.exports = router;
