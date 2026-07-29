import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, Maximize2, ArrowRight, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/gallery';
import { Button } from '../common/Button';
import { LazyImage } from '../common/LazyImage';

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

export const GalleryPreview = () => {
 const [selectedImage, setSelectedImage] = useState(null);

 return (
 <section className="py-20 sm:py-24 bg-white text-slate-900 relative">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto mb-16">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm"
 >
 <Camera className="w-4 h-4 text-[#166534]" />
 <span>Campus Life & Moments</span>
 </motion.div>

 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
 >
 Life at Apex in <span className="text-[#166534]">Pictures & Memories</span>
 </motion.h2>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="font-inter mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
 >
 A glimpse into our vibrant cultural festivals, athletic victories, science exhibitions, and daily campus joy.
 </motion.p>
 </div>

 {/* Gallery Grid */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
 >
 {GALLERY_ITEMS.slice(0, 6).map((item, index) => (
 <motion.div
 key={item.id}
 variants={fadeUp}
 custom={index}
 onClick={() => setSelectedImage(item)}
 className="group relative h-72 rounded-3xl overflow-hidden cursor-pointer bg-slate-100 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#166534]/50 transition-all duration-300 hover:-translate-y-1.5"
 >
 <LazyImage
 src={item.url}
 alt={item.title}
 fallbackKeywords={['indian', 'school', item.category]}
 aspectRatio="h-full w-full"
 className="group-hover:scale-110 transition-transform duration-700 absolute inset-0"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300 pointer-events-none" />

 {/* Category Badge */}
 <div className="absolute top-5 left-5">
 <span className="bg-emerald-950/90 text-lime-400 text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-full shadow-sm border border-emerald-600/40 backdrop-blur-sm">
 {item.category}
 </span>
 </div>

 {/* Zoom Icon on Hover */}
 <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30">
 <Maximize2 className="w-4 h-4" />
 </div>

 {/* Title & Caption */}
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
 </motion.div>

 {/* View All Button */}
 <motion.div 
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="text-center pt-4"
 >
 <Button to="/gallery" variant="primary" size="lg" icon={ArrowRight}>
 View Full Photo & Video Gallery
 </Button>
 </motion.div>

 </div>

 {/* Lightbox Modal */}
 <AnimatePresence>
 {selectedImage && (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => setSelectedImage(null)}
 className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md p-4 sm:p-6 flex items-center justify-center cursor-pointer"
 >
 <motion.div
 variants={modalVariants}
 initial="hidden"
 animate="visible"
 exit="exit"
 onClick={(e) => e.stopPropagation()}
 className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-emerald-500/30 shadow-2xl text-white"
 >
 <button
 onClick={() => setSelectedImage(null)}
 className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-slate-950/70 text-white hover:bg-lime-400 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer backdrop-blur-sm border border-white/20"
 >
 <X className="w-6 h-6" />
 </button>

 <div className="relative h-96 sm:h-125 flex items-center justify-center bg-black">
 <LazyImage
 src={selectedImage.url}
 alt={selectedImage.title}
 fallbackKeywords={['indian', 'school', selectedImage.category]}
 aspectRatio="h-full w-full"
 className="opacity-90 absolute inset-0"
 />
 </div>

 <div className="p-6 sm:p-8 bg-slate-900 border-t border-slate-800 space-y-3">
 <span className="inline-block px-3.5 py-1.5 bg-emerald-900/90 border border-emerald-600/40 text-lime-400 text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">
 {selectedImage.category}
 </span>
 <h3 className="font-poppins text-2xl font-bold text-white pt-1">
 {selectedImage.title}
 </h3>
 <p className="font-inter text-slate-300 text-base leading-relaxed">
 {selectedImage.caption}
 </p>
 </div>
 </motion.div>
 </motion.div>
 )}
 </AnimatePresence>
 </section>
 );
};

export default GalleryPreview;
