import React, { useEffect, useRef } from 'react';
import { Phone, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';

export const HeroSection = () => {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const floatingCardRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgImgRef.current, 
        { scale: 1.15, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.6 }
      )
      .fromTo(headingRef.current, 
        { y: 40, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        '-=1.0'
      )
      .fromTo(subtitleRef.current, 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.6'
      )
      .fromTo(ctaRef.current, 
        { y: 25, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8 }, 
        '-=0.5'
      )
      .fromTo(floatingCardRef.current, 
        { x: 30, opacity: 0 }, 
        { x: 0, opacity: 1, duration: 0.9 }, 
        '-=0.7'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleBooking = () => {
    if (window.__navigateToBooking) {
      window.__navigateToBooking();
    } else {
      window.location.href = 'https://wa.me/59178410535?text=Hola,%20deseo%20agendar%20una%20cita';
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center pt-6 md:pt-10 pb-16 overflow-hidden bg-white">
      {/* Background Image Layer with GSAP reveal */}
      <div className="absolute inset-0 z-0">
        <img 
          ref={bgImgRef}
          alt="Clínica Dental Interior" 
          className="w-full h-full object-cover origin-center" 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=2000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 lg:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 md:pt-6">
        
        {/* Left Main Content */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-left">

          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#0ea5e9] text-xs font-bold uppercase tracking-widest w-fit">
            <Sparkles className="w-4 h-4 text-[#0ea5e9]" />
            <span>Atención Odontológica Integral</span>
          </div>

          {/* Heading */}
          <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium leading-[1.1] tracking-tight text-[#0f172a]">
            Un mundo de <br />
            <span className="text-gradient italic font-serif">sonrisas saludables</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg md:text-xl font-light text-[#64748b] leading-relaxed max-w-2xl">
            Cuidamos la salud bucal de toda tu familia con atención profesional en niños y adultos. Tratamientos garantizados con diagnósticos precisos mediante Rayos X.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap gap-5 mt-2">
            <button 
              type="button"
              onClick={handleBooking}
              className="flex items-center justify-center rounded-full h-14 px-10 bg-[#0f172a] text-white text-sm font-semibold tracking-widest uppercase smooth-hover hover:bg-[#0ea5e9] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <span>Agendar Cita</span>
            </button>

            <a 
              href="https://wa.me/59178410535?text=Hola,%20quisiera%20mas%20informacion"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full h-14 px-8 bg-slate-100/80 backdrop-blur-md text-[#0f172a] border border-slate-200 text-sm font-semibold tracking-widest uppercase hover:bg-slate-200 transition-all shadow-xs"
            >
              <Phone className="mr-3 w-4 h-4 text-[#0ea5e9]" />
              <span>+591 78410535</span>
            </a>
          </div>

        </div>

        {/* Right Column: Real Services Overview Card */}
        <div ref={floatingCardRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/85 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0ea5e9]/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0f172a]">Mi Dentista</h3>
                <p className="text-xs text-[#64748b]">Clínica Dental Especializada</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">Ortodoncia y Ortopedia</h4>
                  <p className="text-xs text-[#64748b]">Alineación y desarrollo dentofacial para niños y adultos.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">Cirugía y Endodoncia</h4>
                  <p className="text-xs text-[#64748b]">Extracción de terceros molares y conservación de piezas dañadas.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0ea5e9] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-[#0f172a]">Prótesis y Estética Dental</h4>
                  <p className="text-xs text-[#64748b]">Prótesis fijas, flexibles, removibles, blanqueamiento y restauraciones.</p>
                </div>
              </li>
            </ul>

            <button
              type="button"
              onClick={handleBooking}
              className="w-full py-3 px-4 rounded-xl bg-[#0ea5e9] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0284c7] transition-colors cursor-pointer"
            >
              Solicitar Cita Directa
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;