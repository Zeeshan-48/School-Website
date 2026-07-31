import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { ACADEMIC_PROGRAMS, SENIOR_STREAMS, STEM_FEATURES } from '../data/academics';
import { IMAGES } from '../utils/images';
import { ROUTES } from '../utils/routes';
import {
 BookOpen,
 Sparkles,
 CheckCircle2,
 Cpu,
 GraduationCap,
 ArrowRight,
 Download,
 Layers,
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

export const Academics = () => {
 const location = useLocation();
 const [activeTab, setActiveTab] = useState(ACADEMIC_PROGRAMS[0].id);

 useEffect(() => {
 const hash = location.hash.replace('#', '');
 if (hash && ACADEMIC_PROGRAMS.some(p => p.id === hash)) {
 setActiveTab(hash);
 // Optional: scroll into view
 const element = document.getElementById('academic-wings');
 if (element) {
 element.scrollIntoView({ behavior: 'smooth' });
 }
 }
 }, [location.hash]);

 const selectedWing = ACADEMIC_PROGRAMS.find((p) => p.id === activeTab) || ACADEMIC_PROGRAMS[0];

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">

 {/* 1. Hero Banner */}
 <PageHeader
 icon={BookOpen}
 badge="CBSE Affiliated Curriculum"
 title="Academic Rigor & Experiential Learning"
 subtitle="Explore our comprehensive curriculum designed to nurture critical thinking, innovation, and holistic development."
 bgImage={IMAGES.banners.academics}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. Interactive Academic Wing Explorer */}
 <motion.section 
 id="academic-wings" 
 className="scroll-mt-24"
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 <SectionTitle
 badge="Learning Pathways"
 title="Explore Our Academic Wings"
 subtitle="Tailored learning frameworks designed for every developmental milestone of your child's journey."
 theme="dark"
 />

 {/* Wing Selection Tabs */}
 <div className="mt-10 flex items-center justify-center flex-wrap gap-2 sm:gap-3">
 {ACADEMIC_PROGRAMS.map((program, idx) => {
 const isActive = activeTab === program.id;
 return (
 <motion.button
 key={program.id}
 variants={fadeUp}
 custom={idx}
 onClick={() => setActiveTab(program.id)}
 className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer inline-flex items-center gap-2 ${isActive
 ? 'bg-[#166534] text-white shadow-md scale-105 ring-2 ring-emerald-400/50'
 : 'bg-white text-slate-700 hover:bg-[#F0FDF4] hover:text-[#166534] border border-slate-200/80'
 }`}
 >
 <Layers className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-[#166534]'}`} />
 <span>{program.level}</span>
 </motion.button>
 );
 })}
 </div>

 {/* Active Wing Detail View */}
 <AnimatePresence mode="wait">
 <motion.div 
 key={activeTab}
 variants={fadeScale}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="mt-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
 >
 <div className="lg:col-span-7 space-y-6">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#166534] text-xs font-bold border border-green-200">
 <span>{selectedWing.age}</span>
 </div>
 <h3 className="font-poppins text-2xl sm:text-3xl font-extrabold text-slate-900">
 {selectedWing.title}
 </h3>
 <p className="font-inter text-slate-600 text-base leading-relaxed">
 {selectedWing.description}
 </p>

 {/* Subject Focus Area */}
 <div>
 <h4 className="font-poppins text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
 Core Subject Focus
 </h4>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
 {selectedWing.subjects.map((sub, idx) => (
 <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700">
 <CheckCircle2 className="w-4 h-4 text-[#166534] shrink-0" />
 <span>{sub}</span>
 </div>
 ))}
 </div>
 </div>

 {/* Key Program Highlights */}
 <div className="pt-4 border-t border-slate-100">
 <h4 className="font-poppins text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
 Key Wing Highlights
 </h4>
 <div className="flex flex-wrap gap-2">
 {selectedWing.highlights.map((item, idx) => (
 <span key={idx} className="bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200">
 ✨ {item}
 </span>
 ))}
 </div>
 </div>
 </div>

 {/* Wing Image Showcase */}
 <div className="lg:col-span-5">
 <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-emerald-500/20 group">
 <img
 src={selectedWing.image}
 alt={selectedWing.title}
 className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
 <div className="absolute bottom-4 left-4 right-4 text-white">
 <span className="text-xs font-bold text-lime-400 uppercase tracking-wider">Apex Curriculum</span>
 <p className="font-poppins text-base font-bold">{selectedWing.title}</p>
 </div>
 </div>
 </div>
 </motion.div>
 </AnimatePresence>
 </motion.section>

 {/* 3. Senior Secondary Streams (Grades 11 & 12) */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg"
 >
 <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-12">
 <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-[#F0FDF4] px-3.5 py-1 rounded-full border border-green-200">
 Higher Secondary Pathways
 </span>
 <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
 Senior Secondary Streams (Grades 11 & 12)
 </h2>
 <p className="font-inter text-slate-600 text-sm sm:text-base mt-2">
 Specialized academic tracks with integrated preparation for JEE, NEET, CUET, SAT, and Law entrances.
 </p>
 </motion.div>

 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 {SENIOR_STREAMS.map((stream, idx) => (
 <motion.div
 key={stream.id}
 variants={fadeUp}
 custom={idx + 1}
 className="bg-[#F0FDF4]/50 border border-green-100 rounded-2xl p-7 shadow-xs hover:shadow-xl hover:border-[#166534] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
 >
 <div>
 <div className="w-12 h-12 rounded-xl bg-[#166534] text-white flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-300">
 <GraduationCap className="w-6 h-6" />
 </div>
 <h3 className="font-poppins text-xl font-bold text-slate-900 mb-2">
 {stream.title}
 </h3>
 <p className="font-inter text-xs text-slate-600 mb-6 leading-relaxed">
 {stream.desc}
 </p>

 <div className="space-y-4">
 <div>
 <span className="text-[11px] font-bold text-[#166534] uppercase tracking-wider block mb-2">
 Core Subjects
 </span>
 <ul className="space-y-1.5">
 {stream.coreSubjects.map((sub, i) => (
 <li key={i} className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-[#166534]" />
 <span>{sub}</span>
 </li>
 ))}
 </ul>
 </div>

 <div>
 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
 Electives Available
 </span>
 <ul className="space-y-1.5">
 {stream.electives.map((elec, i) => (
 <li key={i} className="text-xs text-slate-600 flex items-center gap-1.5">
 <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
 <span>{elec}</span>
 </li>
 ))}
 </ul>
 </div>
 </div>
 </div>

 <div className="mt-8 pt-4 border-t border-green-200/60">
 <Link
 to={ROUTES.ADMISSION}
 className="text-xs font-bold text-[#166534] hover:text-emerald-800 inline-flex items-center gap-1.5 transition-colors group-hover:translate-x-1"
 >
 <span>Apply for {stream.id} stream</span>
 <ArrowRight className="w-3.5 h-3.5" />
 </Link>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.section>

 {/* 4. STEM Tinkering & Robotics Showcase */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-[#071F10] text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden"
 >
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
 <motion.div variants={fadeUp} custom={0} className="lg:col-span-7 space-y-6">
 <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/90 border border-emerald-600/40 text-lime-400 text-xs font-bold uppercase tracking-wider">
 <Cpu className="w-4 h-4" />
 <span>Atal Innovation Tinkering Hub</span>
 </div>
 <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
 Preparing Future Technologists & Engineers
 </h2>
 <p className="font-inter text-green-100/90 text-sm sm:text-base leading-relaxed">
 Our state-of-the-art STEM Tinkering Lab provides students from Grade 4 onwards with hands-on experience in 3D Printing, Microcontroller Robotics, Artificial Intelligence algorithms, and Renewable Energy models.
 </p>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
 {STEM_FEATURES.map((item, idx) => (
 <motion.div key={idx} variants={fadeUp} custom={idx + 1} className="bg-emerald-950/60 border border-emerald-800/60 p-4 rounded-xl backdrop-blur-xs hover:border-lime-500/50 transition-colors">
 <h4 className="font-poppins text-sm font-bold text-lime-400">{item.title}</h4>
 <p className="font-inter text-xs text-green-200/80 mt-1 leading-normal">{item.desc}</p>
 </motion.div>
 ))}
 </div>
 </motion.div>

 <motion.div variants={fadeUp} custom={1} className="lg:col-span-5">
 <div className="rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl group">
 <img
 src={IMAGES.facilities.smartClassroom}
 alt="Modern classroom"
 className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
 />
 </div>
 </motion.div>
 </div>
 {/* Decorative Background Elements */}
 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />
 </motion.section>

 {/* 5. CBSE Evaluation & Grading Pattern */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-md"
 >
 <SectionTitle
 badge="Assessment Policy"
 title="CBSE Grading & Evaluation System"
 subtitle="Balanced evaluation focusing on continuous learning, practical projects, and academic rigor."
 theme="dark"
 />

 <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
 <motion.div variants={fadeUp} custom={0} className="bg-[#F0FDF4] p-6 rounded-2xl border border-green-100 text-center group hover:shadow-lg hover:border-[#166534] hover:-translate-y-1 transition-all duration-300">
 <div className="w-16 h-16 rounded-2xl bg-white border border-green-100 text-[#166534] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#166534] group-hover:text-white transition-colors">
 <Award className="w-8 h-8" />
 </div>
 <h4 className="font-poppins text-base font-bold text-slate-900">Periodic Tests (20%)</h4>
 <p className="text-xs text-slate-600 mt-2 font-inter">Continuous unit assessments, quizzes, and class performance tracking throughout the term.</p>
 </motion.div>

 <motion.div variants={fadeUp} custom={1} className="bg-[#F0FDF4] p-6 rounded-2xl border border-green-100 text-center group hover:shadow-lg hover:border-[#166534] hover:-translate-y-1 transition-all duration-300">
 <div className="w-16 h-16 rounded-2xl bg-white border border-green-100 text-[#166534] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#166534] group-hover:text-white transition-colors">
 <Sparkles className="w-8 h-8" />
 </div>
 <h4 className="font-poppins text-base font-bold text-slate-900">Portfolio & Practical (30%)</h4>
 <p className="text-xs text-slate-600 mt-2 font-inter">Lab journals, STEM projects, art integration, and subject enrichment assignments.</p>
 </motion.div>

 <motion.div variants={fadeUp} custom={2} className="bg-[#F0FDF4] p-6 rounded-2xl border border-green-100 text-center group hover:shadow-lg hover:border-[#166534] hover:-translate-y-1 transition-all duration-300">
 <div className="w-16 h-16 rounded-2xl bg-white border border-green-100 text-[#166534] flex items-center justify-center mx-auto mb-4 group-hover:bg-[#166534] group-hover:text-white transition-colors">
 <BookOpen className="w-8 h-8" />
 </div>
 <h4 className="font-poppins text-base font-bold text-slate-900">Term-End Board Exam (50%)</h4>
 <p className="text-xs text-slate-600 mt-2 font-inter">Summative written examinations structured strictly according to CBSE national standards.</p>
 </motion.div>
 </div>
 </motion.section>

 {/* 6. Prospectus & Syllabus CTA Banner */}
 <section className="bg-linear-to-r from-[#166534] to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 sm:mb-20">
 <div className="space-y-2 text-center sm:text-left">
 <h3 className="font-poppins text-2xl sm:text-3xl font-extrabold text-white">
 Want the Complete Academic Prospectus?
 </h3>
 <p className="text-sm sm:text-base text-green-100 font-inter">
 Download our comprehensive curriculum guide and 2026-27 academic handbook.
 </p>
 </div>
 <div className="flex items-center gap-3 shrink-0">
 <Link
 to={ROUTES.ADMISSION}
 className="bg-lime-400 text-slate-950 hover:bg-white font-bold px-6 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2 text-sm hover:scale-105"
 >
 <Download className="w-4 h-4" />
 <span>Academic Prospectus</span>
 </Link>
 </div>
 </section>

 </div>
 </div>
 );
};

export default Academics;
