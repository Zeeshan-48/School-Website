import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Award, Send, CheckCircle2, Sparkles, User, Phone, BookOpen } from 'lucide-react';
import { HERO_SLIDES } from '../../data/hero';
import { Button } from '../common/Button';
import { getFallbackUrl } from '../../utils/images';
import { createInquiry } from '../../services/admissionService';

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
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.parentName && formData.phone) {
            try {
                await createInquiry({
                    fullName: formData.parentName,
                    email: 'Not Provided (Quick Enquiry)',
                    phone: formData.phone,
                    subject: `Quick Admission Enquiry - ${formData.grade}`,
                    message: `Parent/Guardian ${formData.parentName} submitted a quick admission enquiry for ${formData.grade} grade. Please contact them at ${formData.phone}.`
                });
                setIsSubmitted(true);
                setTimeout(() => {
                    setIsSubmitted(false);
                    setFormData({ parentName: '', phone: '', grade: 'Nursery' });
                }, 5000);
            } catch (error) {
                console.error('Failed to submit quick enquiry', error);
            }
        }
    };

    const slide = HERO_SLIDES[currentSlide];

    return (
        // mt-[76px] perfectly offsets the navbar. 
        // min-h-[43vh] for mobile, lg:min-h-[calc(100vh-76px)] ensures a full screen banner profile on laptops.
        <section className="relative w-full bg-slate-950 mt-[76px] min-h-[43vh] lg:min-h-[calc(100vh-76px)] flex items-center overflow-hidden">

            {/* Carousel Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence>
                    <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 bg-slate-950 flex items-center justify-center"
                    >
                        <img
                            src={slide.bgImage}
                            alt={slide.title}
                            onError={(e) => { e.target.onerror = null; e.target.src = getFallbackUrl(['indian', 'school', 'hero']); }}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                        {/* Gradients */}
                        <div className="absolute inset-0 z-20 bg-linear-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />
                        <div className="absolute inset-0 z-20 bg-linear-to-t from-slate-950/90 via-transparent to-transparent opacity-70 lg:opacity-50" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Side Floating Navigation Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/40 hover:bg-[#166534] text-white border border-white/20 hover:border-lime-400 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 group"
                aria-label="Previous Slide"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-slate-950/40 hover:bg-[#166534] text-white border border-white/20 hover:border-lime-400 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer hover:scale-110 group"
                aria-label="Next Slide"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Content Container */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-12 sm:px-20 lg:px-8 py-8 sm:py-10 lg:py-0">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 h-full items-center">

                    {/* Left Column: Carousel Content */}
                    <div className="lg:col-span-7 space-y-3 sm:space-y-4 flex flex-col items-center lg:items-start text-center lg:text-left">

                        {/* Badge */}
                        <motion.div
                            key={`badge-${slide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F0FDF4]/90 border border-green-400/40 text-[#166534] text-xs sm:text-sm font-bold backdrop-blur-md shadow-sm"
                        >
                            <Award className="w-4 h-4 text-[#166534]" />
                            <span className="uppercase tracking-wider">{slide.badge}</span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            key={`title-${slide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="font-poppins text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-lg"
                        >
                            {slide.title}
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            key={`sub-${slide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="font-inter text-slate-200 text-xs sm:text-base lg:text-lg sm:leading-relaxed max-w-xl mb-4 sm:mb-6 drop-shadow-md"
                        >
                            {slide.subtitle}
                        </motion.p>

                        {/* Call to Actions & Slide Controls */}
                        <motion.div
                            key={`cta-${slide.id}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-2"
                        >
                            <Button to={slide.ctaPrimaryLink} variant="primary" size="lg" icon={ArrowRight}>
                                {slide.ctaPrimary}
                            </Button>
                            <Button to={slide.ctaSecondaryLink} variant="white" size="lg">
                                {slide.ctaSecondary}
                            </Button>
                        </motion.div>

                        {/* Carousel Indicator Dots */}
                        <div className="flex items-center justify-center lg:justify-start gap-2.5 pt-6 sm:pt-8 w-full">
                            {HERO_SLIDES.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${currentSlide === index ? 'w-10 bg-lime-400 shadow-[0_0_10px_rgba(163,230,53,0.5)]' : 'w-2.5 bg-white/40 hover:bg-white/70'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                    </div>

                    {/* Right Column: Quick Admission Enquiry Form Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="hidden lg:block lg:col-span-5"
                    >
                        <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-10 rounded-3xl border border-white/40 shadow-2xl text-slate-900 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-full blur-2xl pointer-events-none group-hover:bg-lime-400/20 transition-colors duration-500" />

                            {/* Form Header */}
                            <div className="flex items-center justify-between pb-5 mb-5 border-b border-slate-100">
                                <div>
                                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#166534] bg-[#F0FDF4] px-3.5 py-1.5 rounded-full border border-green-200">
                                        <Sparkles className="w-3.5 h-3.5" />
                                        <span className="uppercase tracking-wider">Admissions Open 2026-27</span>
                                    </span>
                                    <h3 className="font-poppins text-2xl font-extrabold text-slate-900 mt-3">
                                        Quick Admission Enquiry
                                    </h3>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="py-12 text-center space-y-4"
                                    >
                                        <div className="w-16 h-16 bg-[#F0FDF4] text-[#166534] rounded-full flex items-center justify-center mx-auto shadow-inner border border-green-100">
                                            <CheckCircle2 className="w-8 h-8" />
                                        </div>
                                        <h4 className="font-poppins text-xl font-bold text-slate-900">Enquiry Submitted!</h4>
                                        <p className="font-inter text-sm text-slate-600 leading-relaxed">
                                            Thank you, <span className="font-bold text-slate-900">{formData.parentName}</span>. Our admissions team will call you shortly at <span className="font-bold text-[#166534]">{formData.phone}</span>.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        {/* Parent Name */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                                Parent / Guardian Name *
                                            </label>
                                            <div className="relative">
                                                <User className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="text"
                                                    required
                                                    placeholder="Enter your full name"
                                                    value={formData.parentName}
                                                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Number */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                                <input
                                                    type="tel"
                                                    required
                                                    placeholder="+91 98765 43210"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all shadow-sm"
                                                />
                                            </div>
                                        </div>

                                        {/* Grade Selection */}
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                                                Applying for Grade *
                                            </label>
                                            <div className="relative">
                                                <BookOpen className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                                                <select
                                                    value={formData.grade}
                                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-all shadow-sm appearance-none cursor-pointer"
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
                                            className="w-full bg-[#166534] hover:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4 group"
                                        >
                                            <Send className="w-4 h-4 text-lime-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                            <span>Submit Admission Enquiry</span>
                                        </button>

                                        <p className="text-[11px] text-center text-slate-500 pt-2 font-medium">
                                            🔒 Your information is confidential & protected.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                        </div>
                    </motion.div>

                </div>
            </div>

        </section>
    );
};

export default Hero;
