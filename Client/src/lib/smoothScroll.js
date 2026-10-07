import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

/**
 * Activa el scroll suave (Lenis) sincronizado con GSAP ScrollTrigger.
 * Devuelve la función de limpieza. No se activa si el usuario pidió
 * "reducir movimiento" en su sistema operativo.
 */
export function iniciarScrollSuave() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

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

  return () => {
    gsap.ticker.remove(avanzar);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    lenis = null;
  };
}

/** Lleva la página arriba (o a un elemento) usando Lenis si está activo. */
export function desplazarA(destino = 0, { inmediato = false, offset = 0 } = {}) {
  // La posición se calcula con el scroll real del navegador: tras un cambio de
  // página el estado interno de Lenis puede estar desactualizado.
  const top =
    typeof destino === 'number'
      ? destino
      : destino.getBoundingClientRect().top + window.scrollY + offset;

  if (!lenis) {
    window.scrollTo({ top, behavior: inmediato ? 'instant' : 'smooth' });
    return;
  }

  lenis.resize(); // la página nueva puede tener otro alto
  if (inmediato) {
    window.scrollTo({ top, behavior: 'instant' });
    lenis.reset(); // sincroniza el estado interno con la posición real
    return;
  }
  lenis.reset();
  lenis.scrollTo(top, { force: true });
}
