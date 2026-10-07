import { useEffect, useRef } from 'react';
import { MapPin, Clock, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINICA } from '../../../config/clinica';
import { resumenHorario } from '../../../lib/horarios';
import { enlaceWhatsApp } from '../../../lib/whatsapp';

gsap.registerPlugin(ScrollTrigger);

export const ContactBentoSection = () => {
  const sectionRef = useRef(null);
  const horario = resumenHorario();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 95%' } },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Mapa */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md flex flex-col justify-between min-h-[480px]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-ink">Ubicación del Consultorio</h2>
                <p className="text-xs font-medium text-slate-500">
                  {CLINICA.direccion.zona}, {CLINICA.direccion.municipio} – {CLINICA.direccion.departamento}
                </p>
              </div>
            </div>
            <a
              href={CLINICA.mapa.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-bold text-brand hover:underline bg-brand/10 px-3 py-2 rounded-xl transition-all shrink-0"
            >
              <span>Abrir en Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-full min-h-[360px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
            <iframe
              title={`Mapa de ubicación de ${CLINICA.nombreCompleto}`}
              src={CLINICA.mapa.embed}
              className="w-full h-full min-h-[360px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          {/* Horarios (se generan desde config/clinica.js) */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif font-bold text-ink">Horarios de Atención</h2>
            </div>

            <dl className="space-y-4 text-slate-700">
              {horario.map(({ dias, horas, cerrado }, indice) => (
                <div
                  key={dias}
                  className={`flex justify-between items-center gap-4 ${indice < horario.length - 1 ? 'pb-3 border-b border-slate-100' : ''}`}
                >
                  <dt className="text-sm font-semibold text-ink">{dias}</dt>
                  <dd
                    className={
                      cerrado
                        ? 'text-xs font-bold text-rose-500 uppercase tracking-wider'
                        : 'text-sm font-medium text-slate-600 text-right'
                    }
                  >
                    {horas}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Contacto directo */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand/10 text-brand flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-serif font-bold text-ink">Contacto</h2>
            </div>

            <p className="text-sm font-normal text-slate-600 leading-relaxed mb-4">
              Escríbenos o llámanos para resolver cualquier duda sobre nuestros servicios.
            </p>

            <div className="space-y-3">
              <a
                href={enlaceWhatsApp('Hola, tengo una consulta.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold text-ink hover:text-brand transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-whatsapp shrink-0" />
                WhatsApp {CLINICA.telefonoVisible}
              </a>
              <a
                href={`tel:${CLINICA.telefono}`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold text-ink hover:text-brand transition-colors"
              >
                <Phone className="w-5 h-5 text-brand shrink-0" />
                Llamar al {CLINICA.telefonoVisible}
              </a>
              <a
                href={`mailto:${CLINICA.email}`}
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-semibold text-ink hover:text-brand transition-colors break-all"
              >
                <Mail className="w-5 h-5 text-brand shrink-0" />
                {CLINICA.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBentoSection;
