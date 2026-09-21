import { describe, expect, it } from 'vitest';
import { calcularPascua, feriadosDelAnio, nombreFeriado } from './feriados';
import { aISO } from './fechas';

describe('calcularPascua', () => {
  it.each([
    [2024, '2024-03-31'],
    [2025, '2025-04-20'],
    [2026, '2026-04-05'],
    [2027, '2027-03-28'],
  ])('en %i cae el %s', (anio, esperado) => {
    expect(aISO(calcularPascua(anio))).toBe(esperado);
  });
});

describe('feriadosDelAnio', () => {
  const feriados2026 = feriadosDelAnio(2026);

  it('incluye los feriados móviles de 2026', () => {
    expect(feriados2026.get('2026-02-16')).toBe('Carnaval');
    expect(feriados2026.get('2026-02-17')).toBe('Carnaval');
    expect(feriados2026.get('2026-04-03')).toBe('Viernes Santo');
    expect(feriados2026.get('2026-06-04')).toBe('Corpus Christi');
  });

  it('incluye los feriados fijos y el de Santa Cruz', () => {
    expect(feriados2026.get('2026-08-06')).toBe('Día de la Independencia');
    expect(feriados2026.get('2026-09-24')).toBe('Aniversario de Santa Cruz');
  });

  it('agrega los feriados adicionales solo del año pedido', () => {
    const conAdicionales = feriadosDelAnio(2026, ['2026-09-25', '2027-01-04']);
    expect(conAdicionales.has('2026-09-25')).toBe(true);
    expect(conAdicionales.has('2027-01-04')).toBe(false);
  });
});

describe('nombreFeriado', () => {
  it('devuelve null en un día hábil', () => {
    expect(nombreFeriado('2026-10-07')).toBeNull();
  });
});
