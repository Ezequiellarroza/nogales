/**
 * Datos de amenities - Nogales
 * 
 * Amenities del edificio para desarrollo inmobiliario
 * Las traducciones están en i18n (amenities.list.[key])
 */

// Categorías de amenities
export const AMENITY_CATEGORIES = {
  BUILDING: 'building',
  UNITS: 'units',
}

/**
 * Lista de amenities
 */
export const amenities = [
  // === DEL EDIFICIO ===
  {
    id: 'pool',
    i18nKey: 'pool',
    icon: 'Waves',
    category: AMENITY_CATEGORIES.BUILDING,
    featured: true,
    order: 1,
  },
  {
    id: 'parking',
    i18nKey: 'parking',
    icon: 'Car',
    category: AMENITY_CATEGORIES.BUILDING,
    featured: true,
    order: 2,
  },
  {
    id: 'grill',
    i18nKey: 'grill',
    icon: 'Flame',
    category: AMENITY_CATEGORIES.BUILDING,
    featured: true,
    order: 3,
  },
  {
    id: 'security',
    i18nKey: 'security',
    icon: 'Shield',
    category: AMENITY_CATEGORIES.BUILDING,
    featured: false,
    order: 4,
  },

  // === EN LAS UNIDADES ===
  {
    id: 'luminosity',
    i18nKey: 'luminosity',
    icon: 'Sun',
    category: AMENITY_CATEGORIES.UNITS,
    featured: true,
    order: 5,
  },
  {
    id: 'balcony',
    i18nKey: 'balcony',
    icon: 'Trees',
    category: AMENITY_CATEGORIES.UNITS,
    featured: false,
    order: 6,
  },
]

/**
 * Helpers
 */

export function getAmenityById(id) {
  return amenities.find(amenity => amenity.id === id) || null
}

export function getAmenitiesByCategory(category) {
  if (!category || category === 'all') {
    return amenities.sort((a, b) => a.order - b.order)
  }
  return amenities
    .filter(amenity => amenity.category === category)
    .sort((a, b) => a.order - b.order)
}

export function getFeaturedAmenities() {
  return amenities
    .filter(amenity => amenity.featured)
    .sort((a, b) => a.order - b.order)
}

export function getAmenitiesGroupedByCategory() {
  return Object.values(AMENITY_CATEGORIES).map(category => ({
    category,
    i18nKey: `amenities.categories.${category}`,
    amenities: getAmenitiesByCategory(category),
  }))
}

export default amenities