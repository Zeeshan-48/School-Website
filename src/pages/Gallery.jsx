import React from 'react';
import { SectionTitle } from '../components/common/SectionTitle';

export const Gallery = () => {
  return (
    <div className="pt-28 pb-20 bg-white text-slate-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Media Gallery"
          title="Campus Life Gallery"
          subtitle="A visual showcase of events, sports achievements, and student life."
          theme="dark"
        />
        <div className="mt-8 bg-[#F0FDF4]/60 border border-green-100 rounded-2xl p-8 text-[#4B5563] shadow-md">
          <p className="font-inter leading-relaxed text-base sm:text-lg">
            Welcome to the media gallery. Explore photos and highlights from annual celebrations, sports meets, and academic activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
