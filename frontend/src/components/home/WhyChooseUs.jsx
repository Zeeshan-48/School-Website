import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Award, Cpu, HeartHandshake, ShieldCheck, GraduationCap, Sparkles } from 'lucide-react';
import { WHY_CHOOSE_US } from '../../data/whyChooseUs';

const iconMap = {
 Globe: Globe,
 Award: Award,
 Cpu: Cpu,
 HeartHandshake: HeartHandshake,
 ShieldCheck: ShieldCheck,
 GraduationCap: GraduationCap,
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

export const WhyChooseUs = () => {
 return (
 <section className="py-20 sm:py-24 bg-[#F0FDF4] text-slate-900 relative overflow-hidden">
 {/* Background Subtle Accent Spheres */}
 <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#166534]/5 rounded-full blur-3xl pointer-events-none" />
 <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 
 {/* Section Header */}
 <div className="text-center max-w-3xl mx-auto mb-16">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider shadow-sm mb-4"
 >
 <Sparkles className="w-4 h-4 text-[#166534]" />
 <span>Why Choose Apex International</span>
 </motion.div>
 
 <motion.h2
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight"
 >
 Empowering Minds, <span className="text-[#166534]">Transforming Futures</span>
 </motion.h2>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="font-inter mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
 >
 We provide a modern ecosystem designed to nurture academic brilliance, emotional resilience, and lifelong leadership.
 </motion.p>
 </div>

 {/* Features Grid */}
 <motion.div 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
 >
 {WHY_CHOOSE_US.map((item, index) => {
 const IconComponent = iconMap[item.icon] || Globe;
 return (
 <motion.div
 key={item.id}
 variants={fadeUp}
 custom={index}
 className="group relative bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-[#166534]/50 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5"
 >
 <div className="w-16 h-16 rounded-2xl bg-[#166534] flex items-center justify-center text-lime-400 mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 border border-emerald-700">
 <IconComponent className="w-8 h-8" />
 </div>
 
 <h3 className="font-poppins text-xl font-bold text-slate-900 mb-3 group-hover:text-[#166534] transition-colors leading-snug">
 {item.title}
 </h3>
 
 <p className="font-inter text-slate-600 leading-relaxed text-sm sm:text-base">
 {item.description}
 </p>
 </motion.div>
 );
 })}
 </motion.div>

 </div>
 </section>
 );
};

export default WhyChooseUs;
