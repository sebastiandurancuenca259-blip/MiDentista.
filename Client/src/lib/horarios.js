import { HORARIO, FERIADOS_ADICIONALES } from '../config/clinica';
import { aMinutos, desdeMinutos, desdeISO, hoyISO } from './fechas';
import { nombreFeriado } from './feriados';

const NOMBRES_DIAS = ['Domingos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados'];

/** Genera los inicios de cita de un turno: ['08:00','12:00'] cada 45 min → 08:00, 08:45 … 11:00 */
export function generarInicios([apertura, cierre], duracion) {
  const inicios = [];
  for (let t = aMinutos(apertura); t + duracion <= aMinutos(cierre); t += duracion) {
    inicios.push(desdeMinutos(t));
  }
  return inicios;
}

/**
 * Motivo por el que la clínica no atiende ese día, o null si atiende.
 * Devuelve un texto listo para mostrar al paciente.
 */
export function motivoCierre(fechaISO, { config = HORARIO, adicionales = FERIADOS_ADICIONALES } = {}) {
  const dia = desdeISO(fechaISO).getDay();
  if (dia === 0) return 'Los domingos la clínica permanece cerrada.';
  const feriado = nombreFeriado(fechaISO, adicionales);
  if (feriado) return `Ese día es feriado (${feriado}) y la clínica permanece cerrada.`;
  if (!config.turnos[dia]?.length) return 'La clínica no atiende ese día.';
  return null;
}

/** Todos los horarios de inicio del día, sin considerar ocupados ni la hora actual. */
export function horariosDelDia(fechaISO, opciones = {}) {
  const { config = HORARIO } = opciones;
  if (motivoCierre(fechaISO, opciones)) return [];
  const dia = desdeISO(fechaISO).getDay();
  return config.turnos[dia].flatMap((turno) => generarInicios(turno, config.duracionCitaMin));
}

/**
 * Horarios que el paciente puede elegir: quita los ya ocupados y, si la fecha
 * es hoy, los que empiezan antes de la anticipación mínima.
 */
export function horariosDisponibles(fechaISO, { ocupados = [], ahora = new Date(), ...opciones } = {}) {
  const { config = HORARIO } = opciones;
  const tomados = new Set(ocupados);
  const esHoy = fechaISO === hoyISO(ahora);
  const minimo = ahora.getHours() * 60 + ahora.getMinutes() + config.anticipacionMinimaMin;

  return horariosDelDia(fechaISO, opciones).filter(
    (hora) => !tomados.has(hora) && (!esHoy || aMinutos(hora) >= minimo),
  );
}

/**
 * Resumen legible del horario agrupando días consecutivos iguales:
 * [{ dias: 'Lunes a Viernes', horas: '08:00 – 12:00 y 14:00 – 20:00' }, …]
 */
export function resumenHorario(config = HORARIO) {
  const textoTurnos = (dia) =>
    config.turnos[dia].map(([a, c]) => `${a} – ${c}`).join(' y ');

  const grupos = [];
  for (const dia of [1, 2, 3, 4, 5, 6]) {
    if (!config.turnos[dia]?.length) continue;
    const horas = textoTurnos(dia);
    const ultimo = grupos.at(-1);
    if (ultimo && ultimo.horas === horas && ultimo.hasta === dia - 1) {
      ultimo.hasta = dia;
    } else {
      grupos.push({ desde: dia, hasta: dia, horas });
    }
  }

  const resumen = grupos.map(({ desde, hasta, horas }) => ({
    dias: desde === hasta ? NOMBRES_DIAS[desde] : `${NOMBRES_DIAS[desde]} a ${NOMBRES_DIAS[hasta]}`,
    horas,
  }));
  resumen.push({ dias: 'Domingos y feriados', horas: 'Cerrado', cerrado: true });
  return resumen;
}
