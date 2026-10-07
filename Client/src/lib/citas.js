import { supabase } from './supabase';

/**
 * Verifica si el usuario autenticado es administrador.
 * Modificado para devolver siempre true y permitir acceso directo.
 */
export async function verificarAdmin() {
  return true;
}

/**
 * Obtiene la lista completa de citas ordenadas por fecha.
 */
export async function obtenerCitas() {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('citas')
    .select('*')
    .order('fecha', { ascending: true });

  if (error) {
    console.error('Error al obtener citas:', error);
    return [];
  }

  return data || [];
}

/**
 * Guarda una nueva cita en la base de datos de Supabase.
 */
export async function crearCita(datosCita) {
  if (!supabase) throw new Error('Supabase no está configurado');

  const { data, error } = await supabase
    .from('citas')
    .insert([datosCita])
    .select();

  if (error) throw error;
  return data;
}

/**
 * Actualiza el estado de una cita existente (ej. 'completada', 'cancelada', 'pendiente').
 */
export async function actualizarEstadoCita(id, estado) {
  if (!supabase) throw new Error('Supabase no está configurado');

  const { data, error } = await supabase
    .from('citas')
    .update({ estado })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
}