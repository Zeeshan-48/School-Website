import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getCareers, createApplicant } from '../services/careerService';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { IMAGES } from '../utils/images';
import { WORKPLACE_BENEFITS } from '../data/careers';
import aboutBannerImg from '../assets/about_img.png';

import { 
 Briefcase, 
 MapPin, 
 Clock, 
 GraduationCap, 
 ShieldCheck, 
 Award, 
 Heart, 
 ArrowRight, 
 X, 
 CheckCircle2,
 FileText,
 Upload,
 AlertCircle
} from 'lucide-react';

const ICON_MAP = {
 GraduationCap,
 ShieldCheck,
 Award,
 Heart
};

/* ─── animation helpers ─── */
const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: (i = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
 })
};

const modalVariants = {
 hidden: { opacity: 0, scale: 0.95, y: 20 },
 visible: { 
 opacity: 1, 
 scale: 1, 
 y: 0,
 transition: { type: 'spring', damping: 25, stiffness: 300 }
 },
 exit: { 
 opacity: 0, 
 scale: 0.95, 
 y: 20,
 transition: { duration: 0.2 }
 }
};

export const Career = () => {
 const location = useLocation();
 const [careers, setCareers] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [selectedJob, setSelectedJob] = useState(null);
 const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
 const [isSubmitted, setIsSubmitted] = useState(false);
 const [selectedFile, setSelectedFile] = useState(null);

 useEffect(() => {
   fetchJobs();
 }, []);

 useEffect(() => {
   if (!isLoading && location.hash === '#current-openings') {
     setTimeout(() => {
       const element = document.getElementById('current-openings');
       if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
       }
     }, 100);
   }
 }, [isLoading, location.hash]);

 const fetchJobs = async () => {
   setIsLoading(true);
   try {
     const res = await getCareers();
     if (res.success) {
       setCareers(res.data);
     }
   } catch (error) {
     console.error('Error fetching jobs', error);
   } finally {
     setIsLoading(false);
   }
 };

 const [applicantData, setApplicantData] = useState({
 fullName: '',
 email: '',
 phone: '',
 experience: 'Fresher (0 Years)',
 coverLetter: '',
 resumeFileName: ''
 });

 const handleInputChange = (e) => {
 setApplicantData({ ...applicantData, [e.target.name]: e.target.value });
 };

 const handleFileChange = (e) => {
 if (e.target.files && e.target.files[0]) {
   const file = e.target.files[0];
   setSelectedFile(file);
   setApplicantData({ ...applicantData, resumeFileName: file.name });
 }
 };

 const [submitError, setSubmitError] = useState('');

 const handleFormSubmit = async (e) => {
 e.preventDefault();
 setSubmitError('');
 
 const formData = new FormData();
 formData.append('fullName', applicantData.fullName);
 formData.append('email', applicantData.email);
 formData.append('phone', applicantData.phone);
 formData.append('experience', applicantData.experience);
 formData.append('coverLetter', applicantData.coverLetter);
 formData.append('jobId', selectedJob ? selectedJob.id : '');
 
 if (selectedFile) {
   formData.append('resume', selectedFile);
 }

 try {
   const res = await createApplicant(formData);
   if (res.success) {
     setIsSubmitted(true);
   } else {
     setSubmitError(res.message || 'Failed to submit application. Please try again.');
   }
 } catch (error) {
   console.error('Error submitting application', error);
   setSubmitError(error.response?.data?.message || 'An error occurred while submitting your application.');
 }
 };

 const resetModal = () => {
 setIsSubmitted(false);
 setIsApplyModalOpen(false);
 setSelectedJob(null);
 setSelectedFile(null);
 setApplicantData({
   fullName: '', email: '', phone: '', experience: 'Fresher (0 Years)', coverLetter: '', resumeFileName: ''
 });
 };

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">
 
 {/* 1. Hero Banner */}
 <PageHeader
 icon={Briefcase}
 badge="Join Our Faculty"
 title="Build Your Career With Apex"
 subtitle="We are always looking for passionate educators and professionals to join our academic community."
 bgImage={aboutBannerImg}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. Open Vacancies Directory */}
 <motion.section 
 id="current-openings"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 <SectionTitle
 badge="Current Openings"
 title="Explore Open Teaching & Admin Roles"
 subtitle="Select a role to view responsibilities and submit your application."
 theme="dark"
 />

 <div className="mt-12 space-y-6">
 {isLoading ? (
   <div className="flex justify-center py-10 text-slate-500">Loading careers...</div>
 ) : careers.length > 0 ? (
   careers.map((job, idx) => (
 <motion.div 
 key={job.id}
 variants={fadeUp}
 custom={idx}
 className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#166534] transition-all duration-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group hover:-translate-y-1"
 >
 <div className="space-y-3 max-w-2xl">
 <div className="flex items-center gap-3 flex-wrap">
 <span className="bg-[#F0FDF4] text-[#166534] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full border border-green-200">
 {job.department}
 </span>
 <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
 <Clock className="w-3.5 h-3.5" />
 {job.type}
 </span>
 <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full">
 <MapPin className="w-3.5 h-3.5" />
 {job.location}
 </span>
 </div>

 <h3 className="font-poppins text-2xl font-bold text-slate-900 group-hover:text-[#166534] transition-colors">
 {job.title}
 </h3>
 
 <p className="font-inter text-sm text-slate-600 leading-relaxed">
 {job.description}
 </p>

 <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700">
 <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-[#166534]" /> <strong>Req:</strong> {job.qualification}</span>
 <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4 text-[#166534]" /> <strong>Exp:</strong> {job.experience}</span>
 {job.salary && (
 <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#166534]" /> <strong>Salary:</strong> {job.salary}</span>
 )}
 </div>

 {job.responsibilities && (
 <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
 <h4 className="text-xs font-bold text-slate-800 mb-2">Key Responsibilities:</h4>
 <ul className="list-disc pl-4 text-xs text-slate-600 space-y-1 font-inter">
 {job.responsibilities.split('\n').map((resp, i) => (
 resp.trim() ? <li key={i}>{resp.trim()}</li> : null
 ))}
 </ul>
 </div>
 )}
 </div>

 <div className="flex items-center gap-3 shrink-0 w-full md:w-auto mt-4 md:mt-0">
 <button
 onClick={() => {
 setSelectedJob(job);
 setIsApplyModalOpen(true);
 }}
 className="w-full md:w-auto bg-[#166534] hover:bg-emerald-800 text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer group-hover:scale-105"
 >
 <span>Apply For Role</span>
 <ArrowRight className="w-4 h-4" />
 </button>
 </div>
 </motion.div>
  ))
) : (
  <div className="text-center py-10 text-slate-500 bg-white rounded-3xl border border-slate-200">
    <h3 className="text-lg font-semibold text-slate-800">No current openings available</h3>
    <p className="mt-2 text-sm">Please check back later or submit a general application.</p>
  </div>
)}
</div>
 </motion.section>

 {/* 3. Workplace Culture & Benefits */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-200/80 shadow-xl"
 >
 <SectionTitle
 badge="Why Teach at Apex"
 title="Workplace Culture & Educator Perks"
 subtitle="Fostering an environment where teachers thrive, innovate, and feel valued."
 theme="dark"
 />

 <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {WORKPLACE_BENEFITS.map((benefit, idx) => {
 const IconComp = ICON_MAP[benefit.icon] || Award;
 return (
 <motion.div 
 key={idx} 
 variants={fadeUp} 
 custom={idx} 
 className="bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-[#166534] text-center space-y-4 transition-all duration-300 hover:-translate-y-1 group"
 >
 <div className="w-14 h-14 rounded-2xl bg-white border border-green-100 text-[#166534] mx-auto flex items-center justify-center shadow-sm group-hover:bg-[#166534] group-hover:text-white transition-colors duration-300">
 <IconComp className="w-7 h-7" />
 </div>
 <h4 className="font-poppins text-lg font-bold text-slate-900 group-hover:text-[#166534] transition-colors">{benefit.title}</h4>
 <p className="font-inter text-sm text-slate-600 leading-relaxed">{benefit.description}</p>
 </motion.div>
 );
 })}
 </div>
 </motion.section>

 </div>

 {/* Application Modal */}
 <AnimatePresence>
 {isApplyModalOpen && selectedJob && (
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm"
 >
 <motion.div 
 variants={modalVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
 >
 
 {/* Header */}
 <div className="bg-[#071F10] text-white p-8 relative">
 <button
 onClick={resetModal}
 className="absolute top-6 right-6 w-10 h-10 rounded-full bg-emerald-900/80 text-white hover:bg-lime-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 <span className="text-xs font-bold text-lime-400 uppercase tracking-widest block mb-2">{selectedJob.department}</span>
 <h3 className="font-poppins text-2xl font-bold">{selectedJob.title}</h3>
 </div>

 {/* Body */}
 <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
 
 {isSubmitted ? (
 <motion.div 
 initial={{ scale: 0.9, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 className="text-center space-y-5 py-10"
 >
 <div className="w-20 h-20 rounded-full bg-[#F0FDF4] text-[#166534] mx-auto flex items-center justify-center shadow-lg ring-4 ring-emerald-50">
 <CheckCircle2 className="w-12 h-12" />
 </div>
 <h4 className="font-poppins text-2xl font-bold text-slate-900">Application Received!</h4>
 <p className="font-inter text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
 Thank you for applying for the position of <strong>{selectedJob.title}</strong>. Our HR recruitment desk will review your profile and contact qualified candidates.
 </p>
 <div className="pt-4">
 <button
 onClick={resetModal}
 className="bg-[#166534] text-white font-bold text-sm px-10 py-3.5 rounded-full hover:bg-emerald-800 transition-colors shadow-md hover:shadow-xl"
 >
 Close Window
 </button>
 </div>
 </motion.div>
 ) : (
 <form onSubmit={handleFormSubmit} className="space-y-5">
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Candidate Name *</label>
 <input
 type="text"
 name="fullName"
 required
 value={applicantData.fullName}
 onChange={handleInputChange}
 placeholder="Dr. / Mr. / Ms. Full Name"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Teaching Experience *</label>
 <select
 name="experience"
 value={applicantData.experience}
 onChange={handleInputChange}
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors appearance-none cursor-pointer"
 >
 <option value="Fresher (0 Years)">Fresher (0 Years)</option>
 <option value="1 - 2 Years">1 - 2 Years</option>
 <option value="3 - 5 Years">3 - 5 Years</option>
 <option value="5+ Years Experience">5+ Years Experience</option>
 </select>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
 <input
 type="email"
 name="email"
 required
 value={applicantData.email}
 onChange={handleInputChange}
 placeholder="applicant@example.com"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
 <input
 type="tel"
 name="phone"
 required
 value={applicantData.phone}
 onChange={handleInputChange}
 placeholder="+91 98765 43210"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 </div>

 {/* Resume Upload Simulator */}
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Upload Resume (PDF / DOCX)</label>
 <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-[#F0FDF4] hover:border-[#166534]/50 transition-colors relative cursor-pointer group">
 <input
 type="file"
 accept=".pdf,.doc,.docx"
 onChange={handleFileChange}
 className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
 />
 <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
 <Upload className="w-5 h-5 text-[#166534]" />
 </div>
 <p className="text-sm text-slate-600 font-medium">
 {applicantData.resumeFileName ? (
 <span className="text-[#166534] font-bold">Uploaded: {applicantData.resumeFileName}</span>
 ) : (
 <span>Click to upload or drag resume file here</span>
 )}
 </p>
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Brief Cover Statement</label>
 <textarea
 name="coverLetter"
 rows="3"
 value={applicantData.coverLetter}
 onChange={handleInputChange}
 placeholder="Briefly state your qualifications and teaching philosophy..."
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>

 <div className="pt-2">
  {submitError && (
    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-2">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <p>{submitError}</p>
    </div>
  )}
 <button
 type="submit"
 className="w-full bg-[#166534] hover:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl text-sm transition-all duration-300 cursor-pointer"
 >
 Submit Job Application
 </button>
 </div>
 </form>
 )}

 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 );
};

export default Career;
