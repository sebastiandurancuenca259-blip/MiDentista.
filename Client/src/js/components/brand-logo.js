/**
 * Logotipo oficial de la Clínica Dental Mi Dentista (SVG puro).
 * @param {string} className - Clases de Tailwind CSS para tamaño y estilo
 * @returns {string} Markup SVG listo para insertar en el DOM
 */
export function brandLogoSvg(className = 'w-9 h-9') {
  return `<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" class="${className}" aria-hidden="true">
    <rect width="40" height="40" rx="12" fill="currentColor" fill-opacity="0.1" />
    <path
      d="M20 9C15.5 9 12 12.5 12 17C12 21 14 23.5 15.5 27C17 30.5 18 32 20 32C22 32 23 30.5 24.5 27C26 23.5 28 21 28 17C28 12.5 24.5 9 20 9Z"
      fill="currentColor"
    />
    <circle cx="20" cy="17" r="3.5" fill="white" />
  </svg>`;
}

export default brandLogoSvg;
