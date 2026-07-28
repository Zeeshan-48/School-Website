import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const About = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="About Us"
          title="About Apex International School"
          subtitle="Learn more about our vision, mission, and legacy of academic excellence."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            Welcome to Apex International School. Founded in 1995, we provide holistic education combining academic rigor, moral ethics, and sports excellence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
