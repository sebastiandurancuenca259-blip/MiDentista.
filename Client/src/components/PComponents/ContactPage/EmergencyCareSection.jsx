import React, { useEffect, useRef } from 'react';
import { AlertCircle, PhoneCall } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EmergencyCareSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="pb-20 lg:pb-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div
        ref={containerRef}
        className="bg-[#0f172a] text-white rounded-3xl p-10 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-slate-800"
      >
        {/* Background Texture Blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef4444]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-4 text-red-400">
            <AlertCircle className="w-5 h-5 fill-red-500/20 text-red-400" />
            <span className="text-xs font-bold tracking-widest uppercase text-red-400">
              Atención Urgente
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Urgencias Dentales
          </h2>

          <p className="text-base sm:text-lg font-normal text-slate-200 leading-relaxed">
            Un dolor agudo o un traumatismo requieren atención inmediata. Reservamos espacios de tiempo diariamente para emergencias. Por favor, contáctanos directamente por teléfono en lugar del formulario.
          </p>
        </div>

        <div className="relative z-10 shrink-0">
          <a
            href="tel:+59178410535" // Cambia este número por el teléfono real o enlace a WhatsApp
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#0f172a] font-bold text-xs uppercase tracking-widest hover:bg-[#0ea5e9] hover:text-white transition-all shadow-xl whitespace-nowrap cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Llamar a Urgencias</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EmergencyCareSection;