const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/faculty.controller');
const upload = require('../middleware/upload.middleware');

// @route   GET /api/faculty
// @desc    Get all faculty
router.get('/', facultyController.getAllFaculty);

// @route   POST /api/faculty
// @desc    Create new faculty
router.post('/', upload.single('image'), facultyController.createFaculty);

// @route   PUT /api/faculty/:id
// @desc    Update faculty
router.put('/:id', upload.single('image'), facultyController.updateFaculty);

// @route   DELETE /api/faculty/:id
// @desc    Delete faculty
router.delete('/:id', facultyController.deleteFaculty);

module.exports = router;
