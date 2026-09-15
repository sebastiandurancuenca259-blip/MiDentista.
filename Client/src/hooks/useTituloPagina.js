import { useEffect } from 'react';
import { CLINICA } from '../config/clinica';

/** Cambia el título de la pestaña del navegador mientras la página está abierta. */
export default function useTituloPagina(titulo) {
  useEffect(() => {
    const anterior = document.title;
    document.title = titulo ? `${titulo} | ${CLINICA.nombre}` : `${CLINICA.nombre} | Clínica Dental en Satélite Norte`;
    return () => {
      document.title = anterior;
    };
  }, [titulo]);
}
