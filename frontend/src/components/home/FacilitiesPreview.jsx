import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, BookOpen, FlaskConical, Laptop, Trophy, Bus, ArrowRight, Sparkles } from 'lucide-react';
import { FACILITIES } from '../../data/facilities';
import { Button } from '../common/Button';
import { LazyImage } from '../common/LazyImage';

const iconMap = {
 Monitor: Monitor,
 BookOpen: BookOpen,
 FlaskConical: FlaskConical,
 Laptop: Laptop,
 Trophy: Trophy,
 Bus: Bus
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

export const FacilitiesPreview = () => {
 return (
 <section className="py-20 sm:py-24 bg-white text-slate-900 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Header */}
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 variants={fadeUp}
 className="max-w-2xl"
 >
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
 <Sparkles className="w-4 h-4" />
 <span>World-Class Campus</span>
 </div>
 
 <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
 Infrastructure Built for <span className="text-[#166534]">Inspiration & Safety</span>
 </h2>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="shrink-0"
 >
 <Button to="/facilities" variant="primary" size="lg" icon={ArrowRight}>
 Explore Full Infrastructure
 </Button>
 </motion.div>
 </div>

 {/* Facilities Grid */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 md:grid-cols-3 gap-8"
 >
 {FACILITIES.slice(0, 3).map((facility, index) => {
 const IconComponent = iconMap[facility.icon] || Monitor;
 return (
 <motion.div
 key={facility.id}
 variants={fadeUp}
 custom={index}
 className="group relative bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#166534]/50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5"
 >
 {/* Background Image Container */}
 <div className="relative h-72 overflow-hidden bg-slate-100">
 <LazyImage
   src={facility.image}
   alt={facility.title}
   fallbackKeywords={['indian', 'school', facility.category]}
   aspectRatio="aspect-[4/3]"
   className="group-hover:scale-110 transition-transform duration-700 w-full h-full"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent opacity-80" />
 
 {/* Badge */}
 <div className="absolute top-5 left-5 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-[#166534] shadow-sm border border-white/50">
 {facility.badge}
 </div>

 {/* Icon Box */}
 <div className="absolute top-5 right-5 w-12 h-12 bg-[#166534] text-lime-400 rounded-2xl flex items-center justify-center shadow-lg border border-emerald-700">
 <IconComponent className="w-6 h-6" />
 </div>
 </div>

 {/* Content Overlay */}
 <div className="p-6 sm:p-8 relative z-10 bg-white -mt-10 mx-5 mb-5 rounded-2xl border border-slate-100 group-hover:border-green-200 transition-colors shadow-lg group-hover:shadow-xl">
 <h3 className="font-poppins text-xl font-bold text-slate-900 mb-2 group-hover:text-[#166534] transition-colors leading-snug">
 {facility.title}
 </h3>
 <p className="font-inter text-slate-600 text-sm leading-relaxed line-clamp-3">
 {facility.shortDesc}
 </p>
 </div>
 </motion.div>
 );
 })}
 </motion.div>

 </div>
 </section>
 );
};

export default FacilitiesPreview;
