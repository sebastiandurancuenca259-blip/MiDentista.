import gsap from 'gsap';
import { CATEGORIAS, SERVICIOS } from '../../data/servicios';
import { iconSvg } from '../icons';
import { abrirModal } from './modal';

const TODOS = 'todos';
const normalizar = (texto) =>
  texto ? texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : '';

export function initServiceCatalog() {
  const container = document.getElementById('catalogo-container');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const catInicial = urlParams.get('categoria');
  let categoriaActiva = CATEGORIAS.some((c) => c.id === catInicial) ? catInicial : TODOS;
  let busqueda = '';

  const pestanas = [{ id: TODOS, nombre: 'Todos' }, ...CATEGORIAS];

  function nombreCategoria(id) {
    return CATEGORIAS.find((c) => c.id === id)?.nombre ?? '';
  }

  function filtrarServicios() {
    const termino = normalizar(busqueda);
    return SERVICIOS.filter((servicio) => {
      const coincideCat = categoriaActiva === TODOS || servicio.categoria === categoriaActiva;
      const coincideBusqueda =
        !termino ||
        normalizar(servicio.titulo).includes(termino) ||
        normalizar(servicio.descripcion).includes(termino) ||
        normalizar(nombreCategoria(servicio.categoria)).includes(termino);
      return coincideCat && coincideBusqueda;
    });
  }

  function renderGrid() {
    const filtrados = filtrarServicios();
    const grid = document.getElementById('servicios-grid');
    const emptyState = document.getElementById('servicios-vacio');

    if (!grid || !emptyState) return;

    if (filtrados.length === 0) {
      grid.classList.add('hidden');
      emptyState.classList.remove('hidden');
      emptyState.innerHTML = `
        <div class="text-center py-16 bg-slate-50 rounded-3xl border border-slate-200">
          <p class="text-lg font-medium text-muted">
            No se encontraron servicios${busqueda ? ` que coincidan con "${busqueda}"` : ''}.
          </p>
          <button type="button" id="btn-reset-filtros" class="mt-4 text-sm font-bold text-brand underline hover:text-deep cursor-pointer">
            Restablecer filtros
          </button>
        </div>
      `;
      document.getElementById('btn-reset-filtros')?.addEventListener('click', () => {
        busqueda = '';
        categoriaActiva = TODOS;
        const inputBusqueda = document.getElementById('input-busqueda');
        if (inputBusqueda) inputBusqueda.value = '';
        actualizarPestanas();
        renderGrid();
      });
      return;
    }

    grid.classList.remove('hidden');
    emptyState.classList.add('hidden');

    grid.innerHTML = filtrados
      .map((servicio) => {
        const beneficiosHtml = servicio.beneficios
          .map(
            (b) => `
          <li class="flex items-center gap-2 text-xs text-ink font-medium">
            ${iconSvg('check', { className: 'w-3.5 h-3.5 text-brand shrink-0' })}
            <span>${b}</span>
          </li>
        `,
          )
          .join('');

        return `
          <button
            type="button"
            data-servicio-id="${servicio.id}"
            class="servicio-card group text-left rounded-3xl p-6 sm:p-8 bg-white border border-line shadow-xs hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] smooth-hover hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden transition-all duration-300"
          >
            <div class="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-ink via-brand to-deep-2 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>

            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="w-13 h-13 rounded-2xl bg-ink/5 text-ink flex items-center justify-center group-hover:bg-ink group-hover:text-white smooth-hover shadow-xs">
                  ${iconSvg(servicio.icono, { className: 'w-6 h-6' })}
                </div>
                <div class="flex items-center gap-2">
                  <span class="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-ink">
                    ${servicio.etiqueta}
                  </span>
                  <span class="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-brand/10 text-brand">
                    ${servicio.duracion}
                  </span>
                </div>
              </div>

              <h3 class="text-xl font-serif font-semibold text-ink mb-3 group-hover:text-brand transition-colors">
                ${servicio.titulo}
              </h3>
              <p class="text-sm font-light text-muted leading-relaxed mb-6">
                ${servicio.descripcion}
              </p>

              <ul class="space-y-2 mb-8 border-t border-slate-100 pt-4">
                ${beneficiosHtml}
              </ul>
            </div>

            <span class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-brand">
              <span>Ver detalles del servicio</span>
              ${iconSvg('arrowRight', { className: 'w-4 h-4 transform group-hover:translate-x-1 transition-transform' })}
            </span>
          </button>
        `;
      })
      .join('');

    // Re-animar cuadrícula con GSAP
    gsap.fromTo(
      grid.children,
      { opacity: 0, y: 25, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' },
    );

    // Eventos de click para abrir modal de detalle
    grid.querySelectorAll('.servicio-card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-servicio-id');
        const servicio = SERVICIOS.find((s) => s.id === id);
        if (servicio) {
          abrirModalDetalleServicio(servicio);
        }
      });
    });
  }

  function abrirModalDetalleServicio(servicio) {
    const beneficiosModal = servicio.beneficios
      .map(
        (b) => `
        <div class="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
          ${iconSvg('checkCircle2', { className: 'w-4 h-4 text-brand shrink-0' })}
          <span class="text-xs font-semibold text-ink">${b}</span>
        </div>
      `,
      )
      .join('');

    const contenidoModal = `
      <div class="space-y-6 text-muted text-sm leading-relaxed border-t border-slate-100 pt-6">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-ink mb-2">Descripción General</h3>
          <p>${servicio.detalle}</p>
        </div>

        <div>
          <h3 class="text-xs font-bold uppercase tracking-wider text-ink mb-3">Beneficios Principales</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${beneficiosModal}
          </div>
        </div>

        <div class="flex items-center gap-4 p-4 rounded-2xl bg-brand/5 border border-brand/20 text-ink">
          ${iconSvg('clock', { className: 'w-5 h-5 text-brand shrink-0' })}
          <div>
            <span class="text-xs font-bold block text-brand">Duración y Modalidad</span>
            <span class="text-xs">${servicio.duracion} • Atención cuidadosa y cómoda</span>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-4">
        <button
          type="button"
          id="btn-cerrar-modal-detalle"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-100 text-ink text-xs font-bold uppercase tracking-wider hover:bg-slate-200 cursor-pointer"
        >
          Cerrar
        </button>
        <a
          href="/agendar.html?servicio=${servicio.id}"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-ink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand transition-colors text-center shadow-md"
        >
          Agendar Consulta
        </a>
      </div>
    `;

    const { cerrar } = abrirModal({
      titulo: servicio.titulo,
      subtitulo: nombreCategoria(servicio.categoria),
      icono: servicio.icono,
      className: 'max-w-2xl',
      contenido: contenidoModal,
    });

    document.getElementById('btn-cerrar-modal-detalle')?.addEventListener('click', cerrar);
  }

  function actualizarPestanas() {
    const contenedorPestanas = document.getElementById('pestanas-categorias');
    if (!contenedorPestanas) return;

    contenedorPestanas.innerHTML = pestanas
      .map(
        (cat) => `
        <button
          type="button"
          data-categoria="${cat.id}"
          class="cat-tab px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
            categoriaActiva === cat.id
              ? 'bg-ink text-white shadow-md'
              : 'bg-white text-muted hover:bg-slate-200 hover:text-ink border border-slate-200/60'
          }"
        >
          ${cat.nombre}
        </button>
      `,
      )
      .join('');

    contenedorPestanas.querySelectorAll('.cat-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        categoriaActiva = btn.getAttribute('data-categoria');
        actualizarPestanas();
        renderGrid();
      });
    });
  }

  // Input de búsqueda
  const inputBusqueda = document.getElementById('input-busqueda');
  const btnClearSearch = document.getElementById('btn-clear-search');

  inputBusqueda?.addEventListener('input', (e) => {
    busqueda = e.target.value;
    if (btnClearSearch) {
      if (busqueda) btnClearSearch.classList.remove('hidden');
      else btnClearSearch.classList.add('hidden');
    }
    renderGrid();
  });

  btnClearSearch?.addEventListener('click', () => {
    busqueda = '';
    if (inputBusqueda) inputBusqueda.value = '';
    btnClearSearch.classList.add('hidden');
    renderGrid();
  });

  actualizarPestanas();
  renderGrid();
}
