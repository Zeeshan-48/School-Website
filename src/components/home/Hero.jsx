import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Send, CheckCircle2, Sparkles, User, Phone, BookOpen } from 'lucide-react';
import { HERO_SLIDES } from '../../data/hero';
import { Button } from '../common/Button';

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    grade: 'Nursery'
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.parentName && formData.phone) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ parentName: '', phone: '', grade: 'Nursery' });
      }, 5000);
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section className="relative w-full min-h-screen bg-slate-950 pt-24 sm:pt-28 pb-16">

      {/* Background Image Carousel with Overlay */}
      <AnimatePresence>
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.bgImage}
            alt={slide.title}
            onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1920&auto=format&fit=crop"; }}
            className="w-full h-full object-cover object-top"
          />
          {/* Reduced Opacity Gradient Overlays for Brighter Images */}
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/75 via-slate-950/50 to-slate-950/20" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-50" />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content & Form Grid Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Carousel Content */}
          <div className="lg:col-span-7 space-y-6 pt-4">

            {/* Badge */}
            <motion.div
              key={`badge-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4]/90 border border-[#22C55E]/40 text-[#166534] text-xs sm:text-sm font-bold backdrop-blur-md shadow-xs"
            >
              <Award className="w-4 h-4 text-[#166534]" />
              <span>{slide.badge}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              key={`title-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-poppins text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight"
            >
              {slide.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              key={`sub-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="font-inter text-slate-200 text-base sm:text-lg sm:leading-relaxed max-w-xl"
            >
              {slide.subtitle}
            </motion.p>

            {/* Call to Actions & Slide Controls */}
            <motion.div
              key={`cta-${slide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button to={slide.ctaPrimaryLink} variant="primary" size="md" icon={ArrowRight}>
                {slide.ctaPrimary}
              </Button>
              <Button to={slide.ctaSecondaryLink} variant="white" size="md">
                {slide.ctaSecondary}
              </Button>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2 ml-auto sm:ml-4">
                <button
                  onClick={prevSlide}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all border border-white/20 cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>

            {/* Carousel Indicator Dots */}
            <div className="flex items-center gap-2 pt-2">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentSlide === index ? 'w-8 bg-[#22C55E]' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Quick Admission Enquiry Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/50 shadow-2xl text-slate-900 relative">

              {/* Form Header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] bg-[#F0FDF4] px-3 py-1 rounded-full border border-green-200">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Admissions Open 2026-27</span>
                  </span>
                  <h3 className="font-poppins text-xl font-extrabold text-[#111827] mt-2">
                    Quick Admission Enquiry
                  </h3>
                </div>
              </div>

              {isSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 bg-green-100 text-[#166534] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-poppins text-lg font-bold text-[#111827]">Enquiry Submitted!</h4>
                  <p className="font-inter text-xs text-[#4B5563]">
                    Thank you, <span className="font-bold text-[#111827]">{formData.parentName}</span>. Our admissions team will call you shortly at <span className="font-bold text-[#166534]">{formData.phone}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Parent Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1.5">
                      Parent / Guardian Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 .bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#166534] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1.5">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 .bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#166534] .focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Grade Selection */}
                  <div>
                    <label className="block text-xs font-bold text-[#111827] mb-1.5">
                      Applying for Grade *
                    </label>
                    <div className="relative">
                      <BookOpen className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.grade}
                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 .bg-slate-50 border border-slate-200 rounded-xl text-sm text-[#111827] focus:outline-none focus:ring-2 focus:ring-[#166534] focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="Nursery">Nursery / Pre-KG</option>
                        <option value="KG">LKG / UKG</option>
                        <option value="Primary">Primary (Grades 1 to 5)</option>
                        <option value="Secondary">Secondary (Grades 6 to 10)</option>
                        <option value="Senior Secondary">Senior Secondary (Grades 11 & 12)</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#166534] hover:bg-[#14532d] text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <Send className="w-4 h-4 text-lime-300" />
                    <span>Submit Admission Enquiry</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    🔒 Your information is confidential & protected.
                  </p>
                </form>
              )}

            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
};

export default Hero;
