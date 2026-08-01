const Notice = require('../models/Notice');
const { Op } = require('sequelize');
const fs = require('fs');
const path = require('path');

const generateSlug = (title) => {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
};

const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

// Helper to auto-deactivate expired notices
const autoDeactivateNotices = async () => {
  try {
    await Notice.update(
      { status: 'Inactive' },
      { 
        where: { 
          status: 'Active', 
          expiryDate: { [Op.lt]: new Date() } 
        } 
      }
    );
  } catch (error) {
    console.error('Failed to auto-deactivate notices:', error);
  }
};

// --- ADMIN APIs ---

exports.getAllNotices = async (req, res) => {
  try {
    await autoDeactivateNotices();
    const { page = 1, limit = 10, search, category, status, priority, featured, showPopup, sortBy = 'createdAt', sortDesc = 'true' } = req.query;
    
    const offset = (page - 1) * limit;
    const where = {};
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (category) where.category = category;
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (featured) where.featured = featured === 'true';
    if (showPopup) where.showPopup = showPopup === 'true';
    
    const orderDirection = sortDesc === 'true' ? 'DESC' : 'ASC';
    
    const notices = await Notice.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, orderDirection]]
    });
    
    res.status(200).json({
      success: true,
      data: notices.rows,
      total: notices.count,
      totalPages: Math.ceil(notices.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getNoticeById = async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.createNotice = async (req, res) => {
  try {
    const { title, shortDescription, description, category, priority, publishDate, expiryDate, showPopup, featured, status } = req.body;
    
    let slug = generateSlug(title);
    
    // Check if slug exists
    const existing = await Notice.findOne({ where: { slug } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }
    
    let imagePath = '';
    if (req.file) {
      imagePath = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
    }

    const sanitizedDescription = DOMPurify.sanitize(description);

    const notice = await Notice.create({
      title,
      slug,
      shortDescription,
      description: sanitizedDescription,
      category,
      imagePath,
      priority,
      publishDate,
      expiryDate: expiryDate || null,
      showPopup: showPopup === 'true' || showPopup === true,
      featured: featured === 'true' || featured === true,
      status
    });
    
    res.status(201).json({ success: true, data: notice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    
    const { title, shortDescription, description, category, priority, publishDate, expiryDate, showPopup, featured, status } = req.body;
    
    let imagePath = notice.imagePath;
    if (req.file) {
      imagePath = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
    }
    
    // update slug if title changes
    let slug = notice.slug;
    if (title && title !== notice.title) {
      slug = generateSlug(title);
      const existing = await Notice.findOne({ where: { slug, id: { [Op.ne]: notice.id } } });
      if (existing) slug = `${slug}-${Date.now()}`;
    }

    await notice.update({
      title,
      slug,
      shortDescription,
      description,
      category,
      imagePath,
      priority,
      publishDate,
      expiryDate: expiryDate || null,
      showPopup: showPopup === 'true' || showPopup === true,
      featured: featured === 'true' || featured === true,
      status
    });
    
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByPk(req.params.id);
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found' });
    
    await notice.destroy();
    res.status(200).json({ success: true, message: 'Notice deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.bulkAction = async (req, res) => {
  try {
    const { action, ids } = req.body;
    if (!ids || ids.length === 0) return res.status(400).json({ success: false, message: 'No IDs provided' });
    
    if (action === 'delete') {
      await Notice.destroy({ where: { id: { [Op.in]: ids } } });
    } else if (action === 'activate') {
      await Notice.update({ status: 'Active' }, { where: { id: { [Op.in]: ids } } });
    } else if (action === 'deactivate') {
      await Notice.update({ status: 'Inactive' }, { where: { id: { [Op.in]: ids } } });
    } else if (action === 'enablePopup') {
      await Notice.update({ showPopup: true }, { where: { id: { [Op.in]: ids } } });
    } else if (action === 'disablePopup') {
      await Notice.update({ showPopup: false }, { where: { id: { [Op.in]: ids } } });
    } else if (action === 'feature') {
      await Notice.update({ featured: true }, { where: { id: { [Op.in]: ids } } });
    } else if (action === 'removeFeatured') {
      await Notice.update({ featured: false }, { where: { id: { [Op.in]: ids } } });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid action' });
    }
    
    res.status(200).json({ success: true, message: 'Bulk action completed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// --- PUBLIC APIs ---

exports.getPublicNotices = async (req, res) => {
  try {
    await autoDeactivateNotices();
    const { page = 1, limit = 10, search, category, priority, featured, sortBy = 'publishDate', sortDesc = 'true' } = req.query;
    
    const offset = (page - 1) * limit;
    
    // Logic: status='Active', publishDate <= NOW, (expiryDate >= NOW OR expiryDate is null)
    const now = new Date();
    const where = {
      status: 'Active',
      publishDate: { [Op.lte]: now },
      [Op.or]: [
        { expiryDate: null },
        { expiryDate: { [Op.gte]: now } }
      ]
    };
    
    if (search) {
      where[Op.or] = [
        { title: { [Op.like]: `%${search}%` } },
        { description: { [Op.like]: `%${search}%` } },
        { shortDescription: { [Op.like]: `%${search}%` } }
      ];
    }
    
    if (category) where.category = category;
    if (priority) where.priority = priority;
    if (featured) where.featured = true;
    
    const orderDirection = sortDesc === 'true' ? 'DESC' : 'ASC';
    
    const notices = await Notice.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, orderDirection]]
    });
    
    res.status(200).json({
      success: true,
      data: notices.rows,
      total: notices.count,
      totalPages: Math.ceil(notices.count / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getNoticeBySlug = async (req, res) => {
  try {
    const now = new Date();
    const notice = await Notice.findOne({
      where: { 
        slug: req.params.slug,
        status: 'Active',
        publishDate: { [Op.lte]: now },
        [Op.or]: [
          { expiryDate: null },
          { expiryDate: { [Op.gte]: now } }
        ]
      }
    });
    if (!notice) return res.status(404).json({ success: false, message: 'Notice not found or inactive' });
    res.status(200).json({ success: true, data: notice });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

exports.getPopupNotice = async (req, res) => {
  try {
    await autoDeactivateNotices();
    const now = new Date();
    const notices = await Notice.findAll({
      where: {
        status: 'Active',
        showPopup: true,
        publishDate: { [Op.lte]: now },
        [Op.or]: [
          { expiryDate: null },
          { expiryDate: { [Op.gte]: now } }
        ]
      }
    });
    
    if (!notices || notices.length === 0) {
      return res.status(200).json({ success: true, data: null });
    }
    
    // Sort logic: Urgent > Important > Normal, then newest publishDate
    const priorityWeight = { 'Urgent': 3, 'Important': 2, 'Normal': 1 };
    
    notices.sort((a, b) => {
      const pA = priorityWeight[a.priority] || 1;
      const pB = priorityWeight[b.priority] || 1;
      if (pA !== pB) return pB - pA;
      // if same priority, newest first
      return new Date(b.publishDate) - new Date(a.publishDate);
    });
    
    res.status(200).json({ success: true, data: notices.slice(0, 5) });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
