import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Sparkles, Calendar, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { enlaceWhatsApp } from '../../../lib/whatsapp';

export const ServicesHero = () => {
  const containerRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 })
        .fromTo(titleRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
        .fromTo(textRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3')
        .fromTo(ctaRef.current, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-12 pb-12 lg:pt-20 lg:pb-16 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto overflow-hidden">
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-deep-3/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest mb-6">
          <Sparkles className="w-4 h-4 text-brand" />
          <span>Excelencia y Cuidado Odontológico</span>
        </div>

        <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-ink leading-tight tracking-tight mb-6">
          Tratamientos Especializados <br className="hidden sm:block" />
          <span className="text-gradient">Diseñados para tu Sonrisa</span>
        </h1>

        <p ref={textRef} className="text-base sm:text-lg lg:text-xl font-light text-muted leading-relaxed max-w-2xl mb-10">
          Disfruta de una atención dental con tecnología y máxima comodidad. Desde limpiezas de rutina hasta diseño de sonrisa
          y restauraciones complejas.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            to="/agendar"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-ink text-white font-semibold text-sm tracking-wider uppercase hover:bg-brand transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Cita</span>
          </Link>

          <a
            href={enlaceWhatsApp('¡Hola! Vi sus servicios dentales y me gustaría solicitar información para agendar una consulta.')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consulta por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesHero;
