import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { IMAGES } from '../utils/images';
import { ADMISSION_STEPS, FEE_STRUCTURE, ELIGIBILITY_CRITERIA, ADMISSION_FAQS } from '../data/admissions';
import { 
 FileText, 
 Calculator, 
 CheckCircle2, 
 HelpCircle, 
 ArrowRight, 
 Download, 
 User, 
 Mail, 
 Phone, 
 Calendar, 
 Check, 
 X, 
 ChevronDown,
 Sparkles,
 Award
} from 'lucide-react';

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

export const Admission = () => {
 // Fee Calculator State
 const [selectedFeeGradeIndex, setSelectedFeeGradeIndex] = useState(0);
 const [includeTransport, setIncludeTransport] = useState(true);
 const transportCostPerYear = 18000;

 const currentFee = FEE_STRUCTURE[selectedFeeGradeIndex];
 const annualTuitionTotal = currentFee.tuitionFeePerTerm * currentFee.termsPerYear;
 const grandTotalEstimate = annualTuitionTotal + currentFee.annualCharges + currentFee.developmentFee + (includeTransport ? transportCostPerYear : 0);

 // Online Application Modal State
 const [isFormModalOpen, setIsFormModalOpen] = useState(false);
 const [formStep, setFormStep] = useState(1);
 const [isSubmitted, setIsSubmitted] = useState(false);

 // Form Fields
 const [formData, setFormData] = useState({
 studentName: '',
 gender: 'Boy',
 dob: '',
 grade: 'Grade 1',
 parentName: '',
 email: '',
 phone: '',
 address: '',
 transportRequired: 'Yes'
 });

 const handleInputChange = (e) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleFormSubmit = (e) => {
 e.preventDefault();
 setIsSubmitted(true);
 };

 const resetForm = () => {
 setIsSubmitted(false);
 setFormStep(1);
 setIsFormModalOpen(false);
 };

 // FAQ Accordion State
 const [openFaqIndex, setOpenFaqIndex] = useState(0);

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">
 
 {/* 1. Hero Banner */}
 <PageHeader
 icon={FileText}
 badge="Admissions Open for Session 2026-27"
 title="Begin Your Child's Journey of Excellence"
 subtitle="Join the Apex family. A seamless, transparent, and welcoming admissions process for the academic year 2026-27."
 bgImage={IMAGES.banners.admission}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. 4-Step Admission Roadmap */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 >
 <SectionTitle
 badge="Simple Workflow"
 title="4-Step Admission Process"
 subtitle="Transparent and hassle-free registration from application to classroom enrollment."
 theme="dark"
 />

 <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {ADMISSION_STEPS.map((step, idx) => (
 <motion.div 
 key={step.step}
 variants={fadeUp}
 custom={idx}
 className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#166534] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
 >
 <span className="text-5xl font-extrabold font-poppins text-emerald-50 group-hover:text-emerald-100 transition-colors block mb-4">
 {step.step}
 </span>
 <h3 className="font-poppins text-lg font-bold text-slate-900 mb-2 relative z-10">
 {step.title}
 </h3>
 <p className="font-inter text-sm text-slate-600 leading-relaxed relative z-10">
 {step.desc}
 </p>
 <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#166534]">
 <CheckCircle2 className="w-4 h-4 mr-1.5 text-[#166534]" />
 <span>Step Completed Online</span>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.section>

 {/* 3. Interactive Fee Calculator & Structure */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xl"
 >
 <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-10">
 <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-[#F0FDF4] px-4 py-1.5 rounded-full border border-green-200">
 Transparent Pricing
 </span>
 <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
 Interactive Fee Calculator (2026-27)
 </h2>
 <p className="font-inter text-slate-600 text-sm sm:text-base mt-3">
 Select your child's grade level to view term breakdown and total estimated annual fee.
 </p>
 </motion.div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
 
 {/* Grade Selection Controls */}
 <motion.div variants={fadeUp} custom={1} className="lg:col-span-5 space-y-6 bg-[#F0FDF4]/60 p-6 sm:p-8 rounded-3xl border border-green-100/80 shadow-sm">
 <h3 className="font-poppins text-lg font-bold text-slate-900 flex items-center gap-2">
 <Calculator className="w-5 h-5 text-[#166534]" />
 <span>Select Grade & Options</span>
 </h3>

 <div>
 <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
 Academic Grade
 </label>
 <div className="space-y-2.5">
 {FEE_STRUCTURE.map((item, idx) => (
 <button
 key={idx}
 onClick={() => setSelectedFeeGradeIndex(idx)}
 className={`w-full text-left px-5 py-3.5 rounded-2xl text-sm font-bold transition-all cursor-pointer flex items-center justify-between ${
 selectedFeeGradeIndex === idx
 ? 'bg-[#166534] text-white shadow-md scale-[1.02]'
 : 'bg-white text-slate-800 hover:bg-[#F0FDF4] hover:text-[#166534] border border-slate-200/80 hover:border-[#166534]/30'
 }`}
 >
 <span>{item.grade}</span>
 {selectedFeeGradeIndex === idx && <Check className="w-4 h-4 text-lime-400" />}
 </button>
 ))}
 </div>
 </div>

 {/* Transport Toggle */}
 <div className="pt-5 border-t border-green-200 flex items-center justify-between">
 <div>
 <span className="font-poppins text-sm font-bold text-slate-900 block">Include AC Bus Transport</span>
 <span className="text-xs text-slate-500 font-inter mt-0.5 block">GPS AC fleet coverage (+₹18,000/yr)</span>
 </div>
 <button
 type="button"
 onClick={() => setIncludeTransport(!includeTransport)}
 className={`w-14 h-7 rounded-full transition-colors relative cursor-pointer p-1 shadow-inner ${
 includeTransport ? 'bg-[#166534]' : 'bg-slate-300'
 }`}
 >
 <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
 includeTransport ? 'translate-x-7' : 'translate-x-0'
 }`} />
 </button>
 </div>
 </motion.div>

 {/* Fee Breakdown Display */}
 <motion.div variants={fadeUp} custom={2} className="lg:col-span-7 bg-[#071F10] text-white rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
 <div className="flex items-center justify-between pb-5 border-b border-emerald-800/60 relative z-10">
 <div>
 <span className="text-xs font-bold text-lime-400 uppercase tracking-widest block mb-1">Fee Overview</span>
 <h4 className="font-poppins text-2xl sm:text-3xl font-extrabold text-white">{currentFee.grade}</h4>
 </div>
 <span className="bg-emerald-900 text-lime-400 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-600/40">
 4 Terms / Year
 </span>
 </div>

 <div className="space-y-4 font-inter text-sm sm:text-base relative z-10">
 <div className="flex justify-between py-2 border-b border-emerald-900/40">
 <span className="text-green-200">Tuition Fee (Per Term)</span>
 <span className="font-bold text-white">₹{currentFee.tuitionFeePerTerm.toLocaleString()}</span>
 </div>
 <div className="flex justify-between py-2 border-b border-emerald-900/40">
 <span className="text-green-200">Annual Tuition Total (4 Terms)</span>
 <span className="font-bold text-white">₹{annualTuitionTotal.toLocaleString()}</span>
 </div>
 <div className="flex justify-between py-2 border-b border-emerald-900/40">
 <span className="text-green-200">Annual Activity & Lab Charges</span>
 <span className="font-bold text-white">₹{currentFee.annualCharges.toLocaleString()}</span>
 </div>
 <div className="flex justify-between py-2 border-b border-emerald-900/40">
 <span className="text-green-200">One-Time Campus Development Fee</span>
 <span className="font-bold text-white">₹{currentFee.developmentFee.toLocaleString()}</span>
 </div>
 {includeTransport && (
 <div className="flex justify-between py-2 border-b border-emerald-900/40 text-lime-300">
 <span>AC Bus Transport (Annual)</span>
 <span className="font-bold">₹{transportCostPerYear.toLocaleString()}</span>
 </div>
 )}
 </div>

 <div className="pt-6 border-t border-emerald-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
 <div>
 <span className="text-xs text-green-200/80 uppercase tracking-widest font-bold block mb-1">Estimated Total (Year 1)</span>
 <span className="font-poppins text-3xl sm:text-4xl font-extrabold text-lime-400">
 ₹{grandTotalEstimate.toLocaleString()}
 </span>
 </div>
 <button
 onClick={() => setIsFormModalOpen(true)}
 className="bg-lime-400 hover:bg-white text-slate-950 font-bold px-8 py-4 rounded-full text-sm transition-colors duration-300 cursor-pointer shadow-lg hover:scale-105"
 >
 Book Seat Now
 </button>
 </div>
 
 {/* Decorative background shape */}
 <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
 </motion.div>

 </div>
 </motion.section>

 {/* 4. Eligibility Criteria */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xl"
 >
 <SectionTitle
 badge="Age Guidelines"
 title="Eligibility Criteria & Required Documents"
 subtitle="Please ensure all required documents are ready prior to interaction."
 theme="dark"
 />

 <motion.div variants={fadeUp} custom={0} className="mt-12 overflow-x-auto">
 <table className="w-full text-left border-collapse min-w-150">
 <thead>
 <tr className="bg-[#F0FDF4] border-b border-green-200 text-xs font-bold text-[#166534] uppercase tracking-wider">
 <th className="p-5 rounded-tl-2xl">Grade Level</th>
 <th className="p-5">Age Requirement</th>
 <th className="p-5 rounded-tr-2xl">Required Documents</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100/80 text-sm font-inter">
 {ELIGIBILITY_CRITERIA.map((row, idx) => (
 <tr key={idx} className="hover:bg-slate-50 transition-colors group">
 <td className="p-5 font-bold text-slate-900 font-poppins group-hover:text-[#166534] transition-colors">{row.grade}</td>
 <td className="p-5 text-emerald-800 font-semibold bg-[#F0FDF4]/30">{row.ageRule}</td>
 <td className="p-5 text-slate-600 leading-relaxed">{row.docs}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </motion.div>
 </motion.section>

 {/* 5. FAQs Accordion */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-xl"
 >
 <SectionTitle
 badge="Parent Guidance"
 title="Frequently Asked Admission Questions"
 subtitle="Everything you need to know regarding admissions, transport, and seat allocations."
 theme="dark"
 />

 <div className="mt-12 max-w-3xl mx-auto space-y-4">
 {ADMISSION_FAQS.map((faq, idx) => {
 const isOpen = openFaqIndex === idx;
 return (
 <motion.div 
 variants={fadeUp}
 custom={idx}
 key={idx}
 className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
 isOpen ? 'border-[#166534]/30 shadow-md ring-2 ring-emerald-500/10' : 'border-slate-200/80 hover:border-[#166534]/50'
 }`}
 >
 <button
 onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
 className={`w-full text-left p-5 sm:p-6 flex items-center justify-between font-poppins text-base sm:text-lg font-bold cursor-pointer transition-colors ${
 isOpen ? 'bg-[#F0FDF4] text-[#166534]' : 'bg-white text-slate-900 hover:bg-[#F0FDF4]/50 hover:text-[#166534]'
 }`}
 >
 <span>{faq.q}</span>
 <ChevronDown className={`w-5 h-5 text-[#166534] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
 </button>

 <AnimatePresence>
 {isOpen && (
 <motion.div 
 initial={{ height: 0, opacity: 0 }}
 animate={{ height: 'auto', opacity: 1 }}
 exit={{ height: 0, opacity: 0 }}
 transition={{ duration: 0.3, ease: 'easeInOut' }}
 >
 <div className="p-5 sm:p-6 bg-white font-inter text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
 {faq.a}
 </div>
 </motion.div>
 )}
 </AnimatePresence>
 </motion.div>
 );
 })}
 </div>
 </motion.section>

 </div>

 {/* Online Application Multi-Step Form Modal */}
 <AnimatePresence>
 {isFormModalOpen && (
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
 className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 relative"
 >
 
 {/* Modal Header */}
 <div className="bg-[#071F10] text-white p-8 relative">
 <button
 onClick={resetForm}
 className="absolute top-6 right-6 w-10 h-10 rounded-full bg-emerald-900/80 text-white hover:bg-lime-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
 >
 <X className="w-5 h-5" />
 </button>
 <span className="text-xs font-bold text-lime-400 uppercase tracking-widest block mb-2">Session 2026-27</span>
 <h3 className="font-poppins text-2xl font-bold">Online Admission Application</h3>
 </div>

 {/* Modal Body */}
 <div className="p-8 space-y-6">
 
 {isSubmitted ? (
 <motion.div 
 initial={{ scale: 0.9, opacity: 0 }}
 animate={{ scale: 1, opacity: 1 }}
 className="text-center space-y-5 py-10"
 >
 <div className="w-20 h-20 rounded-full bg-[#F0FDF4] text-[#166534] mx-auto flex items-center justify-center shadow-lg ring-4 ring-emerald-50">
 <CheckCircle2 className="w-12 h-12" />
 </div>
 <h4 className="font-poppins text-2xl font-bold text-slate-900">Application Submitted!</h4>
 <p className="font-inter text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
 Thank you for applying to Apex International School. Our admission desk will review your details and contact you shortly.
 </p>
 <div className="pt-4">
 <button
 onClick={resetForm}
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
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Student Full Name *</label>
 <input
 type="text"
 name="studentName"
 required
 value={formData.studentName}
 onChange={handleInputChange}
 placeholder="e.g. Aarav Sharma"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Applying For Grade *</label>
 <select
 name="grade"
 value={formData.grade}
 onChange={handleInputChange}
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors appearance-none"
 >
 <option value="Nursery">Nursery / LKG / UKG</option>
 <option value="Grade 1">Grade 1 to 5</option>
 <option value="Grade 6">Grade 6 to 10</option>
 <option value="Grade 11">Grade 11 (Science / Commerce / Arts)</option>
 </select>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Parent / Guardian Name *</label>
 <input
 type="text"
 name="parentName"
 required
 value={formData.parentName}
 onChange={handleInputChange}
 placeholder="e.g. Rajesh Sharma"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Contact Phone Number *</label>
 <input
 type="tel"
 name="phone"
 required
 value={formData.phone}
 onChange={handleInputChange}
 placeholder="+91 98765 43210"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
 <input
 type="email"
 name="email"
 required
 value={formData.email}
 onChange={handleInputChange}
 placeholder="parent@example.com"
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Residential Address</label>
 <textarea
 name="address"
 rows="2"
 value={formData.address}
 onChange={handleInputChange}
 placeholder="Enter city, sector or area..."
 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>

 <div className="pt-4">
 <button
 type="submit"
 className="w-full bg-[#166534] hover:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl text-sm transition-all duration-300 cursor-pointer"
 >
 Submit Application Now
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

export default Admission;
