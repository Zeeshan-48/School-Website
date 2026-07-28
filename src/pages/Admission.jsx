import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const Admission = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Admissions"
          title="Admission Guidance & Process"
          subtitle="Simple registration guidelines and fee overview for new admissions."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            Admissions for the upcoming academic year are conducted in simple steps. Contact the school office for application details and registration procedures.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admission;
