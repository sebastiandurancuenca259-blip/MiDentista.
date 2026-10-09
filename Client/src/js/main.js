import '../css/styles.css';
import { initNavbar } from './components/navbar';
import { initFooter } from './components/footer';
import { iniciarScrollSuave } from './lib/smooth-scroll';
import { abrirModal } from './components/modal';

/**
 * Inicialización principal para todas las páginas del sitio web nativo.
 */
export function initApp() {
  // 1. Inicializar componentes globales
  initNavbar();
  initFooter();

  // 2. Activar scroll suave
  iniciarScrollSuave();

  // 3. Soporte global para disparar el modal de reserva en cualquier página
  document.addEventListener('click', async (e) => {
    const trigger = e.target.closest('[data-open-booking-modal]');
    if (!trigger) return;

    e.preventDefault();
    const servicioPreseleccionado = trigger.getAttribute('data-servicio') || '';

    // Carga perezosa del formulario de reserva al abrir el modal
    const { renderBookingForm } = await import('./components/booking-form.js');

    abrirModal({
      titulo: 'Agendar Cita',
      icono: 'calendar',
      className: 'max-w-2xl',
      alMontar: (cuerpo) => {
        renderBookingForm(cuerpo, { servicioInicial: servicioPreseleccionado });
      },
    });
  });
}

// Auto-arranque al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
