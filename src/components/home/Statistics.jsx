import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, GraduationCap, Trophy, Globe, Sparkles } from 'lucide-react';

export const Statistics = () => {
  const stats = [
    { id: 1, label: "Enrolled Students", value: "2,500+", icon: Users, desc: "Active & engaged learners" },
    { id: 2, label: "Board Distinction", value: "100%", icon: Award, desc: "CBSE Grade 10 & 12 results" },
    { id: 3, label: "Postgraduate Faculty", value: "85+", icon: GraduationCap, desc: "Internationally trained educators" },
    { id: 4, label: "Co-Curricular Clubs", value: "40+", icon: Trophy, desc: "Robotics, debate, music & sports" },
    { id: 5, label: "Global University Admits", value: "100%", icon: Globe, desc: "Ivy League & top national colleges" },
  ];

  return (
    <section className="py-20 bg-linear-to-r from-[#F0FDF4] via-[#FFFFFF] to-[#F0FDF4] text-slate-900 relative overflow-hidden border-y border-green-100">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-green-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-lime-200/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#22C55E]/30 text-[#166534] text-xs sm:text-sm font-bold shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#166534]" />
            <span>Proven Track Record of Excellence</span>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200/90 text-center shadow-md hover:shadow-xl hover:border-[#166534] hover:-translate-y-1.5 transition-all duration-300"
              >
                {/* Icon Box */}
                <div className="w-14 h-14 mx-auto rounded-2xl bg-linear-to-br from-[#166534] to-[#22C55E] text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                {/* Counter Value */}
                <div className="font-poppins text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight group-hover:text-[#166534] transition-colors">
                  {stat.value}
                </div>

                {/* Metric Label */}
                <div className="font-poppins text-sm font-bold text-[#111827] mt-2">
                  {stat.label}
                </div>

                {/* Subtitle / Description */}
                <p className="font-inter text-xs text-[#4B5563] mt-1 leading-relaxed">
                  {stat.desc}
                </p>

                {/* Top Border Accent */}
                <div className="absolute top-0 left-6 right-6 h-1 bg-linear-to-r from-[#166534] to-[#84CC16] rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Statistics;
