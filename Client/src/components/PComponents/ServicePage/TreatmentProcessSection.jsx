import React, { useEffect, useRef } from 'react';
import { CalendarCheck, Stethoscope, HeartHandshake, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const TreatmentProcessSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const stepsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 90%',
          },
        }
      );

      if (stepsRef.current) {
        gsap.fromTo(
          stepsRef.current.children,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stepsRef.current,
              start: 'top 92%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      icon: CalendarCheck,
      title: 'Consulta y Evaluación Inicial',
      description: 'Revisión clínica completa e historial del paciente para diagnosticar de forma precisa el estado de tu salud bucal.',
    },
    {
      number: '02',
      icon: Stethoscope,
      title: 'Plan de Tratamiento Claro',
      description: 'Explicación detallada de las opciones (ortodoncia, prótesis, endodoncia, etc.) con costos transparentes y etapas del proceso.',
    },
    {
      number: '03',
      icon: HeartHandshake,
      title: 'Procedimiento Cómodo y Humano',
      description: 'Atención profesional enfocada en minimizar molestias, utilizando anestesia local precisa y técnicas cuidadosas.',
    },
    {
      number: '04',
      icon: ShieldCheck,
      title: 'Seguimiento y Cuidado',
      description: 'Indicaciones post-tratamiento claras y citas de control programadas para asegurar el éxito y durabilidad de los resultados.',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      
      {/* Header */}
      <div ref={headerRef} className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Proceso Transparente</span>
          <span className="w-8 h-px bg-[#0ea5e9]"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0f172a] mb-4">
          ¿Cómo es tu Atención Dental?
        </h2>
        <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
          Cuatro pasos sencillos diseñados para garantizar un trato cercano, transparencia en cada procedimiento y resultados duraderos.
        </p>
      </div>

      {/* Steps Grid */}
      <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-lg smooth-hover hover:-translate-y-2 relative flex flex-col justify-between group"
            >
              {/* Step Number Tag */}
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#0f172a]/5 text-[#0f172a] group-hover:bg-[#0f172a] group-hover:text-white smooth-hover flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-3xl font-serif font-bold text-slate-300 group-hover:text-[#0ea5e9] smooth-hover">
                  {step.number}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-serif font-semibold text-[#0f172a] mb-3 group-hover:text-[#0ea5e9] smooth-hover">
                  {step.title}
                </h3>
                <p className="text-sm font-light text-[#64748b] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default TreatmentProcessSection;