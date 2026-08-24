const Admission = require('../models/Admission');

exports.getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createAdmission = async (req, res) => {
  try {
    const { studentName, gender, dob, grade, parentName, email, phone, address, transportRequired } = req.body;
    const admissionData = { studentName, gender, grade, parentName, email, phone, address, transportRequired };
    
    if (dob && dob !== '') {
      admissionData.dob = dob;
    } else {
      admissionData.dob = null;
    }
    
    const newAdmission = await Admission.create(admissionData);
    res.status(201).json({ success: true, data: newAdmission });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateAdmissionStatus = async (req, res) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });
    
    await admission.update({ status: req.body.status });
    res.status(200).json({ success: true, data: admission });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findByPk(req.params.id);
    if (!admission) return res.status(404).json({ success: false, message: 'Application not found' });
    
    await admission.destroy();
    res.status(200).json({ success: true, message: 'Application deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
