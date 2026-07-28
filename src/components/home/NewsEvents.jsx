import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, BellRing } from 'lucide-react';
import { NEWS_EVENTS } from '../../data/testimonials';
import { Button } from '../common/Button';

export const NewsEvents = () => {
  return (
    <section className="py-20 bg-[#F0FDF4] text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#22C55E]/30 text-[#166534] text-sm font-bold shadow-xs mb-4"
            >
              <BellRing className="w-4 h-4 text-[#166534]" />
              <span>Campus Buzz</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight"
            >
              Latest News & <span className="bg-linear-to-r from-[#166534] via-[#22C55E] to-[#84CC16] bg-clip-text text-transparent">Upcoming Events</span>
            </motion.h2>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_EVENTS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 hover:border-[#166534] transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1.5"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop"; }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-[#166534] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {item.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-[#166534] font-bold mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#166534]" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-poppins text-xl font-bold text-[#111827] mb-3 group-hover:text-[#166534] transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="font-inter text-[#4B5563] text-sm leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read More Link */}
              <div className="p-6 pt-0">
                <Button to="/about" variant="outline" size="sm" className="w-full justify-between" icon={ArrowRight}>
                  Read Full Notice
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default NewsEvents;
