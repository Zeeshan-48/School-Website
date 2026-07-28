import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const Academics = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Academics"
          title="Academic Programs & Curriculum"
          subtitle="Comprehensive CBSE learning paths from Pre-Primary through Senior Secondary streams."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            Our academic framework is structured around experiential learning, STEM integration, and strong core foundations across Science, Commerce, and Humanities streams.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Academics;
