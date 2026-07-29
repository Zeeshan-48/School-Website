import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, VIDEO_HIGHLIGHTS } from '../data/gallery';
import { IMAGES } from '../utils/images';
import { ROUTES } from '../utils/routes';
import {
 Camera,
 Video,
 Sparkles,
 X,
 Maximize2,
 Play,
 ArrowRight,
 Layers
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

export const Gallery = () => {
 const [activeCategory, setActiveCategory] = useState('all');
 const [selectedPhoto, setSelectedPhoto] = useState(null);
 const [activeVideo, setActiveVideo] = useState(null);

 const filteredItems = activeCategory === 'all'
 ? GALLERY_ITEMS
 : GALLERY_ITEMS.filter(item => item.category === activeCategory);

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">

 {/* 1. Hero Banner */}
 <PageHeader
 icon={Camera}
 badge="Visual Showcase"
 title="Campus Life & Memories in Pictures"
 subtitle="Browse through our rich collection of campus events, sports achievements, and vibrant student life."
 bgImage={IMAGES.banners.gallery}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. Photo Gallery Section */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 >
 <SectionTitle
 badge="Photo Gallery"
 title="Campus Moments & Achievements"
 subtitle="Click on any photograph to open full-screen view."
 theme="dark"
 />

 {/* Category Filter Tabs */}
 <div className="mt-10 flex items-center justify-center flex-wrap gap-2.5">
 {GALLERY_CATEGORIES.map((cat, idx) => {
 const isActive = activeCategory === cat.id;
 return (
 <motion.button
 key={cat.id}
 variants={fadeUp}
 custom={idx}
 onClick={() => setActiveCategory(cat.id)}
 className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${isActive
 ? 'bg-[#166534] text-white shadow-md scale-105 ring-2 ring-emerald-400/50'
 : 'bg-white text-slate-700 hover:bg-[#F0FDF4] hover:text-[#166534] border border-slate-200/80 hover:border-[#166534]/50'
 }`}
 >
 {cat.name}
 </motion.button>
 );
 })}
 </div>

 {/* Photo Grid */}
 <motion.div layout className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 <AnimatePresence mode="popLayout">
 {filteredItems.map((item, idx) => (
 <motion.div
 key={item.id}
 layout
 variants={fadeScale}
 initial="hidden"
 animate="visible"
 exit="exit"
 custom={idx}
 onClick={() => setSelectedPhoto(item)}
 className="group relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 cursor-pointer transition-all duration-500 hover:-translate-y-1.5"
 >
 <img
 src={item.url}
 alt={item.title}
 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
 />

 {/* Gradient Overlay */}
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

 {/* Top Badge */}
 <div className="absolute top-5 left-5">
 <span className="bg-emerald-950/90 text-lime-400 text-[10px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-600/40 backdrop-blur-sm shadow-sm">
 {item.category}
 </span>
 </div>

 {/* Expand Icon */}
 <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30">
 <Maximize2 className="w-4 h-4" />
 </div>

 {/* Bottom Content */}
 <div className="absolute bottom-5 left-5 right-5 text-white space-y-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
 <h3 className="font-poppins text-lg font-bold leading-snug group-hover:text-lime-400 transition-colors">
 {item.title}
 </h3>
 <p className="font-inter text-xs text-green-100/90 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
 {item.caption}
 </p>
 </div>
 </motion.div>
 ))}
 </AnimatePresence>
 </motion.div>
 </motion.section>

 {/* 3. Video Highlights Section */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl"
 >
 <SectionTitle
 badge="Video Highlights"
 title="School Events & Campus Video Tour"
 subtitle="Watch highlights from our annual events and modern campus life."
 theme="dark"
 />

 <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
 {VIDEO_HIGHLIGHTS.map((video, idx) => (
 <motion.div
 key={video.id}
 variants={fadeUp}
 custom={idx}
 onClick={() => setActiveVideo(video)}
 className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
 >
 <div className="relative h-56">
 <img
 src={video.thumbnail}
 alt={video.title}
 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
 />
 <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors duration-300" />

 {/* Play Button Overlay */}
 <div className="absolute inset-0 flex items-center justify-center">
 <div className="w-16 h-16 rounded-full bg-[#166534] text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-slate-950 transition-all duration-300 ring-4 ring-white/20 group-hover:ring-lime-400/30">
 <Play className="w-7 h-7 fill-current ml-1" />
 </div>
 </div>

 <span className="absolute bottom-4 right-4 bg-slate-950/80 text-white text-[11px] font-bold px-3 py-1 rounded-lg backdrop-blur-sm border border-white/10">
 {video.duration}
 </span>
 </div>

 <div className="p-6 bg-white border-t border-slate-100">
 <h4 className="font-poppins text-lg font-bold text-slate-900 group-hover:text-[#166534] transition-colors line-clamp-2">
 {video.title}
 </h4>
 </div>
 </motion.div>
 ))}
 </div>
 </motion.section>

 {/* 4. CTA Banner */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-linear-to-r from-[#166534] to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 sm:mb-20"
 >
 <div className="space-y-3 text-center sm:text-left">
 <h3 className="font-poppins text-3xl sm:text-4xl font-extrabold text-white">
 Want to see more of Apex School?
 </h3>
 <p className="text-base sm:text-lg text-green-100 font-inter">
 Schedule a visit to tour our facilities and meet our academic mentors.
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

 {/* Lightbox Photo Modal */}
 <AnimatePresence>
 {selectedPhoto && (
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md"
 >
 <motion.div 
 variants={modalVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="relative max-w-5xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 text-white"
 >
 <button
 onClick={() => setSelectedPhoto(null)}
 className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-slate-950/70 text-white hover:bg-lime-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm border border-white/20"
 >
 <X className="w-6 h-6" />
 </button>

 <div className="relative max-h-[75vh] flex items-center justify-center bg-black">
 <img
 src={selectedPhoto.url}
 alt={selectedPhoto.title}
 className="max-h-[75vh] w-auto object-contain mx-auto"
 />
 </div>

 <div className="p-6 sm:p-8 bg-slate-900 space-y-3 border-t border-slate-800">
 <span className="inline-block bg-emerald-900/90 text-lime-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-emerald-600/40">
 {selectedPhoto.category}
 </span>
 <h3 className="font-poppins text-2xl font-bold text-white pt-1">
 {selectedPhoto.title}
 </h3>
 <p className="font-inter text-base text-slate-300 leading-relaxed">
 {selectedPhoto.caption}
 </p>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Video Modal */}
 <AnimatePresence>
 {activeVideo && (
 <motion.div 
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md"
 >
 <motion.div 
 variants={modalVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/30 text-white"
 >
 <button
 onClick={() => setActiveVideo(null)}
 className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-slate-950/70 text-white hover:bg-lime-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm border border-white/20"
 >
 <X className="w-6 h-6" />
 </button>

 <div className="p-6 sm:p-8 space-y-5">
 <h3 className="font-poppins text-xl sm:text-2xl font-bold text-white pr-14">
 {activeVideo.title}
 </h3>
 <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800">
 <iframe
 src={activeVideo.embedUrl}
 title={activeVideo.title}
 className="w-full h-full border-0"
 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
 allowFullScreen
 />
 </div>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>

 </div>
 );
};

export default Gallery;
