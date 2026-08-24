const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/gallery.controller');
const upload = require('../middleware/upload.middleware');
const { verifyToken } = require('../middleware/auth.middleware');

// @route   GET /api/gallery
// @desc    Get all gallery items
router.get('/', galleryController.getAllGalleryItems); // Public

// @route   POST /api/gallery
// @desc    Create new gallery item (supports image upload)
router.post('/', verifyToken, upload.single('image'), galleryController.createGalleryItem);

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery item
router.delete('/:id', verifyToken, galleryController.deleteGalleryItem);

// @route   PUT /api/gallery/:id
// @desc    Update gallery item
router.put('/:id', verifyToken, upload.single('image'), galleryController.updateGalleryItem);

module.exports = router;
