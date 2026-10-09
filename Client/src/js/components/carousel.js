import { iconSvg } from '../icons';

export const COMPROMISOS = [
  {
    title: 'Atención Paciente y Cómoda',
    description:
      'Nos tomamos el tiempo necesario para escucharte. Aplicamos técnicas suaves y anestesia local para que tu experiencia en la silla dental sea lo más cómoda posible.',
    tag: 'Tu Comodidad Primero',
    icon: 'heartPulse',
  },
  {
    title: 'Bioseguridad e Higiene Estricta',
    description:
      'Cumplimos con rigurosos protocolos de esterilización y limpieza en cada instrumental y equipo, protegiendo tu salud y la de tu familia en todo momento.',
    tag: 'Salud Protegida',
    icon: 'shieldCheck',
  },
  {
    title: 'Presupuestos Claros y Justos',
    description:
      'Te explicamos detalladamente cada etapa de tu tratamiento y sus costos antes de empezar. Sin sorpresas ni cobros imprevistos.',
    tag: 'Tranquilidad y Ética',
    icon: 'stethoscope',
  },
];

/**
 * Inicializa el carrusel de compromisos y garantías en la página de inicio.
 */
export function initCarousel() {
  const contenedor = document.getElementById('guarantee-card-container');
  const contador = document.getElementById('guarantee-counter');
  const btnPrev = document.getElementById('guarantee-prev-btn');
  const btnNext = document.getElementById('guarantee-next-btn');

  if (!contenedor || !btnPrev || !btnNext) return;

  let indiceActual = 0;

  function render() {
    const item = COMPROMISOS[indiceActual];

    contenedor.innerHTML = `
      <div class="w-14 h-14 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6">
        ${iconSvg(item.icon, { className: 'w-7 h-7' })}
      </div>
      
      <p class="text-xs font-bold uppercase tracking-widest text-brand mb-2">
        ${item.tag}
      </p>

      <h3 class="text-2xl sm:text-3xl font-serif font-semibold text-ink mb-4">
        ${item.title}
      </h3>

      <p class="text-base sm:text-lg font-light text-muted leading-relaxed mb-8">
        ${item.description}
      </p>

      <div class="flex items-center gap-3 border-t border-slate-100 pt-6">
        ${iconSvg('sparkles', { className: 'w-5 h-5 text-brand' })}
        <p class="text-xs font-semibold uppercase tracking-wider text-ink">
          Mi Dentista - Atención Clínica de Confianza
        </p>
      </div>
    `;

    if (contador) {
      contador.textContent = `0${indiceActual + 1} / 0${COMPROMISOS.length}`;
    }
  }

  btnPrev.addEventListener('click', () => {
    indiceActual = (indiceActual - 1 + COMPROMISOS.length) % COMPROMISOS.length;
    render();
  });

  btnNext.addEventListener('click', () => {
    indiceActual = (indiceActual + 1) % COMPROMISOS.length;
    render();
  });

  render();
}
