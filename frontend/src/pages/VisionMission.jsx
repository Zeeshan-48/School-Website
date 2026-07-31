import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { ROUTES } from '../utils/routes';
import { IMAGES } from '../utils/images';
import { LazyImage } from '../components/common/LazyImage';
import {
 Eye,
 Target,
 Compass,
 Award,
 ShieldCheck,
 Heart,
 Lightbulb,
 Users,
 BookOpen,
 ArrowRight,
 CheckCircle2,
 GraduationCap,
 Globe,
 Shield,
 Handshake,
 Sparkles,
 Quote,
 UserCheck,
 Laptop,
 TreePine
} from 'lucide-react';

/* ─── animation helpers ─── */
const fadeUp = {
 hidden: { opacity: 0, y: 30 },
 visible: (i = 0) => ({
 opacity: 1,
 y: 0,
 transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' }
 })
};

/* ─── static data ─── */
const MISSION_POINTS = [
 {
 icon: Award,
 title: 'Academic Excellence',
 desc: 'Delivering world-class CBSE education through innovative pedagogy, experiential learning, and rigorous competitive exam preparation.'
 },
 {
 icon: Heart,
 title: 'Character Development',
 desc: 'Building empathetic, ethical, and resilient individuals through value-driven mentoring and holistic personality enrichment.'
 },
 {
 icon: Lightbulb,
 title: 'Innovation & Creativity',
 desc: 'Nurturing critical thinking and creativity through STEM labs, robotics, AI workshops, and hands-on design thinking programs.'
 },
 {
 icon: GraduationCap,
 title: 'Leadership & Empowerment',
 desc: 'Cultivating confident student leaders through MUN, debate clubs, student council, and community service initiatives.'
 },
 {
 icon: Users,
 title: 'Inclusivity & Diversity',
 desc: 'Celebrating diverse backgrounds and learning styles with inclusive classrooms and personalised student support systems.'
 },
 {
 icon: BookOpen,
 title: 'Lifelong Learning',
 desc: 'Instilling a passion for continuous growth through reading culture, research projects, and global exposure programs.'
 }
];

const CORE_VALUES = [
 {
 icon: ShieldCheck,
 title: 'Integrity',
 desc: 'Upholding honesty, transparency, and ethical standards in every decision and interaction.'
 },
 {
 icon: Award,
 title: 'Excellence',
 desc: 'Pursuing the highest standards of academic, creative, and athletic achievement relentlessly.'
 },
 {
 icon: Handshake,
 title: 'Respect',
 desc: 'Honouring every individual with dignity, kindness, and appreciation for diverse perspectives.'
 },
 {
 icon: Lightbulb,
 title: 'Innovation',
 desc: 'Embracing new ideas, technologies, and creative solutions to shape the future of education.'
 },
 {
 icon: Users,
 title: 'Collaboration',
 desc: 'Fostering teamwork among students, educators, and parents for shared educational success.'
 },
 {
 icon: Shield,
 title: 'Responsibility',
 desc: 'Nurturing accountability, environmental stewardship, and a sense of duty towards community.'
 }
];

const WHY_CHOOSE = [
 { icon: GraduationCap, title: 'Student-Centered Learning', desc: 'Every curriculum decision prioritises student growth, curiosity, and individual potential.' },
 { icon: Globe, title: 'Global Perspective', desc: 'International exchange programs and multicultural exposure prepare students for a connected world.' },
 { icon: Laptop, title: 'Modern Education', desc: 'Smart classrooms, AI labs, and digital libraries ensure technology-integrated learning.' },
 { icon: Shield, title: 'Safe Environment', desc: 'CCTV surveillance, RFID attendance, counsellors, and anti-bullying policies ensure campus safety.' },
 { icon: UserCheck, title: 'Experienced Faculty', desc: '120+ certified educators with advanced degrees and continuous professional development.' }
];

export const VisionMission = () => {
 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">

 {/* 1. Hero Banner */}
 <PageHeader
 icon={Eye}
 badge="Our Guiding Principles"
 title="Vision & Mission"
 subtitle="The foundational beliefs and aspirations that drive Apex International School towards educational greatness."
 bgImage={IMAGES.banners.vision}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. Introduction Section */}
 <motion.section
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
 >
 <motion.div variants={fadeUp} custom={0} className="space-y-6">
 <span className="inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-[#F0FDF4] border border-[#22C55E]/30 text-[#166534] rounded-full shadow-xs">
 Our Purpose
 </span>
 <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827] leading-tight">
 Shaping Futures Through <span className="text-[#166534]">Purposeful Education</span>
 </h2>
 <p className="font-inter text-slate-600 text-base sm:text-lg leading-relaxed">
 At Apex International School, we believe education is more than textbooks and exams. It is about igniting curiosity, building character, and preparing every child to lead with compassion and confidence in a rapidly evolving world.
 </p>
 <p className="font-inter text-slate-600 text-base leading-relaxed">
 Our vision and mission statements are not mere words — they are the compass that guides every classroom decision, every teacher's approach, and every student's journey from nursery through graduation.
 </p>
 <div className="flex items-center gap-4 pt-2">
 <div className="flex items-center gap-2 text-sm font-semibold text-[#166534]">
 <CheckCircle2 className="w-5 h-5" />
 <span>28+ Years of Excellence</span>
 </div>
 <div className="flex items-center gap-2 text-sm font-semibold text-[#166534]">
 <CheckCircle2 className="w-5 h-5" />
 <span>CBSE Affiliated</span>
 </div>
 </div>
 </motion.div>

 <motion.div variants={fadeUp} custom={2} className="relative">
 <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200/80">
 <LazyImage
   src={IMAGES.news.cultural}
   alt="Apex School Campus"
   fallbackKeywords={['indian', 'school', 'campus']}
   aspectRatio="h-80 sm:h-100 w-full"
   className="absolute inset-0"
 />
 </div>
 {/* Decorative floating badge */}
 <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#166534] text-white rounded-2xl p-4 sm:p-5 shadow-xl">
 <Sparkles className="w-6 h-6 text-lime-400 mb-1" />
 <p className="font-poppins text-xl sm:text-2xl font-extrabold leading-none">2,500+</p>
 <p className="text-xs text-green-200 font-medium mt-0.5">Students Enrolled</p>
 </div>
 </motion.div>
 </motion.section>

 {/* 3. Vision Section */}
 <motion.section
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.2 }}
 >
 <SectionTitle
 badge="Our Vision"
 title="Where We Aspire to Be"
 subtitle="A bold, forward-looking vision that places students at the centre of every innovation."
 theme="dark"
 />
 <motion.div
 variants={fadeUp}
 custom={1}
 className="mt-10 bg-white rounded-3xl p-8 sm:p-12 shadow-lg border border-slate-200/80 relative overflow-hidden group hover:border-[#166534] hover:shadow-xl transition-all duration-300"
 >
 <div className="flex flex-col sm:flex-row items-start gap-6">
 <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center shrink-0 group-hover:bg-[#166534] group-hover:text-white transition-colors duration-300">
 <Compass className="w-8 h-8" />
 </div>
 <div className="flex-1 space-y-4">
 <h3 className="font-poppins text-2xl sm:text-3xl font-bold text-slate-900">Our Vision</h3>
 <p className="font-inter text-slate-600 text-base sm:text-lg leading-relaxed">
 To be a globally recognized centre of educational excellence that empowers students to become compassionate, innovative, and responsible global leaders — equipped with cutting-edge knowledge, unwavering moral values, and the confidence to transform the world.
 </p>
 <div className="flex flex-wrap gap-3 pt-2">
 {['Global Recognition', 'Innovation Hub', 'Compassionate Leaders', 'Future-Ready'].map((tag) => (
 <span key={tag} className="text-xs font-bold text-[#166534] bg-[#F0FDF4] px-3 py-1.5 rounded-full border border-[#22C55E]/30">
 {tag}
 </span>
 ))}
 </div>
 </div>
 </div>
 <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
 </motion.div>
 </motion.section>

 {/* 4. Mission Section */}
 <motion.section
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 >
 <SectionTitle
 badge="Our Mission"
 title="How We Make It Happen"
 subtitle="Six pillars that drive every decision, lesson plan, and student experience at Apex International."
 theme="dark"
 />
 <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
 {MISSION_POINTS.map((item, idx) => {
 const Icon = item.icon;
 return (
 <motion.div
 key={item.title}
 variants={fadeUp}
 custom={idx}
 className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-md hover:shadow-xl hover:border-[#166534] hover:-translate-y-1 transition-all duration-300 group"
 >
 <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center mb-4 group-hover:bg-[#166534] group-hover:text-white transition-colors duration-300">
 <Icon className="w-6 h-6" />
 </div>
 <h4 className="font-poppins text-lg font-bold text-slate-900 mb-2">{item.title}</h4>
 <p className="font-inter text-sm text-slate-600 leading-relaxed">{item.desc}</p>
 </motion.div>
 );
 })}
 </div>
 </motion.section>

 {/* 8. CTA Banner */}
 <section className="bg-linear-to-r from-[#166534] to-emerald-800 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 sm:mb-20">
 <div className="space-y-2 text-center sm:text-left">
 <h3 className="font-poppins text-2xl sm:text-3xl font-extrabold text-white">
 Ready to Be Part of Our Vision?
 </h3>
 <p className="text-sm sm:text-base text-green-100 font-inter">
 Admissions for Academic Session 2026-27 are now open. Give your child the gift of a future-ready education.
 </p>
 </div>
 <div className="flex items-center gap-3 shrink-0">
 <Link
 to={ROUTES.ADMISSION}
 className="bg-white text-[#166534] hover:bg-lime-400 hover:text-slate-950 font-bold px-8 py-3.5 rounded-full shadow-lg transition-all inline-flex items-center gap-2 text-sm"
 >
 <span>Apply Now</span>
 <ArrowRight className="w-4 h-4" />
 </Link>
 <Link
 to={ROUTES.CONTACT}
 className="bg-transparent border-2 border-white/60 text-white hover:bg-white/10 font-bold px-6 py-3 rounded-full shadow-lg transition-all inline-flex items-center gap-2 text-sm"
 >
 <span>Contact Us</span>
 </Link>
 </div>
 </section>

 </div>
 </div>
 );
};

export default VisionMission;
