# 📊 Club de Finanzas Estudiantes de Extremadura (CFEEX)

Página web profesional y moderna para el Club de Finanzas Estudiantes de Extremadura.

## 📁 Estructura del Proyecto

```
CFEEXPW/
├── index.html                 # Página principal
├── css/
│   ├── styles.css            # Estilos generales
│   └── responsive.css        # Diseño responsivo
├── js/
│   └── main.js              # JavaScript principal
├── pages/
│   ├── about.html           # Página de Nosotros
│   ├── activities.html      # Actividades y Eventos
│   ├── resources.html       # Recursos y Boletín
│   └── contact.html         # Contacto y Preguntas
└── assets/                  # Carpeta para imágenes y recursos
```

## 🎨 Características

### Diseño y Estilo
- **Colores**: Verde vibrante (#1abc9c) y blanco elegante
- **Responsive**: Totalmente adaptable a móviles, tablets y desktop
- **Moderno**: Diseño limpio y profesional

### Secciones Principales

1. **Inicio (Index)**
   - Hero section con call-to-action
   - Market Overview en tiempo real
   - Pilares del club (Misión, Networking, Formación, Debates)
   - Estadísticas (95% satisfacción, 250+ contactos)
   - Próximos eventos
   - Formulario de admisión
   - Recursos destacados

2. **Sobre Nosotros**
   - Misión, Visión y Valores
   - Equipo directivo
   - Timeline de la historia del club

3. **Actividades**
   - Tipos de actividades
   - Calendario de eventos 2026
   - Eventos pasados con valoraciones
   - Opciones para registrarse

4. **Recursos**
   - Boletín del miembro con artículos
   - Filtros por categoría
   - Herramientas exclusivas para miembros
   - Acceso a Dashboard, Biblioteca, Videoteca, etc.

5. **Contacto**
   - Información de contacto
   - Formulario de contacto
   - Preguntas frecuentes (FAQ)
   - Enlaces a redes sociales

## 🚀 Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados, Flexbox, Grid
- **JavaScript**: Interactividad y dinamismo
- **Responsive Design**: Mobile-first approach

## 💻 Características JavaScript

- Navegación suave (smooth scroll)
- Validación de formularios
- Sistema de notificaciones
- Efecto fade-in con Intersection Observer
- Menú móvil (hamburger)
- Actualización dinámica de datos

## 📱 Breakpoints Responsive

- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: 600px - 767px
- **Small Mobile**: < 600px

## 🎯 Formularios Incluidos

1. **Formulario de Admisión** (index.html)
   - Nombre Completo
   - Correo Universitario
   - Grado/Situación Académica
   - Intereses y Motivación

2. **Formulario de Contacto** (contact.html)
   - Nombre
   - Email
   - Asunto
   - Mensaje
   - Opción de suscripción

## 🔧 Instalación y Uso

### Opción 1: Ejecutar localmente
1. Clona o descarga el repositorio
2. Abre `index.html` en tu navegador
3. ¡Listo!

### Opción 2: Servidor local (recomendado)
```bash
# Con Python 3
python -m http.server 8000

# Con Python 2
python -m SimpleHTTPServer 8000

# Con Node.js (si tienes http-server instalado)
http-server
```

Luego accede a `http://localhost:8000`

## 📝 Customización

### Cambiar Colores
Edita las variables CSS en `css/styles.css`:
```css
:root {
    --primary-color: #1abc9c;
    --secondary-color: #16a085;
    /* ... */
}
```

### Añadir Nuevas Páginas
1. Crea un nuevo archivo HTML en la carpeta `pages/`
2. Copia la estructura navbar y footer de una página existente
3. Actualiza los links de navegación

### Agregar Eventos
En `pages/activities.html`, duplica el div `.event-card` y actualiza la información.

## 📧 Integración con Backend (Próximo paso)

Actualmente, los formularios se procesan con JavaScript puro. Para funcionalidad completa:

1. **Backend**: Crea un endpoint para recibir datos
2. **Método POST**: Actualiza los formularios para enviar a tu servidor
3. **Base de datos**: Almacena inscripciones y mensajes

Ejemplo con fetch:
```javascript
const form = document.getElementById('admissionForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const response = await fetch('/api/admission', {
        method: 'POST',
        body: new FormData(form)
    });
    // Maneja la respuesta
});
```

## 🎓 Contenido Educativo

### Artículos de Recursos
- Tecnología y IA en Finanzas
- Macroeconomía y BCE
- Criptoactivos
- Finanzas Personales
- Fintech Ibérica
- Transición Energética

### Categorías de Eventos
- Talleres y Formación
- Debates y Mesas Redondas
- Networking
- Grupos de Estudio

## 📊 Datos de Mercado

Incluye ejemplos de:
- IBEX 35: 18,436.70 (+0.80%)
- S&P 500: 7519.21 (+0.61%)
- EUR/USD: 1.1628 (-0.13%)

*Nota: Estos datos son de demostración. Para datos en vivo, integra APIs reales.*

## 🔒 Seguridad

- Validación de emails en el cliente
- Sanitización básica de formularios
- HTTPS recomendado en producción

## 📄 Licencia

Este proyecto está disponible para uso educativo y del Club de Finanzas Extremadura.

## 👥 Contacto

**Email**: clubfinanzasext@cfeexes.com  
**Teléfono**: +34 612 345 678  
**Ubicación**: Universidad de Extremadura, Campus de Badajoz

---

**Hecho con ❤️ para los futuros financieros de Extremadura**
