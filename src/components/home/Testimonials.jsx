import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';

export const Testimonials = () => {
  return (
    <section className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-[#22C55E]/30 text-[#166534] text-sm font-bold shadow-xs mb-4"
          >
            <MessageSquare className="w-4 h-4 text-[#166534]" />
            <span>Community Voice</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight"
          >
            What Parents & Alumni <span className="bg-linear-to-r from-[#166534] via-[#22C55E] to-[#84CC16] bg-clip-text text-transparent">Say About Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-inter mt-4 text-[#4B5563] text-lg leading-relaxed"
          >
            Real stories from our school family reflecting growth, trust, academic pride, and personal care.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 flex flex-col justify-between relative shadow-md hover:shadow-xl hover:border-[#166534] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Mark */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-green-200/80" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 text-[#84CC16]">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#84CC16]" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-inter text-[#4B5563] text-base leading-relaxed mb-6 italic relative z-10">
                  "{item.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-green-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#166534] shadow-xs"
                />
                <div>
                  <h4 className="font-poppins font-bold text-[#111827] text-sm sm:text-base">{item.name}</h4>
                  <p className="font-inter text-xs text-[#166534] font-bold">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
