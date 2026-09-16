import React, { useEffect, useRef } from 'react';
import { Sparkles, Stethoscope, ShieldCheck, Smile, HeartPulse } from 'lucide-react';
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
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Nuestros Servicios</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
          Atención Dental Integral
        </h2>
        <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed max-w-xl">
          Ofrecemos una amplia gama de tratamientos odontológicos con tecnología moderna y la calidez que tu familia merece.
        </p>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Servicio 1 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Odontología General y Limpieza</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Evaluación completa, tartrectomía (limpieza profunda), curaciones y tratamientos preventivos para mantener tus dientes sanos.
          </p>
        </div>

        {/* Servicio 2 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <Smile className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Ortodoncia y Brackets</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Corrección de la alineación dental y mordida con brackets estéticos y convencionales para niños, jóvenes y adultos.
          </p>
        </div>

        {/* Servicio 3 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <Stethoscope className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Prótesis y Rehabilitación</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Reconstrucción y reemplazo de piezas dentales dañadas o ausentes con prótesis fijas o removibles de alta durabilidad.
          </p>
        </div>

        {/* Servicio 4 */}
        <div className="group rounded-3xl p-8 sm:p-10 bg-white border border-[#e2e8f0] shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all duration-300">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0f172a] to-[#0ea5e9] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="w-14 h-14 rounded-2xl bg-[#0f172a]/5 flex items-center justify-center mb-8 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover shadow-xs">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-serif font-semibold mb-4 text-[#0f172a]">Estética Dental</h3>
          <p className="text-[#64748b] font-light leading-relaxed flex-grow">
            Blanqueamiento dental, carillas y diseño de sonrisa para lucir una dentadura reluciente y natural.
          </p>
        </div>

        {/* Servicio 5 (Tarjeta Ancha) */}
        <div className="group rounded-3xl p-8 sm:p-10 lg:col-span-2 bg-gradient-to-br from-[#0f172a] via-[#003852] to-[#004666] text-white border-none shadow-xl overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-8 items-center h-full relative z-10">
            <div className="flex-1">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 text-white shadow-inner">
                <HeartPulse className="w-7 h-7 text-cyan-300" />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Endodoncia y Cirugía Bucal</h3>
              <p className="text-white/80 font-light leading-relaxed max-w-md">
                Tratamientos de conducto para salvar el diente de infecciones intensas y extracciones seguras con anestesia efectiva y alivio inmediato del dolor.
              </p>
            </div>
            
            <div className="flex-1 w-full h-56 md:h-full min-h-[220px] relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
              <img 
                alt="Atención médica profesional" 
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