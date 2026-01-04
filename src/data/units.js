/**
 * Datos de las habitaciones - Nogales Apartamentos
 * 
 * Alquiler temporario en Mar del Plata
 * Las traducciones están en i18n (units.types.[key])
 */

// Características disponibles (iconos de Lucide React)
export const FEATURES = {
  kitchen: { icon: 'ChefHat', i18nKey: 'units.features.kitchen' },
  wifi: { icon: 'Wifi', i18nKey: 'units.features.wifi' },
  ac: { icon: 'AirVent', i18nKey: 'units.features.ac' },
  tv: { icon: 'Tv', i18nKey: 'units.features.tv' },
  linens: { icon: 'Bed', i18nKey: 'units.features.linens' },
  closet: { icon: 'DoorOpen', i18nKey: 'units.features.closet' },
  patio: { icon: 'Trees', i18nKey: 'units.features.patio' },
  living: { icon: 'Sofa', i18nKey: 'units.features.living' },
  poolView: { icon: 'Waves', i18nKey: 'units.features.poolView' },
  seaView: { icon: 'Sunrise', i18nKey: 'units.features.seaView' },
}

// Tipos de habitación
export const UNIT_TYPES = {
  SUPERIOR: 'superior',
  EXECUTIVE: 'executive',
}

/**
 * Lista de habitaciones
 */
export const units = [
  {
    id: 'superior',
    slug: 'superior',
    type: UNIT_TYPES.SUPERIOR,
    i18nKey: 'superior',
    capacity: {
      guests: 4,
      bedrooms: 1,
      bathrooms: 1,
    },
    bedConfig: '1 cama doble + sofá cama',
    features: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'closet', 'patio', 'poolView'],
    featured: true,
    images: [
      'images/units/superior-1.webp',
      'images/units/superior-2.webp',
      'images/units/superior-3.webp',
      'images/units/superior-4.webp',
      'images/units/superior-5.webp',
    ],
    highlights: ['kitchen', 'poolView', 'patio'],
  },
  {
    id: 'executive',
    slug: 'executive-suite',
    type: UNIT_TYPES.EXECUTIVE,
    i18nKey: 'executive',
    capacity: {
      guests: 6,
      bedrooms: 2,
      bathrooms: 1,
    },
    bedConfig: '1 cama doble + 2 camas individuales + sofá cama',
    features: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'closet', 'patio', 'living', 'seaView'],
    featured: true,
    images: [
      'images/units/executive-1.webp',
      'images/units/executive-2.webp',
      'images/units/executive-3.webp',
      'images/units/executive-4.webp',
      'images/units/executive-5.webp',
    ],
    highlights: ['seaView', 'living', 'kitchen'],
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

export default units