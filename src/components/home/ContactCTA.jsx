import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Mail, Clock, CalendarCheck, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { SCHOOL_INFO } from '../../utils/constants';

export const ContactCTA = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-linear-to-br from-[#166534] via-[#15803d] to-[#0f532b] rounded-3xl p-8 sm:p-12 lg:p-16 border border-green-700 shadow-2xl text-white relative overflow-hidden">

          {/* Subtle background accent sphere */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">

            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#84CC16]/20 border border-[#84CC16]/40 text-lime-300 text-sm font-bold shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>Admissions Open for Session 2026-2027</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight"
              >
                Begin Your Child's Journey Towards <span className="bg-linear-to-r from-lime-300 via-emerald-200 to-white bg-clip-text text-transparent">Excellence & Success</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="font-inter text-green-100 text-lg max-w-2xl leading-relaxed"
              >
                Seats are limited for Nursery to Grade 11. Schedule a personalized campus tour or talk with our admissions counsellor today.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button to="/admission" variant="gold" size="lg" icon={ArrowRight}>
                  Apply Online Now
                </Button>
                <Button to="/contact" variant="glass" size="lg" icon={CalendarCheck} className="text-white hover:bg-white/20 border-white/30">
                  Book Campus Tour
                </Button>
              </motion.div>
            </div>

            {/* Right Contact Quick Box */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 space-y-4 shadow-xl text-slate-900">
              <h3 className="font-poppins text-xl font-bold text-[#111827] mb-4 border-b border-slate-100 pb-3">
                Admissions Helpline
              </h3>

              <a href={`tel:${SCHOOL_INFO.phone}`} className="flex items-center gap-4 text-[#4B5563] hover:text-[#166534] transition-colors">
                <div className="p-3 bg-[#F0FDF4] text-[#166534] rounded-xl border border-green-100">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-inter text-xs text-[#4B5563] font-medium">Call Us Directly</p>
                  <p className="font-poppins text-sm font-bold text-[#111827]">{SCHOOL_INFO.phone}</p>
                </div>
              </a>

              <a href={`mailto:${SCHOOL_INFO.email}`} className="flex items-center gap-4 text-[#4B5563] hover:text-[#166534] transition-colors">
                <div className="p-3 bg-[#F0FDF4] text-[#166534] rounded-xl border border-green-100">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-inter text-xs text-[#4B5563] font-medium">Email Admissions</p>
                  <p className="font-poppins text-sm font-bold text-[#111827]">{SCHOOL_INFO.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 text-[#4B5563]">
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-inter text-xs text-[#4B5563] font-medium">Working Hours</p>
                  <p className="font-poppins text-sm font-bold text-[#111827]">Mon - Sat: 8:00 AM - 4:30 PM</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
