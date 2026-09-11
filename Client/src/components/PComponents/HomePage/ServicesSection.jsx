import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Stethoscope, ShieldCheck, Smile, HeartPulse } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ServicesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 98%',
          }
        }
      );

      // Grid Stagger Cards
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 98%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto" id="services">
      
      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20 gap-4">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Areas of Expertise</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
          Comprehensive Premium Care
        </h2>
        <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed max-w-xl">
          State-of-the-art dental treatments designed with architectural precision for optimal oral health and aesthetics.
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Service 1 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Preventative Care</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Advanced hygiene treatments and comprehensive examinations to maintain your optimal oral health foundation.
          </p>
        </div>

        {/* Service 2 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <Smile className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Smile Makeovers</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Transformative aesthetic procedures combining multiple disciplines for a harmonious, radiant smile.
          </p>
        </div>

        {/* Service 3 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Dental Implants</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            State-of-the-art restorative solutions providing permanent, natural-looking replacements for missing teeth.
          </p>
        </div>

        {/* Service 4 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Porcelain Veneers</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Ultra-thin, custom-crafted ceramic shells designed to perfect the shape, color, and alignment of your teeth.
          </p>
        </div>

        {/* Service 5 (Wide card with HD image) */}
        <div className="group rounded-3xl p-8 sm:p-10 lg:col-span-2 bg-gradient-to-br from-[#0f172a] via-[#003852] to-[#004666] text-white border-none shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-8 items-center h-full relative z-10">
            <div className="flex-1">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 text-white shadow-inner">
                <HeartPulse className="w-7 h-7 text-cyan-300" />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Sedation Dentistry</h3>
              <p className="text-white/80 font-light leading-relaxed max-w-md">
                Experience anxiety-free treatments in a state of deep relaxation. Perfect for complex procedures or nervous patients, overseen by specialized anesthetists.
              </p>
            </div>
            
            <div className="flex-1 w-full h-56 md:h-full min-h-[220px] relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
              <img 
                alt="Relaxed patient environment" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 smooth-hover duration-700 opacity-80" 
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
