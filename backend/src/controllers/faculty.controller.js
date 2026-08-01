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
    const data = { ...req.body };
    if (typeof data.subjects === 'string') {
      try { data.subjects = JSON.parse(data.subjects); } catch(e) {}
    }
    if (req.file) {
      data.image = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
    }
    const newFaculty = await Faculty.create(data);
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
    const data = { ...req.body };
    if (typeof data.subjects === 'string') {
      try { data.subjects = JSON.parse(data.subjects); } catch(e) {}
    }
    if (req.file) {
      data.image = req.protocol + '://' + req.get('host') + '/uploads/' + req.file.filename;
    }
    await faculty.update(data);
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
