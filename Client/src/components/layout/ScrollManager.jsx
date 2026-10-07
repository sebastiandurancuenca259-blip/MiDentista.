import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { desplazarA } from '../../lib/smoothScroll';

const ALTURA_NAVBAR = 90;
const ESPERA_MAXIMA_MS = 4000;

/**
 * Al cambiar de página vuelve arriba; si la URL trae #ancla, baja hasta esa
 * sección (espera a que la página, que se carga en diferido, exista).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    let cancelado = false;
    const limite = performance.now() + ESPERA_MAXIMA_MS;

    const buscarAncla = () => {
      if (cancelado) return;
      const destino = document.getElementById(hash.slice(1));
      if (destino) {
        desplazarA(destino, { offset: -ALTURA_NAVBAR });
      } else if (performance.now() < limite) {
        requestAnimationFrame(buscarAncla);
      }
    };

    desplazarA(0, { inmediato: true });
    if (hash) requestAnimationFrame(buscarAncla);

    return () => {
      cancelado = true;
    };
  }, [pathname, hash]);

  return null;
}
