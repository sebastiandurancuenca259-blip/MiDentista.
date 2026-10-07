import { useId, useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { enlaceWhatsApp } from '../../../lib/whatsapp';

const PREGUNTAS = [
  {
    pregunta: '¿Los tratamientos dentales causan dolor?',
    respuesta:
      'Tu comodidad es nuestra prioridad. Aplicamos anestesia local y nos tomamos el tiempo necesario para que el procedimiento sea lo más cómodo posible; si sientes molestias, nos detenemos y lo ajustamos contigo.',
  },
  {
    pregunta: '¿Qué hago si tengo una urgencia dental o un dolor fuerte?',
    respuesta:
      'Atendemos urgencias de manera prioritaria. Si presentas un dolor agudo, una restauración rota o un golpe, contáctanos de inmediato por teléfono o WhatsApp para buscarte un espacio lo antes posible.',
  },
  {
    pregunta: '¿Atienden a niños y adultos?',
    respuesta:
      'Sí, brindamos atención odontológica integral para toda la familia, desde revisiones y limpiezas infantiles hasta tratamientos de restauración para adultos.',
  },
  {
    pregunta: '¿Cómo puedo agendar una cita de evaluación?',
    respuesta:
      'Puedes solicitar tu cita directamente desde la sección "Agendar Cita" de este sitio, eligiendo el día y el horario libre que prefieras, o escribiéndonos por WhatsApp. La clínica te contactará para confirmarla.',
  },
  {
    pregunta: '¿Qué formas de pago aceptan?',
    respuesta:
      'Aceptamos pagos en efectivo y transferencias bancarias. Además, coordinamos facilidades de pago según el plan de tratamiento que necesites.',
  },
  {
    pregunta: '¿Cada cuánto tiempo debo hacerme una limpieza dental?',
    respuesta:
      'Lo recomendable es realizar una limpieza profesional y revisión general cada 6 meses para prevenir la acumulación de sarro y las caries, y mantener tus encías saludables.',
  },
];

export const ServiceFAQSection = () => {
  const [abierta, setAbierta] = useState(0);
  const idBase = useId();

  return (
    <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto bg-slate-50/60">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-brand"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-brand">Resolvemos tus dudas</span>
            <span className="w-8 h-px bg-brand"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-ink mb-4">Preguntas Frecuentes</h2>
          <p className="text-base sm:text-lg font-light text-muted">
            Todo lo que necesitas saber antes de tu consulta y sobre nuestros procedimientos clínicos.
          </p>
        </div>

        <div className="space-y-4">
          {PREGUNTAS.map((item, indice) => {
            const estaAbierta = abierta === indice;
            const idPanel = `${idBase}-respuesta-${indice}`;
            return (
              <div key={item.pregunta} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md">
                <h3>
                  <button
                    type="button"
                    onClick={() => setAbierta(estaAbierta ? null : indice)}
                    aria-expanded={estaAbierta}
                    aria-controls={idPanel}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-lg text-ink hover:text-brand transition-colors cursor-pointer select-none"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-brand shrink-0" aria-hidden="true" />
                      <span>{item.pregunta}</span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`w-5 h-5 text-muted shrink-0 transition-transform duration-300 ${estaAbierta ? 'rotate-180 text-brand' : ''}`}
                    />
                  </button>
                </h3>

                {estaAbierta && (
                  <div id={idPanel} className="px-6 pb-6 pt-0 text-sm font-light text-muted leading-relaxed border-t border-slate-100 mt-1 animate-fade-in">
                    <p className="pt-4">{item.respuesta}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-ink">¿Tienes alguna otra consulta?</h3>
              <p className="text-xs text-muted">Estamos disponibles para orientarte y agendar tu hora.</p>
            </div>
          </div>
          <a
            href={enlaceWhatsApp(
              '¡Hola! Vi sus servicios en la página web y me gustaría recibir información sobre los tratamientos y disponibilidad de citas. ¡Gracias!',
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-whatsapp hover:bg-whatsapp-dark text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQSection;
