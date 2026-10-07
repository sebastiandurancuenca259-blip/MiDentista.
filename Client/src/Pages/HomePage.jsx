import HeroSection from '../components/sections/home/HeroSection';
import PhilosophySection from '../components/sections/home/PhilosophySection';
import StatsSection from '../components/sections/home/StatsSection';
import ServicesSection from '../components/sections/home/ServicesSection';
import JourneySection from '../components/sections/home/JourneySection';
import EnvironmentSection from '../components/sections/home/EnvironmentSection';
import TestimonialsSection from '../components/sections/home/TestimonialsSection';
import BookingCTASection from '../components/sections/home/BookingCTASection';
import useTituloPagina from '../hooks/useTituloPagina';

export default function HomePage() {
  useTituloPagina();
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
}
