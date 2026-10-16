/**
 * Repositorio de iconos SVG optimizados basados en Lucide.
 * Reemplazo nativo sin dependencias de React para un renderizado rápido y accesible.
 */

const PATHS = {
  stethoscope: [
    '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />',
    '<path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />',
    '<circle cx="20" cy="10" r="2" />',
  ],
  sparkles: [
    '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />',
    '<path d="M5 3v4" />',
    '<path d="M19 17v4" />',
    '<path d="M3 5h4" />',
    '<path d="M17 19h4" />',
  ],
  shieldCheck: [
    '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />',
    '<path d="m9 12 2 2 4-4" />',
  ],
  smile: [
    '<circle cx="12" cy="12" r="10" />',
    '<path d="M8 14s1.5 2 4 2 4-2 4-2" />',
    '<line x1="9" x2="9.01" y1="9" y2="9" />',
    '<line x1="15" x2="15.01" y1="9" y2="9" />',
  ],
  award: [
    '<circle cx="12" cy="8" r="6" />',
    '<path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />',
  ],
  zap: [
    '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />',
  ],
  crown: [
    '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />',
  ],
  heartPulse: [
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />',
    '<path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />',
  ],
  scissors: [
    '<circle cx="6" cy="6" r="3" />',
    '<path d="M8.12 8.12 12 12" />',
    '<path d="M20 4 8.12 15.88" />',
    '<circle cx="6" cy="18" r="3" />',
    '<path d="M14.8 14.8 20 20" />',
  ],
  flame: [
    '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />',
  ],
  lock: [
    '<rect width="18" height="11" x="3" y="11" rx="2" ry="2" />',
    '<path d="M7 11V7a5 5 0 0 1 10 0v4" />',
  ],
  mail: [
    '<rect width="20" height="16" x="2" y="4" rx="2" />',
    '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />',
  ],
  arrowRight: [
    '<path d="M5 12h14" />',
    '<path d="m12 5 7 7-7 7" />',
  ],
  arrowLeft: [
    '<path d="m12 19-7-7 7-7" />',
    '<path d="M19 12H5" />',
  ],
  alertCircle: [
    '<circle cx="12" cy="12" r="10" />',
    '<line x1="12" x2="12" y1="8" y2="12" />',
    '<line x1="12" x2="12.01" y1="16" y2="16" />',
  ],
  chevronDown: [
    '<path d="m6 9 6 6 6-6" />',
  ],
  helpCircle: [
    '<circle cx="12" cy="12" r="10" />',
    '<path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />',
    '<path d="M12 17h.01" />',
  ],
  phoneCall: [
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />',
    '<path d="M14.05 2a9 9 0 0 1 8 7.94" />',
    '<path d="M14.05 6A5 5 0 0 1 18 10" />',
  ],
  phone: [
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />',
  ],
  calendar: [
    '<path d="M8 2v4" />',
    '<path d="M16 2v4" />',
    '<rect width="18" height="18" x="3" y="4" rx="2" />',
    '<path d="M3 10h18" />',
  ],
  calendarDays: [
    '<path d="M8 2v4" />',
    '<path d="M16 2v4" />',
    '<rect width="18" height="18" x="3" y="4" rx="2" />',
    '<path d="M3 10h18" />',
    '<path d="M8 14h.01" />',
    '<path d="M12 14h.01" />',
    '<path d="M16 14h.01" />',
    '<path d="M8 18h.01" />',
    '<path d="M12 18h.01" />',
    '<path d="M16 18h.01" />',
  ],
  calendarCheck: [
    '<path d="M8 2v4" />',
    '<path d="M16 2v4" />',
    '<rect width="18" height="18" x="3" y="4" rx="2" />',
    '<path d="M3 10h18" />',
    '<path d="m9 16 2 2 4-4" />',
  ],
  clock: [
    '<circle cx="12" cy="12" r="10" />',
    '<polyline points="12 6 12 12 16 14" />',
  ],
  messageCircle: [
    '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />',
  ],
  quote: [
    '<path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />',
    '<path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />',
  ],
  heartHandshake: [
    '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />',
    '<path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />',
    '<path d="m18 15-2-2" />',
    '<path d="m15 18-2-2" />',
  ],
  checkCircle: [
    '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />',
    '<path d="m9 11 3 3L22 4" />',
  ],
  checkCircle2: [
    '<circle cx="12" cy="12" r="10" />',
    '<path d="m9 12 2 2 4-4" />',
  ],
  check: [
    '<path d="M20 6 9 17l-5-5" />',
  ],
  checkCheck: [
    '<path d="M18 6 7 17l-5-5" />',
    '<path d="m22 10-7.5 7.5L13 16" />',
  ],
  search: [
    '<circle cx="11" cy="11" r="8" />',
    '<path d="m21 21-4.3-4.3" />',
  ],
  x: [
    '<path d="M18 6 6 18" />',
    '<path d="m6 6 12 12" />',
  ],
  logOut: [
    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />',
    '<polyline points="16 17 21 12 16 7" />',
    '<line x1="21" x2="9" y1="12" y2="12" />',
  ],
  refreshCw: [
    '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />',
    '<path d="M21 3v5h-5" />',
    '<path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />',
    '<path d="M8 16H3v5" />',
  ],
  rotateCcw: [
    '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />',
    '<path d="M3 3v5h5" />',
  ],
  trash2: [
    '<path d="M3 6h18" />',
    '<path d="M19 6v14c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V6h14Z" />',
    '<path d="M8 6V4c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v2" />',
    '<line x1="10" x2="10" y1="11" y2="17" />',
    '<line x1="14" x2="14" y1="11" y2="17" />',
  ],
  mapPin: [
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />',
    '<circle cx="12" cy="10" r="3" />',
  ],
  externalLink: [
    '<path d="M15 3h6v6" />',
    '<path d="M10 14 21 3" />',
    '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />',
  ],
  user: [
    '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />',
    '<circle cx="12" cy="7" r="4" />',
  ],
  menu: [
    '<line x1="4" x2="20" y1="12" y2="12" />',
    '<line x1="4" x2="20" y1="6" y2="6" />',
    '<line x1="4" x2="20" y1="18" y2="18" />',
  ],
};

/**
 * Genera la etiqueta HTML completa del icono SVG.
 * @param {string} name Nombre del icono en camelCase
 * @param {object} options Opciones de clases y atributos
 * @returns {string} Markup SVG listo para insertar en innerHTML
 */
export function iconSvg(name, { className = 'w-5 h-5', extraAttrs = '' } = {}) {
  const paths = PATHS[name];
  if (!paths) {
    console.warn(`Icono "${name}" no encontrado en js/icons.js`);
    return '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="${className}" aria-hidden="true" ${extraAttrs}>${paths.join('')}</svg>`;
}

export default PATHS;