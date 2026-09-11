import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ClinicTourSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          }
        }
      );

      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 95%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto border-t border-slate-100">
      
      {/* Header */}
      <div ref={headerRef} className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Architectural Elegance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] mb-2">
            Tour Our Clinic
          </h2>
          <p className="text-base font-normal text-slate-800">
            Designed for your ultimate comfort, hygiene, and tranquility.
          </p>
        </div>

        <button 
          type="button"
          onClick={() => window.__navigateToContact && window.__navigateToContact()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0ea5e9] hover:text-[#003852] transition-colors group cursor-pointer"
        >
          <span>Schedule Personal Tour</span>
          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Gallery Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Large Featured Surgery Room (Col-Span-2, Row-Span-2) */}
        <div className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-md border border-slate-200 h-[320px] md:h-[480px] relative group">
          <img
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200"
            alt="State of the art dental surgery suite"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-300 block mb-1">
              Surgical Suite
            </span>
            <p className="text-xs text-slate-200 font-light">
              High-tech surgical suite equipped with ergonomic dental chairs and ring-light lamps.
            </p>
          </div>
        </div>

        {/* Item 2: Reception Lounge */}
        <div className="col-span-2 md:col-span-1 rounded-3xl overflow-hidden shadow-xs border border-slate-200 h-[220px] md:h-[230px] relative group">
          <img
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800"
            alt="Luxury reception desk"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
            <span>Welcome Reception</span>
          </div>
        </div>

        {/* Item 3: Private Consultation Room */}
        <div className="col-span-2 md:col-span-1 rounded-3xl overflow-hidden shadow-xs border border-slate-200 h-[220px] md:h-[230px] relative group">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
            alt="Private consultation suite"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/60 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white text-xs font-semibold">
            <span>Consultation Suite</span>
          </div>
        </div>

        {/* Item 4: State-of-the-Art Facilities Banner */}
        <div className="col-span-2 rounded-3xl overflow-hidden shadow-md h-[220px] md:h-[230px] bg-gradient-to-r from-[#0f172a] via-[#003852] to-[#004666] flex items-center justify-center relative border border-white/10 group">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"></div>
          
          <div className="relative z-10 p-6 text-center">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-cyan-300 flex items-center justify-center mx-auto mb-3 border border-white/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              State-of-the-Art Facilities
            </h3>
            <p className="text-xs text-slate-300 font-light max-w-sm mx-auto">
              100% HEPA Air Filtration & Medical Micro-Sterilization Protocols.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ClinicTourSection;
