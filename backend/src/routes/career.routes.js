const express = require('express');
const router = express.Router();
const careerController = require('../controllers/career.controller');
const upload = require('../middleware/upload.middleware');
const { verifyToken } = require('../middleware/auth.middleware');

// --- CAREERS ---
router.get('/jobs', careerController.getAllCareers); // Public
router.post('/jobs', verifyToken, careerController.createCareer);
router.put('/jobs/:id', verifyToken, careerController.updateCareer);
router.delete('/jobs/:id', verifyToken, careerController.deleteCareer);

// --- APPLICANTS ---
router.get('/applicants', verifyToken, careerController.getAllApplicants);
router.post('/applicants', upload.single('resume'), careerController.createApplicant); // Public
router.put('/applicants/:id/status', verifyToken, careerController.updateApplicantStatus);
router.delete('/applicants/:id', verifyToken, careerController.deleteApplicant);

module.exports = router;
