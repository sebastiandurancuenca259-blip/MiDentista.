/**
 * Preguntas frecuentes oficiales de la Clínica Dental Mi Dentista.
 */
export const PREGUNTAS_FAQ = [
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

/**
 * Inicializa la interactividad del acordeón FAQ en la página.
 */
export function initFaqAccordion() {
  const items = document.querySelectorAll('.faq-item');
  if (items.length === 0) return;

  items.forEach((item, indice) => {
    const btn = item.querySelector('.faq-button');
    const panel = item.querySelector('.faq-panel');
    const chevron = item.querySelector('.faq-chevron');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const estaAbierto = btn.getAttribute('aria-expanded') === 'true';

      // Cerrar otros si se desea acordeón exclusivo
      items.forEach((otro) => {
        const otroBtn = otro.querySelector('.faq-button');
        const otroPanel = otro.querySelector('.faq-panel');
        const otroChevron = otro.querySelector('.faq-chevron');
        if (otroBtn && otroPanel) {
          otroBtn.setAttribute('aria-expanded', 'false');
          otroPanel.classList.add('hidden');
          otroChevron?.classList.remove('rotate-180');
        }
      });

      if (!estaAbierto) {
        btn.setAttribute('aria-expanded', 'true');
        panel.classList.remove('hidden');
        chevron?.classList.add('rotate-180');
      }
    });
  });
}
