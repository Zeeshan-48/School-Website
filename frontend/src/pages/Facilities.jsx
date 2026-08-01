import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { IMAGES } from '../utils/images';
import { FACILITIES, FACILITIES_CATEGORIES } from '../data/facilities';
import { ROUTES } from '../utils/routes';
import {
 Building2,
 Monitor,
 BookOpen,
 FlaskConical,
 Laptop,
 Trophy,
 Waves,
 Bus,
 Utensils,
 HeartPulse,
 ShieldCheck,
 Sparkles,
 ArrowRight,
 X,
 CheckCircle2
} from 'lucide-react';

const ICON_MAP = {
 Monitor,
 BookOpen,
 FlaskConical,
 Laptop,
 Trophy,
 Waves,
 Bus,
 Utensils,
 HeartPulse
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

export const Facilities = () => {
 const [activeCategory, setActiveCategory] = useState('all');
 const [selectedFacility, setSelectedFacility] = useState(null);

 const filteredFacilities = activeCategory === 'all'
 ? FACILITIES
 : FACILITIES.filter(f => f.category === activeCategory);

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">

 {/* 1. Hero Banner */}
 <PageHeader
 icon={Building2}
 badge="25-Acre World-Class Eco-Campus"
 title="Infrastructure Built for Inspiration & Safety"
 subtitle="State-of-the-art campus designed to provide a safe, stimulating, and technologically advanced environment for modern education."
 bgImage={IMAGES.banners.facilities}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. Category Filter Tabs */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 <SectionTitle
 badge="Campus Amenities"
 title="Explore Facilities by Category"
 subtitle="Click any amenity to view detailed infrastructure specifications and safety protocols."
 theme="dark"
 />

 <div className="mt-10 flex items-center justify-center flex-wrap gap-2.5">
 {FACILITIES_CATEGORIES.map((cat, idx) => {
 const isActive = activeCategory === cat.id;
 return (
 <motion.button
 key={cat.id}
 variants={fadeUp}
 custom={idx}
 onClick={() => setActiveCategory(cat.id)}
 className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${isActive
 ? 'bg-[#166534] text-white shadow-md scale-105 ring-2 ring-emerald-400/50'
 : 'bg-white text-slate-700 hover:bg-[#F0FDF4] hover:text-[#166534] border border-slate-200/80 hover:border-[#166534]/50'
 }`}
 >
 {cat.name}
 </motion.button>
 );
 })}
 </div>

 {/* Facilities Cards Grid */}
 <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
 <AnimatePresence mode="popLayout">
 {filteredFacilities.map((facility, idx) => {
 const IconComp = ICON_MAP[facility.iconName] || Building2;
 return (
 <motion.div
 key={facility.id}
 layout
 variants={fadeScale}
 initial="hidden"
 animate="visible"
 exit="exit"
 custom={idx}
 onClick={() => setSelectedFacility(facility)}
 className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#166534]/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
 >
 <div>
 {/* Facility Image */}
 <div className="relative h-56 overflow-hidden">
 <img
 src={facility.image}
 alt={facility.title}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
 <span className="absolute top-5 left-5 bg-emerald-950/90 text-lime-400 text-[11px] font-bold px-4 py-1.5 rounded-full border border-emerald-600/40 backdrop-blur-sm">
 {facility.badge}
 </span>
 </div>

 {/* Content */}
 <div className="p-6 sm:p-8 space-y-4">
 <div className="flex items-center gap-3">
 <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center shrink-0 group-hover:bg-[#166534] group-hover:text-white transition-colors duration-300 shadow-sm border border-green-100">
 <IconComp className="w-6 h-6" />
 </div>
 <h3 className="font-poppins text-lg font-bold text-slate-900 group-hover:text-[#166534] transition-colors">
 {facility.title}
 </h3>
 </div>
 <p className="font-inter text-xs sm:text-sm text-slate-600 leading-relaxed">
 {facility.shortDesc}
 </p>
 </div>
 </div>

 <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#166534]">
 <span>View Specifications</span>
 <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
 </div>
 </motion.div>
 );
 })}
 </AnimatePresence>
 </motion.div>
 </motion.section>

 {/* 3. Safety & Campus Security Section */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-green-200/90 shadow-xl relative overflow-hidden"
 >
 <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none" />

 <motion.div variants={fadeUp} custom={0} className="max-w-3xl mx-auto text-center space-y-3 mb-12 relative z-10">
 <span className="inline-block text-xs font-bold text-[#166534] uppercase tracking-widest bg-[#F0FDF4] px-4 py-1.5 rounded-full border border-green-200 mb-3 shadow-sm">
 Zero Tolerance Safety Standards
 </span>
 <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-[#111827]">
 Child Safety & Campus Security First
 </h2>
 <p className="font-inter text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
 Every square foot of our 25-acre campus is monitored and secured to provide complete peace of mind for parents.
 </p>
 </motion.div>

 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
 {[
 { icon: ShieldCheck, title: "24/7 HD CCTV", desc: "Over 350+ surveillance cameras covering entry gates, corridors, playgrounds, and buses." },
 { icon: Bus, title: "GPS Bus Tracking", desc: "Live bus route updates for parents via mobile app with panic buttons and lady attendants." },
 { icon: HeartPulse, title: "Resident Doctor", desc: "On-campus 4-bed medical infirmary with qualified nurse and emergency ambulance tie-up." },
 { icon: Sparkles, title: "RFID Smart Pass", desc: "Biometric and RFID attendance cards with instant SMS alerts to parents upon arrival/departure." }
 ].map((item, idx) => {
 const Icon = item.icon;
 return (
 <motion.div 
 key={idx} 
 variants={fadeUp} 
 custom={idx + 1} 
 className="bg-[#F0FDF4]/70 border border-green-100 hover:border-[#166534]/40 p-6 sm:p-8 rounded-2xl text-center space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group/card"
 >
 <div className="w-14 h-14 rounded-2xl bg-[#166534] text-lime-400 mx-auto flex items-center justify-center shadow-md group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300">
 <Icon className="w-7 h-7" />
 </div>
 <h4 className="font-poppins text-base font-bold text-slate-900">{item.title}</h4>
 <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-inter">{item.desc}</p>
 </motion.div>
 );
 })}
 </div>
 </motion.section>

 {/* 4. Campus Tour CTA Banner */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-linear-to-r from-[#166534] to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 sm:mb-20"
 >
 <div className="space-y-3 text-center sm:text-left">
 <h3 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
 Experience the Campus in Person
 </h3>
 <p className="text-base sm:text-lg text-green-100 font-inter">
 Schedule a guided campus walk-through with our admissions team to explore our smart labs, sports complex, and green grounds.
 </p>
 </div>
 <Link
 to={ROUTES.CONTACT}
 className="bg-white text-[#166534] hover:bg-lime-400 hover:text-slate-950 font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-300 inline-flex items-center gap-2 text-base shrink-0 hover:scale-105"
 >
 <span>Book Campus Tour</span>
 <ArrowRight className="w-5 h-5" />
 </Link>
 </motion.section>

 </div>

 {/* Facility Detail Modal */}
 <AnimatePresence>
 {selectedFacility && (
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
 <button
 onClick={() => setSelectedFacility(null)}
 className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-slate-900/60 backdrop-blur-sm text-white hover:bg-slate-900 flex items-center justify-center transition-colors cursor-pointer border border-white/20"
 >
 <X className="w-5 h-5" />
 </button>

 <div className="relative h-72">
 <img
 src={selectedFacility.image}
 alt={selectedFacility.title}
 className="w-full h-full object-cover"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-900/40 to-transparent" />
 <div className="absolute bottom-6 left-8 right-8 text-white">
 <span className="bg-lime-400 text-slate-950 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
 {selectedFacility.badge}
 </span>
 <h3 className="font-poppins text-3xl font-bold mt-3 text-white">
 {selectedFacility.title}
 </h3>
 </div>
 </div>

 <div className="p-8 space-y-5 bg-white">
 <h4 className="font-poppins text-sm font-bold text-[#166534] uppercase tracking-wider flex items-center gap-2">
 <Sparkles className="w-4 h-4" />
 Overview & Infrastructure Specs
 </h4>
 <p className="font-inter text-slate-700 text-base leading-relaxed">
 {selectedFacility.details}
 </p>

 <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
 <span className="text-sm text-slate-500 font-medium">Apex Campus Facility</span>
 <button
 onClick={() => setSelectedFacility(null)}
 className="bg-[#166534] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-emerald-800 transition-colors shadow-md hover:shadow-lg"
 >
 Close Details
 </button>
 </div>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 );
};

export default Facilities;
