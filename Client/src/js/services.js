import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initServiceCatalog } from './components/service-catalog';
import { initFaqAccordion } from './components/faq-accordion';

gsap.registerPlugin(ScrollTrigger);

export function initServicesPage() {
  // 1. Inicializar catálogo reactivo
  initServiceCatalog();

  // 2. Inicializar acordeón de preguntas frecuentes
  initFaqAccordion();

  // 3. Animaciones GSAP
  const hero = document.getElementById('services-hero');
  if (hero) {
    const badge = hero.querySelector('.hero-badge');
    const title = hero.querySelector('.hero-title');
    const text = hero.querySelector('.hero-text');
    const cta = hero.querySelector('.hero-cta');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (badge) tl.fromTo(badge, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
    if (title) tl.fromTo(title, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2');
    if (text) tl.fromTo(text, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3');
    if (cta) tl.fromTo(cta, { y: 15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, '-=0.3');
  }

  // 4. Animaciones de Bento de estándares de atención
  const techSection = document.getElementById('tech-bento');
  if (techSection) {
    const header = techSection.querySelector('.tech-header');
    const grid = techSection.querySelector('.tech-grid');

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: techSection, start: 'top 80%' } },
      );
    }
    if (grid) {
      gsap.fromTo(
        grid.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: grid, start: 'top 80%' } },
      );
    }
  }

  // 5. Animaciones de Proceso de tratamiento
  const processSection = document.getElementById('treatment-process');
  if (processSection) {
    const header = processSection.querySelector('.process-header');
    const steps = processSection.querySelector('.process-steps');

    if (header) {
      gsap.fromTo(
        header,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', scrollTrigger: { trigger: processSection, start: 'top 90%' } },
      );
    }
    if (steps) {
      gsap.fromTo(
        steps.children,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: steps, start: 'top 92%' } },
      );
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initServicesPage);
} else {
  initServicesPage();
}
