import React, { useState } from 'react';
import { ShieldCheck, ArrowLeft, ArrowRight, Sparkles, HeartPulse, Stethoscope } from 'lucide-react';

export const TestimonialsSection = () => {
  const guarantees = [
    {
      title: "Atención Paciente y Sin Dolor",
      description: "Nos tomamos el tiempo necesario para escucharte. Aplicamos técnicas suaves y anestesia efectiva para que tu experiencia en la silla dental sea totalmente cómoda.",
      tag: "Confort Garantizado",
      icon: HeartPulse
    },
    {
      title: "Bioseguridad e Higiene Estricta",
      description: "Cumplimos con rigurosos protocolos de esterilización y limpieza en cada instrumental y equipo, protegiendo tu salud y la de tu familia en todo momento.",
      tag: "Salud Protegida",
      icon: ShieldCheck
    },
    {
      title: "Presupuestos Claros y Justos",
      description: "Te explicamos detalladamente cada etapa de tu tratamiento y sus costos antes de empezar. Sin sorpresas ni cobros imprevistos.",
      tag: "Tranquilidad y Ética",
      icon: Stethoscope
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextGuarantee = () => {
    setCurrentIndex((prev) => (prev + 1) % guarantees.length);
  };

  const prevGuarantee = () => {
    setCurrentIndex((prev) => (prev - 1 + guarantees.length) % guarantees.length);
  };

  const active = guarantees[currentIndex];
  const IconComponent = active.icon;

  return (
    <section className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Nuestro Compromiso</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
            Tu tranquilidad es nuestra prioridad
          </h2>

          <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
            En **Mi Dentista** diseñamos un servicio enfocado en brindarte confianza, higiene y profesionalismo en cada consulta.
          </p>

          <div className="flex items-center gap-4 mt-2">
            <button 
              onClick={prevGuarantee}
              className="w-12 h-12 rounded-full border border-[#e2e8f0] flex items-center justify-center hover:bg-[#0f172a] hover:text-white smooth-hover text-[#0f172a] transition-colors shadow-xs cursor-pointer"
              aria-label="Anterior compromiso"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              onClick={nextGuarantee}
              className="w-12 h-12 rounded-full bg-[#0f172a] text-white flex items-center justify-center hover:bg-[#0ea5e9] smooth-hover shadow-lg transition-colors cursor-pointer"
              aria-label="Siguiente compromiso"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <span className="text-xs font-semibold text-[#64748b] ml-2">
              0{currentIndex + 1} / 0{guarantees.length}
            </span>
          </div>
        </div>

        {/* Right Column: Card */}
        <div className="lg:col-span-7 relative">
          <div className="glass-panel p-8 sm:p-12 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-200/80 bg-white relative z-10 text-left transition-all duration-300">
            
            <div className="w-14 h-14 rounded-2xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center mb-6">
              <IconComponent className="w-7 h-7" />
            </div>
            
            <p className="text-xs font-bold uppercase tracking-widest text-[#0ea5e9] mb-2">
              {active.tag}
            </p>

            <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#0f172a] mb-4">
              {active.title}
            </h3>

            <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed mb-8">
              {active.description}
            </p>

            <div className="flex items-center gap-3 border-t border-slate-100 pt-6">
              <Sparkles className="w-5 h-5 text-[#0ea5e9]" />
              <p className="text-xs font-semibold uppercase tracking-wider text-[#0f172a]">
                Mi Dentista - Atención Clínica de Confianza
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;