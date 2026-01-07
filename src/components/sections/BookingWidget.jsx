import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Widget de reservas WuBook - Embebido en la sección
 */

const WUBOOK_WIDGET_ID = 'f2882160-cbe6-4b91-90cb-e207e26b8d95'

function BookingWidget() {
  const { t } = useTranslation()
  const containerRef = useRef(null)
  const originalParentRef = useRef(null)

  useEffect(() => {
    let attempts = 0
    const maxAttempts = 50
    let intervalId = null

    const embedWidget = () => {
      attempts++
      
      const widget = document.getElementById(`js_kw_gform_root${WUBOOK_WIDGET_ID}`)
      
      if (widget && containerRef.current) {
        // Guardar referencia al padre original
        if (!originalParentRef.current) {
          originalParentRef.current = widget.parentElement
        }
        
        // Mover al contenedor
        containerRef.current.appendChild(widget)
        
        // Forzar estilos para embeber (no flotante)
        widget.style.cssText = 'display: block !important; position: relative !important; width: 100% !important;'
        
        // Forzar estilos en elementos internos
        const holder = widget.querySelector('.kw_panel__holder')
        if (holder) {
          holder.style.cssText = 'position: relative !important; width: 100% !important; height: auto !important; bottom: auto !important; left: auto !important; right: auto !important; transform: none !important;'
        }
        
        const frame = widget.querySelector('.kw_panel__frame')
        if (frame) {
          frame.style.cssText = 'position: relative !important; width: 100% !important;'
        }
        
        if (intervalId) clearInterval(intervalId)
        return true
      }
      
      if (attempts >= maxAttempts) {
        if (intervalId) clearInterval(intervalId)
        return true
      }
      
      return false
    }

    intervalId = setInterval(() => {
      if (embedWidget()) clearInterval(intervalId)
    }, 100)

    embedWidget()

    // Cleanup: ocultar y devolver al body
    return () => {
      if (intervalId) clearInterval(intervalId)
      
      const widget = document.getElementById(`js_kw_gform_root${WUBOOK_WIDGET_ID}`)
      if (widget) {
        // Ocultar el widget
        widget.style.display = 'none'
        // Devolverlo al body para que no se pierda
        document.body.appendChild(widget)
      }
    }
  }, [])

  return (
    <section className="py-12 lg:py-16 bg-white dark:bg-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="font-heading font-light text-2xl lg:text-3xl text-text-primary dark:text-white mb-3">
            {t('booking.title')}
          </h2>
          <div className="w-12 h-px bg-accent mx-auto" />
        </div>
        
        {/* Contenedor donde se embebe el widget */}
        <div ref={containerRef} className="max-w-4xl mx-auto" />
      </div>
    </section>
  )
}

export default BookingWidget