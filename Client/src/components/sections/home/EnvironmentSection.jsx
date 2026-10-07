import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGENES } from '../../../config/imagenes';

gsap.registerPlugin(ScrollTrigger);

const GALERIA = [
  { imagen: IMAGENES.recepcion, etiqueta: 'Recepción y Espera', titulo: 'Ambiente Cómodo y Agradable' },
  { imagen: IMAGENES.consultorio, etiqueta: 'Consultorio Principal', titulo: 'Atención con Higiene y Seguridad' },
  { imagen: IMAGENES.rayosX, etiqueta: 'Diagnóstico Digital', titulo: 'Servicio de Rayos X' },
];

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
            <span className="w-8 h-px bg-brand"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-brand">Nuestras Instalaciones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-ink">
            Diseñado para tu comodidad
          </h2>
          <p className="text-base sm:text-lg font-light text-muted leading-relaxed">
            Contamos con un espacio moderno, limpio y equipado con la tecnología necesaria para brindarte a ti y a tu familia una atención dental segura y confortable.
          </p>
        </div>
      </div>

      {/* Galería (las fotos se configuran en config/imagenes.js) */}
      <div ref={galleryRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {GALERIA.map(({ imagen, etiqueta, titulo }) => (
          <figure key={etiqueta} className="group relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/60 aspect-[4/3]">
            <img
              alt={imagen.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              src={imagen.src}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
            <figcaption className="absolute bottom-6 left-6 right-6 text-white text-left">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-1">{etiqueta}</p>
              <h3 className="text-xl font-serif font-medium">{titulo}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default EnvironmentSection;