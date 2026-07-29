import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../components/common/SectionTitle';
import { PageHeader } from '../components/common/PageHeader';
import { IMAGES } from '../utils/images';
import { SCHOOL_INFO } from '../utils/constants';
import { 
 Mail, 
 Phone, 
 MapPin, 
 Clock, 
 Send, 
 CheckCircle2, 
 MessageSquare, 
 Building2,
 Calendar
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

export const Contact = () => {
 const [formSubmitted, setFormSubmitted] = useState(false);
 const [contactData, setContactData] = useState({
 fullName: '',
 email: '',
 phone: '',
 subject: 'Admissions Inquiry',
 message: ''
 });

 const handleInputChange = (e) => {
 setContactData({ ...contactData, [e.target.name]: e.target.value });
 };

 const handleSubmit = (e) => {
 e.preventDefault();
 setFormSubmitted(true);
 };

 return (
 <div className="bg-slate-50 text-slate-900 min-h-screen">
 
 {/* 1. Hero Banner */}
 <PageHeader
 icon={MessageSquare}
 badge="Connect With Us"
 title="We are Here to Help You"
 subtitle="We'd love to hear from you. Visit our campus, drop us a message, or call our admissions desk."
 bgImage={IMAGES.banners.contact}
 />

 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24 space-y-20 sm:space-y-24">

 {/* 2. Main Contact Grid (Form + Information) */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.1 }}
 className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
 >
 
 {/* Contact Form */}
 <motion.div variants={fadeUp} custom={0} className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl space-y-8">
 <div>
 <span className="text-xs font-bold text-[#166534] uppercase tracking-wider bg-[#F0FDF4] px-4 py-1.5 rounded-full border border-green-200">
 Send a Message
 </span>
 <h2 className="font-poppins text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4">
 Get in Touch with Our Team
 </h2>
 <p className="font-inter text-sm sm:text-base text-slate-600 mt-2">
 Fill out the form below and our administrative desk will respond within 24 business hours.
 </p>
 </div>

 <AnimatePresence mode="wait">
 {formSubmitted ? (
 <motion.div 
 key="success"
 initial={{ opacity: 0, scale: 0.9 }}
 animate={{ opacity: 1, scale: 1 }}
 exit={{ opacity: 0, scale: 0.9 }}
 className="bg-[#F0FDF4] border border-green-200 rounded-3xl p-10 text-center space-y-5"
 >
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-md border border-green-100">
 <CheckCircle2 className="w-10 h-10 text-[#166534]" />
 </div>
 <h4 className="font-poppins text-2xl font-bold text-slate-900">Message Delivered!</h4>
 <p className="font-inter text-sm sm:text-base text-slate-600 max-w-sm mx-auto leading-relaxed">
 Thank you for contacting Apex International School. Our team has received your inquiry and will be in touch shortly.
 </p>
 <div className="pt-4">
 <button
 onClick={() => setFormSubmitted(false)}
 className="bg-[#166534] text-white text-sm font-bold px-8 py-3.5 rounded-full hover:bg-emerald-800 transition-colors shadow-lg hover:shadow-xl"
 >
 Send Another Message
 </button>
 </div>
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
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Full Name *</label>
 <input
 type="text"
 name="fullName"
 required
 value={contactData.fullName}
 onChange={handleInputChange}
 placeholder="e.g. Ananya Roy"
 className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
 <input
 type="email"
 name="email"
 required
 value={contactData.email}
 onChange={handleInputChange}
 placeholder="name@example.com"
 className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Phone Number *</label>
 <input
 type="tel"
 name="phone"
 required
 value={contactData.phone}
 onChange={handleInputChange}
 placeholder="+91 98765 43210"
 className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors"
 />
 </div>
 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Inquiry Department</label>
 <select
 name="subject"
 value={contactData.subject}
 onChange={handleInputChange}
 className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors appearance-none"
 >
 <option value="Admissions Inquiry">Admissions Desk</option>
 <option value="Academic Curriculum">Academic Head</option>
 <option value="Bus Transport">Transport Coordinator</option>
 <option value="Accounts & Fees">Accounts Desk</option>
 <option value="General Inquiry">General Desk</option>
 </select>
 </div>
 </div>

 <div>
 <label className="block text-xs font-bold text-slate-700 mb-1.5">Your Message *</label>
 <textarea
 name="message"
 required
 rows="4"
 value={contactData.message}
 onChange={handleInputChange}
 placeholder="Write your question or request here..."
 className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#166534] transition-colors resize-none"
 />
 </div>

 <div className="pt-2">
 <button
 type="submit"
 className="w-full bg-[#166534] hover:bg-emerald-800 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl text-sm transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer group"
 >
 <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
 <span>Submit Inquiry Message</span>
 </button>
 </div>
 </motion.form>
 )}
 </AnimatePresence>

 </motion.div>

 {/* Direct Contact Directory Info */}
 <motion.div variants={fadeUp} custom={1} className="lg:col-span-5 space-y-6">
 
 {/* Address Card */}
 <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md space-y-6 hover:shadow-lg transition-shadow">
 <h3 className="font-poppins text-xl font-bold text-slate-900 flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] text-[#166534] flex items-center justify-center border border-green-100">
 <Building2 className="w-5 h-5" />
 </div>
 <span>Campus Location</span>
 </h3>

 <div className="space-y-4 font-inter text-sm">
 <div className="flex items-start gap-4 text-slate-700 group">
 <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#F0FDF4] group-hover:text-[#166534] group-hover:border-green-200 transition-colors">
 <MapPin className="w-4 h-4" />
 </div>
 <a
 href={SCHOOL_INFO.mapsUrl}
 target="_blank"
 rel="noopener noreferrer"
 className="hover:text-[#166534] hover:underline transition-colors pt-1.5 leading-relaxed"
 >
 {SCHOOL_INFO.address}
 </a>
 </div>
 <div className="flex items-center gap-4 text-slate-700 group">
 <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#F0FDF4] group-hover:text-[#166534] group-hover:border-green-200 transition-colors">
 <Phone className="w-4 h-4" />
 </div>
 <span className="font-medium">{SCHOOL_INFO.phone} / {SCHOOL_INFO.altPhone}</span>
 </div>
 <div className="flex items-center gap-4 text-slate-700 group">
 <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 group-hover:bg-[#F0FDF4] group-hover:text-[#166534] group-hover:border-green-200 transition-colors">
 <Mail className="w-4 h-4" />
 </div>
 <span className="font-medium">{SCHOOL_INFO.email}</span>
 </div>
 </div>
 </div>

 {/* Office Timings Card */}
 <div className="bg-[#071F10] text-white rounded-3xl p-8 sm:p-10 border border-emerald-800 shadow-xl space-y-6 relative overflow-hidden">
 <h3 className="font-poppins text-xl font-bold text-white flex items-center gap-3 relative z-10">
 <div className="w-10 h-10 rounded-xl bg-emerald-900 text-lime-400 flex items-center justify-center border border-emerald-700/50">
 <Clock className="w-5 h-5" />
 </div>
 <span>Administrative Office</span>
 </h3>

 <div className="space-y-3 font-inter text-sm text-green-100/90 relative z-10">
 <div className="flex justify-between py-2 border-b border-emerald-900/60">
 <span>Monday - Friday</span>
 <span className="font-bold text-white">8:00 AM - 4:00 PM</span>
 </div>
 <div className="flex justify-between py-2 border-b border-emerald-900/60">
 <span>Saturday</span>
 <span className="font-bold text-white">8:30 AM - 1:30 PM</span>
 </div>
 <div className="flex justify-between py-2 text-lime-300">
 <span>Sunday & Public Holidays</span>
 <span className="font-bold">Closed</span>
 </div>
 </div>
 
 <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
 </div>

 </motion.div>

 </motion.section>

 {/* 3. Interactive Map Embed */}
 <motion.section 
 initial="hidden"
 whileInView="visible"
 viewport={{ once: true, amount: 0.15 }}
 className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xl"
 >
 <div className="p-6 sm:p-8 bg-[#F0FDF4] border-b border-green-200">
 <h3 className="font-poppins text-xl font-bold text-slate-900 flex items-center gap-3">
 <div className="w-10 h-10 rounded-xl bg-white text-[#166534] flex items-center justify-center border border-green-100 shadow-sm">
 <MapPin className="w-5 h-5" />
 </div>
 <span>Interactive Campus Map</span>
 </h3>
 </div>
 <div className="h-96 w-full bg-slate-200 relative group">
 <iframe
 title="School Location Map"
 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562145892!2d77.3789!3d28.6139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjg8MTInNTAuMCJOIDc3wrAyMic0NC4wIkU!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
 className="w-full h-full border-0 absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
 loading="lazy"
 />
 </div>
 </motion.section>

 </div>
 </div>
 );
};

export default Contact;
