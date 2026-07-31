import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, GraduationCap, Sparkles, Star, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { FACULTY_DEPARTMENTS } from '../data/faculty';
import { useApp } from '../context/AppContext';
import { ROUTES } from '../utils/routes';
import { IMAGES } from '../utils/images';
import { LazyImage } from '../components/common/LazyImage';

/* ─── animation helpers ─── */
const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: (i = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
 })
};

const fadeScale = {
 hidden: { opacity: 0, scale: 0.95 },
 visible: {
 opacity: 1,
 scale: 1,
 transition: { duration: 0.4, ease: 'easeOut' }
 },
 exit: {
 opacity: 0,
 scale: 0.95,
 transition: { duration: 0.3, ease: 'easeIn' }
 }
};

export const Faculty = () => {
 const { faculty } = useApp();
 const [activeTab, setActiveTab] = useState('all');

 const filteredFaculty = activeTab === 'all'
 ? faculty
 : faculty.filter(m => m.department === activeTab);

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">

 {/* 1. Hero Banner */}
 <PageHeader
 icon={Users}
 badge="100% Certified Educator Staff"
 title="Our Esteemed Educator Faculty"
 subtitle="Meet the visionary leaders, doctorate scholars, and passionate mentors driving academic excellence, innovation, and character building."
 bgImage={IMAGES.banners.faculty}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* Intro Summary Box */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 variants={fadeUp}
 className="bg-[#F0FDF4] border border-green-200/80 rounded-3xl p-8 sm:p-10 text-[#4B5563] shadow-md flex flex-col md:flex-row items-center justify-between gap-8"
 >
 <div className="space-y-3 text-center md:text-left flex-1">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full text-xs font-bold text-[#166534] border border-green-200 shadow-sm">
 <Sparkles className="w-4 h-4" /> 100% Certified Educator Staff
 </div>
 <h2 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900">
 Mentorship Beyond Textbooks
 </h2>
 <p className="font-inter leading-relaxed text-sm sm:text-base max-w-2xl text-slate-600">
 Our faculty comprises doctorate researchers, IIT/Oxford alumni, and certified NIS coaches dedicated to empowering students through personalized mentorship and inquiry-based learning.
 </p>
 </div>

 <div className="grid grid-cols-2 gap-5 shrink-0 w-full md:w-auto">
 <div className="bg-white p-6 rounded-2xl border border-green-100 text-center shadow-md hover:-translate-y-1 transition-transform cursor-pointer">
 <p className="font-poppins text-3xl font-extrabold text-[#166534]">40+</p>
 <p className="font-inter text-xs text-slate-600 font-bold mt-1 uppercase tracking-wider">Expert Educators</p>
 </div>
 <div className="bg-white p-6 rounded-2xl border border-green-100 text-center shadow-md hover:-translate-y-1 transition-transform cursor-pointer">
 <p className="font-poppins text-3xl font-extrabold text-[#166534]">1:12</p>
 <p className="font-inter text-xs text-slate-600 font-bold mt-1 uppercase tracking-wider">Teacher Ratio</p>
 </div>
 </div>
 </motion.div>

 {/* Director's Message Section */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 variants={fadeUp}
 className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-all duration-300"
 >
 {/* Image Side */}
 <div className="md:w-2/5 relative h-80 md:h-auto overflow-hidden">
 <img 
 src={IMAGES.about.director} 
 alt="School Director" 
 className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent md:hidden" />
 </div>
 
 {/* Content Side */}
 <div className="md:w-3/5 p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#F0FDF4] rounded-full text-xs font-bold text-[#166534] border border-green-200 shadow-sm w-fit mb-6">
 <Star className="w-4 h-4 fill-[#166534]" /> Message from the Director
 </div>
 
 <h2 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6">
 "Empowering the Next Generation of Global Leaders"
 </h2>
 
 <div className="space-y-4 font-inter text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
 <p>
 Welcome to Apex International School. Our core philosophy is built upon the belief that every child has exceptional potential waiting to be unlocked through the right guidance and environment. 
 </p>
 <p>
 In today's rapidly evolving world, education must go far beyond textbooks. We focus on holistic development, critical thinking, and character building to ensure our students are not just academically proficient, but are also compassionate, resilient global citizens ready to tackle future challenges.
 </p>
 <p>
 I invite you to explore our campus, meet our dedicated faculty, and experience the vibrant learning community we have passionately built over the past 25 years.
 </p>
 </div>
 
 <div className="pt-6 border-t border-slate-100">
 <p className="font-poppins text-lg font-bold text-slate-900">Dr. Sarah Mitchell</p>
 <p className="font-inter text-sm text-[#166534] font-semibold mt-0.5">Managing Director, Apex International</p>
 </div>
 </div>
 </motion.section>

 {/* Department Filter Tabs & Directory */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 <div className="text-center md:text-left mb-10">
 <h2 className="font-poppins text-3xl font-extrabold text-slate-900 mb-3">
 Department Faculty Directory
 </h2>
 <p className="font-inter text-sm sm:text-base text-slate-600">
 Filter through our subject matter experts and department heads.
 </p>
 </div>

 {/* Filter Tabs */}
 <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-10">
 {FACULTY_DEPARTMENTS.map((tab, idx) => (
 <motion.button
 key={tab.id}
 variants={fadeUp}
 custom={idx}
 onClick={() => setActiveTab(tab.id)}
 className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === tab.id
 ? 'bg-[#166534] text-white shadow-md scale-105 ring-2 ring-emerald-400/50'
 : 'bg-white text-slate-700 hover:bg-[#F0FDF4] hover:text-[#166534] border border-slate-200/80 hover:border-[#166534]/50'
 }`}
 >
 {tab.name}
 </motion.button>
 ))}
 </div>

 {/* Faculty Grid */}
 <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
 <AnimatePresence mode="popLayout">
 {filteredFaculty.map((member, idx) => (
 <motion.div
 key={member.id}
 layout
 variants={fadeScale}
 initial="hidden"
 animate="visible"
 exit="exit"
 custom={idx}
 className="bg-white rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-[#166534]/50 transition-all duration-300 overflow-hidden flex flex-col group"
 >
 <div className="relative h-64 overflow-hidden">
 <LazyImage
    src={member.image}
    alt={member.name}
    fallbackKeywords={['indian', 'teacher', 'portrait']}
    aspectRatio="h-full w-full"
    className="group-hover:scale-105 transition-transform duration-700 absolute inset-0"
  />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent opacity-80" />

 <div className="absolute bottom-5 left-5 right-5 text-white">
 <span className="inline-block px-3 py-1 bg-[#166534] text-white text-[10px] font-extrabold uppercase tracking-widest rounded-md mb-2 shadow-sm border border-white/20">
 {member.designation}
 </span>
 <h3 className="font-poppins text-xl font-bold leading-snug text-white drop-shadow-sm">
 {member.name}
 </h3>
 </div>
 </div>

 <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
 <div>
 <p className="text-xs sm:text-sm text-slate-600 font-medium mb-3 flex items-start gap-1.5">
 <GraduationCap className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
 <span>{member.qualification}</span>
 </p>
 <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
 {member.bio}
 </p>
 </div>

 <div className="pt-4 border-t border-slate-100 space-y-3">
 <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
 <span className="uppercase tracking-wider">Experience:</span>
 <span className="font-bold text-[#166534] bg-[#F0FDF4] px-2 py-1 rounded-md">{member.experience}</span>
 </div>

 {member.subjects && (
 <div className="flex flex-wrap gap-1.5 pt-1">
 {member.subjects.map((sub, idx) => (
 <span key={idx} className="text-[10px] font-bold bg-slate-50 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
 {sub}
 </span>
 ))}
 </div>
 )}
 </div>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </motion.div>
 </motion.section>

 {/* Join Faculty CTA */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-linear-to-r from-[#166534] to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 sm:mb-20"
 >
 <div className="space-y-3 text-center sm:text-left">
 <h3 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
 Interested in Joining Our Teaching Team?
 </h3>
 <p className="text-base sm:text-lg text-green-100 font-inter">
 We are constantly seeking passionate educators and subject matter experts to shape future leaders.
 </p>
 </div>
 <Link
 to={ROUTES.CAREER}
 className="bg-white text-[#166534] hover:bg-lime-400 hover:text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-base shrink-0 hover:scale-105"
 >
 <span>View Career Openings</span>
 <ArrowRight className="w-5 h-5" />
 </Link>
 </motion.section>

 </div>
 </div>
 );
};

export default Faculty;
