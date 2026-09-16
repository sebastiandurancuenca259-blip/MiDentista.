import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const ServiceFAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  // Número oficial del consultorio y mensaje listo para enviar
  const whatsappNumber = '59178410535'; 
  const defaultMessage = encodeURIComponent(
    '¡Hola! Vi sus servicios en la página web y me gustaría recibir información sobre los tratamientos y disponibilidad de citas. ¡Gracias!'
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  const faqs = [
    {
      question: '¿Los tratamientos dentales causan dolor?',
      answer: 'Para nada. Tu comodidad es nuestra prioridad. Aplicamos anestesia local suave y nos tomamos el tiempo necesario para asegurarnos de que no sientas ninguna molestia durante el procedimiento.',
    },
    {
      question: '¿Qué hago si tengo una urgencia dental o un dolor fuerte?',
      answer: 'Atendemos urgencias de manera prioritaria. Si presentas un dolor agudo, una restauración rota o un golpe, contáctanos de inmediato para darte un espacio el mismo día.',
    },
    {
      question: '¿Atienden a niños y adultos?',
      answer: 'Sí, brindamos atención odontológica integral para toda la familia, desde revisiones y limpiezas infantiles hasta tratamientos de restauración para adultos.',
    },
    {
      question: '¿Cómo puedo agendar una cita de evaluación?',
      answer: 'Puedes solicitar tu cita directamente a través del formulario de este sitio web o enviándonos un mensaje por WhatsApp. Te responderemos a la brevedad para coordinar el horario que mejor te convenga.',
    },
    {
      question: '¿Qué formas de pago aceptan?',
      answer: 'Aceptamos pagos en efectivo y transferencias bancarias. Además, coordinamos facilidades de pago según el plan de tratamiento que necesites.',
    },
    {
      question: '¿Cada cuánto tiempo debo hacerme una limpieza dental?',
      answer: 'Lo recomendable es realizar una limpieza profesional y revisión general cada 6 meses para prevenir la acumulación de sarro, caries y mantener tus encías totalmente saludables.',
    },
  ];

  return (
    <section className="py-20 lg:py-28 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto bg-slate-50/60">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-[#0ea5e9]">Resolvemos tus dudas</span>
            <span className="w-8 h-px bg-[#0ea5e9]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0f172a] mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base sm:text-lg font-light text-[#64748b]">
            Todo lo que necesitas saber antes de tu consulta y sobre nuestros procedimientos clínicos.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif font-semibold text-lg text-[#0f172a] hover:text-[#0ea5e9] transition-colors cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#0ea5e9] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#64748b] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#0ea5e9]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm font-light text-[#64748b] leading-relaxed border-t border-slate-100 mt-1 animate-fade-in">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Need More Assistance Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#0ea5e9] flex items-center justify-center shrink-0">
              <PhoneCall className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-[#0f172a]">¿Tienes alguna otra consulta?</h4>
              <p className="text-xs text-[#64748b]">Estamos disponibles para orientarte y agendar tu hora al instante.</p>
            </div>
          </div>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shrink-0 shadow-sm hover:shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            Contactar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};

export default ServiceFAQSection;