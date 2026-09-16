import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';
import HomePage from './Pages/HomePage';
import ServicePage from './Pages/ServicePage';
import ContactPage from './Pages/ContactPage';
import BookingPage from './Pages/BookingPage';
import AdminPage from './AdminPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('denta_current_page') || 'home';
  });

  useEffect(() => {
    localStorage.setItem('denta_current_page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Inicializar Lenis para scroll suave
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleNavigateToContact = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBooking = () => {
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.__navigateToContact = handleNavigateToContact;
    window.__navigateToBooking = handleNavigateToBooking;
  }, [handleNavigateToContact, handleNavigateToBooking]);

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f172a] font-sans antialiased flex flex-col selection:bg-[#0ea5e9] selection:text-white">
      {/* Navbar Component */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      {/* Active Page View */}
      {currentPage === 'admin' ? (
        <AdminPage />
      ) : currentPage === 'booking' ? (
        <BookingPage onNavigateToContact={handleNavigateToContact} />
      ) : currentPage === 'contact' ? (
        <ContactPage />
      ) : currentPage === 'services' ? (
        <ServicePage onNavigateToContact={handleNavigateToContact} />
      ) : (
        <HomePage onNavigateToContact={handleNavigateToContact} onNavigateToBooking={handleNavigateToBooking} />
      )}

      {/* Footer Component */}
      {currentPage !== 'admin' && <Footer onNavigateToContact={handleNavigateToContact} />}
    </div>
  );
}

export default App;