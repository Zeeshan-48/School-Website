import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const Facilities = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Facilities"
          title="Campus Infrastructure & Facilities"
          subtitle="Explore our modern classrooms, STEM tinkering labs, sports facilities, and library."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            Our 25-acre eco-campus offers world-class infrastructure designed for safety, innovation, physical fitness, and student engagement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Facilities;
