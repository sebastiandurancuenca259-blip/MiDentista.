import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, LogOut, RefreshCw, Phone, Mail, MessageCircle, Search, Check, X, CheckCheck, RotateCcw, Trash2, AlertCircle } from 'lucide-react';
import { ESTADOS_CITA, actualizarEstadoCita, eliminarCita, listarCitas } from '../../lib/citas';
import { formatearFechaCorta, formatearFechaLarga, hoyISO, recortarHora } from '../../lib/fechas';
import { enlaceWhatsApp, numeroParaWhatsApp } from '../../lib/whatsapp';
import { nombreServicio } from '../../data/servicios';
import { CLINICA } from '../../config/clinica';

const VISTAS = [
  { id: 'hoy', etiqueta: 'Hoy' },
  { id: 'proximas', etiqueta: 'Próximas' },
  { id: 'pasadas', etiqueta: 'Pasadas' },
  { id: 'todas', etiqueta: 'Todas' },
];

const ACCIONES = {
  pendiente: [
    { estado: 'confirmada', etiqueta: 'Confirmar', icono: Check, clases: 'bg-sky-50 text-sky-700 hover:bg-sky-100' },
    { estado: 'cancelada', etiqueta: 'Cancelar', icono: X, clases: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
  ],
  confirmada: [
    { estado: 'atendida', etiqueta: 'Atendida', icono: CheckCheck, clases: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
    { estado: 'cancelada', etiqueta: 'Cancelar', icono: X, clases: 'bg-slate-100 text-slate-600 hover:bg-slate-200' },
  ],
  cancelada: [
    { estado: 'pendiente', etiqueta: 'Reactivar', icono: RotateCcw, clases: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
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

export default function CitasDashboard({ onCerrarSesion }) {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [vista, setVista] = useState('proximas');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [procesando, setProcesando] = useState(null);

  const hoy = hoyISO();

  const cargar = useCallback(async () => {
    setCargando(true);
    const { datos, error: errorCarga } = await listarCitas();
    setError(errorCarga ? errorCarga.mensaje : '');
    if (!errorCarga) setCitas(datos);
    setCargando(false);
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  const resumen = useMemo(() => {
    const activas = citas.filter((c) => estadoDe(c) !== 'cancelada');
    return {
      hoy: activas.filter((c) => c.fecha_cita === hoy).length,
      pendientes: citas.filter((c) => estadoDe(c) === 'pendiente' && c.fecha_cita >= hoy).length,
      proximas: activas.filter((c) => c.fecha_cita >= hoy).length,
    };
  }, [citas, hoy]);

  const visibles = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();
    const lista = citas.filter((cita) => {
      if (vista === 'hoy' && cita.fecha_cita !== hoy) return false;
      if (vista === 'proximas' && cita.fecha_cita < hoy) return false;
      if (vista === 'pasadas' && cita.fecha_cita >= hoy) return false;
      if (filtroEstado !== 'todos' && estadoDe(cita) !== filtroEstado) return false;
      if (!termino) return true;
      return [cita.paciente_nombre, cita.paciente_telefono, cita.paciente_email]
        .filter(Boolean)
        .some((campo) => campo.toLowerCase().includes(termino));
    });
    // Pasadas y todas: lo más reciente primero.
    return vista === 'pasadas' || vista === 'todas' ? [...lista].reverse() : lista;
  }, [citas, vista, filtroEstado, busqueda, hoy]);

  const cambiarEstado = async (cita, estado) => {
    setProcesando(cita.id);
    const { error: errorCambio } = await actualizarEstadoCita(cita.id, estado);
    setProcesando(null);
    if (errorCambio) {
      setError(errorCambio.mensaje);
      return;
    }
    setError('');
    setCitas((previas) => previas.map((c) => (c.id === cita.id ? { ...c, estado } : c)));
  };

  const borrar = async (cita) => {
    const confirmado = window.confirm(
      `¿Eliminar definitivamente la cita de ${cita.paciente_nombre} (${formatearFechaCorta(cita.fecha_cita)})? Esta acción no se puede deshacer.`,
    );
    if (!confirmado) return;
    setProcesando(cita.id);
    const { error: errorBorrado } = await eliminarCita(cita.id);
    setProcesando(null);
    if (errorBorrado) {
      setError(errorBorrado.mensaje);
      return;
    }
    setCitas((previas) => previas.filter((c) => c.id !== cita.id));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-ink flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-brand" />
            Citas de la clínica
          </h1>
          <p className="text-sm text-slate-500 mt-1">Gestiona las solicitudes que llegan desde la página web.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={cargar}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl transition-all cursor-pointer"
            title="Actualizar"
            aria-label="Actualizar lista de citas"
          >
            <RefreshCw className={`w-5 h-5 ${cargando ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={onCerrarSesion}
            className="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 px-5 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </div>

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
        {[
          { etiqueta: 'Citas hoy', valor: resumen.hoy },
          { etiqueta: 'Por confirmar', valor: resumen.pendientes },
          { etiqueta: 'Próximas', valor: resumen.proximas },
        ].map((tarjeta) => (
          <div key={tarjeta.etiqueta} className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs">
            <p className="text-2xl sm:text-3xl font-serif font-bold text-ink">{tarjeta.valor}</p>
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">{tarjeta.etiqueta}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Periodo">
          {VISTAS.map((opcion) => (
            <button
              key={opcion.id}
              type="button"
              onClick={() => setVista(opcion.id)}
              aria-pressed={vista === opcion.id}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                vista === opcion.id ? 'bg-ink text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {opcion.etiqueta}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <select
            aria-label="Filtrar por estado"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm text-ink focus:outline-none focus:border-brand"
          >
            <option value="todos">Todos los estados</option>
            {Object.entries(ESTADOS_CITA).map(([id, { etiqueta }]) => (
              <option key={id} value={id}>
                {etiqueta}
              </option>
            ))}
          </select>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              aria-label="Buscar paciente"
              placeholder="Buscar por nombre o teléfono"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:border-brand"
            />
          </div>
        </div>
      </div>

      {error && (
        <div role="alert" className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" /> {error}
        </div>
      )}

      {/* Lista */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
        {cargando && citas.length === 0 ? (
          <p className="p-12 text-center text-slate-500 font-medium">Cargando citas…</p>
        ) : visibles.length === 0 ? (
          <p className="p-12 text-center text-slate-500 font-medium">No hay citas para este filtro.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {visibles.map((cita) => {
              const estado = estadoDe(cita);
              const infoEstado = ESTADOS_CITA[estado] ?? ESTADOS_CITA.pendiente;
              const ocupada = procesando === cita.id;
              return (
                <li
                  key={cita.id}
                  className={`p-5 lg:px-8 grid gap-4 lg:grid-cols-[1.2fr_1.2fr_1fr_auto] lg:items-center ${ocupada ? 'opacity-50' : ''} ${
                    estado === 'cancelada' ? 'bg-slate-50/60' : ''
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold text-ink capitalize">{formatearFechaCorta(cita.fecha_cita)} · {recortarHora(cita.hora_cita)}</p>
                    <p className="font-semibold text-ink">{cita.paciente_nombre || 'Sin nombre'}</p>
                    <p className="text-xs text-slate-500">{nombreServicio(cita.servicio_id)}</p>
                  </div>

                  <div className="space-y-1 text-sm">
                    <a href={`tel:${cita.paciente_telefono}`} className="flex items-center gap-2 text-slate-600 hover:text-brand">
                      <Phone className="w-3.5 h-3.5 text-brand" /> {cita.paciente_telefono || 'N/A'}
                    </a>
                    {cita.paciente_email && (
                      <a href={`mailto:${cita.paciente_email}`} className="flex items-center gap-2 text-slate-500 text-xs hover:text-brand break-all">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> {cita.paciente_email}
                      </a>
                    )}
                  </div>

                  <div>
                    <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border ${infoEstado.clases}`}>
                      {infoEstado.etiqueta}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 lg:justify-end">
                    {cita.paciente_telefono && (
                      <a
                        href={enlaceWhatsApp(mensajeParaPaciente(cita), numeroParaWhatsApp(cita.paciente_telefono))}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-whatsapp/10 text-emerald-700 hover:bg-whatsapp/20"
                      >
                        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    )}
                    {(ACCIONES[estado] ?? []).map(({ estado: nuevoEstado, etiqueta, icono: Icono, clases }) => (
                      <button
                        key={nuevoEstado}
                        type="button"
                        disabled={ocupada}
                        onClick={() => cambiarEstado(cita, nuevoEstado)}
                        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed ${clases}`}
                      >
                        <Icono className="w-3.5 h-3.5" /> {etiqueta}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={ocupada}
                      onClick={() => borrar(cita)}
                      aria-label={`Eliminar la cita de ${cita.paciente_nombre}`}
                      title="Eliminar"
                      className="inline-flex items-center px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer disabled:cursor-not-allowed"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <p className="text-xs text-slate-400 mt-4">
        Mostrando {visibles.length} de {citas.length} citas registradas.
      </p>
    </div>
  );
}
