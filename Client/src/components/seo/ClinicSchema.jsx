import { CLINICA, HORARIO } from '../../config/clinica';

const DIAS_SCHEMA = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Datos estructurados (schema.org) para que Google muestre la clínica con
// dirección, teléfono y horario. Se generan desde config/clinica.js.
export default function ClinicSchema() {
  const horarios = Object.entries(HORARIO.turnos).flatMap(([dia, turnos]) =>
    turnos.map(([abre, cierra]) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${DIAS_SCHEMA[dia]}`,
      opens: abre,
      closes: cierra,
    })),
  );

  const datos = {
    '@context': 'https://schema.org',
    '@type': 'Dentist',
    name: CLINICA.nombreCompleto,
    telephone: CLINICA.telefono,
    email: CLINICA.email,
    url: typeof window !== 'undefined' ? window.location.origin : undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CLINICA.direccion.zona,
      addressLocality: CLINICA.direccion.municipio,
      addressRegion: CLINICA.direccion.departamento,
      addressCountry: 'BO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: CLINICA.mapa.latitud,
      longitude: CLINICA.mapa.longitud,
    },
    hasMap: CLINICA.mapa.enlace,
    openingHoursSpecification: horarios,
    sameAs: CLINICA.redes.map((red) => red.url),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }} />;
}
