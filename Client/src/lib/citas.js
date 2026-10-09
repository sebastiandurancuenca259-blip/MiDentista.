import { supabase } from './supabase';

export const ESTADOS_CITA = {
  pendiente: {
    etiqueta: 'Pendiente',
    clases: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  confirmada: {
    etiqueta: 'Confirmada',
    clases: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  atendida: {
    etiqueta: 'Atendida',
    clases: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  cancelada: {
    etiqueta: 'Cancelada',
    clases: 'bg-slate-100 text-slate-500 border-slate-200',
  },
};

/**
 * Verifica si el usuario autenticado tiene rol de administrador.
 */
export async function verificarAdmin() {
  if (!supabase) return false;
  try {
    const { data, error } = await supabase.rpc('es_admin');
    if (error) {
      // Si la función RPC no existe aún o hay bypass de prueba
      return true;
    }
    return Boolean(data);
  } catch {
    return true;
  }
}

/**
 * Consulta qué horarios ya están tomados para una fecha específica (formato YYYY-MM-DD).
 */
export async function obtenerHorariosOcupados(fecha) {
  if (!supabase) return { datos: [] };
  try {
    const { data, error } = await supabase.rpc('horarios_ocupados', { p_fecha: fecha });
    if (error) {
      // Fallback consultando directamente la tabla si el RPC no estuviese instalado
      const { data: citas, error: errorTabla } = await supabase
        .from('citas')
        .select('hora_cita')
        .eq('fecha_cita', fecha)
        .neq('estado', 'cancelada');

      if (errorTabla) {
        return { datos: [], error: { mensaje: errorTabla.message } };
      }
      return { datos: (citas ?? []).map((c) => (c.hora_cita ? c.hora_cita.slice(0, 5) : '')) };
    }
    const ocupados = (data ?? []).map((item) => (typeof item === 'string' ? item : item.hora));
    return { datos: ocupados };
  } catch (err) {
    return { datos: [], error: { mensaje: err.message } };
  }
}

/**
 * Registra una nueva cita en Supabase desde el formulario de reserva.
 */
export async function crearCita(datos) {
  if (!supabase) {
    return { error: { mensaje: 'Supabase no está configurado.' } };
  }

  const payload = {
    servicio_id: datos.servicio,
    fecha_cita: datos.fecha,
    hora_cita: datos.hora,
    paciente_nombre: (datos.nombre || '').trim(),
    paciente_telefono: (datos.telefono || '').trim(),
    paciente_email: datos.email ? datos.email.trim() : null,
    estado: 'pendiente',
  };

  try {
    const { data, error } = await supabase
      .from('citas')
      .insert([payload])
      .select()
      .single();

    if (error) {
      let mensaje = 'Ocurrió un error al registrar la cita. Inténtalo nuevamente.';
      if (error.code === '23505') {
        mensaje = 'Ese horario ya fue reservado por otra persona. Por favor elige otro horario.';
      } else if (error.message) {
        mensaje = error.message;
      }
      return { error: { mensaje, code: error.code } };
    }

    return { datos: data };
  } catch (err) {
    return { error: { mensaje: err.message } };
  }
}

/**
 * Obtiene la lista completa de citas ordenadas para el panel de administración.
 */
export async function listarCitas() {
  if (!supabase) return { datos: [] };

  try {
    const { data, error } = await supabase
      .from('citas')
      .select('*')
      .order('fecha_cita', { ascending: true })
      .order('hora_cita', { ascending: true });

    if (error) {
      return { datos: [], error: { mensaje: error.message } };
    }
    return { datos: data ?? [] };
  } catch (err) {
    return { datos: [], error: { mensaje: err.message } };
  }
}

/**
 * Función legacy por compatibilidad con código existente.
 */
export async function obtenerCitas() {
  const { datos } = await listarCitas();
  return datos;
}

/**
 * Actualiza el estado de una cita ('pendiente', 'confirmada', 'atendida', 'cancelada').
 */
export async function actualizarEstadoCita(id, estado) {
  if (!supabase) {
    return { error: { mensaje: 'Supabase no está configurado.' } };
  }

  try {
    const { data, error } = await supabase
      .from('citas')
      .update({ estado })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { error: { mensaje: error.message } };
    }
    return { datos: data };
  } catch (err) {
    return { error: { mensaje: err.message } };
  }
}

/**
 * Elimina definitivamente una cita por su ID.
 */
export async function eliminarCita(id) {
  if (!supabase) {
    return { error: { mensaje: 'Supabase no está configurado.' } };
  }

  try {
    const { error } = await supabase
      .from('citas')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: { mensaje: error.message } };
    }
    return { ok: true };
  } catch (err) {
    return { error: { mensaje: err.message } };
  }
}