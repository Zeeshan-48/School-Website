import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const Contact = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Contact Us"
          title="Get in Touch"
          subtitle="Reach out to our administrative team or visit our campus."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            Have questions regarding admissions, transport, or school curriculum? Reach out via our office desk or email contact info.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
