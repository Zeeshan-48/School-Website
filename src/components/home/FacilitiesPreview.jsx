import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, BookOpen, FlaskConical, Laptop, Trophy, Bus, ArrowRight, Sparkles } from 'lucide-react';
import { FACILITIES } from '../../data/facilities';
import { Button } from '../common/Button';

const iconMap = {
  Monitor: Monitor,
  BookOpen: BookOpen,
  FlaskConical: FlaskConical,
  Laptop: Laptop,
  Trophy: Trophy,
  Bus: Bus
};

export const FacilitiesPreview = () => {
  return (
    <section className="py-20 bg-white text-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-[#22C55E]/30 text-[#166534] text-sm font-bold shadow-xs mb-4"
            >
              <Sparkles className="w-4 h-4 text-[#166534]" />
              <span>World-Class Campus</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight"
            >
              Infrastructure Built for <span className="bg-linear-to-r from-[#166534] via-[#22C55E] to-[#84CC16] bg-clip-text text-transparent">Inspiration & Safety</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Button to="/facilities" variant="primary" size="md" icon={ArrowRight}>
              Explore Full Infrastructure
            </Button>
          </motion.div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility, index) => {
            const IconComponent = iconMap[facility.icon] || Monitor;
            return (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#166534] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5"
              >
                {/* Background Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=800&auto=format&fit=crop"; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-[#166534] shadow-xs border border-green-100">
                    {facility.badge}
                  </div>

                  {/* Icon Box */}
                  <div className="absolute top-4 right-4 p-3 bg-[#166534] text-white rounded-xl shadow-md">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="p-6 relative z-10 bg-white -mt-8 mx-4 rounded-xl border border-slate-200/90 group-hover:border-green-300 transition-colors shadow-xs">
                  <h3 className="font-poppins text-xl font-bold text-[#111827] mb-2 group-hover:text-[#166534] transition-colors">
                    {facility.title}
                  </h3>
                  <p className="font-inter text-[#4B5563] text-sm leading-relaxed">
                    {facility.shortDesc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FacilitiesPreview;
