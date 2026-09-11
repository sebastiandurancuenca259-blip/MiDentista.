import React from 'react';
import HeroSection from '../components/PComponents/HomePage/HeroSection';
import PhilosophySection from '../components/PComponents/HomePage/PhilosophySection';
import StatsSection from '../components/PComponents/HomePage/StatsSection';
import ServicesSection from '../components/PComponents/HomePage/ServicesSection';
import JourneySection from '../components/PComponents/HomePage/JourneySection';
import EnvironmentSection from '../components/PComponents/HomePage/EnvironmentSection';
import TestimonialsSection from '../components/PComponents/HomePage/TestimonialsSection';
import BookingCTASection from '../components/PComponents/HomePage/BookingCTASection';

export const HomePage = () => {
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <HeroSection />
      <PhilosophySection />
      <StatsSection />
      <ServicesSection />
      <JourneySection />
      <EnvironmentSection />
      <TestimonialsSection />
      <BookingCTASection />
    </main>
  );
};

export default HomePage;
