import { useTranslation } from 'react-i18next'
import { Waves, Car, Flame, Shield, Sun, Trees } from 'lucide-react'
import useInView from '../../hooks/useInView'
import Button from '../ui/Button'

const features = [
  { key: 'pool', icon: Waves },
  { key: 'parking', icon: Car },
  { key: 'grill', icon: Flame },
  { key: 'security', icon: Shield },
  { key: 'luminosity', icon: Sun },
  { key: 'balcony', icon: Trees },
]

function FeatureItem({ feature, index }) {
  const { t } = useTranslation()
  const [ref, isInView] = useInView({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={`group text-center transition-all duration-700 ease-out ${
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Contenedor del icono con efectos */}
      <div className="relative inline-flex items-center justify-center mb-4">
        {/* Círculo de fondo con gradiente animado */}
        <div 
          className={`absolute inset-0 rounded-full bg-gradient-to-br from-accent/20 via-accent/10 to-transparent transition-all duration-500 group-hover:scale-125 group-hover:opacity-0 ${
            isInView ? 'animate-pulse-slow' : ''
          }`}
          style={{ 
            width: '4rem', 
            height: '4rem',
            animationDelay: `${index * 150}ms`
          }}
        />
        
        {/* Círculo principal */}
        <div className="relative w-16 h-16 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-accent group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-accent/30">
          {/* Icono */}
          <feature.icon 
            className="w-7 h-7 text-accent transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:animate-bounce-subtle" 
            strokeWidth={1.5} 
          />
        </div>

        {/* Ring de hover */}
        <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-accent/0 transition-all duration-500 group-hover:border-accent/30 group-hover:scale-150 group-hover:opacity-0" />
      </div>

      {/* Nombre */}
      <h3 className="font-medium text-sm text-text-primary dark:text-white whitespace-nowrap transition-colors duration-300 group-hover:text-accent">
        {t(`amenities.list.${feature.key}.name`)}
      </h3>
    </div>
  )
}

function FeaturesPreview() {
  const { t } = useTranslation()
  const [headerRef, headerInView] = useInView({ threshold: 0.2 })

  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-surface overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ease-out ${
            headerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-heading font-light text-3xl lg:text-4xl text-text-primary dark:text-white mb-4">
            {t('home.features.title')}
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mb-4" />
          <p className="text-text-secondary max-w-xl mx-auto">
            {t('home.features.subtitle')}
          </p>
        </div>

        {/* Grid de features */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {features.map((feature, index) => (
            <FeatureItem key={feature.key} feature={feature} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button to="/amenities" variant="primary">
            {t('home.features.cta')}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturesPreview