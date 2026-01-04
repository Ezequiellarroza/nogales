# Nogales Apartamentos

> Sitio web de alquiler temporario en Mar del Plata, Argentina.
> Desarrollado por Trinity Web Development.

---

## 📋 Descripción

**Nogales Apartamentos** es un sitio web para alquiler temporario ubicado en Mar del Plata, a 3 cuadras de Playa Chica y Playa Varese. El proyecto es hermano de Araucarias Apartamentos, compartiendo estructura base pero con identidad visual propia.

### Datos del Cliente

| Campo | Valor |
|-------|-------|
| Nombre | Nogales Apartamentos |
| Desarrolladora | VIEW Desarrollos S.A. |
| Dirección | Bernardo de Irigoyen 2660, Mar del Plata |
| Teléfono | +54 11 2674-5084 |
| Email | nogales@viewdesarrollos.com.ar |
| Slogan | "Atrévete a soñar con nosotros" |
| Pilares | Sol, Playa, Comfort |

---

## 🛠️ Stack Técnico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| Vite | 5.x | Build tool |
| React | 18.3.x | Framework UI |
| React Router DOM | 6.28.x | Enrutamiento |
| Tailwind CSS | 3.x | Estilos (**NO actualizar a v4**) |
| Lucide React | 0.460.x | Iconografía |
| i18next | 23.x | Internacionalización |
| react-i18next | 15.x | Bindings React |

---

## 🎨 Design System

### Paleta de Colores

#### Light Mode
```css
--color-base: #EAE6E1;
--color-surface: #F5F2EE;
--color-sunken: #DDD9D4;
--color-text-primary: #1A1715;
--color-text-secondary: #524D47;
--color-accent: #5BA3C0;
--color-accent-hover: #4A8FA8;
--color-accent-light: #BDD9E7;
```

#### Dark Mode
```css
--color-base: #1A1918;
--color-surface: #242221;
--color-sunken: #141312;
--color-text-primary: #F5F2EE;
--color-text-secondary: #A39E98;
--color-accent: #7FBDD6;
--color-accent-hover: #8FC9E0;
--color-accent-light: #BDD9E7;
```

### Tipografía

| Uso | Fuente | Peso |
|-----|--------|------|
| Títulos | Roboto | 300-500 |
| Cuerpo | Roboto | 400-500 |

---

## 📁 Estructura del Proyecto
```
nogales/
├── public/
│   └── images/
│       ├── architecture/
│       ├── brand/
│       │   ├── logo-nogales-black.png
│       │   └── logo-nogales-white.png
│       ├── hero/
│       │   ├── slide-1-desktop.webp
│       │   ├── slide-1-mobile.webp
│       │   ├── slide-2-desktop.webp
│       │   ├── slide-2-mobile.webp
│       │   ├── slide-3-desktop.webp
│       │   └── slide-3-mobile.webp
│       ├── intro/
│       ├── location/
│       │   └── drone-exterior.webp
│       └── units/
│           ├── superior-1.webp ... superior-5.webp
│           └── executive-1.webp ... executive-5.webp
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── WhatsAppButton.jsx
│   │   ├── sections/
│   │   │   ├── Architecture.jsx
│   │   │   ├── FeaturesPreview.jsx
│   │   │   ├── FinalCTA.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── HomeSuites.jsx
│   │   │   ├── Intro.jsx
│   │   │   └── Values.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       ├── Container.jsx
│   │       ├── Input.jsx
│   │       └── LanguageSelector.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── data/
│   │   ├── amenities.js
│   │   ├── contact.js
│   │   ├── gallery.js
│   │   ├── services.js
│   │   ├── suites.js
│   │   └── units.js
│   ├── hooks/
│   │   ├── useInView.js
│   │   └── useTheme.js
│   ├── i18n/
│   │   ├── en.json
│   │   ├── es.json
│   │   └── index.js
│   ├── pages/
│   │   ├── Gallery.jsx
│   │   ├── Home.jsx
│   │   ├── Location.jsx
│   │   ├── Reservations.jsx
│   │   ├── RoomDetail.jsx
│   │   ├── Rooms.jsx
│   │   └── Services.jsx
│   ├── utils/
│   │   └── assets.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

---

## 🛤️ Rutas

| Ruta | Página | Estado |
|------|--------|--------|
| `/` | Home | ✅ Completo |
| `/habitaciones` | Rooms | ✅ Completo |
| `/habitaciones/:slug` | RoomDetail | ⏳ Pendiente |
| `/servicios` | Services | ⏳ Revisar |
| `/galeria` | Gallery | ⏳ Revisar |
| `/ubicacion` | Location | ✅ Completo |
| `/contacto` | Reservations | ⏳ Revisar |

---

## 🏨 Habitaciones

### Categorías

| Categoría | Huéspedes | Dormitorios | Baños | Vista |
|-----------|-----------|-------------|-------|-------|
| Superior | 4 | 1 | 1 | Piscina |
| Executive Suite | 6 | 2 | 1 | Mar |

### Configuración de Camas

- **Superior:** 1 cama doble + sofá cama
- **Executive Suite:** 1 cama doble + 2 camas individuales + sofá cama

### Amenities

Cocina equipada, WiFi, Aire acondicionado, Smart TV, Ropa de cama, Placard, Patio/Balcón, Living, Vista al mar/piscina.

---

## 🏢 Amenities del Edificio

- Piscina exterior
- Cochera cubierta
- Parrilleros
- Concierge
- Laundry
- Bauleras
- Seguridad 24hs

---

## 📸 Imágenes

### Medidas Recomendadas

| Ubicación | Medidas | Formato |
|-----------|---------|---------|
| Hero slides | 1920 x 1080 px | WebP |
| Habitaciones | 1200 x 675 px (16:9) | WebP |
| Location | 800 x 1200 px | WebP |
| Gallery | 1200 x 800 px | WebP |

---

## 🚀 Instalación
```bash
# Clonar repositorio
git clone https://github.com/Ezequiellarroza/nogales.git

# Entrar al proyecto
cd nogales

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build para producción
npm run build
```

---

## 📝 Notas Importantes

1. **Tailwind v3** — NO actualizar a v4
2. **Color accent:** `#5BA3C0` (celeste)
3. **Tipografía:** Roboto
4. **Concepto:** Alquiler temporario, NO desarrollo inmobiliario
5. **Terminología:** "Habitaciones" (nav usa claves `units` por compatibilidad)
6. **Dark mode:** Usa variables CSS en `index.css`
7. **Header:** Transparente solo en Home, sólido en otras páginas
8. **Conflicto `text-base`:** Usar `lg:text-[1rem]` en lugar de `lg:text-base`

---

## 🔗 Recursos

- **Google Maps:** https://maps.app.goo.gl/wiXz2ZhcqUtB6Zdh7
- **Proyecto hermano:** [Araucarias Apartamentos](https://github.com/Ezequiellarroza/araucarias)

---

## 👨‍💻 Desarrollo

**Trinity Web Development**
- Desarrollador: Eze
- Asistente: Claude

---

*Última actualización: Diciembre 2024*