import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, Sparkles, Star, Users, CheckCircle2 } from 'lucide-react';
import { SectionTitle } from '../components/common/SectionTitle';
import { Button } from '../components/common/Button';
import { FACULTY_DEPARTMENTS, FACULTY_MEMBERS } from '../data/faculty';
import { ROUTES } from '../utils/routes';

export const Faculty = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredFaculty = activeTab === 'all'
    ? FACULTY_MEMBERS
    : FACULTY_MEMBERS.filter(m => m.department === activeTab);

  const leadershipMembers = FACULTY_MEMBERS.filter(m => m.department === 'leadership');

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standard Page Header */}
        <SectionTitle
          badge="Faculty & Educators"
          title="Our Esteemed Educator Faculty"
          subtitle="Meet the visionary leaders, doctorate scholars, and passionate mentors driving academic excellence, innovation, and character building."
          theme="dark"
        />

        {/* Intro Summary Box matching About & Facilities Pages */}
        <div className="mb-14 bg-[#F0FDF4] border border-green-200/80 rounded-2xl p-6 sm:p-8 text-[#4B5563] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full text-xs font-bold text-[#166534] border border-green-200 mb-1">
              <Sparkles className="w-3.5 h-3.5" /> 100% Certified Educator Staff
            </div>
            <h2 className="font-poppins text-xl font-bold text-[#111827]">
              Mentorship Beyond Textbooks
            </h2>
            <p className="font-inter leading-relaxed text-sm sm:text-base max-w-2xl text-slate-600">
              Our faculty comprises doctorate researchers, IIT/Oxford alumni, and certified NIS coaches dedicated to empowering students through personalized mentorship and inquiry-based learning.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0 w-full md:w-auto">
            <div className="bg-white p-4 rounded-xl border border-green-100 text-center shadow-2xs">
              <p className="font-poppins text-2xl font-bold text-[#166534]">40+</p>
              <p className="font-inter text-xs text-slate-600 font-medium">Expert Educators</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-green-100 text-center shadow-2xs">
              <p className="font-poppins text-2xl font-bold text-[#166534]">1:12</p>
              <p className="font-inter text-xs text-slate-600 font-medium">Teacher Ratio</p>
            </div>
          </div>
        </div>

        {/* Leadership Spotlight Section */}
        <div className="mb-16">
          <h2 className="font-poppins text-2xl font-bold text-[#111827] mb-2 text-center md:text-left">
            Academic Leadership
          </h2>
          <p className="font-inter text-sm text-slate-600 mb-8 text-center md:text-left">
            Guided by administrators with over 40+ combined years of international pedagogy.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leadershipMembers.map((leader) => (
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              >
                <div className="relative shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-[#166534] shadow-xs">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"; }}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 right-2 bg-[#166534] text-white p-1 rounded-lg shadow-2xs">
                    <Star className="w-3.5 h-3.5 fill-white" />
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <span className="inline-block px-3 py-1 bg-[#F0FDF4] text-[#166534] text-xs font-bold rounded-full mb-2 border border-green-200">
                    {leader.designation}
                  </span>
                  <h3 className="font-poppins text-xl font-bold text-[#111827] mb-1">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-[#166534] font-semibold mb-3 flex items-center gap-1.5 justify-center sm:justify-start">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    {leader.qualification}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    "{leader.bio}"
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-3 border-t border-slate-100">
                    <span className="text-[11px] font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#166534]" /> {leader.awards}
                    </span>
                    <span className="text-[11px] font-bold bg-green-50 text-green-800 px-2.5 py-1 rounded-md">
                      {leader.experience}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Department Filter Tabs & Directory */}
        <div className="mb-16">
          <div className="text-center md:text-left mb-8">
            <h2 className="font-poppins text-2xl font-bold text-[#111827] mb-2">
              Department Faculty Directory
            </h2>
            <p className="font-inter text-sm text-slate-600">
              Filter through our subject matter experts and department heads.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
            {FACULTY_DEPARTMENTS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#166534] text-white shadow-xs scale-105'
                    : 'bg-white text-slate-700 hover:bg-[#F0FDF4] hover:text-[#166534] border border-slate-200'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFaculty.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"; }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="inline-block px-2.5 py-0.5 bg-[#166534] text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md mb-1">
                      {member.designation}
                    </span>
                    <h3 className="font-poppins text-lg font-bold leading-snug">
                      {member.name}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <p className="text-xs text-slate-600 font-medium mb-3 flex items-start gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#166534] shrink-0 mt-0.5" />
                      <span>{member.qualification}</span>
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      {member.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                      <span>Experience:</span>
                      <span className="font-bold text-[#166534]">{member.experience}</span>
                    </div>
                    
                    {member.subjects && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {member.subjects.map((sub, idx) => (
                          <span key={idx} className="text-[10px] font-bold bg-[#F0FDF4] text-[#166534] px-2 py-0.5 rounded-md border border-green-200">
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Join Faculty CTA */}
        <div className="bg-[#166534] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-poppins text-2xl font-bold text-white">
              Interested in Joining Our Teaching Team?
            </h3>
            <p className="text-slate-200 text-sm max-w-xl">
              We are constantly seeking passionate educators and subject matter experts to shape future leaders.
            </p>
          </div>
          <Button to={ROUTES.CAREER} variant="gold" size="lg">
            View Career Openings
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Faculty;
