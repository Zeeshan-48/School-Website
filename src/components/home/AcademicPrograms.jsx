import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { ACADEMIC_PROGRAMS } from '../../data/academics';
import { Button } from '../common/Button';

export const AcademicPrograms = () => {
  return (
    <section className="py-16 bg-[#F0FDF4] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-[#22C55E]/30 text-[#166534] text-xs sm:text-sm font-bold shadow-xs mb-3"
          >
            <BookOpen className="w-4 h-4 text-[#166534]" />
            <span>Academic Excellence</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-poppins text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]"
          >
            Nurturing Curiosity Across <span className="bg-linear-to-r from-[#166534] via-[#22C55E] to-[#84CC16] bg-clip-text text-transparent">Every Growth Stage</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-inter mt-3 text-[#4B5563] text-base leading-relaxed"
          >
            Our progressive curriculum seamlessly transitions learners from early play-based discovery to advanced competitive readiness.
          </motion.p>
        </div>

        {/* Programs Grid (Compact Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ACADEMIC_PROGRAMS.map((prog, index) => (
            <motion.div
              key={prog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#166534] transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-lg hover:-translate-y-1"
            >
              <div>
                {/* Compact Image Banner */}
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={prog.image}
                    alt={prog.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Level Badge */}
                  <span className="absolute top-3 left-3 bg-[#166534] text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-xs">
                    {prog.level}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5">
                  <span className="font-inter text-[11px] text-[#166534] font-bold tracking-wider uppercase block mb-1">
                    {prog.age}
                  </span>
                  <h3 className="font-poppins text-base sm:text-lg font-bold text-[#111827] mb-2 group-hover:text-[#166534] transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="font-inter text-[#4B5563] text-xs leading-relaxed line-clamp-2 mb-3">
                    {prog.description}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-1.5 mb-4 border-t border-slate-100 pt-3">
                    {prog.highlights.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-[#4B5563]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#166534] shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compact Card Footer Link */}
              <div className="px-4 sm:px-5 pb-4 pt-0">
                <Button to="/academics" variant="outline" size="sm" className="w-full py-2 text-xs" icon={ArrowRight}>
                  Curriculum Details
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AcademicPrograms;
