import { iconSvg } from '../icons';

const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let modalActivo = null;
let ultimoElementoEnfocado = null;
let overflowBodyOriginal = '';

/**
 * Cierra el modal actualmente activo en el DOM.
 */
export function cerrarModal() {
  if (!modalActivo) return;

  const { overlay, alCerrar, listenerTecla } = modalActivo;

  document.removeEventListener('keydown', listenerTecla);
  document.body.style.overflow = overflowBodyOriginal;

  overlay.classList.add('opacity-0', 'pointer-events-none');
  setTimeout(() => {
    overlay.remove();
  }, 200);

  modalActivo = null;

  if (typeof alCerrar === 'function') {
    alCerrar();
  }

  // Devuelve el foco al elemento que abrió el modal
  if (ultimoElementoEnfocado && typeof ultimoElementoEnfocado.focus === 'function') {
    ultimoElementoEnfocado.focus();
  }
}

/**
 * Abre un modal accesible en pantalla.
 * @param {object} opciones
 * @param {string} opciones.titulo - Título principal del modal
 * @param {string} [opciones.subtitulo] - Subtítulo superior en mayúsculas
 * @param {string} [opciones.icono] - Nombre de icono de icons.js
 * @param {string} [opciones.className] - Clases para el ancho del panel (ej. max-w-lg, max-w-2xl)
 * @param {string|HTMLElement} opciones.contenido - Contenido HTML o nodo a inyectar
 * @param {function} [opciones.alCerrar] - Callback ejecutado al cerrar el modal
 * @param {function} [opciones.alMontar] - Callback ejecutado tras insertar el modal en el DOM
 */
export function abrirModal({
  titulo = '',
  subtitulo = '',
  icono = null,
  className = 'max-w-lg',
  contenido = '',
  alCerrar = null,
  alMontar = null,
} = {}) {
  // Si ya hay uno abierto, ciérralo antes
  if (modalActivo) {
    cerrarModal();
  }

  ultimoElementoEnfocado = document.activeElement;
  overflowBodyOriginal = document.body.style.overflow;
  document.body.style.overflow = 'hidden';

  const modalId = `modal-${Date.now()}`;
  const tituloId = `${modalId}-titulo`;

  const iconoHtml = icono
    ? `<div class="w-12 h-12 rounded-2xl bg-ink text-white flex items-center justify-center shrink-0">
        ${iconSvg(icono, { className: 'w-6 h-6' })}
      </div>`
    : '';

  const subtituloHtml = subtitulo
    ? `<span class="text-xs font-bold uppercase tracking-widest text-brand">${subtitulo}</span>`
    : '';

  const overlay = document.createElement('div');
  overlay.id = modalId;
  overlay.className =
    'fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm transition-opacity duration-200 animate-fade-in';
  overlay.setAttribute('data-lenis-prevent', '');

  overlay.innerHTML = `
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="${tituloId}"
      tabindex="-1"
      class="bg-white rounded-3xl w-full ${className} p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto outline-none modal-panel"
    >
      <button
        type="button"
        id="${modalId}-btn-cerrar"
        aria-label="Cerrar ventana"
        class="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black transition-colors cursor-pointer"
      >
        ${iconSvg('x', { className: 'w-5 h-5' })}
      </button>

      <div class="flex items-center gap-4 mb-6 pr-12">
        ${iconoHtml}
        <div>
          ${subtituloHtml}
          <h2 id="${tituloId}" class="text-2xl font-serif font-bold text-ink">${titulo}</h2>
        </div>
      </div>

      <div id="${modalId}-cuerpo" class="modal-body"></div>
    </div>
  `;

  document.body.appendChild(overlay);

  const panel = overlay.querySelector('.modal-panel');
  const btnCerrar = overlay.querySelector(`#${modalId}-btn-cerrar`);
  const cuerpo = overlay.querySelector(`#${modalId}-cuerpo`);

  if (typeof contenido === 'string') {
    cuerpo.innerHTML = contenido;
  } else if (contenido instanceof HTMLElement) {
    cuerpo.appendChild(contenido);
  }

  // Cierre por click en backdrop
  overlay.addEventListener('mousedown', (e) => {
    if (e.target === overlay) {
      cerrarModal();
    }
  });

  // Cierre por botón X
  btnCerrar.addEventListener('click', () => {
    cerrarModal();
  });

  // Manejo de teclado (Escape y Focus Trap)
  const listenerTecla = (e) => {
    if (e.key === 'Escape') {
      cerrarModal();
      return;
    }

    if (e.key !== 'Tab' || !panel) return;

    const elementos = Array.from(panel.querySelectorAll(ENFOCABLES));
    if (elementos.length === 0) return;

    const primero = elementos[0];
    const ultimo = elementos[elementos.length - 1];

    if (e.shiftKey && (document.activeElement === primero || document.activeElement === panel)) {
      e.preventDefault();
      ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault();
      primero.focus();
    }
  };

  document.addEventListener('keydown', listenerTecla);

  modalActivo = { overlay, panel, alCerrar, listenerTecla };

  // Foco inicial accesible
  setTimeout(() => {
    panel.focus();
    if (typeof alMontar === 'function') {
      alMontar(cuerpo);
    }
  }, 10);

  return {
    overlay,
    panel,
    cuerpo,
    cerrar: cerrarModal,
  };
}

export default { abrirModal, cerrarModal };
