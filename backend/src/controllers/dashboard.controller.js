const Inquiry = require('../models/Inquiry');
const Admission = require('../models/Admission');
const Faculty = require('../models/Faculty');
const Gallery = require('../models/Gallery');
const Career = require('../models/Career');
const JobApplicant = require('../models/JobApplicant');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalInquiries = await Inquiry.count();
    const newInquiries = await Inquiry.count({ where: { status: 'New' } });
    
    const totalAdmissions = await Admission.count();
    const pendingAdmissions = await Admission.count({ where: { status: 'Submitted' } });

    const totalFaculty = await Faculty.count();
    const totalGalleryItems = await Gallery.count();

    const totalCareers = await Career.count();
    const totalApplicants = await JobApplicant.count();
    const newApplicants = await JobApplicant.count({ where: { status: 'Submitted' } });

    res.status(200).json({
      success: true,
      data: {
        totalInquiries,
        newInquiries,
        totalAdmissions,
        pendingAdmissions,
        totalFaculty,
        totalGalleryItems,
        totalCareers,
        totalApplicants,
        newApplicants
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server error while fetching stats' });
  }
};
