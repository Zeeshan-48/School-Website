import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Users, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { LazyImage } from '../common/LazyImage';
import { IMAGES } from '../../utils/images';
import aboutImg from '../../assets/about_img.png';

/* ─── animation helpers ─── */
const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: (i = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
 })
};

export const AboutSchool = () => {
 const pillars = [
 { title: "Academic Excellence", desc: "Rigorous global curriculum with 100% board distinction rates." },
 { title: "STEM & Innovation", desc: "Hands-on robotics, coding, and 3D printing laboratories." },
 { title: "Character & Values", desc: "Focusing on ethics, empathy, global citizenship, and discipline." },
 { title: "Sports & Creativity", desc: "Olympic-grade athletic facilities and vibrant arts academies." }
 ];

 return (
 <section className="py-20 sm:py-24 bg-slate-50 relative overflow-hidden">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

 {/* Left Column: Image Mosaic */}
 <motion.div
 initial={{ opacity: 0, x: -30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, amount: 0.2 }}
 transition={{ duration: 0.6 }}
 className="relative"
 >
 <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
 <LazyImage
 src={aboutImg}
 alt="Apex Campus Life"
 fallbackKeywords={['indian', 'school', 'campus']}
 aspectRatio="h-100 sm:h-120 w-full"
 className="group-hover:scale-105 transition-transform duration-700 absolute inset-0"
 />
 <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent opacity-80 pointer-events-none" />
 </div>

 {/* Overlapping Floating Badge */}
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.4 }}
 className="absolute -bottom-8 -right-2 sm:-right-8 z-20 bg-[#071F10] text-white p-6 sm:p-8 rounded-3xl shadow-xl max-w-70 border border-emerald-900"
 >
 <div className="flex items-start gap-4">
 <div className="p-3 bg-[#166534] text-lime-400 rounded-2xl shadow-inner border border-emerald-700">
 <Award className="w-7 h-7" />
 </div>
 <div>
 <h4 className="font-poppins text-3xl font-black text-white">25+ <span className="text-lime-400 text-lg">Years</span></h4>
 <p className="font-inter text-xs text-green-100/90 mt-1 leading-relaxed">Of Educational Leadership & Academic Glory</p>
 </div>
 </div>
 </motion.div>

 {/* Decorative background accent */}
 <div className="absolute -top-8 -left-8 w-64 h-64 bg-[#166534]/10 rounded-full blur-3xl -z-10" />
 </motion.div>

 {/* Right Column: Content */}
 <motion.div
 initial={{ opacity: 0, x: 30 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true, amount: 0.2 }}
 transition={{ duration: 0.6 }}
 className="space-y-8 lg:pl-6"
 >
 <div>
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
 <Sparkles className="w-4 h-4" />
 <span>About Apex International</span>
 </div>

 <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
 Where Passion Meets <span className="text-[#166534]">Purpose & Knowledge</span>
 </h2>
 </div>

 <p className="font-inter text-slate-600 text-base sm:text-lg leading-relaxed">
 Founded with a vision to redefine modern schooling, Apex International combines world-class infrastructure with compassionate mentorship. We believe every child possesses unique genius waiting to be unlocked.
 </p>

 {/* Core Pillars List */}
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
 {pillars.map((pillar, idx) => (
 <motion.div 
 key={idx} 
 variants={fadeUp}
 initial="hidden"
 whileInView="visible"
 custom={idx}
 viewport={{ once: true }}
 className="flex items-start gap-4 p-5 rounded-2xl bg-white shadow-sm hover:shadow-md border border-slate-100 hover:border-[#166534]/30 transition-all group"
 >
 <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center shrink-0 border border-green-100 group-hover:bg-[#166534] group-hover:text-white transition-colors">
 <CheckCircle2 className="w-5 h-5" />
 </div>
 <div>
 <h4 className="font-poppins font-bold text-slate-900 text-sm mb-1 group-hover:text-[#166534] transition-colors">{pillar.title}</h4>
 <p className="font-inter text-xs text-slate-500 leading-relaxed">{pillar.desc}</p>
 </div>
 </motion.div>
 ))}
 </div>

 {/* Action Buttons */}
 <div className="pt-6 flex flex-wrap items-center gap-5">
 <Button to="/about" variant="primary" size="lg" icon={ArrowRight}>
 Discover Our Heritage
 </Button>
 <Button to="/facilities" variant="outline" size="lg">
 Explore Campus
 </Button>
 </div>

 </motion.div>

 </div>
 </div>
 </section>
 );
};

export default AboutSchool;
