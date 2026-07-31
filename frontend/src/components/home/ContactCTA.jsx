import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Clock, CalendarCheck, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { SCHOOL_INFO } from '../../utils/constants';

export const ContactCTA = () => {
 return (
 <section className="py-20 sm:py-24 bg-white relative overflow-hidden text-slate-900">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="bg-linear-to-br from-[#166534] via-[#15803d] to-[#0f532b] rounded-3xl p-8 sm:p-12 lg:p-16 border border-[#166534] shadow-2xl text-white relative overflow-hidden group">

 {/* Subtle background accent sphere */}
 <div className="absolute top-0 right-0 w-125 h-125 bg-lime-400/10 rounded-full blur-3xl pointer-events-none group-hover:bg-lime-400/20 transition-colors duration-1000" />
 <div className="absolute -bottom-32 -left-32 w-100 h-100 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

 {/* Left Content */}
 <div className="lg:col-span-8 space-y-8">
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5 }}
 >
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-xs font-bold uppercase tracking-wider shadow-sm mb-4">
 <Sparkles className="w-4 h-4" />
 <span>Admissions Open for Session 2026-2027</span>
 </div>
 
 <h2 className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
 Begin Your Child's Journey Towards <span className="text-lime-400 drop-shadow-md">Excellence & Success</span>
 </h2>
 </motion.div>

 <motion.p
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.1 }}
 className="font-inter text-green-50 text-base sm:text-lg max-w-2xl leading-relaxed"
 >
 Seats are limited for Nursery to Grade 11. Schedule a personalized campus tour or talk with our admissions counsellor today.
 </motion.p>

 {/* Action Buttons */}
 <motion.div
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.5, delay: 0.2 }}
 className="flex flex-wrap items-center gap-5 pt-2"
 >
 <Button to="/admission#fee-structure" variant="white" size="lg" icon={ArrowRight}>
 Apply Online Now
 </Button>
 <Button to="/contact" variant="outline" size="lg" icon={CalendarCheck} className="text-black border-black/40 hover:bg-black/10">
 Book Campus Tour
 </Button>
 </motion.div>
 </div>

 {/* Right Contact Quick Box */}
 <motion.div 
 initial={{ opacity: 0, x: 20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.3 }}
 className="lg:col-span-4 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 space-y-6 shadow-xl text-slate-900"
 >
 <h3 className="font-poppins text-xl font-bold text-slate-900 pb-4 border-b border-slate-100">
 Admissions Helpline
 </h3>

 <a href={`tel:${SCHOOL_INFO.phone}`} className="flex items-center gap-4 text-slate-600 hover:text-[#166534] transition-colors group/link">
 <div className="w-12 h-12 flex items-center justify-center bg-[#F0FDF4] text-[#166534] rounded-2xl border border-green-100 group-hover/link:bg-[#166534] group-hover/link:text-white transition-colors">
 <Phone className="w-5 h-5" />
 </div>
 <div>
 <p className="font-inter text-xs text-slate-500 font-medium mb-0.5">Call Us Directly</p>
 <p className="font-poppins text-sm font-bold text-slate-900 group-hover/link:text-[#166534] transition-colors">{SCHOOL_INFO.phone}</p>
 </div>
 </a>

 <a href={`mailto:${SCHOOL_INFO.email}`} className="flex items-center gap-4 text-slate-600 hover:text-[#166534] transition-colors group/link">
 <div className="w-12 h-12 flex items-center justify-center bg-[#F0FDF4] text-[#166534] rounded-2xl border border-green-100 group-hover/link:bg-[#166534] group-hover/link:text-white transition-colors">
 <Mail className="w-5 h-5" />
 </div>
 <div>
 <p className="font-inter text-xs text-slate-500 font-medium mb-0.5">Email Admissions</p>
 <p className="font-poppins text-sm font-bold text-slate-900 group-hover/link:text-[#166534] transition-colors">{SCHOOL_INFO.email}</p>
 </div>
 </a>

 <div className="flex items-center gap-4 text-slate-600 pt-2">
 <div className="w-12 h-12 flex items-center justify-center bg-slate-50 text-slate-400 rounded-2xl border border-slate-100">
 <Clock className="w-5 h-5" />
 </div>
 <div>
 <p className="font-inter text-xs text-slate-500 font-medium mb-0.5">Working Hours</p>
 <p className="font-poppins text-sm font-bold text-slate-900">Mon - Sat: 8:00 AM - 4:30 PM</p>
 </div>
 </div>
 </motion.div>

 </div>

 </div>
 </div>
 </section>
 );
};

export default ContactCTA;
