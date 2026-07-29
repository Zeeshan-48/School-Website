import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials';
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

export const Testimonials = () => {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4] border border-green-200 text-[#166534] text-xs font-bold uppercase tracking-wider shadow-sm mb-4"
          >
            <MessageSquare className="w-4 h-4 text-[#166534]" />
            <span>Community Voice</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
          >
            What Parents & Alumni <span className="text-[#166534]">Say About Us</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-inter mt-4 text-slate-600 text-base sm:text-lg leading-relaxed"
          >
            Real stories from our school family reflecting growth, trust, academic pride, and personal care.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              variants={fadeUp}
              custom={index}
              className="bg-[#F0FDF4]/60 border border-green-100 rounded-3xl p-8 sm:p-10 flex flex-col justify-between relative shadow-md hover:shadow-xl hover:border-[#166534]/50 transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Quote Mark */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#166534]/10 group-hover:text-[#166534]/20 transition-colors" />

              <div>
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6 text-lime-500">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-lime-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="font-inter text-slate-600 text-sm sm:text-base leading-relaxed mb-8 italic relative z-10">
                  "{item.content}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-green-100">
                <LazyImage
                  src={item.avatar}
                  alt={item.name}
                  fallbackKeywords={['indian', 'portrait']}
                  aspectRatio="aspect-square w-12 h-12"
                  className="rounded-full object-cover border-2 border-[#166534] shadow-sm"
                />
                <div>
                  <h4 className="font-poppins font-bold text-slate-900 text-sm">{item.name}</h4>
                  <p className="font-inter text-xs text-[#166534] font-bold mt-0.5">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
