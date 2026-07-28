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

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-[#F0FDF4] text-slate-900 relative overflow-hidden">
      {/* Background Subtle Accent Spheres */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-lime-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#22C55E]/30 text-[#166534] text-sm font-bold shadow-xs mb-4"
          >
            <Sparkles className="w-4 h-4 text-[#166534]" />
            <span>Why Choose Apex International</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-poppins text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]"
          >
            Empowering Minds, <span className="bg-linear-to-r from-[#166534] via-[#22C55E] to-[#84CC16] bg-clip-text text-transparent">Transforming Futures</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="font-inter mt-4 text-[#4B5563] text-lg leading-relaxed"
          >
            We provide a modern ecosystem designed to nurture academic brilliance, emotional resilience, and lifelong leadership.
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_US.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Globe;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 border border-slate-200/90 hover:border-[#166534] transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1.5"
              >
                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#166534] to-[#22C55E] flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="font-poppins text-xl font-bold text-[#111827] mb-3 group-hover:text-[#166534] transition-colors">
                  {item.title}
                </h3>
                
                <p className="font-inter text-[#4B5563] leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
