import gsap from 'gsap';
import { renderBookingForm } from './components/booking-form';

export function initBookingPage() {
  const card = document.getElementById('booking-card');
  const container = document.getElementById('booking-form-container');

  if (card) {
    gsap.fromTo(
      card,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out' },
    );
  }

  if (container) {
    const urlParams = new URLSearchParams(window.location.search);
    const servicioInicial = urlParams.get('servicio') || '';
    renderBookingForm(container, { servicioInicial });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBookingPage);
} else {
  initBookingPage();
}
