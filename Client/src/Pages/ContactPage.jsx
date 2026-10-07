import ContactHeroSection from '../components/sections/contact/ContactHeroSection';
import ContactBentoSection from '../components/sections/contact/ContactBentoSection';
import EmergencyCareSection from '../components/sections/contact/EmergencyCareSection';
import useTituloPagina from '../hooks/useTituloPagina';

export default function ContactPage() {
  useTituloPagina('Contacto, Ubicación y Horarios');
  return (
    <main className="w-full relative z-20 bg-white flex flex-col">
      <ContactHeroSection />
      <ContactBentoSection />
      <EmergencyCareSection />
    </main>
  );
}
