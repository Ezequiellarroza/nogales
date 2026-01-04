/**
 * Datos de la galería - Nogales Apartamentos
 */

// Categorías disponibles
export const GALLERY_CATEGORIES = {
  ALL: 'all',
  DEPARTAMENTOS: 'departamentos',
  EDIFICIO: 'edificio',
}

/**
 * Lista de imágenes
 */
export const galleryImages = [
  // Departamentos - Landscape (9)
  {
    id: 'dep-001',
    src: 'images/gallery/departamentos/departamentos-001-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-002',
    src: 'images/gallery/departamentos/departamentos-002-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-003',
    src: 'images/gallery/departamentos/departamentos-003-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-004',
    src: 'images/gallery/departamentos/departamentos-004-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-005',
    src: 'images/gallery/departamentos/departamentos-005-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-006',
    src: 'images/gallery/departamentos/departamentos-006-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-007',
    src: 'images/gallery/departamentos/departamentos-007-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-008',
    src: 'images/gallery/departamentos/departamentos-008-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },
  {
    id: 'dep-009',
    src: 'images/gallery/departamentos/departamentos-009-landscape.webp',
    alt: 'Departamento Nogales',
    category: GALLERY_CATEGORIES.DEPARTAMENTOS,
    aspectRatio: 'landscape',
  },

  // Edificio - Landscape (4)
  {
    id: 'edif-001',
    src: 'images/gallery/edificio/edificio-001-landscape.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'landscape',
  },
  {
    id: 'edif-002',
    src: 'images/gallery/edificio/edificio-002-landscape.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'landscape',
  },
  {
    id: 'edif-003',
    src: 'images/gallery/edificio/edificio-003-landscape.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'landscape',
  },
  {
    id: 'edif-004',
    src: 'images/gallery/edificio/edificio-004-landscape.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'landscape',
  },

  // Edificio - Portrait (6)
  {
    id: 'edif-p-001',
    src: 'images/gallery/edificio/edificio-001-portrait.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  },
  {
    id: 'edif-p-002',
    src: 'images/gallery/edificio/edificio-002-portrait.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  },
  {
    id: 'edif-p-003',
    src: 'images/gallery/edificio/edificio-003-portrait.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  },
  {
    id: 'edif-p-004',
    src: 'images/gallery/edificio/edificio-004-portrait.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  },
  {
    id: 'edif-p-005',
    src: 'images/gallery/edificio/edificio-005-portrait.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  },
  {
    id: 'edif-p-006',
    src: 'images/gallery/edificio/edificio-006-portrait.webp',
    alt: 'Edificio Nogales',
    category: GALLERY_CATEGORIES.EDIFICIO,
    aspectRatio: 'portrait',
  },
]

/**
 * Helpers
 */

export function getImagesByCategory(category) {
  if (category === GALLERY_CATEGORIES.ALL) return galleryImages
  return galleryImages.filter(img => img.category === category)
}

export function getNextImage(currentId) {
  const currentIndex = galleryImages.findIndex(img => img.id === currentId)
  const nextIndex = (currentIndex + 1) % galleryImages.length
  return galleryImages[nextIndex]
}

export function getPrevImage(currentId) {
  const currentIndex = galleryImages.findIndex(img => img.id === currentId)
  const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
  return galleryImages[prevIndex]
}

export function getImageIndex(imageId) {
  return galleryImages.findIndex(img => img.id === imageId) + 1
}

export function getTotalImages() {
  return galleryImages.length
}

export default galleryImages