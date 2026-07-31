const Faculty = require('../models/Faculty');

exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createFaculty = async (req, res) => {
  try {
    const newFaculty = await Faculty.create(req.body);
    res.status(201).json({ success: true, data: newFaculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    await faculty.update(req.body);
    res.status(200).json({ success: true, data: faculty });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.findByPk(req.params.id);
    if (!faculty) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }
    await faculty.destroy();
    res.status(200).json({ success: true, message: 'Faculty deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
