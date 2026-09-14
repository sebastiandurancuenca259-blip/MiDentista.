// Validaciones del formulario de reserva. Devuelven un mensaje de error
// o null si el valor es correcto.

/** Quita espacios, guiones, puntos y paréntesis: '+591 700-12345' → '+59170012345' */
export function normalizarTelefono(valor) {
  return valor.replace(/[\s\-().]/g, '');
}

// Celular (6 o 7) o fijo (2, 3 o 4) de Bolivia, con o sin +591.
const TELEFONO_BOLIVIA = /^(\+?591)?[2-7]\d{6,7}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validarNombre(valor) {
  const limpio = valor.trim();
  if (limpio.length < 3) return 'Escribe tu nombre completo.';
  if (limpio.length > 100) return 'El nombre es demasiado largo.';
  if (!/^[\p{L}\s'.-]+$/u.test(limpio)) return 'El nombre solo puede tener letras.';
  return null;
}

export function validarTelefono(valor) {
  if (!valor.trim()) return 'Escribe tu número de teléfono o WhatsApp.';
  if (!TELEFONO_BOLIVIA.test(normalizarTelefono(valor))) {
    return 'Número no válido. Ejemplo: 70012345 o +591 70012345.';
  }
  return null;
}

/** El correo es opcional: solo se valida si se escribió algo. */
export function validarEmail(valor) {
  const limpio = valor.trim();
  if (!limpio) return null;
  if (limpio.length > 120 || !EMAIL.test(limpio)) return 'Correo no válido. Ejemplo: nombre@correo.com';
  return null;
}
