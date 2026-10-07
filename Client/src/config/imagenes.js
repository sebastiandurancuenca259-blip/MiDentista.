import atencionConsultorio from '../assets/clinica/atencion-consultorio.jpg';

// Todas las imágenes del sitio en un solo lugar.
// Las de Unsplash son ILUSTRATIVAS: reemplázalas por fotos reales de la
// clínica guardándolas en src/assets/clinica/ e importándolas aquí.
const unsplash = (id, ancho = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${ancho}`;

export const IMAGENES = {
  heroFondo: {
    src: unsplash('photo-1629909613654-28e377c37b09', 2000),
    alt: '', // decorativa
  },
  atencion: {
    src: atencionConsultorio,
    alt: 'Odontóloga de Mi Dentista atendiendo a una niña en el consultorio',
  },
  recepcion: {
    src: unsplash('photo-1629909615184-74f495363b67'),
    alt: 'Área de recepción y espera',
  },
  consultorio: {
    src: unsplash('photo-1598256989800-fe5f95da9787'),
    alt: 'Consultorio odontológico',
  },
  rayosX: {
    src: unsplash('photo-1629909613654-28e377c37b09'),
    alt: 'Equipo de diagnóstico dental',
  },
  cirugia: {
    src: unsplash('photo-1588776814546-1ffcf47267a5'),
    alt: 'Profesional de la salud dental',
  },
};
