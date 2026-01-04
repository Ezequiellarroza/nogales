/**
 * Datos de contacto - Nogales Apartamentos
 */

export const contact = {
  // Nombre oficial
  name: 'Nogales Apartamentos',
  legalName: 'VIEW Desarrollos S.A.',
  
  // Ubicación
  address: {
    street: 'Bernardo de Irigoyen 2660',
    city: 'Mar del Plata',
    province: 'Buenos Aires',
    country: 'Argentina',
    postalCode: '',
    full: 'Bernardo de Irigoyen 2660, Mar del Plata, Buenos Aires',
  },
  
  // Coordenadas para mapa (actualizar con coordenadas reales)
  coordinates: {
    lat: -38.0055,
    lng: -57.5426,
  },
  
  // Teléfonos
  phone: {
    main: '+54 11 2674-5084',
    whatsapp: '+54 11 2674-5084',
    mainClean: '5491126745084',
    whatsappClean: '5491126745084',
  },
  
  // Email
  email: {
    reservations: 'nogales@viewdesarrollos.com.ar',
    info: 'nogales@viewdesarrollos.com.ar',
  },
  
  // Redes sociales (actualizar cuando el cliente confirme)
  social: {
    instagram: 'https://instagram.com/viewdesarrollos',
  },
  
  // Horarios (confirmar con cliente)
  hours: {
    reception: {
      open: '08:00',
      close: '20:00',
    },
    checkIn: {
      from: '14:00',
      to: '20:00',
    },
    checkOut: {
      until: '10:00',
    },
  },
  
  // Para el botón de WhatsApp
  whatsapp: {
    number: '5491126745084',
    defaultMessage: 'Hola! Me interesa hacer una reserva en Nogales Apartamentos. ¿Podrían darme información sobre disponibilidad?',
  },
  
  // Google Maps (actualizar con link real)
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.5!2d-57.5426!3d-38.0055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBernardo%20de%20Irigoyen%202660!5e0!3m2!1ses-419!2sar',
  googleMapsLink: 'https://maps.app.goo.gl/wiXz2ZhcqUtB6Zdh7',
}

/**
 * Helpers
 */

export function getWhatsAppLink(customMessage = null) {
  const message = encodeURIComponent(customMessage || contact.whatsapp.defaultMessage)
  return `https://wa.me/${contact.whatsapp.number}?text=${message}`
}

export function getPhoneLink() {
  return `tel:${contact.phone.mainClean}`
}

export function getEmailLink(type = 'reservations') {
  const email = contact.email[type] || contact.email.reservations
  return `mailto:${email}`
}

export function getFullAddress() {
  const { street, city, province, country } = contact.address
  return `${street}, ${city}, ${province}, ${country}`
}

export default contact