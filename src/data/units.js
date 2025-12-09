/**
 * Datos de las unidades - Nogales
 * 
 * Desarrollo inmobiliario en Mar del Plata
 * Las traducciones están en i18n (units.types.[key])
 */

// Características disponibles (iconos de Lucide React)
export const FEATURES = {
  ambientes: { icon: 'LayoutGrid', i18nKey: 'units.features.ambientes' },
  dormitorios: { icon: 'Bed', i18nKey: 'units.features.dormitorios' },
  banos: { icon: 'Bath', i18nKey: 'units.features.banos' },
  balcon: { icon: 'Sun', i18nKey: 'units.features.balcon' },
  cocina: { icon: 'ChefHat', i18nKey: 'units.features.cocina' },
  living: { icon: 'Sofa', i18nKey: 'units.features.living' },
  luminoso: { icon: 'Lightbulb', i18nKey: 'units.features.luminoso' },
  vista: { icon: 'Eye', i18nKey: 'units.features.vista' },
}

// Tipos de unidad
export const UNIT_TYPES = {
  EXECUTIVE: 'executive',
  DUPLEX_2: 'duplex-2amb',
  DUPLEX_3: 'duplex-3amb',
}

/**
 * Lista de unidades
 */
export const units = [
  {
    id: 'executive',
    slug: 'executive-suite',
    type: UNIT_TYPES.EXECUTIVE,
    i18nKey: 'executive',
    ambientes: 1,
    capacity: {
      dormitorios: 1,
      banos: 1,
    },
    superficie: null, // m2 - pendiente info cliente
    features: ['luminoso', 'balcon', 'cocina', 'vista'],
    featured: true,
    images: [
      'images/units/executive-suite.webp',
    ],
    highlights: ['luminoso', 'balcon', 'vista'],
  },
  {
    id: 'duplex-2amb',
    slug: 'duplex-2-ambientes',
    type: UNIT_TYPES.DUPLEX_2,
    i18nKey: 'duplex2',
    ambientes: 2,
    capacity: {
      dormitorios: 1,
      banos: 1,
    },
    superficie: null,
    features: ['luminoso', 'balcon', 'cocina', 'living', 'vista'],
    featured: true,
    images: [
      'images/units/duplex-2amb.webp',
    ],
    highlights: ['living', 'balcon', 'luminoso'],
  },
  {
    id: 'duplex-3amb',
    slug: 'duplex-3-ambientes',
    type: UNIT_TYPES.DUPLEX_3,
    i18nKey: 'duplex3',
    ambientes: 3,
    capacity: {
      dormitorios: 2,
      banos: 1,
    },
    superficie: null,
    features: ['luminoso', 'balcon', 'cocina', 'living', 'dormitorios', 'vista'],
    featured: true,
    images: [
      'images/units/duplex-3amb.webp',
    ],
    highlights: ['dormitorios', 'living', 'vista'],
  },
]

/**
 * Helpers
 */

export function getUnitBySlug(slug) {
  return units.find(unit => unit.slug === slug) || null
}

export function getUnitById(id) {
  return units.find(unit => unit.id === id) || null
}

export function getUnitsByType(type) {
  if (!type || type === 'all') return units
  return units.filter(unit => unit.type === type)
}

export function getFeaturedUnits() {
  return units.filter(unit => unit.featured)
}

export function formatSuperficie(superficie) {
  if (!superficie) return 'Consultar'
  return `${superficie} m²`
}

export default units