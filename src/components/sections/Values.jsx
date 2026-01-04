import { useTranslation } from 'react-i18next'
import { MapPin, Sofa, Waves } from 'lucide-react'
import useInView from '../../hooks/useInView'

const values = [
  {
    key: 'location',
    icon: MapPin
  },
  {
    key: 'comfort',
    icon: Sofa
  },
  {
    key: 'amenities',
    icon: Waves
  }
]

function ValueCard({ value, index }) {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.2 })

  return (
    <div
      ref={ref}
      className={`group relative bg-white dark:bg-surface rounded-lg shadow-sm overflow-hidden transition-all duration-700 ease-out hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-1 ${
        isInView
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Fondo que se expande en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent/90 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
      
      {/* Efecto shine/brillo que cruza */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      </div>
      
      {/* Borde lateral accent (visible solo sin hover) */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent transition-all duration-300 group-hover:opacity-0" />
      
      {/* Contenido */}
      <div className="relative flex items-start gap-5 p-6 lg:p-8 pl-7 lg:pl-10">
        {/* Icono */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 group-hover:bg-white/20 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
          <value.icon className="w-6 h-6 text-accent group-hover:text-white transition-colors duration-500" strokeWidth={1.5} />
        </div>
        
        {/* Texto */}
        <div className="flex-1">
          {/* Título */}
          <h3 className="font-heading font-medium text-lg lg:text-xl text-text-primary dark:text-white mb-2 transition-colors duration-500 group-hover:text-white">
            {t(`home.values.${value.key}`)}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 dark:text-gray-300 text-sm lg:text-base leading-relaxed transition-colors duration-500 group-hover:text-white/90">
            {t(`home.values.${value.key}Desc`)}
          </p>
        </div>
      </div>
    </div>
  )
}

function Values() {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <section className="py-20 lg:py-28 bg-base dark:bg-bg-primary-dark">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          ref={ref}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            isInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading font-light text-3xl lg:text-4xl text-text-primary dark:text-white mb-4">
            {t('home.values.title', '¿Por qué Nogales?')}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto" />
        </div>

        {/* Grid de cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((value, index) => (
            <ValueCard key={value.key} value={value} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Values