import { aISO, desdeISO, sumarDias } from './fechas';

// Feriados de fecha fija (MM-DD): nacionales de Bolivia + departamental de Santa Cruz.
const FERIADOS_FIJOS = {
  '01-01': 'Año Nuevo',
  '01-22': 'Día del Estado Plurinacional',
  '05-01': 'Día del Trabajo',
  '06-21': 'Año Nuevo Andino Amazónico',
  '08-06': 'Día de la Independencia',
  '09-24': 'Aniversario de Santa Cruz',
  '11-02': 'Día de Todos los Difuntos',
  '12-25': 'Navidad',
};

/**
 * Domingo de Pascua (algoritmo de Meeus/Jones/Butcher, calendario gregoriano).
 * Carnaval, Viernes Santo y Corpus Christi dependen de esta fecha.
 */
export function calcularPascua(anio) {
  const a = anio % 19;
  const b = Math.floor(anio / 100);
  const c = anio % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(anio, mes - 1, dia);
}

/** Devuelve un Map 'YYYY-MM-DD' → nombre del feriado para el año indicado. */
export function feriadosDelAnio(anio, adicionales = []) {
  const feriados = new Map();

  for (const [mesDia, nombre] of Object.entries(FERIADOS_FIJOS)) {
    feriados.set(`${anio}-${mesDia}`, nombre);
  }

  const pascua = calcularPascua(anio);
  feriados.set(aISO(sumarDias(pascua, -48)), 'Carnaval');
  feriados.set(aISO(sumarDias(pascua, -47)), 'Carnaval');
  feriados.set(aISO(sumarDias(pascua, -2)), 'Viernes Santo');
  feriados.set(aISO(sumarDias(pascua, 60)), 'Corpus Christi');

  for (const fecha of adicionales) {
    if (fecha.startsWith(`${anio}-`)) feriados.set(fecha, 'Feriado');
  }

  return feriados;
}

/** Nombre del feriado si la fecha lo es, o null. */
export function nombreFeriado(fechaISO, adicionales = []) {
  const anio = desdeISO(fechaISO).getFullYear();
  return feriadosDelAnio(anio, adicionales).get(fechaISO) ?? null;
}
