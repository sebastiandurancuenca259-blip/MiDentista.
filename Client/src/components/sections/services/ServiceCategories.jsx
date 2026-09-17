import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { ArrowRight, CheckCircle2, Search, X, Clock, Check } from 'lucide-react';
import gsap from 'gsap';
import Modal from '../../ui/Modal';
import { CATEGORIAS, SERVICIOS } from '../../../data/servicios';

const TODOS = 'todos';
const normalizar = (texto) => texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export const ServiceCategories = () => {
  const [parametros] = useSearchParams();
  const categoriaInicial = parametros.get('categoria');
  const [categoriaActiva, setCategoriaActiva] = useState(
    CATEGORIAS.some((c) => c.id === categoriaInicial) ? categoriaInicial : TODOS,
  );
  const [busqueda, setBusqueda] = useState('');
  const [servicioElegido, setServicioElegido] = useState(null);
  const gridRef = useRef(null);

  const nombreCategoria = (id) => CATEGORIAS.find((c) => c.id === id)?.nombre ?? '';
  const termino = normalizar(busqueda);

  const serviciosFiltrados = SERVICIOS.filter((servicio) => {
    const coincideCategoria = categoriaActiva === TODOS || servicio.categoria === categoriaActiva;
    const coincideBusqueda =
      normalizar(servicio.titulo).includes(termino) ||
      normalizar(servicio.descripcion).includes(termino) ||
      normalizar(nombreCategoria(servicio.categoria)).includes(termino);
    return coincideCategoria && coincideBusqueda;
  });

  // Re-anima la grilla cuando cambian el filtro o la búsqueda.
  useEffect(() => {
    if (!gridRef.current) return;
    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 30, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
    );
  }, [categoriaActiva, busqueda]);

  const restablecer = () => {
    setBusqueda('');
    setCategoriaActiva(TODOS);
  };

  const pestanas = [{ id: TODOS, nombre: 'Todos' }, ...CATEGORIAS];

  return (
    <section id="catalogo" className="py-16 lg:py-24 px-6 md:px-12 lg:px-20 xl:px-32 w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-px bg-brand"></span>
          <span className="text-xs font-bold tracking-widest uppercase text-brand">Catálogo de Tratamientos</span>
          <span className="w-8 h-px bg-brand"></span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-ink mb-4">Nuestros Servicios Dentales</h2>
        <p className="text-base sm:text-lg font-light text-muted leading-relaxed">
          Explora nuestra variedad de tratamientos enfocados en mantener tu salud bucal y la de toda tu familia.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-12 bg-slate-50 p-3 sm:p-4 rounded-3xl border border-slate-200">
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto flex-1" role="group" aria-label="Filtrar por categoría">
          {pestanas.map((categoria) => (
            <button
              key={categoria.id}
              type="button"
              onClick={() => setCategoriaActiva(categoria.id)}
              aria-pressed={categoriaActiva === categoria.id}
              className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                categoriaActiva === categoria.id
                  ? 'bg-ink text-white shadow-md'
                  : 'bg-white text-muted hover:bg-slate-200 hover:text-ink border border-slate-200/60'
              }`}
            >
              {categoria.nombre}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 lg:w-72 shrink-0">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            aria-label="Buscar tratamiento"
            placeholder="Buscar tratamiento..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-ink focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all placeholder:text-slate-400"
          />
          {busqueda && (
            <button
              type="button"
              onClick={() => setBusqueda('')}
              aria-label="Borrar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {serviciosFiltrados.length === 0 ? (
        <div className="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <p className="text-lg font-medium text-muted">
            No se encontraron servicios{busqueda ? ` que coincidan con "${busqueda}"` : ''}.
          </p>
          <button type="button" onClick={restablecer} className="mt-4 text-sm font-bold text-brand underline hover:text-deep cursor-pointer">
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {serviciosFiltrados.map((servicio) => {
            const Icono = servicio.icono;
            return (
              <button
                key={servicio.id}
                type="button"
                onClick={() => setServicioElegido(servicio)}
                className="group text-left rounded-3xl p-6 sm:p-8 bg-white border border-line shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] smooth-hover hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-ink via-brand to-deep-2 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-ink/5 text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-white smooth-hover shadow-xs">
                      <Icono className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-ink">
                        {servicio.etiqueta}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand/10 text-brand">{servicio.duracion}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-ink mb-3 group-hover:text-brand transition-colors">{servicio.titulo}</h3>
                  <p className="text-sm font-light text-muted leading-relaxed mb-6">{servicio.descripcion}</p>

                  <ul className="space-y-2 mb-8 border-t border-slate-100 pt-4">
                    {servicio.beneficios.map((beneficio) => (
                      <li key={beneficio} className="flex items-center gap-2 text-xs text-ink font-medium">
                        <Check className="w-3.5 h-3.5 text-brand shrink-0" />
                        <span>{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <span className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brand">
                  <span>Ver detalles del servicio</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            );
          })}
        </div>
      )}

      <Modal
        abierto={Boolean(servicioElegido)}
        onCerrar={() => setServicioElegido(null)}
        titulo={servicioElegido?.titulo}
        subtitulo={servicioElegido ? nombreCategoria(servicioElegido.categoria) : ''}
        icono={servicioElegido?.icono}
        className="max-w-2xl"
      >
        {servicioElegido && (
          <>
            <div className="space-y-6 text-muted text-sm leading-relaxed border-t border-slate-100 pt-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink mb-2">Descripción General</h3>
                <p>{servicioElegido.detalle}</p>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-ink mb-3">Beneficios Principales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {servicioElegido.beneficios.map((beneficio) => (
                    <div key={beneficio} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                      <span className="text-xs font-semibold text-ink">{beneficio}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-brand/5 border border-brand/20 text-ink">
                <Clock className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <span className="text-xs font-bold block text-brand">Duración y Modalidad</span>
                  <span className="text-xs">{servicioElegido.duracion} • Atención cuidadosa y cómoda</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => setServicioElegido(null)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-ink text-xs font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer"
              >
                Cerrar
              </button>
              <Link
                to={`/agendar?servicio=${servicioElegido.id}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-ink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand transition-colors text-center"
              >
                Agendar Consulta
              </Link>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
};

export default ServiceCategories;
