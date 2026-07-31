import React, { createContext, useContext, useState, useEffect } from 'react';
import { FACULTY_MEMBERS } from '../data/faculty';
import { CAREER_OPENINGS } from '../data/careers';
import { GALLERY_ITEMS } from '../data/gallery';
import { FEE_STRUCTURE } from '../data/admissions';

const DEFAULT_BUS_FEE = 25000;

const AppContext = createContext();

// Sample seed data for Inquiries, Admissions & Job Applicants
const SEED_INQUIRIES = [
  {
    id: 'inq-1',
    fullName: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    phone: '+91 98765 43210',
    subject: 'Admissions Inquiry',
    message: 'Looking for Grade 11 Science wing admission criteria and fee details for 2026-27 session.',
    status: 'New',
    createdAt: '2026-07-30T10:30:00.000Z'
  },
  {
    id: 'inq-2',
    fullName: 'Rajesh Malhotra',
    email: 'rajesh.m@example.com',
    phone: '+91 98111 22334',
    subject: 'Bus Transport',
    message: 'Inquiring about school bus route availability for Sector 62 Noida.',
    status: 'Responded',
    createdAt: '2026-07-28T14:15:00.000Z'
  },
  {
    id: 'inq-3',
    fullName: 'Priya Verma',
    email: 'priya.v@gmail.com',
    phone: '+91 97123 88990',
    subject: 'Academic Curriculum',
    message: 'Interested in knowing more about the STEM and robotics tinkering lab programs.',
    status: 'New',
    createdAt: '2026-07-31T08:45:00.000Z'
  }
];

const SEED_ADMISSIONS = [
  {
    id: 'adm-101',
    studentName: 'Aarav Mehta',
    gender: 'Boy',
    dob: '2018-05-12',
    grade: 'Grade 3',
    parentName: 'Siddharth Mehta',
    email: 'siddharth@example.com',
    phone: '+91 99887 76655',
    address: 'A-402 Green Park, Sector 50',
    transportRequired: 'Yes',
    status: 'Submitted',
    submittedAt: '2026-07-29T11:20:00.000Z'
  },
  {
    id: 'adm-102',
    studentName: 'Riya Kapoor',
    gender: 'Girl',
    dob: '2015-11-20',
    grade: 'Grade 6',
    parentName: 'Vikram Kapoor',
    email: 'vikram.k@example.com',
    phone: '+91 98223 34455',
    address: 'Flat 102 Royal Palm, Greater Noida',
    transportRequired: 'Yes',
    status: 'Under Review',
    submittedAt: '2026-07-27T16:00:00.000Z'
  },
  {
    id: 'adm-103',
    studentName: 'Kabir Singh',
    gender: 'Boy',
    dob: '2011-03-15',
    grade: 'Grade 10',
    parentName: 'Harpreet Singh',
    email: 'hsingh@example.com',
    phone: '+91 98100 11223',
    address: 'House 55 Model Town',
    transportRequired: 'No',
    status: 'Approved',
    submittedAt: '2026-07-25T09:10:00.000Z'
  }
];

const SEED_JOB_APPLICANTS = [
  {
    id: 'app-501',
    fullName: 'Dr. Vivek Saxena',
    email: 'vivek.saxena@example.com',
    phone: '+91 98712 34567',
    experience: '5+ Years',
    jobTitle: 'PGT Mathematics Teacher',
    jobId: 'job-1',
    coverLetter: 'I have 6 years of experience guiding Class XI & XII students for CBSE board exams and JEE Advanced Coaching.',
    resumeFileName: 'Dr_Vivek_Saxena_Resume.pdf',
    status: 'Submitted',
    appliedAt: '2026-07-29T14:30:00.000Z'
  },
  {
    id: 'app-502',
    fullName: 'Meenakshi Sundaram',
    email: 'meenakshi.s@gmail.com',
    phone: '+91 97112 88990',
    experience: '3-5 Years',
    jobTitle: 'Primary English & Social Studies Educator',
    jobId: 'job-3',
    coverLetter: 'Passionate primary educator with M.A. in English and CELTA certification.',
    resumeFileName: 'Meenakshi_CV_2026.docx',
    status: 'Shortlisted',
    appliedAt: '2026-07-27T09:15:00.000Z'
  }
];

// Helper to get stored state or default
const getStorageItem = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
  }
  return defaultValue;
};

export const AppProvider = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  // Admin Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    const token = localStorage.getItem('adminToken');
    return !!token;
  });

  // Dynamic Data Stores
  const [inquiries, setInquiries] = useState(() => 
    getStorageItem('school_inquiries', SEED_INQUIRIES)
  );

  const [admissions, setAdmissions] = useState(() => 
    getStorageItem('school_admissions', SEED_ADMISSIONS)
  );

  const [jobApplicants, setJobApplicants] = useState(() =>
    getStorageItem('school_job_applicants', SEED_JOB_APPLICANTS)
  );

  const [faculty, setFaculty] = useState(() => 
    getStorageItem('school_faculty', FACULTY_MEMBERS)
  );

  const [careers, setCareers] = useState(() => 
    getStorageItem('school_careers', CAREER_OPENINGS)
  );

  const [galleryItems, setGalleryItems] = useState(() => 
    getStorageItem('school_gallery', GALLERY_ITEMS)
  );

  const [feeStructure, setFeeStructure] = useState(() => 
    getStorageItem('school_fee_structure', FEE_STRUCTURE)
  );

  const [busFee, setBusFee] = useState(() => 
    getStorageItem('school_bus_fee', DEFAULT_BUS_FEE)
  );

  // Auth State is handled explicitly in login/logout now, no effect needed for school_admin_auth

  useEffect(() => {
    localStorage.setItem('school_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem('school_admissions', JSON.stringify(admissions));
  }, [admissions]);

  useEffect(() => {
    localStorage.setItem('school_job_applicants', JSON.stringify(jobApplicants));
  }, [jobApplicants]);

  useEffect(() => {
    localStorage.setItem('school_faculty', JSON.stringify(faculty));
  }, [faculty]);

  useEffect(() => {
    localStorage.setItem('school_careers', JSON.stringify(careers));
  }, [careers]);

  useEffect(() => {
    localStorage.setItem('school_gallery', JSON.stringify(galleryItems));
  }, [galleryItems]);

  useEffect(() => {
    localStorage.setItem('school_fee_structure', JSON.stringify(feeStructure));
  }, [feeStructure]);

  useEffect(() => {
    localStorage.setItem('school_bus_fee', JSON.stringify(busFee));
  }, [busFee]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Auth methods
  const adminLogin = (token) => {
    localStorage.setItem('adminToken', token);
    setIsAdminAuthenticated(true);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
  };

  // Inquiry Handlers
  const addInquiry = (inquiryData) => {
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...inquiryData,
      status: 'New',
      createdAt: new Date().toISOString()
    };
    setInquiries(prev => [newInquiry, ...prev]);
    return newInquiry;
  };

  const updateInquiryStatus = (id, newStatus) => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
  };

  const deleteInquiry = (id) => {
    setInquiries(prev => prev.filter(inq => inq.id !== id));
  };

  // Admission Handlers
  const addAdmission = (applicationData) => {
    const newApp = {
      id: `adm-${Math.floor(1000 + Math.random() * 9000)}`,
      ...applicationData,
      status: 'Submitted',
      submittedAt: new Date().toISOString()
    };
    setAdmissions(prev => [newApp, ...prev]);
    return newApp;
  };

  const updateAdmissionStatus = (id, newStatus) => {
    setAdmissions(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const deleteAdmission = (id) => {
    setAdmissions(prev => prev.filter(app => app.id !== id));
  };

  // Job Applicants Handlers
  const addJobApplicant = (applicantData) => {
    const newApplicant = {
      id: `app-${Math.floor(500 + Math.random() * 9500)}`,
      ...applicantData,
      status: 'Submitted',
      appliedAt: new Date().toISOString()
    };
    setJobApplicants(prev => [newApplicant, ...prev]);
    return newApplicant;
  };

  const updateJobApplicantStatus = (id, newStatus) => {
    setJobApplicants(prev => prev.map(app => app.id === id ? { ...app, status: newStatus } : app));
  };

  const deleteJobApplicant = (id) => {
    setJobApplicants(prev => prev.filter(app => app.id !== id));
  };

  // Faculty Handlers (CRUD)
  const addFaculty = (member) => {
    const newMember = {
      id: `fac-${Date.now()}`,
      ...member
    };
    setFaculty(prev => [newMember, ...prev]);
  };

  const updateFaculty = (id, updatedMember) => {
    setFaculty(prev => prev.map(m => m.id === id ? { ...m, ...updatedMember } : m));
  };

  const deleteFaculty = (id) => {
    setFaculty(prev => prev.filter(m => m.id !== id));
  };

  // Careers Handlers (CRUD)
  const addCareer = (job) => {
    const newJob = {
      id: `job-${Date.now()}`,
      ...job
    };
    setCareers(prev => [newJob, ...prev]);
  };

  const updateCareer = (id, updatedJob) => {
    setCareers(prev => prev.map(j => j.id === id ? { ...j, ...updatedJob } : j));
  };

  const deleteCareer = (id) => {
    setCareers(prev => prev.filter(j => j.id !== id));
  };

  // Gallery Handlers (CRUD)
  const addGalleryItem = (item) => {
    const newItem = {
      id: Date.now(),
      ...item
    };
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const updateGalleryItem = (id, updatedItem) => {
    setGalleryItems(prev => prev.map(g => g.id === id ? { ...g, ...updatedItem } : g));
  };

  const deleteGalleryItem = (id) => {
    setGalleryItems(prev => prev.filter(g => g.id !== id));
  };

  // Fee Handlers
  const updateFeeStructure = (gradeIndex, updatedFeeData) => {
    setFeeStructure(prev => prev.map((item, idx) => idx === gradeIndex ? { ...item, ...updatedFeeData } : item));
  };

  const updateBusFee = (newFee) => {
    setBusFee(newFee);
  };

  return (
    <AppContext.Provider value={{
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      activeModal,
      setActiveModal,

      // Admin Auth
      isAdminAuthenticated,
      adminLogin,
      adminLogout,

      // Data & Handlers
      inquiries,
      addInquiry,
      updateInquiryStatus,
      deleteInquiry,

      admissions,
      addAdmission,
      updateAdmissionStatus,
      deleteAdmission,

      jobApplicants,
      addJobApplicant,
      updateJobApplicantStatus,
      deleteJobApplicant,

      faculty,
      addFaculty,
      updateFaculty,
      deleteFaculty,

      careers,
      addCareer,
      updateCareer,
      deleteCareer,

      galleryItems,
      addGalleryItem,
      updateGalleryItem,
      deleteGalleryItem,

      feeStructure,
      updateFeeStructure,
      busFee,
      updateBusFee
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
