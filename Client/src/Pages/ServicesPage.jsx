import ServicesHero from '../components/sections/services/ServicesHero';
import ServiceCategories from '../components/sections/services/ServiceCategories';
import TechBentoSection from '../components/sections/services/TechBentoSection';
import TreatmentProcessSection from '../components/sections/services/TreatmentProcessSection';
import ServiceFAQSection from '../components/sections/services/ServiceFAQSection';
import ServicesCTASection from '../components/sections/services/ServicesCTASection';
import useTituloPagina from '../hooks/useTituloPagina';

export default function ServicesPage() {
  useTituloPagina('Servicios y Tratamientos');
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
}
