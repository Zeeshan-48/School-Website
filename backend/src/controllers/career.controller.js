const Career = require('../models/Career');
const JobApplicant = require('../models/JobApplicant');

// --- CAREERS ---

exports.getAllCareers = async (req, res) => {
  try {
    const careers = await Career.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json({ success: true, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createCareer = async (req, res) => {
  try {
    const newCareer = await Career.create(req.body);
    res.status(201).json({ success: true, data: newCareer });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateCareer = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ success: false, message: 'Job not found' });
    
    await career.update(req.body);
    res.status(200).json({ success: true, data: career });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByPk(req.params.id);
    if (!career) return res.status(404).json({ success: false, message: 'Job not found' });
    
    await career.destroy();
    res.status(200).json({ success: true, message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- APPLICANTS ---

exports.getAllApplicants = async (req, res) => {
  try {
    const applicants = await JobApplicant.findAll({
      include: [{ model: Career, as: 'job', attributes: ['title'] }],
      order: [['createdAt', 'DESC']]
    });
    res.status(200).json({ success: true, data: applicants });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createApplicant = async (req, res) => {
  try {
    const { fullName, email, phone, experience, coverLetter, jobId } = req.body;
    let resumePath = '';
    
    if (req.file) {
      resumePath = req.file.path; // Cloudinary URL
    } else if (req.body.resumePath) {
      resumePath = req.body.resumePath;
    }

    const newApplicant = await JobApplicant.create({
      fullName, email, phone, experience, coverLetter, jobId, resumePath
    });
    
    res.status(201).json({ success: true, data: newApplicant });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateApplicantStatus = async (req, res) => {
  try {
    const applicant = await JobApplicant.findByPk(req.params.id);
    if (!applicant) return res.status(404).json({ success: false, message: 'Applicant not found' });
    
    await applicant.update({ status: req.body.status });
    res.status(200).json({ success: true, data: applicant });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deleteApplicant = async (req, res) => {
  try {
    const applicant = await JobApplicant.findByPk(req.params.id);
    if (!applicant) return res.status(404).json({ success: false, message: 'Applicant not found' });
    
    await applicant.destroy();
    res.status(200).json({ success: true, message: 'Applicant deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
