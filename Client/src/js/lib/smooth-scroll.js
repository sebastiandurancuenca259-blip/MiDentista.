import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
const ALTURA_NAVBAR = 90;

/**
 * Activa el scroll suave (Lenis) sincronizado con GSAP ScrollTrigger.
 * Devuelve la función de limpieza. No se activa si el usuario pidió
 * "reducir movimiento" en su sistema operativo.
 */
export function iniciarScrollSuave() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  if (lenis) return () => {};

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);

  const avanzar = (tiempo) => lenis?.raf(tiempo * 1000);
  gsap.ticker.add(avanzar);
  gsap.ticker.lagSmoothing(0);

  // Escucha anclas internas en la página
  document.addEventListener('click', (e) => {
    const enlace = e.target.closest('a[href*="#"]');
    if (!enlace) return;

    const url = new URL(enlace.href, window.location.href);
    if (url.pathname === window.location.pathname && url.hash) {
      const objetivo = document.querySelector(url.hash);
      if (objetivo) {
        e.preventDefault();
        desplazarA(objetivo, { offset: -ALTURA_NAVBAR });
      }
    }
  });

  // Si al cargar hay un ancla en la URL, desplazar hasta ella
  if (window.location.hash) {
    setTimeout(() => {
      const destino = document.querySelector(window.location.hash);
      if (destino) {
        desplazarA(destino, { offset: -ALTURA_NAVBAR });
      }
    }, 150);
  }

  return () => {
    gsap.ticker.remove(avanzar);
    gsap.ticker.lagSmoothing(500, 33);
    lenis?.destroy();
    lenis = null;
  };
}

/**
 * Lleva la página arriba o hacia un elemento usando Lenis o window.scrollTo.
 */
export function desplazarA(destino = 0, { inmediato = false, offset = 0 } = {}) {
  const top =
    typeof destino === 'number'
      ? destino
      : destino.getBoundingClientRect().top + window.scrollY + offset;

  if (!lenis) {
    window.scrollTo({ top, behavior: inmediato ? 'instant' : 'smooth' });
    return;
  }

  lenis.resize();
  if (inmediato) {
    window.scrollTo({ top, behavior: 'instant' });
    lenis.reset();
    return;
  }
  lenis.reset();
  lenis.scrollTo(top, { force: true });
}

export default { iniciarScrollSuave, desplazarA };
