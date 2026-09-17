import { Stethoscope, Sparkles, ShieldCheck, Smile, Award, Zap, Crown, HeartPulse, Scissors, Flame } from 'lucide-react';

// Catálogo de tratamientos. Lo usan la página de Servicios (tarjetas y
// detalle) y el formulario de reserva (lista de servicios). El `id` es lo
// que se guarda en la base de datos (columna citas.servicio_id).

export const CATEGORIAS = [
  { id: 'general', nombre: 'Odontología General' },
  { id: 'ortodoncia', nombre: 'Ortodoncia' },
  { id: 'protesis', nombre: 'Prótesis y Rehabilitación' },
  { id: 'estetica', nombre: 'Estética Dental' },
  { id: 'endodoncia-cirugia', nombre: 'Endodoncia y Cirugía' },
];

export const SERVICIOS = [
  {
    id: 'consulta-general',
    categoria: 'general',
    titulo: 'Consulta Diagnóstica y Evaluación',
    icono: Stethoscope,
    duracion: '30 Min',
    etiqueta: 'Inicial',
    descripcion: 'Revisión clínica completa con diagnóstico visual y planificación del tratamiento.',
    beneficios: ['Evaluación clínica', 'Diagnóstico preventivo', 'Plan de tratamiento personalizado'],
    detalle:
      'Realizamos una revisión integral de la cavidad bucal para detectar caries tempranas, problemas de encías o desalineaciones, diseñando un plan de atención a tu medida.',
  },
  {
    id: 'limpieza',
    categoria: 'general',
    titulo: 'Limpieza Dental Profunda (Tartrectomía)',
    icono: Sparkles,
    duracion: '45 Min',
    etiqueta: 'Prevención',
    descripcion: 'Remoción de sarro y placa bacteriana para encías sanas y un aliento fresco.',
    beneficios: ['Eliminación de sarro', 'Pulido dental', 'Instrucción de higiene bucal'],
    detalle:
      'Limpieza profesional con ultrasonido y pulido para retirar el sarro acumulado que el cepillado diario no logra eliminar, previniendo la gingivitis y la enfermedad periodontal.',
  },
  {
    id: 'curaciones',
    categoria: 'general',
    titulo: 'Curaciones y Obturaciones de Resina',
    icono: ShieldCheck,
    duracion: 'Mismo Día',
    etiqueta: 'Restauración',
    descripcion: 'Tratamiento de caries con resinas estéticas del mismo color de tu diente.',
    beneficios: ['Resina libre de mercurio', 'Color natural', 'Restauración en una sesión'],
    detalle:
      'Eliminamos el tejido dañado por la caries y restauramos la forma y función original del diente utilizando resinas de alta calidad que se mimetizan con tu esmalte.',
  },
  {
    id: 'ortodoncia',
    categoria: 'ortodoncia',
    titulo: 'Brackets Convencionales y Estéticos',
    icono: Smile,
    duracion: 'Evaluación',
    etiqueta: 'Alineación',
    descripcion: 'Tratamiento de ortodoncia para alinear tus dientes y corregir la mordida.',
    beneficios: ['Brackets metálicos y estéticos', 'Corrección de mordida', 'Para niños y adultos'],
    detalle:
      'Diseñado para corregir apiñamientos y maloclusiones. Ofrecemos opciones metálicas tradicionales y cerámicas estéticas para mayor discreción durante el tratamiento.',
  },
  {
    id: 'protesis',
    categoria: 'protesis',
    titulo: 'Prótesis Removibles y Definitivas',
    icono: Crown,
    duracion: 'Personalizado',
    etiqueta: 'Rehabilitación',
    descripcion: 'Reemplazo de piezas dentales faltantes para recuperar la masticación y la estética.',
    beneficios: ['Prótesis parciales y totales', 'Materiales resistentes', 'Ajuste cómodo y natural'],
    detalle:
      'Devolvemos la función masticatoria y la sonrisa a pacientes con ausencia de uno o varios dientes, confeccionando prótesis adaptadas a la anatomía de cada paciente.',
  },
  {
    id: 'blanqueamiento',
    categoria: 'estetica',
    titulo: 'Blanqueamiento Dental Profesional',
    icono: Zap,
    duracion: '1 Sesión',
    etiqueta: 'Estética',
    descripcion: 'Aclaramiento del tono de los dientes para una sonrisa brillante y renovada.',
    beneficios: ['Aclaramiento rápido', 'Procedimiento seguro', 'Resultados visibles'],
    detalle:
      'Tratamiento clínico que reduce varios tonos del color de los dientes mediante geles blanqueadores activados de forma profesional, protegiendo la salud de tus encías.',
  },
  {
    id: 'carillas',
    categoria: 'estetica',
    titulo: 'Carillas de Resina y Diseño de Sonrisa',
    icono: Award,
    duracion: 'Estética',
    etiqueta: 'Transformación',
    descripcion: 'Corrección de forma, tamaño y ligeros apiñamientos para mejorar la estética facial.',
    beneficios: ['Diseño armónico', 'Corrección de bordes e imperfecciones', 'Mejora estética inmediata'],
    detalle:
      'Modelado directo de resinas estéticas sobre la cara frontal del diente para corregir fracturas leves, manchas o formas irregulares de manera conservadora.',
  },
  {
    id: 'endodoncia',
    categoria: 'endodoncia-cirugia',
    titulo: 'Tratamiento de Conducto (Endodoncia)',
    icono: HeartPulse,
    duracion: 'Alivio del Dolor',
    etiqueta: 'Urgencia',
    descripcion: 'Tratamiento para salvar dientes con infección o inflamación de la pulpa dental.',
    beneficios: ['Alivio del dolor agudo', 'Conservación del diente natural', 'Sellado hermético'],
    detalle:
      'Procedimiento enfocado en limpiar y desinfectar el interior del diente (nervio) cuando existe una caries profunda o dolor intenso, evitando así la extracción de la pieza.',
  },
  {
    id: 'extraccion',
    categoria: 'endodoncia-cirugia',
    titulo: 'Extracciones Dentales y Cirugía Simple',
    icono: Scissors,
    duracion: 'Cuidadoso',
    etiqueta: 'Cirugía',
    descripcion: 'Extracción segura de piezas dentales no restaurables con técnica anestésica suave.',
    beneficios: ['Anestesia local', 'Procedimiento rápido', 'Indicaciones de recuperación'],
    detalle:
      'Realizamos extracciones de dientes fracturados o severamente dañados priorizando el bienestar, la tranquilidad y una buena recuperación.',
  },
  {
    id: 'urgencia',
    categoria: 'endodoncia-cirugia',
    titulo: 'Atención de Urgencias Dentales',
    icono: Flame,
    duracion: 'Prioritario',
    etiqueta: 'Urgencia',
    descripcion: 'Atención oportuna para dolores intensos, golpes, traumatismos o restauraciones caídas.',
    beneficios: ['Alivio del dolor', 'Atención rápida', 'Solución de emergencia'],
    detalle:
      'Si presentas un dolor agudo, inflamación o un accidente dental, te atendemos con prioridad para resolver la urgencia y calmar las molestias lo antes posible.',
  },
];

/** Nombre legible del servicio guardado en la base (tolera valores antiguos en texto libre). */
export function nombreServicio(id) {
  return SERVICIOS.find((s) => s.id === id)?.titulo ?? id ?? 'Consulta general';
}

export function existeServicio(id) {
  return SERVICIOS.some((s) => s.id === id);
}
