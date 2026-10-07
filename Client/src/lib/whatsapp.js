import { CLINICA } from '../config/clinica';
import { normalizarTelefono } from './validacion';

/** Enlace wa.me con el mensaje ya escrito. Por defecto, al WhatsApp de la clínica. */
export function enlaceWhatsApp(mensaje, numero = CLINICA.whatsapp) {
  const base = `https://wa.me/${numero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}

/** Convierte un teléfono de paciente al formato de wa.me (código de país sin '+'). */
export function numeroParaWhatsApp(telefono) {
  const digitos = normalizarTelefono(telefono).replace(/^\+/, '');
  return digitos.startsWith('591') ? digitos : `591${digitos}`;
}
