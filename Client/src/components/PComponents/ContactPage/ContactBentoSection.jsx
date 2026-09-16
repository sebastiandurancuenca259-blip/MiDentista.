import React, { useEffect, useRef } from 'react';
import { MapPin, Clock, Mail, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const ContactBentoSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Contenedor Principal del Mapa (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between min-h-[480px]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-[#0f172a]">
                  Ubicación del Consultorio
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  Satélite Norte - Mi Dentista Clínica Dental
                </p>
              </div>
            </div>
            <a
              href="https://maps.app.goo.gl/vK6uyptKRcyDkSkv8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-[#0ea5e9] hover:underline bg-[#0ea5e9]/10 px-3 py-2 rounded-xl transition-all shrink-0"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mapa Interactivo con la ubicación exacta */}
          <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <iframe
              title="Mi Dentista Clínica Dental"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.5081946798937!2d-63.138441799999995!3d-17.6031931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e172d17ab2bf%3A0x771397dd048b78d0!2sMi%20Dentista%20Cl%C3%ADnica%20Dental!5e1!3m2!1ses!2sbo!4v1789592894259!5m2!1ses!2sbo"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>

        {/* Tarjetas de Información: Horarios y Contacto (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          
          {/* Horario de Atención */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0f172a]">
                Horarios de Atención
              </h3>
            </div>

            <div className="space-y-4 text-slate-700">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-[#0f172a]">Lunes a Viernes</span>
                <span className="text-sm font-medium text-slate-600">08:00 – 18:00</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <span className="text-sm font-semibold text-[#0f172a]">Sábados</span>
                <span className="text-sm font-medium text-slate-600">08:00 – 12:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-[#0f172a]">Domingos y Feriados</span>
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wider">Cerrado</span>
              </div>
            </div>
          </div>

          {/* Contacto Directo */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#0f172a]">
                Contacto
              </h3>
            </div>

            <p className="text-sm font-normal text-slate-600 leading-relaxed mb-4">
              Escríbenos directamente para resolver cualquier duda o consulta sobre nuestros servicios.
            </p>

            <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <Mail className="w-5 h-5 text-[#0ea5e9] shrink-0" />
              <a
                href="mailto:midentista114@gmail.com"
                className="text-sm font-semibold text-[#0f172a] hover:text-[#0ea5e9] transition-colors break-all"
              >
                midentista114@gmail.com
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactBentoSection;