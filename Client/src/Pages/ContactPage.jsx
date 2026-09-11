import React from 'react';
import ContactHeroSection from '../components/PComponents/ContactPage/ContactHeroSection';
import ContactBentoSection from '../components/PComponents/ContactPage/ContactBentoSection';
import EmergencyCareSection from '../components/PComponents/ContactPage/EmergencyCareSection';

export const ContactPage = () => {
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <ContactHeroSection />
      <ContactBentoSection />
      <EmergencyCareSection />
    </main>
  );
};

export default ContactPage;
