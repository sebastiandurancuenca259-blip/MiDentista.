import React from 'react';
import ServicesHero from '../components/PComponents/ServicePage/ServicesHero';
import ServiceCategories from '../components/PComponents/ServicePage/ServiceCategories';
import TechBentoSection from '../components/PComponents/ServicePage/TechBentoSection';
import TreatmentProcessSection from '../components/PComponents/ServicePage/TreatmentProcessSection';
import ServiceFAQSection from '../components/PComponents/ServicePage/ServiceFAQSection';
import ServicesCTASection from '../components/PComponents/ServicePage/ServicesCTASection';

export const ServicePage = () => {
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <ServicesHero />
      <ServiceCategories />
      <TechBentoSection />
      <TreatmentProcessSection />
      <ServiceFAQSection />
      <ServicesCTASection />
    </main>
  );
};

export default ServicePage;
