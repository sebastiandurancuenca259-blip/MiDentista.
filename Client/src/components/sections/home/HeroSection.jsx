import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Phone, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { CLINICA } from '../../../config/clinica';
import { IMAGENES } from '../../../config/imagenes';
import { enlaceWhatsApp } from '../../../lib/whatsapp';

const DESTACADOS = [
  {
    titulo: 'Ortodoncia y Ortopedia',
    texto: 'Alineación y desarrollo dentofacial para niños y adultos.',
  },
  {
    titulo: 'Cirugía y Endodoncia',
    texto: 'Extracción de terceros molares y conservación de piezas dañadas.',
  },
  {
    titulo: 'Prótesis y Estética Dental',
    texto: 'Prótesis fijas, flexibles, removibles, blanqueamiento y restauraciones.',
  },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const floatingCardRef = useRef(null);
  const bgImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgImgRef.current, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 })
        .fromTo(headingRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=1.0')
        .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
        .fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
        .fromTo(floatingCardRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.7');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[85vh] flex items-center pt-6 md:pt-10 pb-16 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <img
          ref={bgImgRef}
          alt={IMAGENES.heroFondo.alt}
          className="w-full h-full object-cover origin-center"
          src={IMAGENES.heroFondo.src}
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 lg:to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 lg:px-16 xl:px-24 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-4 md:pt-6">
        <div className="lg:col-span-7 flex flex-col gap-8 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-bold uppercase tracking-widest w-fit">
            <Sparkles className="w-4 h-4 text-brand" />
            <span>Atención Odontológica Integral</span>
          </div>

          <h1 ref={headingRef} className="text-5xl md:text-6xl lg:text-[5rem] font-serif font-medium leading-[1.1] tracking-tight text-ink">
            Un mundo de
            <br />
            <span className="text-gradient italic font-serif">sonrisas saludables</span>
          </h1>

          <p ref={subtitleRef} className="text-lg md:text-xl font-light text-muted leading-relaxed max-w-2xl">
            Cuidamos la salud bucal de toda tu familia con atención profesional en niños y adultos. Tratamientos
            planificados con diagnósticos precisos mediante Rayos X.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-5 mt-2">
            <Link
              to="/agendar"
              className="flex items-center justify-center rounded-full h-14 px-10 bg-ink text-white text-sm font-semibold tracking-widest uppercase smooth-hover hover:bg-brand shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Agendar Cita
            </Link>

            <a
              href={enlaceWhatsApp('Hola, quisiera más información.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-full h-14 px-8 bg-slate-100/80 backdrop-blur-md text-ink border border-slate-200 text-sm font-semibold tracking-widest uppercase hover:bg-slate-200 transition-all shadow-xs"
            >
              <Phone className="mr-3 w-4 h-4 text-brand" />
              <span>{CLINICA.telefonoVisible}</span>
            </a>
          </div>
        </div>

        <div ref={floatingCardRef} className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/85 backdrop-blur-xl p-8 rounded-3xl border border-white/60 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-ink">{CLINICA.nombre}</h2>
                <p className="text-xs text-muted">{CLINICA.eslogan}</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            <ul className="space-y-4">
              {DESTACADOS.map((item) => (
                <li key={item.titulo} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-brand shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-ink">{item.titulo}</h3>
                    <p className="text-xs text-muted">{item.texto}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              to="/agendar"
              className="block w-full py-3 px-4 rounded-xl bg-brand text-white text-center text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition-colors"
            >
              Solicitar Cita Directa
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
