/**
 * Datos de las habitaciones - Nogales Apartamentos
 * 
 * Alquiler temporario en Mar del Plata
 * Las traducciones están en i18n (units.types.[key])
 */

// Amenities disponibles (iconos de Lucide React)
export const AMENITIES = {
  kitchen: { icon: 'ChefHat', i18nKey: 'units.features.kitchen' },
  wifi: { icon: 'Wifi', i18nKey: 'units.features.wifi' },
  ac: { icon: 'AirVent', i18nKey: 'units.features.ac' },
  tv: { icon: 'Tv', i18nKey: 'units.features.tv' },
  linens: { icon: 'Bed', i18nKey: 'units.features.linens' },
  closet: { icon: 'DoorOpen', i18nKey: 'units.features.closet' },
  intercom: { icon: 'Phone', i18nKey: 'units.features.intercom' },
  patio: { icon: 'Trees', i18nKey: 'units.features.patio' },
  living: { icon: 'Sofa', i18nKey: 'units.features.living' },
  toilette: { icon: 'Bath', i18nKey: 'units.features.toilette' },
  poolView: { icon: 'Waves', i18nKey: 'units.features.poolView' },
  seaView: { icon: 'Sunrise', i18nKey: 'units.features.seaView' },
}

// Tipos de habitación
export const SUITE_TYPES = {
  SUPERIOR: 'superior',
  EXECUTIVE: 'executive',
}

/**
 * Lista de habitaciones
 */
export const suites = [
  {
    id: 'superior',
    slug: 'superior',
    type: SUITE_TYPES.SUPERIOR,
    i18nKey: 'superior',
    price: null,
    capacity: {
      guests: 4,
      bedrooms: 1,
      bathrooms: 1,
    },
    bedConfig: '1 cama doble + sofá cama',
    amenities: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'closet', 'intercom', 'patio', 'poolView'],
    featured: true,
    images: [
      'images/suites/suite-superior.webp',
    ],
    highlights: ['kitchen', 'poolView', 'patio'],
  },
  {
    id: 'executive',
    slug: 'executive-suite',
    type: SUITE_TYPES.EXECUTIVE,
    i18nKey: 'executive',
    price: null,
    capacity: {
      guests: 6,
      bedrooms: 2,
      bathrooms: 1,
      toilette: 1,
    },
    bedConfig: '1 cama doble + 2 camas individuales + sofá cama',
    amenities: ['kitchen', 'wifi', 'ac', 'tv', 'linens', 'closet', 'intercom', 'patio', 'living', 'toilette', 'seaView'],
    featured: true,
    images: [
      'images/suites/loft-premium.webp',
    ],
    highlights: ['seaView', 'living', 'kitchen'],
  },
]

/**
 * Helpers
 */

export function getSuiteBySlug(slug) {
  return suites.find(suite => suite.slug === slug) || null
}

export function getSuiteById(id) {
  return suites.find(suite => suite.id === id) || null
}

export function getSuitesByType(type) {
  if (!type || type === 'all') return suites
  return suites.filter(suite => suite.type === type)
}

export function getFeaturedSuites() {
  return suites.filter(suite => suite.featured)
}

export function formatPrice(price, locale = 'es-AR') {
  if (!price) return 'Consultar'
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function getPriceRange() {
  const prices = suites.filter(s => s.price).map(s => s.price)
  if (prices.length === 0) return { min: null, max: null }
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  }
}

export default suites