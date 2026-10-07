import { describe, expect, it } from 'vitest';
import { normalizarTelefono, validarEmail, validarNombre, validarTelefono } from './validacion';
import { numeroParaWhatsApp } from './whatsapp';

describe('validarTelefono', () => {
  it.each(['70012345', '+591 70012345', '591-6001-2345', '33456789'])('acepta %s', (telefono) => {
    expect(validarTelefono(telefono)).toBeNull();
  });

  it.each(['', '123', '80012345', 'hola'])('rechaza "%s"', (telefono) => {
    expect(validarTelefono(telefono)).not.toBeNull();
  });
});

describe('validarNombre', () => {
  it('acepta nombres con tildes y ñ', () => {
    expect(validarNombre('María José Peña')).toBeNull();
  });

  it('rechaza nombres muy cortos o con números', () => {
    expect(validarNombre('Jo')).not.toBeNull();
    expect(validarNombre('Juan 123')).not.toBeNull();
  });
});

describe('validarEmail', () => {
  it('es opcional', () => {
    expect(validarEmail('')).toBeNull();
  });

  it('valida el formato cuando se escribe', () => {
    expect(validarEmail('paciente@correo.com')).toBeNull();
    expect(validarEmail('paciente@correo')).not.toBeNull();
  });
});

describe('teléfonos para WhatsApp', () => {
  it('normaliza y agrega el código de Bolivia', () => {
    expect(normalizarTelefono('+591 700-12345')).toBe('+59170012345');
    expect(numeroParaWhatsApp('700 12345')).toBe('59170012345');
    expect(numeroParaWhatsApp('+59170012345')).toBe('59170012345');
  });
});
