import { ESTADOS_CITA, actualizarEstadoCita, eliminarCita, listarCitas } from '../../lib/citas';
import { formatearFechaCorta, formatearFechaLarga, hoyISO, recortarHora } from '../../lib/fechas';
import { enlaceWhatsApp, numeroParaWhatsApp } from '../../lib/whatsapp';
import { nombreServicio } from '../../data/servicios';
import { CLINICA } from '../../config/clinica';
import { iconSvg } from '../icons';

const VISTAS = [
  { id: 'hoy', etiqueta: 'Hoy' },
  { id: 'proximas', etiqueta: 'Próximas' },
  { id: 'pasadas', etiqueta: 'Pasadas' },
  { id: 'todas', etiqueta: 'Todas' },
];

const ACCIONES = {
  pendiente: [
    { estado: 'confirmada', etiqueta: 'Confirmar', icono: 'check', clases: 'bg-sky-50 text-sky-700 hover:bg-sky-100' },
    { estado: 'cancelada', etiqueta: 'Cancelar', icono: 'x', clases: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
  ],
  confirmada: [
    { estado: 'atendida', etiqueta: 'Atendida', icono: 'checkCheck', clases: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
    { estado: 'cancelada', etiqueta: 'Cancelar', icono: 'x', clases: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
  ],
  cancelada: [
    { estado: 'pendiente', etiqueta: 'Reactivar', icono: 'rotateCcw', clases: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
  ],
  atendida: [],
};

const estadoDe = (cita) => cita.estado ?? 'pendiente';

function mensajeParaPaciente(cita) {
  const saludo = `Hola ${cita.paciente_nombre?.split(' ')[0] ?? ''}, le escribimos de ${CLINICA.nombreCompleto}.`;
  const cuando = `${formatearFechaLarga(cita.fecha_cita)} a las ${recortarHora(cita.hora_cita)}`;
  if (estadoDe(cita) === 'cancelada') return `${saludo} Su cita del ${cuando} fue cancelada. ¿Desea reprogramarla?`;
  return `${saludo} Confirmamos su cita de ${nombreServicio(cita.servicio_id)} para el ${cuando}. ¡Le esperamos!`;
}

/**
 * Renderiza y gestiona el panel administrativo de citas.
 * @param {HTMLElement} contenedor - Contenedor en el DOM
 * @param {object} opciones
 * @param {function} opciones.onCerrarSesion - Callback para cerrar sesión
 */
export function renderAdminDashboard(contenedor, { onCerrarSesion = () => {} } = {}) {
  if (!contenedor) return;

  const state = {
    citas: [],
    cargando: true,
    error: '',
    vista: 'proximas',
    filtroEstado: 'todos',
    busqueda: '',
    procesandoId: null,
  };

  const hoy = hoyISO();

  async function cargarCitas() {
    state.cargando = true;
    render();
    const { datos, error } = await listarCitas();
    state.cargando = false;
    state.error = error ? error.mensaje : '';
    if (!error) {
      state.citas = datos ?? [];
    }
    render();
  }

  function obtenerResumen() {
    const activas = state.citas.filter((c) => estadoDe(c) !== 'cancelada');
    return {
      hoy: activas.filter((c) => c.fecha_cita === hoy).length,
      pendientes: state.citas.filter((c) => estadoDe(c) === 'pendiente' && c.fecha_cita >= hoy).length,
      proximas: activas.filter((c) => c.fecha_cita >= hoy).length,
    };
  }

  function obtenerVisibles() {
    const termino = state.busqueda.trim().toLowerCase();
    const lista = state.citas.filter((cita) => {
      if (state.vista === 'hoy' && cita.fecha_cita !== hoy) return false;
      if (state.vista === 'proximas' && cita.fecha_cita < hoy) return false;
      if (state.vista === 'pasadas' && cita.fecha_cita >= hoy) return false;
      if (state.filtroEstado !== 'todos' && estadoDe(cita) !== state.filtroEstado) return false;
      if (!termino) return true;
      return [cita.paciente_nombre, cita.paciente_telefono, cita.paciente_email]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(termino));
    });
    return state.vista === 'pasadas' || state.vista === 'todas' ? [...lista].reverse() : lista;
  }

  function render() {
    const resumen = obtenerResumen();
    const visibles = obtenerVisibles();

    contenedor.innerHTML = `
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 animate-fade-in">
        <!-- Encabezado -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-serif font-bold text-ink flex items-center gap-3">
              ${iconSvg('calendarDays', { className: 'w-8 h-8 text-brand' })}
              Citas de la clínica
            </h1>
            <p class="text-sm text-slate-500 mt-1">Gestiona las solicitudes que llegan desde la página web.</p>
          </div>

          <div class="flex items-center gap-3">
            <button
              type="button"
              id="btn-refrescar-citas"
              class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all cursor-pointer"
              title="Actualizar"
              aria-label="Actualizar lista de citas"
            >
              ${iconSvg('refreshCw', { className: `w-5 h-5 ${state.cargando ? 'animate-spin' : ''}` })}
            </button>
            <button
              type="button"
              id="btn-cerrar-sesion"
              class="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
            >
              ${iconSvg('logOut', { className: 'w-4 h-4' })}
              <span>Cerrar sesión</span>
            </button>
          </div>
        </div>

        <!-- Tarjetas de Resumen -->
        <div class="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
          <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <p class="text-2xl sm:text-3xl font-serif font-bold text-ink">${resumen.hoy}</p>
            <p class="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Citas hoy</p>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <p class="text-2xl sm:text-3xl font-serif font-bold text-ink">${resumen.pendientes}</p>
            <p class="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Por confirmar</p>
          </div>
          <div class="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <p class="text-2xl sm:text-3xl font-serif font-bold text-ink">${resumen.proximas}</p>
            <p class="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">Próximas</p>
          </div>
        </div>

        <!-- Filtros y Búsqueda -->
        <div class="flex flex-col lg:flex-row gap-3 lg:items-center justify-between mb-6">
          <div class="flex flex-wrap gap-2" role="group" aria-label="Periodo" id="grupo-vistas">
            ${VISTAS.map(
              (opc) => `
              <button
                type="button"
                data-vista="${opc.id}"
                aria-pressed="${state.vista === opc.id}"
                class="btn-vista px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  state.vista === opc.id
                    ? 'bg-ink text-white'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }"
              >
                ${opc.etiqueta}
              </button>
            `,
            ).join('')}
          </div>

          <div class="flex flex-col sm:flex-row gap-3">
            <select
              id="select-filtro-estado"
              aria-label="Filtrar por estado"
              class="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-ink focus:outline-none focus:border-brand"
            >
              <option value="todos" ${state.filtroEstado === 'todos' ? 'selected' : ''}>Todos los estados</option>
              ${Object.entries(ESTADOS_CITA)
                .map(
                  ([id, info]) => `
                <option value="${id}" ${state.filtroEstado === id ? 'selected' : ''}>${info.etiqueta}</option>
              `,
                )
                .join('')}
            </select>

            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                ${iconSvg('search', { className: 'w-4 h-4' })}
              </span>
              <input
                id="input-buscar-cita"
                type="search"
                aria-label="Buscar paciente"
                placeholder="Buscar por nombre o teléfono"
                value="${state.busqueda}"
                class="w-full sm:w-64 pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand"
              />
            </div>
          </div>
        </div>

        ${
          state.error
            ? `
            <div role="alert" class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
              ${iconSvg('alertCircle', { className: 'w-5 h-5 shrink-0' })}
              <span>${state.error}</span>
            </div>
          `
            : ''
        }

        <!-- Lista de Citas -->
        <div class="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
          ${
            state.cargando && state.citas.length === 0
              ? `<p class="p-12 text-center text-slate-500 font-medium">Cargando citas…</p>`
              : visibles.length === 0
                ? `<p class="p-12 text-center text-slate-500 font-medium">No hay citas para este filtro.</p>`
                : `
                  <ul class="divide-y divide-slate-100" id="lista-citas-ul">
                    ${visibles
                      .map((cita) => {
                        const estado = estadoDe(cita);
                        const infoEstado = ESTADOS_CITA[estado] ?? ESTADOS_CITA.pendiente;
                        const ocupada = state.procesandoId === cita.id;
                        const acciones = ACCIONES[estado] ?? [];

                        return `
                          <li
                            class="p-5 lg:px-8 grid gap-4 lg:grid-cols-[1.2fr_1.2fr_1fr_auto] lg:items-center ${
                              ocupada ? 'opacity-50' : ''
                            } ${estado === 'cancelada' ? 'bg-slate-50/60' : ''}"
                          >
                            <div>
                              <p class="text-sm font-bold text-ink capitalize">
                                ${formatearFechaCorta(cita.fecha_cita)} · ${recortarHora(cita.hora_cita)}
                              </p>
                              <p class="font-semibold text-ink">${cita.paciente_nombre || 'Sin nombre'}</p>
                              <p class="text-xs text-slate-500">${nombreServicio(cita.servicio_id)}</p>
                            </div>

                            <div class="space-y-1 text-sm">
                              <a href="tel:${cita.paciente_telefono}" class="flex items-center gap-2 text-slate-600 hover:text-brand">
                                ${iconSvg('phone', { className: 'w-3.5 h-3.5 text-brand' })}
                                ${cita.paciente_telefono || 'N/A'}
                              </a>
                              ${
                                cita.paciente_email
                                  ? `
                                  <a href="mailto:${cita.paciente_email}" class="flex items-center gap-2 text-slate-500 text-xs hover:text-brand break-all">
                                    ${iconSvg('mail', { className: 'w-3.5 h-3.5 text-slate-400' })}
                                    ${cita.paciente_email}
                                  </a>
                                `
                                  : ''
                              }
                            </div>

                            <div>
                              <span class="inline-block text-xs font-bold px-3 py-1 rounded-full border ${infoEstado.clases}">
                                ${infoEstado.etiqueta}
                              </span>
                            </div>

                            <div class="flex flex-wrap gap-2 lg:justify-end">
                              ${
                                cita.paciente_telefono
                                  ? `
                                  <a
                                    href="${enlaceWhatsApp(
                                      mensajeParaPaciente(cita),
                                      numeroParaWhatsApp(cita.paciente_telefono),
                                    )}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-whatsapp/10 text-emerald-700 hover:bg-whatsapp/20"
                                  >
                                    ${iconSvg('messageCircle', { className: 'w-3.5 h-3.5' })} WhatsApp
                                  </a>
                                `
                                  : ''
                              }
                              ${acciones
                                .map(
                                  (acc) => `
                                  <button
                                    type="button"
                                    data-accion-cita="${cita.id}"
                                    data-nuevo-estado="${acc.estado}"
                                    ${ocupada ? 'disabled' : ''}
                                    class="btn-accion-cita inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed ${acc.clases}"
                                  >
                                    ${iconSvg(acc.icono, { className: 'w-3.5 h-3.5' })} ${acc.etiqueta}
                                  </button>
                                `,
                                )
                                .join('')}
                              <button
                                type="button"
                                data-borrar-cita="${cita.id}"
                                data-paciente="${cita.paciente_nombre}"
                                data-fecha="${formatearFechaCorta(cita.fecha_cita)}"
                                ${ocupada ? 'disabled' : ''}
                                aria-label="Eliminar la cita de ${cita.paciente_nombre}"
                                title="Eliminar"
                                class="btn-borrar-cita inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
                              >
                                ${iconSvg('trash2', { className: 'w-3.5 h-3.5' })}
                              </button>
                            </div>
                          </li>
                        `;
                      })
                      .join('')}
                  </ul>
                `
          }
        </div>
        <p class="text-xs text-slate-400 mt-4">
          Mostrando ${visibles.length} de ${state.citas.length} citas registradas.
        </p>
      </div>
    `;

    adjuntarListeners();
  }

  function adjuntarListeners() {
    document.getElementById('btn-refrescar-citas')?.addEventListener('click', cargarCitas);
    document.getElementById('btn-cerrar-sesion')?.addEventListener('click', onCerrarSesion);

    document.querySelectorAll('.btn-vista').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.vista = btn.getAttribute('data-vista');
        render();
      });
    });

    const selectEstado = document.getElementById('select-filtro-estado');
    selectEstado?.addEventListener('change', (e) => {
      state.filtroEstado = e.target.value;
      render();
    });

    const inputBuscar = document.getElementById('input-buscar-cita');
    inputBuscar?.addEventListener('input', (e) => {
      state.busqueda = e.target.value;
      render();
    });

    // Botones de cambio de estado
    document.querySelectorAll('.btn-accion-cita').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = Number(btn.getAttribute('data-accion-cita'));
        const nuevoEstado = btn.getAttribute('data-nuevo-estado');
        state.procesandoId = id;
        render();

        const { error } = await actualizarEstadoCita(id, nuevoEstado);
        state.procesandoId = null;

        if (error) {
          state.error = error.mensaje;
        } else {
          state.error = '';
          state.citas = state.citas.map((c) => (c.id === id ? { ...c, estado: nuevoEstado } : c));
        }
        render();
      });
    });

    // Botones de eliminación
    document.querySelectorAll('.btn-borrar-cita').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = Number(btn.getAttribute('data-borrar-cita'));
        const paciente = btn.getAttribute('data-paciente') || 'el paciente';
        const fecha = btn.getAttribute('data-fecha') || '';

        const confirmado = window.confirm(
          `¿Eliminar definitivamente la cita de ${paciente} (${fecha})? Esta acción no se puede deshacer.`,
        );
        if (!confirmado) return;

        state.procesandoId = id;
        render();

        const { error } = await eliminarCita(id);
        state.procesandoId = null;

        if (error) {
          state.error = error.mensaje;
        } else {
          state.citas = state.citas.filter((c) => c.id !== id);
        }
        render();
      });
    });
  }

  cargarCitas();
}
