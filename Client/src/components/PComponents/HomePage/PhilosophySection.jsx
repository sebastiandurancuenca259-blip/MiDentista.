import React, { useEffect, useRef } from 'react';
import { HeartHandshake, ShieldCheck, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const PhilosophySection = () => {
  const sectionRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal doctor column & text column
      gsap.fromTo(leftColRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      gsap.fromTo(rightColRef.current, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Stagger reveal trust cards
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto space-y-16" id="philosophy">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        
        {/* Left Column: Doctor / Consultation Photo */}
        <div ref={leftColRef} className="order-2 lg:order-1 relative">
          <div className="aspect-[4/5] sm:aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl relative border border-slate-100">
            <img 
              alt="Atención odontológica en Mi Dentista" 
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700" 
              src="https://scontent.fvvi1-1.fna.fbcdn.net/v/t39.30808-6/501995186_1161117672695144_1540277273368285262_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1920&ctp=s1080x1920&_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=BIiFxefeCfwQ7kNvwFQFttP&_nc_oc=Adrq5pAcgRxjxMY4IbrF7TT_OvDA6clZQ-E_PDPMyZ7Rtyk4y43i5a3YPKqBflvhFSgQ9I0W1FAZEFVrrLg4XHTH&_nc_zt=23&_nc_ht=scontent.fvvi1-1.fna&_nc_gid=bScq32-W_efx7wr-1rjxsw&_nc_ss=7b2a8&oh=00_AQI3uphFw4eufGTggTx-wFOIGYSfZjFuqfrOmmVQ7_jXhA&oe=6AB0D454"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/40 via-transparent to-transparent"></div>
            
            {/* Experience Pill Overlay */}
            <div className="absolute bottom-6 left-6 right-6 glass-dark p-4 rounded-2xl border border-white/20 text-white flex items-center justify-between">
              <div>
                <p className="font-serif text-lg font-bold">Mi Dentista</p>
                <p className="text-xs text-cyan-300">Clínica Dental Especializada</p>
              </div>
              <span className="bg-[#0ea5e9] text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Atención Ética
              </span>
            </div>
          </div>
          
          {/* Decorative Glow Element */}
          <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#0ea5e9]/10 rounded-full blur-3xl -z-10"></div>
        </div>

        {/* Right Column: Copy & Alignment */}
        <div ref={rightColRef} className="order-1 lg:order-2 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Nuestra Filosofía</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium leading-tight text-[#0f172a]">
            Salud y estética dental al alcance de tu familia
          </h2>

          <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
            En Mi Dentista, creemos que una sonrisa sana es fundamental para el bienestar de cada persona. Nos enfocamos en ofrecer una atención cercana, honesta y accesible, priorizando la prevención y el cuidado integral de tu salud bucal.
          </p>

          <p className="text-base sm:text-lg font-light text-[#64748b] leading-relaxed">
            Cada tratamiento es planificado de forma personalizada, aplicando procedimientos seguros y con estrictas normas de bioseguridad para garantizar tu máxima comodidad.
          </p>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div>
              <p className="font-serif italic text-2xl text-[#0f172a] font-medium tracking-wide">
                Mi Dentista
              </p>
              <p className="text-xs font-semibold tracking-widest uppercase text-[#64748b] mt-1">
                Compromiso con tu Sonrisa
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs font-bold text-[#0f172a]">Atención Integral</p>
                <p className="text-[11px] text-[#64748b]">Niños y Adultos</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Trust Cards Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
        
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
            <HeartHandshake className="w-6 h-6 text-[#0ea5e9]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0f172a]">Trato Humano y Ético</p>
            <p className="text-xs text-[#64748b]">Atención cercana y personalizada</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-[#0f172a]/10 text-[#0f172a] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#0f172a]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0f172a]">Tratamientos Cómodos</p>
            <p className="text-xs text-[#64748b]">Técnicas suaves e higiénicas</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:shadow-md transition-shadow flex items-center gap-4 text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#0f172a]">Atención de Urgencias</p>
            <p className="text-xs text-[#64748b]">Disponibilidad según necesidad</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default PhilosophySection;