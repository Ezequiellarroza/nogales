import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import useInView from '../hooks/useInView'
import { asset } from '../utils/assets'
import contact from '../data/contact'

function Location() {
  const { t } = useTranslation()
  const [imageRef, imageInView] = useInView({ threshold: 0.2 })
  const [contentRef, contentInView] = useInView({ threshold: 0.2 })
  
  // Estado del formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    source: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, success, error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setFormStatus('success')
        setFormData({ name: '', email: '', phone: '', source: '', message: '' })
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      console.error('Error:', error)
      setFormStatus('error')
    }
  }

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
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Nogales Apartamentos"
            />
          </div>

          {/* Información de contacto */}
          <div className="bg-white dark:bg-surface rounded-xl shadow-sm p-6 mb-8">
            <h2 className="font-heading font-medium text-lg text-text-primary mb-4">
              {t('location.contactInfo')}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Teléfono */}
              <a 
                href={`tel:${contact.phone.mainClean}`}
                className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">Teléfono</p>
                  <p className="text-sm text-text-primary truncate">{contact.phone.main}</p>
                </div>
              </a>

              {/* Email */}
              <a 
                href={`mailto:${contact.email.reservations}`}
                className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">Email</p>
                  <p className="text-sm text-text-primary truncate">{contact.email.reservations}</p>
                </div>
              </a>

              {/* Dirección */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-text-secondary">Dirección</p>
                  <p className="text-sm text-text-primary truncate">{contact.address.short || contact.address.full}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="bg-white dark:bg-surface rounded-xl shadow-sm p-6 lg:p-8">
            <h2 className="font-heading font-medium text-xl text-text-primary mb-6">
              {t('location.form.title')}
            </h2>

            {formStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="font-heading text-xl text-text-primary mb-2">
                  {t('location.form.successTitle')}
                </h3>
                <p className="text-text-secondary">
                  {t('location.form.successMessage')}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nombre */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1">
                    {t('location.form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                  />
                </div>

                {/* Email y Teléfono en fila */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1">
                      {t('location.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary mb-1">
                      {t('location.form.phone')} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                {/* ¿Cómo nos conociste? */}
                <div>
                  <label htmlFor="source" className="block text-sm font-medium text-text-primary mb-1">
                    {t('location.form.source')}
                  </label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
                  >
                    <option value="">Seleccionar...</option>
                    <option value="instagram">{t('location.form.sources.instagram')}</option>
                    <option value="recommendation">{t('location.form.sources.recommendation')}</option>
                    <option value="google">{t('location.form.sources.google')}</option>
                    <option value="portal">{t('location.form.sources.portal')}</option>
                    <option value="other">{t('location.form.sources.other')}</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1">
                    {t('location.form.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors resize-none"
                  />
                </div>

                {/* Error message */}
                {formStatus === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{t('location.form.error')}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:bg-accent/50 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t('location.form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('location.form.submit')}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Botón Google Maps */}
          <a 
            href="https://maps.app.goo.gl/wiXz2ZhcqUtB6Zdh7"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 w-full bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-text-primary font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Abrir en Google Maps
          </a>

        </div>
      </div>
    </section>
  )
}

export default Location