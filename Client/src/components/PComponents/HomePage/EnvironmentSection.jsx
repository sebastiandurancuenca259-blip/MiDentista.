import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EnvironmentSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Gallery Items Stagger
      if (galleryRef.current) {
        gsap.fromTo(galleryRef.current.children,
          { scale: 0.92, opacity: 0, y: 40 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto bg-slate-50/50 rounded-3xl" id="environment">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div ref={titleRef} className="flex flex-col gap-4 text-left max-w-2xl">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Nuestras Instalaciones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
            Diseñado para tu comodidad
          </h2>
          <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
            Contamos con un espacio moderno, limpio y equipado con la tecnología necesaria para brindarte a ti y a tu familia una atención dental segura y confortable.
          </p>
        </div>
      </div>

      {/* Gallery Grid */}
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Item 1 */}
        <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] cursor-pointer">
          <img 
            alt="Área de Recepción" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">Recepción y Espera</p>
            <h3 className="text-xl font-serif font-medium">Ambiente Cómodo y Agradable</h3>
          </div>
        </div>

        {/* Item 2 */}
        <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] cursor-pointer">
          <img 
            alt="Consultorio Odontológico" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=1200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">Consultorio Principal</p>
            <h3 className="text-xl font-serif font-medium">Atención con Higiene y Seguridad</h3>
          </div>
        </div>

        {/* Item 3 */}
        <div className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3] cursor-pointer">
          <img 
            alt="Área de Diagnóstico" 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-[#0f172a]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">Diagnóstico Digital</p>
            <h3 className="text-xl font-serif font-medium">Servicio de Rayos X</h3>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EnvironmentSection;