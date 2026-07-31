import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BellRing } from 'lucide-react';
import { NEWS_EVENTS } from '../../data/testimonials';
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

export const NewsEvents = () => {
 return (
 <section className="py-20 sm:py-24 bg-[#F0FDF4] text-slate-900 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
 {/* Section Header */}
 <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
 <motion.div
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 variants={fadeUp}
 className="max-w-2xl"
 >
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
 <BellRing className="w-4 h-4 text-[#166534]" />
 <span>Campus Buzz</span>
 </div>
 
 <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
 Latest News & <span className="text-[#166534]">Upcoming Events</span>
 </h2>
 </motion.div>
 </div>

 {/* News Grid */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 md:grid-cols-3 gap-8"
 >
 {NEWS_EVENTS.map((item, index) => (
 <motion.div
 key={item.id}
 variants={fadeUp}
 custom={index}
 className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#166534]/50 transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5"
 >
 <div>
 {/* Image */}
 <div className="relative h-56 overflow-hidden bg-slate-100">
        <LazyImage
          src={item.image}
          alt={item.title}
          fallbackKeywords={['indian', 'school', 'news']}
          aspectRatio="h-56 w-full"
          className="group-hover:scale-110 transition-transform duration-700 absolute inset-0"
        />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
 
 {/* Category Pill */}
 <span className="absolute top-5 left-5 bg-[#166534] text-lime-400 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm border border-emerald-600/40">
 {item.category}
 </span>
 </div>

 {/* Content */}
 <div className="p-6 sm:p-8 relative">
 <div className="flex items-center gap-2 text-xs text-[#166534] font-bold mb-3 uppercase tracking-wider">
 <Calendar className="w-4 h-4 text-[#166534]" />
 <span>{item.date}</span>
 </div>

 <h3 className="font-poppins text-xl font-bold text-slate-900 mb-3 group-hover:text-[#166534] transition-colors line-clamp-2 leading-snug">
 {item.title}
 </h3>

 <p className="font-inter text-slate-600 text-sm leading-relaxed line-clamp-3">
 {item.summary}
 </p>
 </div>
 </div>

 {/* Read More Link */}
 <div className="p-6 sm:p-8 pt-0">
 <Button to="/about" variant="outline" size="sm" className="w-full justify-between group-hover:bg-[#166534] group-hover:text-white group-hover:border-[#166534] transition-colors" icon={ArrowRight}>
 Read Full Notice
 </Button>
 </div>
 </motion.div>
 ))}
 </motion.div>

 </div>
 </section>
 );
};

export default NewsEvents;
