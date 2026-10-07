// Datos de la clínica en un solo lugar.
// Si cambia un teléfono, un horario o una red social, se edita SOLO aquí
// y el cambio se refleja en todo el sitio (navbar, footer, contacto, reservas…).

export const CLINICA = {
  nombre: 'Mi Dentista',
  nombreCompleto: 'Mi Dentista Clínica Dental',
  eslogan: 'Clínica Dental Especializada',
  telefonoVisible: '+591 78410535',
  telefono: '+59178410535',
  whatsapp: '59178410535',
  email: 'midentista114@gmail.com',
  direccion: {
    zona: 'Satélite Norte',
    municipio: 'Warnes',
    departamento: 'Santa Cruz',
    pais: 'Bolivia',
  },
  mapa: {
    enlace: 'https://maps.app.goo.gl/vK6uyptKRcyDkSkv8',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.5081946798937!2d-63.138441799999995!3d-17.6031931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x93f1e172d17ab2bf%3A0x771397dd048b78d0!2sMi%20Dentista%20Cl%C3%ADnica%20Dental!5e1!3m2!1ses!2sbo!4v1789592894259!5m2!1ses!2sbo',
    latitud: -17.6031931,
    longitud: -63.1384418,
  },
  redes: [
    { nombre: 'TikTok', url: 'https://www.tiktok.com/@dra_juanitacuenca' },
    { nombre: 'Facebook', url: 'https://www.facebook.com/satelitenorte.dentista.odontologia.ortodoncia' },
    { nombre: 'Instagram', url: 'https://www.instagram.com/mi_dentista_clinica.dental/' },
  ],
};

// Horario de atención. Días: 0 = domingo, 1 = lunes … 6 = sábado.
// Cada turno es [apertura, cierre]. Las citas duran `duracionCitaMin` minutos
// y los horarios disponibles se generan automáticamente a partir de los turnos.
export const HORARIO = {
  duracionCitaMin: 45,
  anticipacionMinimaMin: 60, // no se puede reservar con menos de 1 hora de anticipación
  diasMaximosAnticipacion: 60, // ni con más de 60 días de anticipación
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

// Feriados que no se pueden calcular solos: traslados y feriados adicionales
// decretados cada año, o días en que la clínica decide cerrar (vacaciones, etc.).
// Los feriados nacionales fijos, los de Semana Santa/Carnaval/Corpus y el
// 24 de septiembre (Santa Cruz) ya se calculan automáticamente en lib/feriados.js.
export const FERIADOS_ADICIONALES = [
  '2026-01-23', // traslado del Día del Estado Plurinacional
  '2026-06-05', // feriado adicional por Corpus Christi
  '2026-06-22', // traslado del Año Nuevo Andino Amazónico
  '2026-08-07', // feriado adicional por la Independencia
  '2026-09-25', // feriado adicional en Santa Cruz (D.S. 5711)
];
