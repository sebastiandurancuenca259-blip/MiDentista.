/**
 * Sistema de notificaciones Toast (flotantes) para Mi Dentista.
 * No utiliza alert() ni las burbujas nativas del navegador.
 *
 * Uso:
 *   import { mostrarToast } from './toast';
 *   mostrarToast('¡Cita agendada!', 'exito');
 *   mostrarToast('El consultorio está cerrado ese día.', 'aviso');
 *   mostrarToast('Ocurrió un error.', 'error');
 */

// ─── Estilos inyectados una sola vez ───────────────────────────────────────
const CSS = `
  #toast-contenedor {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-end;
    pointer-events: none;
  }

  .toast-item {
    pointer-events: all;
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    min-width: 280px;
    max-width: 380px;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1.5;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid;
    opacity: 0;
    transform: translateX(120%);
    transition: opacity 0.35s cubic-bezier(.4,0,.2,1),
                transform 0.35s cubic-bezier(.4,0,.2,1);
    position: relative;
    overflow: hidden;
  }

  .toast-item.toast-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .toast-item.toast-oculto {
    opacity: 0;
    transform: translateX(120%);
  }

  .toast-exito {
    background: rgba(236, 253, 245, 0.97);
    border-color: #6ee7b7;
    color: #065f46;
  }
  .toast-aviso {
    background: rgba(255, 251, 235, 0.97);
    border-color: #fcd34d;
    color: #92400e;
  }
  .toast-error {
    background: rgba(255, 241, 242, 0.97);
    border-color: #fca5a5;
    color: #991b1b;
  }
  .toast-info {
    background: rgba(239, 246, 255, 0.97);
    border-color: #93c5fd;
    color: #1e3a8a;
  }

  .toast-icono {
    flex-shrink: 0;
    width: 1.375rem;
    height: 1.375rem;
    margin-top: 0.05rem;
  }

  .toast-cuerpo { flex: 1; }

  .toast-titulo {
    font-weight: 700;
    font-size: 0.8125rem;
    margin-bottom: 0.125rem;
  }

  .toast-mensaje {
    font-weight: 400;
    opacity: 0.85;
  }

  .toast-cerrar {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
    opacity: 0.5;
    line-height: 1;
    font-size: 1rem;
    color: inherit;
    transition: opacity 0.2s;
    margin-top: -2px;
  }
  .toast-cerrar:hover { opacity: 1; }

  .toast-barra {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    border-radius: 0 0 1rem 1rem;
    width: 100%;
    transform-origin: left;
  }

  .toast-exito .toast-barra  { background: #10b981; }
  .toast-aviso .toast-barra  { background: #f59e0b; }
  .toast-error .toast-barra  { background: #ef4444; }
  .toast-info  .toast-barra  { background: #3b82f6; }
`;

const ICONOS = {
  exito: `<svg class="toast-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  aviso: `<svg class="toast-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  error: `<svg class="toast-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  info:  `<svg class="toast-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

const TITULOS = {
  exito: '¡Listo!',
  aviso: 'Consultorio cerrado',
  error: 'Error',
  info:  'Información',
};

let inyectado = false;
let contenedorToast = null;

function inicializar() {
  if (inyectado) return;
  inyectado = true;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  contenedorToast = document.createElement('div');
  contenedorToast.id = 'toast-contenedor';
  contenedorToast.setAttribute('role', 'region');
  contenedorToast.setAttribute('aria-label', 'Notificaciones');
  document.body.appendChild(contenedorToast);
}

/**
 * Muestra una notificación flotante toast.
 *
 * @param {string} mensaje    - Texto del mensaje.
 * @param {'exito'|'aviso'|'error'|'info'} tipo - Tipo de toast.
 * @param {object} [opts]
 * @param {string} [opts.titulo]    - Título personalizado.
 * @param {number} [opts.duracion]  - Milisegundos antes de cerrarse (default: 5500).
 */
export function mostrarToast(mensaje, tipo = 'info', { titulo, duracion = 5500 } = {}) {
  if (typeof document === 'undefined') return;
  inicializar();

  const tituloFinal = titulo ?? TITULOS[tipo] ?? 'Aviso';
  const icono = ICONOS[tipo] ?? ICONOS.info;

  const item = document.createElement('div');
  item.className = `toast-item toast-${tipo}`;
  item.setAttribute('role', 'alert');
  item.setAttribute('aria-live', 'assertive');
  item.innerHTML = `
    ${icono}
    <div class="toast-cuerpo">
      <p class="toast-titulo">${tituloFinal}</p>
      <p class="toast-mensaje">${mensaje}</p>
    </div>
    <button class="toast-cerrar" aria-label="Cerrar notificación">&#x2715;</button>
    <span class="toast-barra"></span>
  `;

  contenedorToast.appendChild(item);

  // Animación de entrada (doble rAF para asegurar transición CSS)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      item.classList.add('toast-visible');
    });
  });

  // Barra de progreso animada
  const barra = item.querySelector('.toast-barra');
  if (barra) {
    barra.style.transition = `transform ${duracion}ms linear`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        barra.style.transform = 'scaleX(0)';
      });
    });
  }

  let timerId = null;

  const cerrar = () => {
    clearTimeout(timerId);
    item.classList.add('toast-oculto');
    item.classList.remove('toast-visible');
    item.addEventListener('transitionend', () => item.remove(), { once: true });
  };

  item.querySelector('.toast-cerrar')?.addEventListener('click', cerrar);

  timerId = setTimeout(cerrar, duracion);

  // Pausar al hacer hover
  item.addEventListener('mouseenter', () => {
    clearTimeout(timerId);
    if (barra) {
      barra.style.transition = 'none';
    }
  });
  item.addEventListener('mouseleave', () => {
    timerId = setTimeout(cerrar, 1800);
  });
}
