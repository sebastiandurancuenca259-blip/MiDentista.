import { supabase } from './supabase';
import { normalizarTelefono } from './validacion';

// Capa de acceso a datos: los componentes nunca llaman a Supabase directamente.

export const ESTADOS_CITA = {
  pendiente: { etiqueta: 'Pendiente', clases: 'bg-amber-50 text-amber-700 border-amber-200' },
  confirmada: { etiqueta: 'Confirmada', clases: 'bg-sky-50 text-sky-700 border-sky-200' },
  atendida: { etiqueta: 'Atendida', clases: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  cancelada: { etiqueta: 'Cancelada', clases: 'bg-slate-100 text-slate-500 border-slate-200' },
};

const SIN_CONEXION = { message: 'La base de datos no está configurada.' };

/** Traduce los errores de Supabase/PostgreSQL a mensajes para el usuario. */
function mensajeDeError(error) {
  if (!error) return null;
  if (error.code === '23505') return 'Ese horario acaba de ser reservado por otra persona. Elige otro, por favor.';
  if (error.code === 'P0001') return error.message; // mensajes propios del trigger de validación
  if (error.code === '42501') return 'No tienes permiso para realizar esta acción.';
  if (error.message?.includes('Failed to fetch')) return 'No se pudo conectar con el servidor. Revisa tu conexión a internet.';
  return 'Ocurrió un error inesperado. Inténtalo de nuevo en unos minutos.';
}

function resultado(error, datos = null) {
  return { datos, error: error ? { ...error, mensaje: mensajeDeError(error) } : null };
}

/** Registra una solicitud de cita (queda en estado "pendiente"). */
export async function crearCita({ servicio, fecha, hora, nombre, telefono, email }) {
  if (!supabase) return resultado(SIN_CONEXION);
  // Sin .select(): el público puede insertar pero no leer la tabla (RLS).
  const { error } = await supabase.from('citas').insert({
    servicio_id: servicio,
    fecha_cita: fecha,
    hora_cita: hora,
    paciente_nombre: nombre.trim(),
    paciente_telefono: normalizarTelefono(telefono),
    paciente_email: email.trim() || null,
  });
  return resultado(error);
}

/** Horarios ya tomados de una fecha. Usa una función SQL que no expone datos personales. */
export async function obtenerHorariosOcupados(fecha) {
  if (!supabase) return resultado(SIN_CONEXION, []);
  const { data, error } = await supabase.rpc('horarios_ocupados', { p_fecha: fecha });
  return resultado(error, (data ?? []).map((fila) => fila.hora));
}

/** ¿El usuario con sesión iniciada está en la tabla de administradores? */
export async function verificarAdmin() {
  if (!supabase) return false;
  const { data, error } = await supabase.rpc('es_admin');
  return !error && data === true;
}

export async function listarCitas() {
  if (!supabase) return resultado(SIN_CONEXION, []);
  const { data, error } = await supabase
    .from('citas')
    .select('*')
    .order('fecha_cita', { ascending: true })
    .order('hora_cita', { ascending: true });
  return resultado(error, data ?? []);
}

export async function actualizarEstadoCita(id, estado) {
  if (!supabase) return resultado(SIN_CONEXION);
  const { error } = await supabase.from('citas').update({ estado }).eq('id', id);
  return resultado(error);
}

export async function eliminarCita(id) {
  if (!supabase) return resultado(SIN_CONEXION);
  const { error } = await supabase.from('citas').delete().eq('id', id);
  return resultado(error);
}
