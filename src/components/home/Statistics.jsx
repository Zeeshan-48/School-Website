import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, GraduationCap, Trophy, Globe, Sparkles } from 'lucide-react';

/* ─── animation helpers ─── */
const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: (i = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
 })
};

export const Statistics = () => {
 const stats = [
 { id: 1, label: "Enrolled Students", value: "2,500+", icon: Users, desc: "Active & engaged learners" },
 { id: 2, label: "Board Distinction", value: "100%", icon: Award, desc: "CBSE Grade 10 & 12 results" },
 { id: 3, label: "Postgraduate Faculty", value: "85+", icon: GraduationCap, desc: "Internationally trained educators" },
 { id: 4, label: "Co-Curricular Clubs", value: "40+", icon: Trophy, desc: "Robotics, debate, music & sports" },
 { id: 5, label: "Global University Admits", value: "100%", icon: Globe, desc: "Ivy League & top national colleges" },
 ];

 return (
 <section className="py-20 sm:py-24 bg-linear-to-b from-[#F0FDF4] via-white to-white text-slate-900 relative overflow-hidden border-t border-green-100">
 {/* Background Soft Glow Accents */}
 <div className="absolute top-1/2 left-0 w-125 h-125 bg-[#166534]/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 -translate-x-1/2" />
 <div className="absolute top-1/2 right-0 w-125 h-125 bg-lime-400/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 
 {/* Header Badge */}
 <div className="text-center mb-16">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider shadow-sm"
 >
 <Sparkles className="w-4 h-4" />
 <span>Proven Track Record of Excellence</span>
 </motion.div>
 </div>

 {/* Stats Grid */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8"
 >
 {stats.map((stat, idx) => {
 const IconComponent = stat.icon;
 return (
 <motion.div
 key={stat.id}
 variants={fadeUp}
 custom={idx}
 className="group relative bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 text-center shadow-md hover:shadow-xl hover:border-[#166534]/50 hover:-translate-y-1.5 transition-all duration-300"
 >
 {/* Icon Box */}
 <div className="w-16 h-16 mx-auto rounded-2xl bg-[#166534] text-lime-400 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 border border-emerald-700">
 <IconComponent className="w-8 h-8" />
 </div>

 {/* Counter Value */}
 <div className="font-poppins text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight group-hover:text-[#166534] transition-colors">
 {stat.value}
 </div>

 {/* Metric Label */}
 <div className="font-poppins text-sm font-bold text-slate-900 mt-2">
 {stat.label}
 </div>

 {/* Subtitle / Description */}
 <p className="font-inter text-xs text-slate-500 mt-2 leading-relaxed">
 {stat.desc}
 </p>

 {/* Top Border Accent */}
 <div className="absolute top-0 left-6 right-6 h-1 bg-[#166534] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
 </motion.div>
 );
 })}
 </motion.div>

 </div>
 </section>
 );
};

export default Statistics;
