import React from 'react';
import { Hero } from '../components/home/Hero';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { AboutSchool } from '../components/home/AboutSchool';
import { AcademicPrograms } from '../components/home/AcademicPrograms';
import { FacilitiesPreview } from '../components/home/FacilitiesPreview';
import { GalleryPreview } from '../components/home/GalleryPreview';
import { Statistics } from '../components/home/Statistics';
import { Testimonials } from '../components/home/Testimonials';
import { NewsEvents } from '../components/home/NewsEvents';
import { ContactCTA } from '../components/home/ContactCTA';

export const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <WhyChooseUs />
      <AboutSchool />
      <AcademicPrograms />
      <FacilitiesPreview />
      <GalleryPreview />
      <Statistics />
      <Testimonials />
      <NewsEvents />
      <ContactCTA />
    </div>
  );
};

export default Home;
