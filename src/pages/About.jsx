import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { ABOUT_DATA } from '../data/about';
import { ROUTES } from '../utils/routes';
import { IMAGES } from '../utils/images';
import {
 Award,
 ShieldCheck,
 Globe,
 Heart,
 CheckCircle2,
 Calendar,
 ArrowRight,
 Sparkles
} from 'lucide-react';

const ICON_MAP = {
 Award,
 ShieldCheck,
 Globe,
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

export const About = () => {
 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">

 {/* 1. Page Hero Banner */}
 <PageHeader
 icon={Sparkles}
 badge={ABOUT_DATA.hero.badge}
 title={ABOUT_DATA.hero.title}
 subtitle={ABOUT_DATA.hero.subtitle}
 bgImage={IMAGES.banners.about}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 3. Core Values Grid */}
 <motion.section
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 >
 <SectionTitle
 badge="Pillars of Excellence"
 title="Our Core Guiding Values"
 subtitle="The fundamental principles that guide our pedagogy, student development, and school community."
 theme="dark"
 />
 <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
 {ABOUT_DATA.coreValues.map((value, idx) => {
 const IconComp = ICON_MAP[value.iconName] || Award;
 return (
 <motion.div
 key={idx}
 variants={fadeUp}
 custom={idx}
 className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#166534] hover:-translate-y-1 transition-all duration-300 group"
 >
 <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center mb-6 group-hover:bg-[#166534] group-hover:text-white transition-colors duration-300">
 <IconComp className="w-7 h-7" />
 </div>
 <h4 className="font-poppins text-lg font-bold text-slate-900 mb-3">
 {value.title}
 </h4>
 <p className="font-inter text-sm text-slate-600 leading-relaxed">
 {value.description}
 </p>
 </motion.div>
 );
 })}
 </div>
 </motion.section>

 {/* 4. Legacy Milestone Timeline */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-4 sm:p-6 lg:p-6 border border-slate-200/80 shadow-xl overflow-hidden"
 >
 <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-4">
 <span className="inline-block text-[11px] sm:text-xs font-bold text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-4 py-1 rounded-full border border-green-200 mb-1.5">
 Our Journey
 </span>
 <h2 className="font-poppins text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">
 28 Years of Milestone Growth
 </h2>
 <p className="font-inter text-slate-600 text-xs sm:text-sm mt-1.5">
 From humble beginnings in 1995 to becoming a premier international educational landmark.
 </p>
 </motion.div>

 <div className="relative max-w-4xl mx-auto py-0">
 {/* Center Vertical Line */}
 <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-linear-to-b from-[#166534] via-emerald-400 to-lime-500 rounded-full shadow-xs" />

 <div className="space-y-2 sm:space-y-2 relative">
 {ABOUT_DATA.timeline.map((item, idx) => {
 const isEven = idx % 2 === 0;
 return (
 <motion.div
 key={idx}
 variants={fadeUp}
 custom={idx + 1}
 className="relative flex flex-col md:flex-row items-center group"
 >
 {/* Center Year Circle Badge */}
 <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-3 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#166534] text-white border-[3px] border-white shadow-lg flex items-center justify-center group-hover:bg-lime-400 group-hover:text-slate-950 group-hover:scale-110 transition-all duration-300">
 <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
 </div>

 {/* Timeline Item Content Card */}
 <div className={`w-full pl-14 md:pl-0 ${isEven
 ? 'md:w-1/2 md:pr-6 md:text-right'
 : 'md:w-1/2 md:ml-auto md:pl-6 md:text-left'
 }`}>
 <div className="bg-white border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-md hover:border-[#166534] transition-all duration-300 group-hover:-translate-y-1">
 <div className={`flex items-center gap-2 mb-1 ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
 <span className="bg-[#F0FDF4] text-[#166534] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-green-200">
 {item.year}
 </span>
 </div>
 <h4 className="font-poppins text-sm sm:text-base font-bold text-slate-900 mb-0.5">
 {item.title}
 </h4>
 <p className="font-inter text-xs text-slate-600 leading-snug line-clamp-2 sm:line-clamp-none">
 {item.description}
 </p>
 </div>
 </div>
 </motion.div>
 );
 })}
 </div>
 </div>
 </motion.section>

 {/* 6. Accreditations & Badges */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-[#071F10] text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
 >
 <motion.div variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-12 relative z-10">
 <span className="text-xs font-bold text-lime-400 uppercase tracking-widest bg-emerald-900/90 px-4 py-1.5 rounded-full border border-emerald-600/40">
 Certifications & Standards
 </span>
 <h3 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white mt-4">
 Recognized for World-Class Educational Quality
 </h3>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center relative z-10">
 {ABOUT_DATA.accreditations.map((acc, idx) => (
 <motion.div 
 key={idx}
 variants={fadeUp}
 custom={idx + 1} 
 className="bg-emerald-950/60 border border-emerald-800/60 rounded-2xl p-6 backdrop-blur-md hover:bg-emerald-900/80 hover:border-lime-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
 >
 <div className="w-16 h-16 mx-auto bg-emerald-900/80 rounded-full flex items-center justify-center mb-4">
 <CheckCircle2 className="w-8 h-8 text-lime-400" />
 </div>
 <h4 className="font-poppins text-lg font-bold text-white mb-2">{acc.name}</h4>
 <p className="text-sm text-green-200/80 font-inter leading-relaxed">{acc.desc}</p>
 </motion.div>
 ))}
 </div>

 {/* Decorative Elements */}
 <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />
 </motion.section>

 {/* 7. Admission CTA Banner */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-linear-to-r from-[#166534] to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 sm:mb-20"
 >
 <div className="space-y-3 text-center sm:text-left">
 <h3 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
 Ready to Join the Apex Family?
 </h3>
 <p className="text-base sm:text-lg text-green-100 font-inter">
 Admissions for Academic Session 2026-27 are now open for Nursery to Grade 11.
 </p>
 </div>
 <Link
 to={ROUTES.ADMISSION}
 className="bg-white text-[#166534] hover:bg-lime-400 hover:text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-base shrink-0 hover:scale-105"
 >
 <span>Apply For Admission</span>
 <ArrowRight className="w-5 h-5" />
 </Link>
 </motion.section>

 </div>
 </div>
 );
};

export default About;
