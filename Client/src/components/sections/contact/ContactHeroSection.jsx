import { useEffect, useRef } from 'react';
import { Sparkles, Quote } from 'lucide-react';
import gsap from 'gsap';
import { IMAGENES } from '../../../config/imagenes';

export const ContactHeroSection = () => {
  const containerRef = useRef(null);
  const textColRef = useRef(null);
  const imageColRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (textColRef.current) {
        tl.fromTo(
          textColRef.current.children,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12 }
        );
      }

      if (imageColRef.current) {
        tl.fromTo(
          imageColRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8 },
          '-=0.4'
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-6 pb-12 lg:pt-10 lg:pb-16 px-4 md:px-8 lg:px-16 xl:px-24 w-full max-w-[1440px] mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Text Content Column */}
        <div ref={textColRef} className="lg:col-span-6 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Atención Personalizada</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight mb-6">
            Ponte en Contacto <br />
            <span className="text-gradient italic font-serif">El Arte de Cuidar tu Sonrisa</span>
          </h1>

          <p className="text-base sm:text-lg font-normal text-slate-800 leading-relaxed max-w-lg">
            Experimenta una odontología diferente. Te invitamos a dar el primer paso hacia una excelencia clínica con la máxima comodidad y tranquilidad.
          </p>
        </div>

        {/* Image Showcase Column with Floating Quote Card */}
        <div ref={imageColRef} className="lg:col-span-6 relative">
          <div className="aspect-[4/3] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group relative">
            <img
              src={IMAGENES.atencion.src}
              alt={IMAGENES.atencion.alt}
              className="w-full h-full object-cover object-[center_45%] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating Quote Box */}
          <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-xl max-w-xs hidden sm:flex items-start gap-3">
            <Quote className="w-6 h-6 text-brand shrink-0 mt-0.5" />
            <p className="text-xs font-serif italic text-ink leading-relaxed">
              "Un espacio dedicado a tu bienestar, donde la precisión se une con la tranquilidad."
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactHeroSection;