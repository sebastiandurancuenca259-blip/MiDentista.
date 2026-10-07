import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

const ENFOCABLES =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Ventana modal accesible: se cierra con Esc o clic fuera, mantiene el foco
 * dentro mientras está abierta y lo devuelve al botón que la abrió.
 */
export default function Modal({ abierto, onCerrar, titulo, subtitulo, icono: Icono, className = 'max-w-lg', children }) {
  const panelRef = useRef(null);
  const cerrarRef = useRef(onCerrar);
  const tituloId = useId();

  useEffect(() => {
    cerrarRef.current = onCerrar;
  });

  useEffect(() => {
    if (!abierto) return undefined;

    const anterior = document.activeElement;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();

    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') {
        cerrarRef.current();
        return;
      }
      if (evento.key !== 'Tab' || !panelRef.current) return;
      const elementos = [...panelRef.current.querySelectorAll(ENFOCABLES)];
      if (elementos.length === 0) return;
      const primero = elementos[0];
      const ultimo = elementos.at(-1);
      if (evento.shiftKey && (document.activeElement === primero || document.activeElement === panelRef.current)) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', alPresionarTecla);
    return () => {
      document.removeEventListener('keydown', alPresionarTecla);
      document.body.style.overflow = overflowAnterior;
      anterior?.focus?.();
    };
  }, [abierto]);

  if (!abierto) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-ink/70 backdrop-blur-sm animate-fade-in"
      data-lenis-prevent
      onMouseDown={(evento) => {
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={tituloId}
        tabIndex={-1}
        className={`bg-white rounded-3xl w-full ${className} p-6 sm:p-8 relative shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto outline-none`}
      >
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar ventana"
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-black transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-4 mb-6 pr-12">
          {Icono && (
            <div className="w-12 h-12 rounded-2xl bg-ink text-white flex items-center justify-center shrink-0">
              <Icono className="w-6 h-6" />
            </div>
          )}
          <div>
            {subtitulo && (
              <span className="text-xs font-bold uppercase tracking-widest text-brand">{subtitulo}</span>
            )}
            <h2 id={tituloId} className="text-2xl font-serif font-bold text-ink">
              {titulo}
            </h2>
          </div>
        </div>

        {children}
      </div>
    </div>,
    document.body,
  );
}
