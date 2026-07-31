const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const upload = require('../middleware/upload.middleware');

// @route   GET /api/gallery
// @desc    Get all gallery items
router.get('/', galleryController.getAllGalleryItems);

// @route   POST /api/gallery
// @desc    Create new gallery item (supports image upload)
router.post('/', upload.single('image'), galleryController.createGalleryItem);

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
router.delete('/:id', galleryController.deleteGalleryItem);

module.exports = router;
