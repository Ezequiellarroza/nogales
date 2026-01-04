import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin } from 'lucide-react'
import useInView from '../hooks/useInView'
import { asset } from '../utils/assets'
import contact from '../data/contact'

function Location() {
  const { t } = useTranslation()
  const [imageRef, imageInView] = useInView({ threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ threshold: 0.2 })

  return (
    <section className="min-h-screen bg-base">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        
        {/* Imagen vertical - izquierda */}
        <div
          ref={imageRef}
          className={`relative h-[50vh] lg:h-auto transition-all duration-700 ease-out ${
            imageInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 -translate-x-8'
          }`}
        >
          <img
            src={asset('images/location/drone-exterior.webp')}
            alt={t('location.pageTitle')}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Contenido - derecha */}
        <div
          ref={contentRef}
          className={`flex flex-col justify-center py-12 lg:py-20 px-6 lg:px-16 transition-all duration-700 ease-out delay-150 ${
            contentInView
              ? 'opacity-100 translate-x-0'
              : 'opacity-0 translate-x-8'
          }`}
        >
          {/* Título y subtítulo */}
          <div className="mb-8 mt-6">
            <h1 className="font-heading font-light text-3xl lg:text-4xl text-text-primary mb-3">
              {t('location.pageTitle')}
            </h1>
            <div className="w-16 h-px bg-accent mb-4" />
            <p className="text-text-secondary text-lg">
              {t('location.pageSubtitle')}
            </p>
          </div>

          {/* Mapa */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3143.2143669928305!2d-57.53244302410498!3d-38.01878167192494!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9584dc4a1033aaa3%3A0x2228788e8692aeee!2sBernardo%20de%20Irigoyen%202660%2C%20B7600EWF%20Mar%20del%20Plata%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1766576461059!5m2!1ses-419!2sar"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Nogales Apartamentos"
            />
          </div>

          {/* Contacto */}
          <div className="bg-white dark:bg-surface rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="font-heading font-medium text-xl text-text-primary mb-6">
              {t('footer.contact')}
            </h2>
            
            <div className="space-y-4">
              {/* Teléfono */}
              <a 
                href={`tel:${contact.phone.mainClean}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Teléfono</p>
                  <p className="text-text-primary">{contact.phone.main}</p>
                </div>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${contact.email.reservations}`}
                className="flex items-center gap-4 text-text-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Email</p>
                  <p className="text-text-primary">{contact.email.reservations}</p>
                </div>
              </a>

              {/* Dirección */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Dirección</p>
                  <p className="text-text-primary">{contact.address.full}</p>
                </div>
              </div>

              {/* Botón Google Maps */}
              <a 
                href="https://maps.app.goo.gl/wiXz2ZhcqUtB6Zdh7"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <MapPin className="w-5 h-5" />
                Abrir en Google Maps
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Location