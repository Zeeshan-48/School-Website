import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShieldCheck, Award, Users, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export const AboutSchool = () => {
  const pillars = [
    { title: "Academic Excellence", desc: "Rigorous global curriculum with 100% board distinction rates." },
    { title: "STEM & Innovation", desc: "Hands-on robotics, coding, and 3D printing laboratories." },
    { title: "Character & Values", desc: "Focusing on ethics, empathy, global citizenship, and discipline." },
    { title: "Sports & Creativity", desc: "Olympic-grade athletic facilities and vibrant arts academies." }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image Mosaic */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop"
                alt="Apex Campus Life"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"; }}
                className="w-full h-[400px] sm:h-[480px] object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-transparent to-transparent" />
            </div>

            {/* Overlapping Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-2 sm:right-6 z-20 bg-blue-950 text-white p-6 rounded-2xl shadow-xl max-w-xs border border-blue-800"
            >
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-400 text-slate-950 rounded-xl font-extrabold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-amber-400">25+ Years</h4>
                  <p className="text-xs text-slate-300">Of Educational Leadership & Academic Glory</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative background accent */}
            <div className="absolute -top-6 -left-6 w-72 h-72 bg-blue-200/50 rounded-2xl -z-10 transform -rotate-3" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-800 text-sm font-bold">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>About Apex International</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Where Passion Meets <span className="bg-linear-to-r from-blue-700 to-sky-600 bg-clip-text text-transparent">Purpose & Knowledge</span>
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Founded with a vision to redefine modern schooling, Apex International combines world-class infrastructure with compassionate mentorship. We believe every child possesses unique genius waiting to be unlocked.
            </p>

            {/* Core Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white shadow-sm border border-slate-100">
                  <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{pillar.title}</h4>
                    <p className="text-xs text-slate-500">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
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
