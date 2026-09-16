import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { Sparkles, Stethoscope, ShieldCheck, Smile, HeartPulse, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGENES } from '../../../config/imagenes';

gsap.registerPlugin(ScrollTrigger);

const TARJETAS = [
  {
    categoria: 'general',
    icono: Sparkles,
    titulo: 'Odontología General y Limpieza',
    texto: 'Evaluación completa, tartrectomía (limpieza profunda), curaciones y tratamientos preventivos para mantener tus dientes sanos.',
  },
  {
    categoria: 'ortodoncia',
    icono: Smile,
    titulo: 'Ortodoncia y Brackets',
    texto: 'Corrección de la alineación dental y mordida con brackets estéticos y convencionales para niños, jóvenes y adultos.',
  },
  {
    categoria: 'protesis',
    icono: Stethoscope,
    titulo: 'Prótesis y Rehabilitación',
    texto: 'Reconstrucción y reemplazo de piezas dentales dañadas o ausentes con prótesis fijas o removibles de alta durabilidad.',
  },
  {
    categoria: 'estetica',
    icono: ShieldCheck,
    titulo: 'Estética Dental',
    texto: 'Blanqueamiento dental, carillas y diseño de sonrisa para lucir una dentadura reluciente y natural.',
  },
];

const enlaceCategoria = (categoria) => `/servicios?categoria=${categoria}#catalogo`;

export const ServicesSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 98%' } },
      );

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 98%' },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto" id="services">
      <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 lg:mb-20 gap-4">
        <div className="inline-flex items-center gap-2">
          <span className="w-8 h-px bg-brand"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-brand">Nuestros Servicios</span>
          <span className="w-8 h-px bg-brand"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-ink">Atención Dental Integral</h2>
        <p className="text-base sm:text-lg font-light text-muted leading-relaxed max-w-xl">
          Ofrecemos una amplia gama de tratamientos odontológicos con tecnología moderna y la calidez que tu familia merece.
        </p>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TARJETAS.map(({ categoria, icono: Icono, titulo, texto }) => (
          <Link
            key={categoria}
            to={enlaceCategoria(categoria)}
            className="group rounded-3xl p-8 sm:p-10 bg-white border border-line shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.07)] smooth-hover hover:-translate-y-2 flex flex-col h-full relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-ink to-brand transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
            <div className="w-14 h-14 rounded-2xl bg-ink/5 flex items-center justify-center mb-8 text-ink group-hover:bg-ink group-hover:text-white smooth-hover shadow-xs">
              <Icono className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-serif font-semibold mb-4 text-ink">{titulo}</h3>
            <p className="text-muted font-light leading-relaxed flex-grow">{texto}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand">
              Ver tratamientos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}

        <Link
          to={enlaceCategoria('endodoncia-cirugia')}
          className="group rounded-3xl p-8 sm:p-10 lg:col-span-2 bg-gradient-to-br from-ink via-deep to-deep-2 text-white border-none shadow-xl overflow-hidden relative"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center h-full relative z-10">
            <div className="flex-1">
              <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 text-white shadow-inner">
                <HeartPulse className="w-7 h-7 text-cyan-300" />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4">Endodoncia y Cirugía Bucal</h3>
              <p className="text-white/80 font-light leading-relaxed max-w-md">
                Tratamientos de conducto para salvar el diente de infecciones intensas y extracciones seguras con anestesia local
                para aliviar el dolor.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-300">
                Ver tratamientos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            <div className="flex-1 w-full h-56 md:h-full min-h-[220px] relative rounded-2xl overflow-hidden shadow-lg border border-white/10">
              <img
                alt={IMAGENES.cirugia.alt}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 smooth-hover duration-700 opacity-80"
                src={IMAGENES.cirugia.src}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"></div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default ServicesSection;
