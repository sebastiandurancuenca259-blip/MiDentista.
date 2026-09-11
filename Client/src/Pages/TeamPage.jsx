import React from 'react';
import TeamHeroSection from '../components/PComponents/TeamPage/TeamHeroSection';
import ZenithPhilosophySection from '../components/PComponents/TeamPage/ZenithPhilosophySection';
import SpecialistsShowcaseSection from '../components/PComponents/TeamPage/SpecialistsShowcaseSection';
import ServicesCTASection from '../components/PComponents/ServicePage/ServicesCTASection';

export const TeamPage = () => {
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <TeamHeroSection />
      <ZenithPhilosophySection />
      <SpecialistsShowcaseSection />
      <ServicesCTASection />
    </main>
  );
};

export default TeamPage;
