import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCarousel } from './components/carousel';

gsap.registerPlugin(ScrollTrigger);

export function initHomePage() {
  // 1. Inicializar el carrusel de compromisos
  initCarousel();

  // 2. Animación de entrada del Hero
  const heroSection = document.getElementById('hero-section');
  if (heroSection) {
    const bgImg = heroSection.querySelector('.hero-bg-img');
    const heading = heroSection.querySelector('.hero-heading');
    const subtitle = heroSection.querySelector('.hero-subtitle');
    const cta = heroSection.querySelector('.hero-cta');
    const floatingCard = heroSection.querySelector('.hero-floating-card');

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (bgImg) tl.fromTo(bgImg, { scale: 1.15, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6 });
    if (heading) tl.fromTo(heading, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=1.0');
    if (subtitle) tl.fromTo(subtitle, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');
    if (cta) tl.fromTo(cta, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5');
    if (floatingCard) tl.fromTo(floatingCard, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9 }, '-=0.7');
  }

  // 3. ScrollTrigger en Filosofía
  const philSection = document.getElementById('philosophy');
  if (philSection) {
    const leftCol = philSection.querySelector('.phil-left-col');
    const rightCol = philSection.querySelector('.phil-right-col');
    const cards = philSection.querySelector('.phil-cards');

    if (leftCol) {
      gsap.fromTo(
        leftCol,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: philSection, start: 'top 80%' } },
      );
    }

    if (rightCol) {
      gsap.fromTo(
        rightCol,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out', scrollTrigger: { trigger: philSection, start: 'top 80%' } },
      );
    }

    if (cards) {
      gsap.fromTo(
        cards.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: cards, start: 'top 85%' },
        },
      );
    }
  }

  // 4. ScrollTrigger en Servicios destacados
  const servSection = document.getElementById('services');
  if (servSection) {
    const grid = servSection.querySelector('.services-grid');
    if (grid) {
      gsap.fromTo(
        grid.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: grid, start: 'top 95%' },
        },
      );
    }
  }

  // 5. ScrollTrigger en Instalaciones
  const envSection = document.getElementById('environment');
  if (envSection) {
    const gallery = envSection.querySelector('.env-gallery');
    if (gallery) {
      gsap.fromTo(
        gallery.children,
        { scale: 0.92, opacity: 0, y: 40 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: gallery, start: 'top 85%' },
        },
      );
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHomePage);
} else {
  initHomePage();
}
