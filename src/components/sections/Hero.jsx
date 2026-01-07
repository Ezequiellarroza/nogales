import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import { ChevronDown } from 'lucide-react'
import { asset } from '../../utils/assets'

// Configuración de slides (imágenes)
const slideImages = [
  {
    id: 1,
    desktop: 'images/hero/slide-1-desktop.webp',
    mobile: 'images/hero/slide-1-mobile.webp',
    alt: 'Vista exterior Nogales Apartamentos'
  },
  {
    id: 2,
    desktop: 'images/hero/slide-2-desktop.webp',
    mobile: 'images/hero/slide-2-mobile.webp',
    alt: 'Interior departamento Nogales'
  },
  {
    id: 3,
    desktop: 'images/hero/slide-3-desktop.webp',
    mobile: 'images/hero/slide-3-mobile.webp',
    alt: 'Amenities y piscina Nogales'
  }
]

const SLIDE_DURATION = 5000
const TRANSITION_DURATION = 1000

function Hero() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  
  const [showTitle, setShowTitle] = useState(true)
  const [showLine, setShowLine] = useState(true)
  const [showSubtitle, setShowSubtitle] = useState(true)
  const [showCtas, setShowCtas] = useState(true)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setShowCtas(false)
      setTimeout(() => setShowSubtitle(false), 50)
      setTimeout(() => setShowLine(false), 100)
      setTimeout(() => setShowTitle(false), 150)
      
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slideImages.length)
        setShowTitle(true)
        setTimeout(() => setShowLine(true), 100)
        setTimeout(() => setShowSubtitle(true), 200)
        setTimeout(() => setShowCtas(true), 300)
      }, 400)
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [isPaused])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollHint(false)
      } else {
        setShowScrollHint(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScrollDown = useCallback(() => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    })
  }, [])

  const slideContent = t('home.hero.slides', { returnObjects: true })[currentSlide]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides de fondo */}
      {slideImages.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDuration: `${TRANSITION_DURATION}ms` }}
        >
          <img
            src={asset(slide.desktop)}
            alt={slide.alt}
            className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          />
          <img
            src={asset(slide.mobile)}
            alt={slide.alt}
            className="block lg:hidden absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Contenido */}
      <div className="relative h-full flex items-end lg:items-end justify-center lg:justify-start">
        <div className="container mx-auto px-6 pb-24 lg:pb-20">
          <div className="text-center lg:text-left max-w-xl lg:max-w-2xl mx-auto lg:mx-0">
            
            <h1
              className={`font-heading font-light text-4xl md:text-5xl lg:text-6xl text-white mb-4 transition-all duration-700 ease-out ${
                showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}
              dangerouslySetInnerHTML={{ __html: slideContent?.title }}
            />

            <div
              className={`w-16 h-px bg-accent mx-auto lg:mx-0 mb-4 transition-all duration-700 ease-out ${
                showLine ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}
            />

            <p
              className={`font-body text-lg md:text-xl text-white/90 mb-8 transition-all duration-700 ease-out ${
                showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}
            >
              {slideContent?.subtitle}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 ease-out ${
                showCtas ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'
              }`}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <Button to="/reservas" variant="primary">
                {t('home.hero.cta')}
              </Button>
              <Button to="/habitaciones" variant="secondary">
                {t('nav.units')}
              </Button>
              <Button to="/ubicacion" variant="ghost" className="text-white hover:text-text-primary">
                {t('nav.location')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <button
        onClick={handleScrollDown}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/60 transition-all duration-500 ${
          showScrollHint ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-label={t('accessibility.scrollToTop')}
      >
        <ChevronDown className="w-6 h-6 animate-bounce" style={{ animationDuration: '2s' }} />
      </button>
    </section>
  )
}

export default Hero