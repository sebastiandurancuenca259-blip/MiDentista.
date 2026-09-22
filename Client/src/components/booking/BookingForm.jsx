import { useEffect, useId, useState } from 'react';
import { Link } from 'react-router';
import { CheckCircle, ArrowRight, ArrowLeft, Calendar, Clock, User, Mail, Phone, Stethoscope, MessageCircle, AlertCircle } from 'lucide-react';
import { CATEGORIAS, SERVICIOS, existeServicio, nombreServicio } from '../../data/servicios';
import { HORARIO } from '../../config/clinica';
import { aISO, formatearFechaLarga, hoyISO, sumarDias } from '../../lib/fechas';
import { horariosDisponibles, motivoCierre } from '../../lib/horarios';
import { validarEmail, validarNombre, validarTelefono } from '../../lib/validacion';
import { enlaceWhatsApp } from '../../lib/whatsapp';
import { crearCita, obtenerHorariosOcupados } from '../../lib/citas';
import { supabaseConfigurado } from '../../lib/supabase';

const VALORES_INICIALES = {
  servicio: 'consulta-general',
  fecha: '',
  hora: '',
  nombre: '',
  telefono: '',
  email: '',
  consentimiento: false,
  sitioWeb: '', // trampa anti-bots: invisible para personas
};

const claseCampo = (conError) =>
  `w-full border rounded-xl p-3.5 text-slate-800 bg-slate-50/50 focus:outline-none focus:bg-white transition-all ${
    conError ? 'border-rose-300 focus:border-rose-400' : 'border-slate-200 focus:border-brand'
  }`;

function MensajeError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="text-xs text-rose-600 mt-1.5 flex items-center gap-1">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {children}
    </p>
  );
}

/**
 * Formulario de reserva en 2 pasos. Se usa en la página /agendar y en el
 * modal de la página de inicio, así ambos siguen exactamente las mismas reglas.
 */
export default function BookingForm({ servicioInicial }) {
  const ids = useId();
  const [paso, setPaso] = useState(1);
  const [valores, setValores] = useState(() => ({
    ...VALORES_INICIALES,
    servicio: existeServicio(servicioInicial) ? servicioInicial : VALORES_INICIALES.servicio,
  }));
  const [errores, setErrores] = useState({});
  const [ocupados, setOcupados] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  const [citaRegistrada, setCitaRegistrada] = useState(null);

  const hoy = hoyISO();
  const fechaMaxima = aISO(sumarDias(new Date(), HORARIO.diasMaximosAnticipacion));
  const cierre = valores.fecha ? motivoCierre(valores.fecha) : null;
  const horarios = valores.fecha && !cierre ? horariosDisponibles(valores.fecha, { ocupados }) : [];

  // Al elegir una fecha, consulta qué horarios ya están tomados.
  useEffect(() => {
    if (!valores.fecha || motivoCierre(valores.fecha) || !supabaseConfigurado) return undefined;
    let vigente = true;
    setCargandoHorarios(true);
    obtenerHorariosOcupados(valores.fecha).then(({ datos }) => {
      if (!vigente) return;
      setOcupados(datos ?? []);
      setCargandoHorarios(false);
    });
    return () => {
      vigente = false;
    };
  }, [valores.fecha]);

  const cambiar = (campo, valor) => {
    setValores((previos) => ({ ...previos, [campo]: valor }));
    setErrores((previos) => ({ ...previos, [campo]: null }));
  };

  const cambiarFecha = (fecha) => {
    setOcupados([]);
    setValores((previos) => ({ ...previos, fecha, hora: '' }));
    setErrores((previos) => ({ ...previos, fecha: null, hora: null }));
  };

  const validarPaso1 = () => {
    const nuevos = {};
    if (!valores.fecha) nuevos.fecha = 'Elige una fecha.';
    else if (valores.fecha < hoy || valores.fecha > fechaMaxima) nuevos.fecha = 'Elige una fecha dentro de los próximos 60 días.';
    else if (cierre) nuevos.fecha = cierre;
    if (!nuevos.fecha && !valores.hora) nuevos.hora = 'Elige un horario.';
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const validarPaso2 = () => {
    const nuevos = {
      nombre: validarNombre(valores.nombre),
      telefono: validarTelefono(valores.telefono),
      email: validarEmail(valores.email),
      consentimiento: valores.consentimiento ? null : 'Debes aceptar el aviso de privacidad para continuar.',
    };
    setErrores(nuevos);
    return Object.values(nuevos).every((error) => !error);
  };

  const siguiente = () => {
    if (validarPaso1()) setPaso(2);
  };

  const enviar = async (evento) => {
    evento.preventDefault();
    if (paso === 1) {
      // Enter en el paso 1 avanza en lugar de enviar.
      siguiente();
      return;
    }
    setErrorEnvio('');
    if (!validarPaso2()) return;

    const resumen = { ...valores };
    // Si un bot llenó el campo invisible, se simula éxito sin guardar nada.
    if (valores.sitioWeb) {
      setCitaRegistrada(resumen);
      return;
    }

    setEnviando(true);
    const { error } = await crearCita(valores);
    setEnviando(false);

    if (error) {
      setErrorEnvio(error.mensaje);
      if (error.code === '23505') {
        // Otra persona tomó el horario: se vuelve al paso 1 con la lista actualizada.
        const { datos } = await obtenerHorariosOcupados(valores.fecha);
        setOcupados(datos ?? []);
        setValores((previos) => ({ ...previos, hora: '' }));
        setPaso(1);
      }
      return;
    }
    setCitaRegistrada(resumen);
  };

  const reiniciar = () => {
    setCitaRegistrada(null);
    setValores(VALORES_INICIALES);
    setErrores({});
    setOcupados([]);
    setPaso(1);
  };

  if (citaRegistrada) {
    const mensaje = [
      'Hola, acabo de solicitar una cita desde la página web:',
      `• Paciente: ${citaRegistrada.nombre.trim()}`,
      `• Servicio: ${nombreServicio(citaRegistrada.servicio)}`,
      `• Fecha: ${formatearFechaLarga(citaRegistrada.fecha)}`,
      `• Hora: ${citaRegistrada.hora}`,
      '¿Me pueden confirmar? Gracias.',
    ].join('\n');

    return (
      <div className="text-center flex flex-col items-center py-4 animate-fade-in" role="status">
        <CheckCircle className="w-16 h-16 text-emerald-500 mb-4" />
        <h2 className="text-3xl font-serif font-bold text-ink mb-2">¡Solicitud recibida!</h2>
        <p className="text-slate-600 mb-2 text-sm max-w-md">
          Registramos tu solicitud de <strong>{nombreServicio(citaRegistrada.servicio)}</strong> para el{' '}
          <strong>{formatearFechaLarga(citaRegistrada.fecha)}</strong> a las <strong>{citaRegistrada.hora}</strong>.
        </p>
        <p className="text-slate-500 mb-8 text-sm max-w-md">
          La clínica te contactará para confirmarla. Si quieres, avísanos ahora por WhatsApp para agilizar la confirmación.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={enlaceWhatsApp(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4" /> Avisar por WhatsApp
          </a>
          <button
            type="button"
            onClick={reiniciar}
            className="px-8 py-3 rounded-full border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-all cursor-pointer"
          >
            Reservar otra cita
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} noValidate>
      {!supabaseConfigurado && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>
            La reserva en línea no está disponible en este momento. Escríbenos por{' '}
            <a href={enlaceWhatsApp('Hola, quisiera agendar una cita.')} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              WhatsApp
            </a>{' '}
            y te atendemos enseguida.
          </p>
        </div>
      )}

      {/* Indicador de pasos */}
      <ol className="flex justify-around items-center mb-8 border-b border-slate-100 pb-6" aria-label="Pasos de la reserva">
        {['Fecha y Hora', 'Tus Datos'].map((nombre, indice) => {
          const numero = indice + 1;
          const activo = paso === numero;
          return (
            <li key={nombre} className="flex items-center gap-2" aria-current={activo ? 'step' : undefined}>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors duration-300 ${
                  activo ? 'bg-brand text-white shadow-md' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {numero}
              </span>
              <span className={`text-xs font-semibold ${activo ? 'text-ink' : 'text-slate-400'}`}>{nombre}</span>
            </li>
          );
        })}
      </ol>

      {errorEnvio && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" /> <span>{errorEnvio}</span>
        </div>
      )}

      <div key={paso} className="animate-fade-in">
        {paso === 1 && (
          <div className="space-y-6">
            <div>
              <label htmlFor={`${ids}-servicio`} className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
                <Stethoscope className="w-4 h-4 text-brand" /> Servicio
              </label>
              <select
                id={`${ids}-servicio`}
                className={claseCampo(false)}
                value={valores.servicio}
                onChange={(e) => cambiar('servicio', e.target.value)}
              >
                {CATEGORIAS.map((categoria) => (
                  <optgroup key={categoria.id} label={categoria.nombre}>
                    {SERVICIOS.filter((s) => s.categoria === categoria.id).map((servicio) => (
                      <option key={servicio.id} value={servicio.id}>
                        {servicio.titulo}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor={`${ids}-fecha`} className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
                <Calendar className="w-4 h-4 text-brand" /> Fecha de atención
              </label>
              <input
                id={`${ids}-fecha`}
                type="date"
                min={hoy}
                max={fechaMaxima}
                className={claseCampo(errores.fecha)}
                value={valores.fecha}
                onChange={(e) => cambiarFecha(e.target.value)}
                aria-invalid={Boolean(errores.fecha || cierre)}
                aria-describedby={`${ids}-fecha-error`}
              />
              <MensajeError id={`${ids}-fecha-error`}>{errores.fecha || cierre}</MensajeError>
              {valores.fecha && !cierre && (
                <p className="text-xs text-slate-500 mt-1.5 first-letter:uppercase">{formatearFechaLarga(valores.fecha)}</p>
              )}
            </div>

            <fieldset>
              <legend className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-2">
                <Clock className="w-4 h-4 text-brand" /> Horario disponible
              </legend>
              {!valores.fecha || cierre ? (
                <p className="text-sm text-slate-400">Primero elige una fecha de atención.</p>
              ) : cargandoHorarios ? (
                <p className="text-sm text-slate-400" role="status">Consultando horarios disponibles…</p>
              ) : horarios.length === 0 ? (
                <p className="text-sm text-amber-600">No quedan horarios libres para esta fecha. Prueba con otro día.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {horarios.map((hora) => {
                    const elegido = valores.hora === hora;
                    return (
                      <button
                        key={hora}
                        type="button"
                        onClick={() => cambiar('hora', hora)}
                        aria-pressed={elegido}
                        className={`py-2.5 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                          elegido
                            ? 'bg-brand text-white border-brand shadow-md'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-brand hover:text-brand'
                        }`}
                      >
                        {hora}
                      </button>
                    );
                  })}
                </div>
              )}
              <MensajeError id={`${ids}-hora-error`}>{errores.hora}</MensajeError>
            </fieldset>
          </div>
        )}

        {paso === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-brand/5 border border-brand/20 text-sm text-ink">
              <strong>{nombreServicio(valores.servicio)}</strong>
              <span className="block text-slate-600 first-letter:uppercase">
                {formatearFechaLarga(valores.fecha)} · {valores.hora}
              </span>
            </div>

            <div>
              <label htmlFor={`${ids}-nombre`} className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
                <User className="w-3.5 h-3.5 text-brand" /> Nombre completo *
              </label>
              <input
                id={`${ids}-nombre`}
                type="text"
                autoComplete="name"
                placeholder="Ej. Juan Pérez"
                className={claseCampo(errores.nombre)}
                value={valores.nombre}
                onChange={(e) => cambiar('nombre', e.target.value)}
                aria-invalid={Boolean(errores.nombre)}
                aria-describedby={`${ids}-nombre-error`}
              />
              <MensajeError id={`${ids}-nombre-error`}>{errores.nombre}</MensajeError>
            </div>

            <div>
              <label htmlFor={`${ids}-telefono`} className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
                <Phone className="w-3.5 h-3.5 text-brand" /> Teléfono / WhatsApp *
              </label>
              <input
                id={`${ids}-telefono`}
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="Ej. 70012345"
                className={claseCampo(errores.telefono)}
                value={valores.telefono}
                onChange={(e) => cambiar('telefono', e.target.value)}
                aria-invalid={Boolean(errores.telefono)}
                aria-describedby={`${ids}-telefono-error`}
              />
              <MensajeError id={`${ids}-telefono-error`}>{errores.telefono}</MensajeError>
            </div>

            <div>
              <label htmlFor={`${ids}-email`} className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500 mb-1">
                <Mail className="w-3.5 h-3.5 text-brand" /> Correo electrónico (opcional)
              </label>
              <input
                id={`${ids}-email`}
                type="email"
                autoComplete="email"
                placeholder="ejemplo@correo.com"
                className={claseCampo(errores.email)}
                value={valores.email}
                onChange={(e) => cambiar('email', e.target.value)}
                aria-invalid={Boolean(errores.email)}
                aria-describedby={`${ids}-email-error`}
              />
              <MensajeError id={`${ids}-email-error`}>{errores.email}</MensajeError>
            </div>

            {/* Campo trampa: las personas no lo ven; los bots lo llenan. */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor={`${ids}-sitio`}>No llenar este campo</label>
              <input
                id={`${ids}-sitio`}
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={valores.sitioWeb}
                onChange={(e) => cambiar('sitioWeb', e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-start gap-3 text-sm text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-brand"
                  checked={valores.consentimiento}
                  onChange={(e) => cambiar('consentimiento', e.target.checked)}
                  aria-invalid={Boolean(errores.consentimiento)}
                  aria-describedby={`${ids}-consentimiento-error`}
                />
                <span>
                  Acepto que la clínica use mis datos solo para gestionar esta cita, según el{' '}
                  <Link to="/privacidad" target="_blank" className="text-brand font-semibold underline">
                    aviso de privacidad
                  </Link>
                  .
                </span>
              </label>
              <MensajeError id={`${ids}-consentimiento-error`}>{errores.consentimiento}</MensajeError>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setPaso(1)}
          disabled={paso === 1}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-slate-200 text-slate-600 text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Anterior
        </button>

        {paso === 1 ? (
          <button
            type="button"
            onClick={siguiente}
            className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-ink text-white text-sm font-semibold hover:bg-brand transition-all shadow-md cursor-pointer"
          >
            Siguiente <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={enviando || !supabaseConfigurado}
            className="flex items-center gap-2 px-8 py-2.5 rounded-full bg-brand text-white text-sm font-semibold hover:bg-brand-dark transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {enviando ? 'Enviando…' : 'Confirmar cita'}
          </button>
        )}
      </div>
    </form>
  );
}
