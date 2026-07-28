import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const Career = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Careers"
          title="Work With Apex International School"
          subtitle="Discover current job openings and teaching career opportunities."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            We are always seeking passionate educators and staff to join our team. Check back for upcoming openings or submit your resume to our administration office.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Career;
