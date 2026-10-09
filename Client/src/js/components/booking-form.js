import { CATEGORIAS, SERVICIOS, existeServicio, nombreServicio } from '../../data/servicios';
import { HORARIO } from '../../config/clinica';
import { aISO, formatearFechaLarga, hoyISO, sumarDias } from '../../lib/fechas';
import { horariosDisponibles, motivoCierre } from '../../lib/horarios';
import { validarEmail, validarNombre, validarTelefono } from '../../lib/validacion';
import { enlaceWhatsApp } from '../../lib/whatsapp';
import { crearCita, obtenerHorariosOcupados } from '../../lib/citas';
import { supabaseConfigurado } from '../../lib/supabase';
import { iconSvg } from '../icons';

const VALORES_INICIALES = {
  servicio: 'consulta-general',
  fecha: '',
  hora: '',
  nombre: '',
  telefono: '',
  email: '',
  consentimiento: false,
  sitioWeb: '',
};

const claseCampo = (conError) =>
  `w-full border rounded-xl p-3.5 text-slate-800 bg-slate-50/50 focus:outline-none focus:bg-white transition-all text-sm ${
    conError ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-brand'
  }`;

/**
 * Renderiza y gestiona el formulario de reserva de citas nativo.
 * Puede montarse tanto en la página /agendar.html como dentro del modal de reserva en index.html.
 *
 * @param {HTMLElement} contenedor - Contenedor donde se insertará el formulario
 * @param {object} opciones - Opciones de inicialización (ej. servicioInicial)
 */
export function renderBookingForm(contenedor, { servicioInicial = '' } = {}) {
  if (!contenedor) return;

  const state = {
    paso: 1,
    valores: {
      ...VALORES_INICIALES,
      servicio: existeServicio(servicioInicial) ? servicioInicial : VALORES_INICIALES.servicio,
    },
    errores: {},
    ocupados: [],
    cargandoHorarios: false,
    enviando: false,
    errorEnvio: '',
    citaRegistrada: null,
  };

  const idForm = `booking-${Date.now()}`;
  const hoy = hoyISO();
  const fechaMaxima = aISO(sumarDias(new Date(), HORARIO.diasMaximosAnticipacion));

  function render() {
    if (state.citaRegistrada) {
      renderPantallaExito();
      return;
    }

    const cierre = state.valores.fecha ? motivoCierre(state.valores.fecha) : null;
    const horarios =
      state.valores.fecha && !cierre ? horariosDisponibles(state.valores.fecha, { ocupados: state.ocupados }) : [];

    const avisoSupabase = !supabaseConfigurado
      ? `
        <div class="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3">
          ${iconSvg('alertCircle', { className: 'w-5 h-5 shrink-0 mt-0.5' })}
          <p>
            La reserva en línea no está disponible en este momento. Escríbenos por
            <a href="${enlaceWhatsApp('Hola, quisiera agendar una cita.')}" target="_blank" rel="noopener noreferrer" class="font-semibold underline">
              WhatsApp
            </a>
            y te atendemos enseguida.
          </p>
        </div>
      `
      : '';

    const indicadorPasos = `
      <ol class="flex justify-around items-center mb-8 border-b border-slate-100 pb-6" aria-label="Pasos de la reserva">
        <li class="flex items-center gap-2" ${state.paso === 1 ? 'aria-current="step"' : ''}>
          <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
            state.paso === 1 ? 'bg-brand text-white shadow-md' : 'bg-slate-100 text-slate-500'
          }">1</span>
          <span class="text-xs font-semibold ${state.paso === 1 ? 'text-ink' : 'text-slate-400'}">Fecha y Hora</span>
        </li>
        <li class="flex items-center gap-2" ${state.paso === 2 ? 'aria-current="step"' : ''}>
          <span class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
            state.paso === 2 ? 'bg-brand text-white shadow-md' : 'bg-slate-100 text-slate-500'
          }">2</span>
          <span class="text-xs font-semibold ${state.paso === 2 ? 'text-ink' : 'text-slate-400'}">Tus Datos</span>
        </li>
      </ol>
    `;

    const alertaErrorEnvio = state.errorEnvio
      ? `
        <div role="alert" class="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2">
          ${iconSvg('alertCircle', { className: 'w-5 h-5 shrink-0' })}
          <span>${state.errorEnvio}</span>
        </div>
      `
      : '';

    // PASO 1 HTML
    const contenidoPaso1 = `
      <div class="space-y-6 animate-fade-in" id="${idForm}-paso-1">
        <div>
          <label for="${idForm}-servicio" class="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
            ${iconSvg('stethoscope', { className: 'w-4 h-4 text-brand' })} Servicio
          </label>
          <select id="${idForm}-servicio" class="${claseCampo(false)}">
            ${CATEGORIAS.map(
              (cat) => `
              <optgroup label="${cat.nombre}">
                ${SERVICIOS.filter((s) => s.categoria === cat.id)
                  .map(
                    (s) => `
                  <option value="${s.id}" ${state.valores.servicio === s.id ? 'selected' : ''}>
                    ${s.titulo}
                  </option>
                `,
                  )
                  .join('')}
              </optgroup>
            `,
            ).join('')}
          </select>
        </div>

        <div>
          <label for="${idForm}-fecha" class="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
            ${iconSvg('calendar', { className: 'w-4 h-4 text-brand' })} Fecha de atención
          </label>
          <input
            id="${idForm}-fecha"
            type="date"
            min="${hoy}"
            max="${fechaMaxima}"
            value="${state.valores.fecha}"
            class="${claseCampo(state.errores.fecha)}"
            aria-invalid="${Boolean(state.errores.fecha || cierre)}"
          />
          ${
            state.errores.fecha || cierre
              ? `<p class="text-xs text-rose-600 mt-1.5 flex items-center gap-1">${iconSvg('alertCircle', { className: 'w-3.5 h-3.5 shrink-0' })} ${state.errores.fecha || cierre}</p>`
              : ''
          }
          ${
            state.valores.fecha && !cierre
              ? `<p class="text-xs text-slate-500 mt-1.5 first-letter:uppercase">${formatearFechaLarga(state.valores.fecha)}</p>`
              : ''
          }
        </div>

        <fieldset>
          <legend class="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
            ${iconSvg('clock', { className: 'w-4 h-4 text-brand' })} Horario disponible
          </legend>
          ${
            !state.valores.fecha || cierre
              ? `<p class="text-sm text-slate-400">Primero elige una fecha de atención.</p>`
              : state.cargandoHorarios
                ? `<p class="text-sm text-slate-400" role="status">Consultando horarios disponibles…</p>`
                : horarios.length === 0
                  ? `<p class="text-sm text-amber-600">No quedan horarios libres para esta fecha. Prueba con otro día.</p>`
                  : `
                    <div class="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      ${horarios
                        .map((hora) => {
                          const elegido = state.valores.hora === hora;
                          return `
                            <button
                              type="button"
                              data-hora="${hora}"
                              aria-pressed="${elegido}"
                              class="btn-slot py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                                elegido
                                  ? 'bg-brand text-white border-brand shadow-md'
                                  : 'bg-white text-slate-700 border-slate-200 hover:border-brand hover:text-brand'
                              }"
                            >
                              ${hora}
                            </button>
                          `;
                        })
                        .join('')}
                    </div>
                  `
          }
          ${
            state.errores.hora
              ? `<p class="text-xs text-rose-600 mt-1.5 flex items-center gap-1">${iconSvg('alertCircle', { className: 'w-3.5 h-3.5 shrink-0' })} ${state.errores.hora}</p>`
              : ''
          }
        </fieldset>
      </div>
    `;

    // PASO 2 HTML
    const contenidoPaso2 = `
      <div class="space-y-4 animate-fade-in" id="${idForm}-paso-2">
        <div class="p-4 rounded-2xl bg-brand/5 border border-brand/20 text-sm text-ink">
          <strong>${nombreServicio(state.valores.servicio)}</strong>
          <span class="block text-slate-600 first-letter:uppercase">
            ${formatearFechaLarga(state.valores.fecha)} · ${state.valores.hora}
          </span>
        </div>

        <div>
          <label for="${idForm}-nombre" class="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
            ${iconSvg('user', { className: 'w-3.5 h-3.5 text-brand' })} Nombre completo *
          </label>
          <input
            id="${idForm}-nombre"
            type="text"
            autocomplete="name"
            placeholder="Ej. Juan Pérez"
            value="${state.valores.nombre}"
            class="${claseCampo(state.errores.nombre)}"
          />
          ${
            state.errores.nombre
              ? `<p class="text-xs text-rose-600 mt-1.5 flex items-center gap-1">${iconSvg('alertCircle', { className: 'w-3.5 h-3.5 shrink-0' })} ${state.errores.nombre}</p>`
              : ''
          }
        </div>

        <div>
          <label for="${idForm}-telefono" class="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
            ${iconSvg('phone', { className: 'w-3.5 h-3.5 text-brand' })} Teléfono / WhatsApp *
          </label>
          <input
            id="${idForm}-telefono"
            type="tel"
            autocomplete="tel"
            inputmode="tel"
            placeholder="Ej. 70012345"
            value="${state.valores.telefono}"
            class="${claseCampo(state.errores.telefono)}"
          />
          ${
            state.errores.telefono
              ? `<p class="text-xs text-rose-600 mt-1.5 flex items-center gap-1">${iconSvg('alertCircle', { className: 'w-3.5 h-3.5 shrink-0' })} ${state.errores.telefono}</p>`
              : ''
          }
        </div>

        <div>
          <label for="${idForm}-email" class="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
            ${iconSvg('mail', { className: 'w-3.5 h-3.5 text-brand' })} Correo electrónico (opcional)
          </label>
          <input
            id="${idForm}-email"
            type="email"
            autocomplete="email"
            placeholder="ejemplo@correo.com"
            value="${state.valores.email}"
            class="${claseCampo(state.errores.email)}"
          />
          ${
            state.errores.email
              ? `<p class="text-xs text-rose-600 mt-1.5 flex items-center gap-1">${iconSvg('alertCircle', { className: 'w-3.5 h-3.5 shrink-0' })} ${state.errores.email}</p>`
              : ''
          }
        </div>

        <!-- Campo honeypot anti-spam invisible -->
        <div class="hidden" aria-hidden="true">
          <label for="${idForm}-sitio">No llenar este campo</label>
          <input id="${idForm}-sitio" type="text" tabindex="-1" autocomplete="off" value="${state.valores.sitioWeb}" />
        </div>

        <div>
          <label class="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
            <input
              id="${idForm}-consentimiento"
              type="checkbox"
              class="mt-1 w-4 h-4 accent-brand"
              ${state.valores.consentimiento ? 'checked' : ''}
            />
            <span>
              Acepto que la clínica use mis datos solo para gestionar esta cita, según el
              <a href="/privacidad.html" target="_blank" class="text-brand font-semibold underline">
                aviso de privacidad
              </a>.
            </span>
          </label>
          ${
            state.errores.consentimiento
              ? `<p class="text-xs text-rose-600 mt-1.5 flex items-center gap-1">${iconSvg('alertCircle', { className: 'w-3.5 h-3.5 shrink-0' })} ${state.errores.consentimiento}</p>`
              : ''
          }
        </div>
      </div>
    `;

    const botonesNavegacion = `
      <div class="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
        <button
          type="button"
          id="${idForm}-btn-anterior"
          ${state.paso === 1 ? 'disabled' : ''}
          class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all cursor-pointer"
        >
          ${iconSvg('arrowLeft', { className: 'w-4 h-4' })} Anterior
        </button>

        ${
          state.paso === 1
            ? `
              <button
                type="button"
                id="${idForm}-btn-siguiente"
                class="flex items-center gap-2 px-8 py-2.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-brand transition-all shadow-md cursor-pointer"
              >
                Siguiente ${iconSvg('arrowRight', { className: 'w-4 h-4' })}
              </button>
            `
            : `
              <button
                type="button"
                id="${idForm}-btn-confirmar"
                ${state.enviando || !supabaseConfigurado ? 'disabled' : ''}
                class="flex items-center gap-2 px-8 py-2.5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                ${state.enviando ? 'Enviando…' : 'Confirmar cita'}
              </button>
            `
        }
      </div>
    `;

    contenedor.innerHTML = `
      <form id="${idForm}-form" novalidate>
        ${avisoSupabase}
        ${indicadorPasos}
        ${alertaErrorEnvio}
        ${state.paso === 1 ? contenidoPaso1 : contenidoPaso2}
        ${botonesNavegacion}
      </form>
    `;

    adjuntarListeners();
  }

  function renderPantallaExito() {
    const cita = state.citaRegistrada;
    const mensaje = [
      'Hola, acabo de solicitar una cita desde la página web:',
      `• Paciente: ${cita.nombre.trim()}`,
      `• Servicio: ${nombreServicio(cita.servicio)}`,
      `• Fecha: ${formatearFechaLarga(cita.fecha)}`,
      `• Hora: ${cita.hora}`,
      '¿Me pueden confirmar? Gracias.',
    ].join('\n');

    contenedor.innerHTML = `
      <div class="text-center flex flex-col items-center py-4 animate-fade-in" role="status">
        <div class="w-16 h-16 text-emerald-500 mb-4 flex items-center justify-center">
          ${iconSvg('checkCircle', { className: 'w-16 h-16 text-emerald-500' })}
        </div>
        <h2 class="text-3xl font-serif font-bold text-ink mb-2">¡Solicitud recibida!</h2>
        <p class="text-slate-600 mb-2 text-sm max-w-md">
          Registramos tu solicitud de <strong>${nombreServicio(cita.servicio)}</strong> para el
          <strong>${formatearFechaLarga(cita.fecha)}</strong> a las <strong>${cita.hora}</strong>.
        </p>
        <p class="text-slate-500 mb-8 text-sm max-w-md">
          La clínica te contactará para confirmarla. Si quieres, avísanos ahora por WhatsApp para agilizar la confirmación.
        </p>
        <div class="flex flex-col sm:flex-row gap-3">
          <a
            href="${enlaceWhatsApp(mensaje)}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold shadow-md transition-all"
          >
            ${iconSvg('messageCircle', { className: 'w-4 h-4' })} Avisar por WhatsApp
          </a>
          <button
            type="button"
            id="${idForm}-btn-reiniciar"
            class="px-8 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all cursor-pointer"
          >
            Reservar otra cita
          </button>
        </div>
      </div>
    `;

    document.getElementById(`${idForm}-btn-reiniciar`)?.addEventListener('click', () => {
      state.citaRegistrada = null;
      state.valores = { ...VALORES_INICIALES };
      state.errores = {};
      state.ocupados = [];
      state.paso = 1;
      render();
    });
  }

  function adjuntarListeners() {
    const form = document.getElementById(`${idForm}-form`);
    if (!form) return;

    if (state.paso === 1) {
      const selectServicio = document.getElementById(`${idForm}-servicio`);
      selectServicio?.addEventListener('change', (e) => {
        state.valores.servicio = e.target.value;
      });

      const inputFecha = document.getElementById(`${idForm}-fecha`);
      inputFecha?.addEventListener('change', async (e) => {
        const fecha = e.target.value;
        state.valores.fecha = fecha;
        state.valores.hora = '';
        state.errores.fecha = null;
        state.errores.hora = null;
        state.ocupados = [];

        if (fecha && !motivoCierre(fecha) && supabaseConfigurado) {
          state.cargandoHorarios = true;
          render();
          const { datos } = await obtenerHorariosOcupados(fecha);
          state.cargandoHorarios = false;
          state.ocupados = datos ?? [];
        }
        render();
      });

      form.querySelectorAll('.btn-slot').forEach((btn) => {
        btn.addEventListener('click', () => {
          state.valores.hora = btn.getAttribute('data-hora');
          state.errores.hora = null;
          render();
        });
      });

      document.getElementById(`${idForm}-btn-siguiente`)?.addEventListener('click', () => {
        if (validarPaso1()) {
          state.paso = 2;
          render();
        } else {
          render();
        }
      });
    } else {
      const inputNombre = document.getElementById(`${idForm}-nombre`);
      inputNombre?.addEventListener('input', (e) => {
        state.valores.nombre = e.target.value;
        state.errores.nombre = null;
      });

      const inputTelefono = document.getElementById(`${idForm}-telefono`);
      inputTelefono?.addEventListener('input', (e) => {
        state.valores.telefono = e.target.value;
        state.errores.telefono = null;
      });

      const inputEmail = document.getElementById(`${idForm}-email`);
      inputEmail?.addEventListener('input', (e) => {
        state.valores.email = e.target.value;
        state.errores.email = null;
      });

      const inputConsentimiento = document.getElementById(`${idForm}-consentimiento`);
      inputConsentimiento?.addEventListener('change', (e) => {
        state.valores.consentimiento = e.target.checked;
        state.errores.consentimiento = null;
      });

      const inputSitio = document.getElementById(`${idForm}-sitio`);
      inputSitio?.addEventListener('input', (e) => {
        state.valores.sitioWeb = e.target.value;
      });

      document.getElementById(`${idForm}-btn-anterior`)?.addEventListener('click', () => {
        state.paso = 1;
        render();
      });

      document.getElementById(`${idForm}-btn-confirmar`)?.addEventListener('click', async (e) => {
        e.preventDefault();
        state.errorEnvio = '';

        if (!validarPaso2()) {
          render();
          return;
        }

        const resumen = { ...state.valores };
        if (state.valores.sitioWeb) {
          state.citaRegistrada = resumen;
          render();
          return;
        }

        state.enviando = true;
        render();
        const { error } = await crearCita(state.valores);
        state.enviando = false;

        if (error) {
          state.errorEnvio = error.mensaje;
          if (error.code === '23505') {
            const { datos } = await obtenerHorariosOcupados(state.valores.fecha);
            state.ocupados = datos ?? [];
            state.valores.hora = '';
            state.paso = 1;
          }
          render();
          return;
        }

        state.citaRegistrada = resumen;
        render();
      });
    }
  }

  function validarPaso1() {
    const nuevos = {};
    const cierre = state.valores.fecha ? motivoCierre(state.valores.fecha) : null;

    if (!state.valores.fecha) {
      nuevos.fecha = 'Elige una fecha.';
    } else if (state.valores.fecha < hoy || state.valores.fecha > fechaMaxima) {
      nuevos.fecha = 'Elige una fecha dentro de los próximos 60 días.';
    } else if (cierre) {
      nuevos.fecha = cierre;
    }

    if (!nuevos.fecha && !state.valores.hora) {
      nuevos.hora = 'Elige un horario.';
    }

    state.errores = nuevos;
    return Object.keys(nuevos).length === 0;
  }

  function validarPaso2() {
    const nuevos = {
      nombre: validarNombre(state.valores.nombre),
      telefono: validarTelefono(state.valores.telefono),
      email: validarEmail(state.valores.email),
      consentimiento: state.valores.consentimiento
        ? null
        : 'Debes aceptar el aviso de privacidad para continuar.',
    };

    state.errores = nuevos;
    return Object.values(nuevos).every((err) => !err);
  }

  render();
}

export default renderBookingForm;
