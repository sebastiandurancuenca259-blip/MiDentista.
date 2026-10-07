import { describe, expect, it } from 'vitest';
import { generarInicios, horariosDelDia, horariosDisponibles, motivoCierre, resumenHorario } from './horarios';

// Configuración fija para que las pruebas no dependan de config/clinica.js.
const config = {
  duracionCitaMin: 45,
  anticipacionMinimaMin: 60,
  diasMaximosAnticipacion: 60,
  turnos: {
    0: [],
    1: [['08:00', '12:00'], ['14:00', '20:00']],
    2: [['08:00', '12:00'], ['14:00', '20:00']],
    3: [['08:00', '12:00'], ['14:00', '20:00']],
    4: [['08:00', '12:00'], ['14:00', '20:00']],
    5: [['08:00', '12:00'], ['14:00', '20:00']],
    6: [['08:00', '12:00']],
  },
};
const opciones = { config, adicionales: [] };

describe('generarInicios', () => {
  it('genera citas de 45 minutos que terminan antes del cierre', () => {
    expect(generarInicios(['08:00', '12:00'], 45)).toEqual(['08:00', '08:45', '09:30', '10:15', '11:00']);
    expect(generarInicios(['14:00', '20:00'], 45).at(-1)).toBe('19:15');
  });
});

describe('motivoCierre', () => {
  it('cierra los domingos', () => {
    expect(motivoCierre('2026-10-04', opciones)).toMatch(/domingos/);
  });

  it('cierra en feriados', () => {
    expect(motivoCierre('2026-11-02', opciones)).toMatch(/feriado/);
  });

  it('atiende un miércoles normal', () => {
    expect(motivoCierre('2026-10-07', opciones)).toBeNull();
  });
});

describe('horariosDelDia', () => {
  it('los sábados solo hay turno mañana', () => {
    expect(horariosDelDia('2026-10-03', opciones)).toEqual(['08:00', '08:45', '09:30', '10:15', '11:00']);
  });

  it('de lunes a viernes hay 13 horarios', () => {
    expect(horariosDelDia('2026-10-07', opciones)).toHaveLength(13);
  });

  it('un domingo no tiene horarios', () => {
    expect(horariosDelDia('2026-10-04', opciones)).toEqual([]);
  });
});

describe('horariosDisponibles', () => {
  it('quita los horarios ocupados', () => {
    const libres = horariosDisponibles('2026-10-07', { ...opciones, ocupados: ['08:00', '14:00'], ahora: new Date(2026, 9, 1) });
    expect(libres).not.toContain('08:00');
    expect(libres).not.toContain('14:00');
    expect(libres).toHaveLength(11);
  });

  it('si la fecha es hoy, quita los horarios que ya pasaron (con 1 hora de anticipación)', () => {
    const ahora = new Date(2026, 9, 7, 9, 10); // miércoles 7 de octubre, 09:10
    const libres = horariosDisponibles('2026-10-07', { ...opciones, ahora });
    expect(libres[0]).toBe('10:15');
  });
});

describe('resumenHorario', () => {
  it('agrupa los días con el mismo horario', () => {
    expect(resumenHorario(config)).toEqual([
      { dias: 'Lunes a Viernes', horas: '08:00 – 12:00 y 14:00 – 20:00' },
      { dias: 'Sábados', horas: '08:00 – 12:00' },
      { dias: 'Domingos y feriados', horas: 'Cerrado', cerrado: true },
    ]);
  });
});
