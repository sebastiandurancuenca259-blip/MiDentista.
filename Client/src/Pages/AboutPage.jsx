import React from 'react';
import AboutHeroSection from '../components/PComponents/AboutPage/AboutHeroSection';
import StoryMissionSection from '../components/PComponents/AboutPage/StoryMissionSection';
import ValuesBentoSection from '../components/PComponents/AboutPage/ValuesBentoSection';
import ClinicTourSection from '../components/PComponents/AboutPage/ClinicTourSection';
import ServicesCTASection from '../components/PComponents/ServicePage/ServicesCTASection';

export const AboutPage = () => {
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <AboutHeroSection />
      <StoryMissionSection />
      <ValuesBentoSection />
      <ClinicTourSection />
      <ServicesCTASection />
    </main>
  );
};

export default AboutPage;
