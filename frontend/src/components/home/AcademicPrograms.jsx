import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../../data/academics';
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

export const AcademicPrograms = () => {
 return (
 <section className="py-20 sm:py-24 bg-[#F0FDF4] text-slate-900 relative">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto mb-16">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider shadow-sm mb-4"
 >
 <BookOpen className="w-4 h-4 text-[#166534]" />
 <span>Academic Excellence</span>
 </motion.div>
 
 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
 >
 Nurturing Curiosity Across <span className="text-[#166534]">Every Growth Stage</span>
 </motion.h2>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="font-inter mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
 >
 Our progressive curriculum seamlessly transitions learners from early play-based discovery to advanced competitive readiness.
 </motion.p>
 </div>

 {/* Programs Grid */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
 >
 {ACADEMIC_PROGRAMS.map((prog, index) => (
 <motion.div
 key={prog.id}
 variants={fadeUp}
 custom={index}
 className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#166534]/50 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5"
 >
 <div>
 {/* Image Banner */}
 <div className="relative h-44 overflow-hidden">
 <LazyImage
 src={prog.image}
 alt={prog.title}
 fallbackKeywords={['indian', 'school', 'academic']}
 aspectRatio="h-full w-full"
 className="group-hover:scale-110 transition-transform duration-700 absolute inset-0"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-80 pointer-events-none" />
 
 {/* Level Badge */}
 <span className="absolute top-4 left-4 bg-[#166534] text-lime-400 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm border border-emerald-600/40">
 {prog.level}
 </span>
 </div>

 {/* Content */}
 <div className="p-6">
 <span className="font-inter text-xs text-[#166534] font-bold tracking-wider uppercase block mb-1.5">
 {prog.age}
 </span>
 <h3 className="font-poppins text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-[#166534] transition-colors leading-snug">
 {prog.title}
 </h3>
 <p className="font-inter text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4">
 {prog.description}
 </p>

 {/* Highlights List */}
 <div className="space-y-2.5 mb-2 border-t border-slate-100 pt-4">
 {prog.highlights.slice(0, 2).map((item, idx) => (
 <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 group/item">
 <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-[#F0FDF4] group-hover/item:border-green-200 group-hover/item:text-[#166534] transition-colors mt-0.5">
 <CheckCircle2 className="w-3 h-3 text-slate-400 group-hover/item:text-[#166534]" />
 </div>
 <span className="leading-relaxed line-clamp-2">{item}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Card Footer Link */}
 <div className="px-6 pb-6 pt-2">
 <Button to="/academics" variant="outline" size="sm" className="w-full py-2.5 text-xs font-bold group-hover:bg-[#166534] group-hover:text-white group-hover:border-[#166534] transition-colors" icon={ArrowRight}>
 Curriculum Details
 </Button>
 </div>
 </motion.div>
 ))}
 </motion.div>

 </div>
 </section>
 );
};

export default AcademicPrograms;
