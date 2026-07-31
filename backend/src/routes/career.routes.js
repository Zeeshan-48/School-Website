const express = require('express');
const router = express.Router();
const careerController = require('../controllers/career.controller');
const upload = require('../middleware/upload.middleware');

// --- CAREERS ---
router.get('/jobs', careerController.getAllCareers);
router.post('/jobs', careerController.createCareer);
router.put('/jobs/:id', careerController.updateCareer);
router.delete('/jobs/:id', careerController.deleteCareer);

// --- APPLICANTS ---
router.get('/applicants', careerController.getAllApplicants);
router.post('/applicants', upload.single('resume'), careerController.createApplicant);
router.put('/applicants/:id/status', careerController.updateApplicantStatus);
router.delete('/applicants/:id', careerController.deleteApplicant);

module.exports = router;
