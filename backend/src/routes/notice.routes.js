const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');
const upload = require('../middleware/upload.middleware');

// --- PUBLIC ROUTES ---
router.get('/public', noticeController.getPublicNotices);
router.get('/popup', noticeController.getPopupNotice);
router.get('/slug/:slug', noticeController.getNoticeBySlug);

// --- ADMIN ROUTES ---
router.get('/', noticeController.getAllNotices);
router.get('/:id', noticeController.getNoticeById);
router.post('/', upload.single('image'), noticeController.createNotice);
router.put('/:id', upload.single('image'), noticeController.updateNotice);
router.delete('/:id', noticeController.deleteNotice);
router.post('/bulk-action', noticeController.bulkAction);

module.exports = router;
