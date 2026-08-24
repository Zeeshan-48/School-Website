const express = require('express');
const router = express.Router();
const noticeController = require('../controllers/notice.controller');
const upload = require('../middleware/upload.middleware');
const { verifyToken } = require('../middleware/auth.middleware');

// --- PUBLIC ROUTES ---
router.get('/public', noticeController.getPublicNotices);
router.get('/popup', noticeController.getPopupNotice);
router.get('/slug/:slug', noticeController.getNoticeBySlug);

// --- ADMIN ROUTES ---
router.get('/', verifyToken, noticeController.getAllNotices);
router.get('/:id', verifyToken, noticeController.getNoticeById);
router.post('/', verifyToken, upload.single('image'), noticeController.createNotice);
router.put('/:id', verifyToken, upload.single('image'), noticeController.updateNotice);
router.delete('/:id', verifyToken, noticeController.deleteNotice);
router.post('/bulk-action', verifyToken, noticeController.bulkAction);

module.exports = router;
