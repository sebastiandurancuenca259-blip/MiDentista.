// Utilidades de fechas en hora LOCAL del navegador (Bolivia, UTC-4).
// Se evita toISOString() porque convierte a UTC y después de las 20:00
// devolvería el día siguiente.

const dosDigitos = (n) => String(n).padStart(2, '0');

/** Date → 'YYYY-MM-DD' (hora local). */
export function aISO(fecha) {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;
}

/**
 * 'YYYY-MM-DD' → Date a las 00:00 hora local.
 * Devuelve null si la cadena está vacía o no es una fecha válida.
 */
export function desdeISO(iso) {
  if (!iso || typeof iso !== 'string' || iso.trim() === '') return null;
  const partes = iso.split('-').map(Number);
  if (partes.length !== 3 || partes.some(isNaN)) return null;
  const [anio, mes, dia] = partes;
  const fecha = new Date(anio, mes - 1, dia);
  // Verificar que la fecha construida es válida
  if (isNaN(fecha.getTime())) return null;
  return fecha;
}

export function sumarDias(fecha, dias) {
  const copia = new Date(fecha);
  copia.setDate(copia.getDate() + dias);
  return copia;
}

export function hoyISO(ahora = new Date()) {
  return aISO(ahora);
}

/** '08:45' → 525 */
export function aMinutos(hora) {
  const [h, m] = hora.split(':').map(Number);
  return h * 60 + m;
}

/** 525 → '08:45' */
export function desdeMinutos(minutos) {
  return `${dosDigitos(Math.floor(minutos / 60))}:${dosDigitos(minutos % 60)}`;
}

const formatoLargo = new Intl.DateTimeFormat('es-BO', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const formatoCorto = new Intl.DateTimeFormat('es-BO', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
});

/** '2026-10-03' → 'sábado, 3 de octubre de 2026' (devuelve '' si iso no es válido) */
export function formatearFechaLarga(iso) {
  const fecha = desdeISO(iso);
  if (!fecha) return '';
  return formatoLargo.format(fecha);
}

/** '2026-10-03' → 'sáb, 3 oct' (devuelve '' si iso no es válido) */
export function formatearFechaCorta(iso) {
  const fecha = desdeISO(iso);
  if (!fecha) return '';
  return formatoCorto.format(fecha);
}

/** '14:00:00' o '14:00' → '14:00' */
export function recortarHora(hora) {
  return hora ? String(hora).slice(0, 5) : '';
}
