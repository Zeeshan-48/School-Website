const Inquiry = require('../models/Inquiry');

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createInquiry = async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: newInquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateInquiryStatus = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    
    await inquiry.update({ status: req.body.status });
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findByPk(req.params.id);
    if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' });
    
    await inquiry.destroy();
    res.status(200).json({ success: true, message: 'Inquiry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
