# ⚡ Inicio Rápido - Club Finanzas Extremadura

## 🚀 Primeros Pasos

### 1️⃣ Ver la página web localmente

#### Opción A: Abrir directamente (Simple)
```
1. Navega a la carpeta del proyecto
2. Haz doble clic en index.html
3. ¡Abierto en tu navegador!
```

#### Opción B: Servidor local (Recomendado)

**Windows:**
```powershell
# Con Python 3
python -m http.server 8000

# O con Python 2
python -m SimpleHTTPServer 8000

# Luego abre: http://localhost:8000
```

**Mac/Linux:**
```bash
# Con Python
python3 -m http.server 8000

# Con Node.js (si tienes instalado)
npx http-server

# Con el backend de usuarios y automatizaciones
npm install
npm start
```

---

## 📁 Estructura del Proyecto Explicada

```
CFEEXPW/
├── index.html                 # 🏠 Página principal
│
├── pages/                     # 📄 Otras páginas
│   ├── about.html            # Sobre nosotros
│   ├── activities.html       # Eventos y actividades
│   ├── resources.html        # Boletín y artículos
│   └── contact.html          # Contacto y FAQ
│
├── css/                       # 🎨 Estilos
│   ├── styles.css            # Estilos principales
│   └── responsive.css        # Diseño adaptable
│
├── js/                        # 💻 JavaScript
│   ├── main.js               # Funciones principales
│   ├── utilities.js          # Funciones auxiliares
│   └── mockData.js           # Datos de ejemplo
│
├── assets/                    # 📦 Recursos (vacío, listo para imágenes)
│
├── README.md                  # 📖 Documentación completa
├── API_DOCUMENTATION.md       # 🔌 Especificaciones de API
├── DEPLOYMENT.md             # 🚀 Guía de despliegue
├── package.json              # 📋 Metadatos del proyecto
└── .gitignore               # 🔐 Archivos a ignorar en Git
```

---

## 🎨 Personalizar el Sitio

### 1. Cambiar Colores
**Archivo**: `css/styles.css`

Busca `:root` y modifica:
```css
:root {
    --primary-color: #1abc9c;      /* Verde actual */
    --secondary-color: #16a085;    /* Verde oscuro actual */
    /* Cambia a tus colores preferidos */
}
```

### 2. Cambiar Texto y Contenido
Edita directamente en los archivos HTML:
- Títulos en `<h1>`, `<h2>`, etc.
- Párrafos en `<p>`
- Contenido en las secciones

**Ejemplo**:
```html
<h1>Tu nuevo título aquí</h1>
```

### 3. Agregar tu Logo
Reemplaza el emoji 📊 por tu imagen:
```html
<!-- Antes -->
<span class="logo-icon">📊</span>

<!-- Después -->
<img src="assets/logo.png" alt="Logo" class="logo-icon">
```

### 4. Agregar Nuevo Evento
En `pages/activities.html`, copia este código:
```html
<div class="event-card">
    <div class="event-type">TIPO (DEBATE/TALLER/etc)</div>
    <h4>Nombre del Evento</h4>
    <p style="color: var(--text-light); margin: 10px 0;">Descripción breve...</p>
    <div class="event-date">📅 DD Mes, 2026 | 📍 Ubicación</div>
    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;">Registrarse</button>
</div>
```

### 5. Agregar Nuevo Artículo
En `pages/resources.html`, añade:
```html
<article class="resource-card">
    <span class="resource-category">CATEGORÍA</span>
    <div class="resource-date">DD Mes, 2026</div>
    <h4>Título del Artículo</h4>
    <p>Texto descriptivo del contenido...</p>
    <a href="#" class="read-more">Leer Artículo →</a>
</article>
```

---

## 🔧 Editar Información de Contacto

**Archivo**: Se menciona en múltiples lugares:

1. **Footer** (todas las páginas):
   ```html
   <a href="mailto:clubfinanzasext@cfeexes.com">
       clubfinanzasext@cfeexes.com
   </a>
   ```

2. **Página de Contacto** (`pages/contact.html`):
   ```html
   <a href="tel:+34612345678">+34 612 345 678</a>
   ```

3. **JavaScript** (`js/main.js`):
   Busca `Config` y actualiza los datos.

---

## 💡 Consejos de Edición

### Usar un Editor de Código
Recomendamos:
- **VS Code** (Gratis, poderoso) ⭐
- **Sublime Text** (Rápido y elegante)
- **Atom** (Modular)
- **Notepad++** (Ligero, Windows)

### Validar HTML/CSS
- Usa el navegador (F12) para ver errores
- [validator.w3.org](https://validator.w3.org) para validar HTML

### Probar en Móvil
1. Abre la página en tu servidor local
2. En otra máquina/móvil, accede: `http://tu-ip:8000`

---

## 🔄 Mantener Actualizado

### Agregar nuevos miembros
En `pages/about.html`, sección "EQUIPO DIRECTIVO":
```html
<div style="background: white; padding: 30px; border-radius: 10px; text-align: center; box-shadow: var(--shadow);">
    <div style="width: 100px; height: 100px; margin: 0 auto 20px; background: linear-gradient(...); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 40px;">👤</div>
    <h4 style="margin-bottom: 5px;">Nombre del Rol</h4>
    <p style="color: var(--text-light); margin-bottom: 10px;">Área de responsabilidad</p>
</div>
```

### Actualizar estadísticas
En `index.html`, busca la sección `.stats` y actualiza los números.

---

## 📊 Integración con Backend (Próximo Paso)

Cuando estés listo para conectar con un servidor:

### 1. Descomentar URLs de API
En `js/main.js`, reemplaza:
```javascript
// De esto:
console.log('Form submitted:', formData);

// A esto:
const api = new APIHelper('https://tu-api.com');
api.submitAdmission(formData);
```

### 2. Usar Utilities.js
```javascript
// Validar email
FormValidator.validateEmail(email);

// Guardar en localStorage
StorageManager.setItem('userData', data);

// Registrar evento
Analytics.trackEvent('form_submitted');
```

---

## 🐛 Solucionar Problemas

### Problema: La página no se ve
**Solución**: Abre la consola (F12) y busca errores de archivo

### Problema: Estilos se ven extraños
**Solución**: Limpia caché del navegador (Ctrl+Shift+Delete)

### Problema: Formularios no funcionan
**Solución**: Abre la consola y verifica los mensajes de error

### Problema: Links rotos
**Solución**: Verifica que las rutas sean relativas correctas

---

## 📱 Testing

### Desktop
- ✅ Prueba en Chrome, Firefox, Safari
- Ancho mínimo: 1200px

### Tablet
- ✅ Prueba en iPad (768px - 1024px)
- Usa developer tools (F12) → Toggle device toolbar

### Móvil
- ✅ Prueba en smartphones (< 600px)
- Usa dev tools con vista móvil

---

## 📈 Próximos Pasos Recomendados

1. **Añade imágenes**
   - Crea carpeta `assets/images`
   - Optimiza imágenes
   - Reemplaza emojis por imágenes

2. **Conecta con API real**
   - Desarrolla backend
   - Integra con base de datos
   - Usa `utilities.js` para llamadas

3. **Añade Google Analytics**
   ```html
   <!-- En <head> de index.html -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXX');
   </script>
   ```

4. **Configura formularios reales**
   - Usa Formspree.io o Netlify Forms
   - O conecta tu backend

5. **Despliega a producción**
   - Sigue guía en `DEPLOYMENT.md`
   - Compra dominio personalizado
   - Configura SSL/HTTPS

---

## 🎓 Recursos de Aprendizaje

### HTML/CSS/JavaScript
- [MDN Web Docs](https://developer.mozilla.org)
- [CSS Tricks](https://css-tricks.com)
- [JavaScript.info](https://javascript.info)

### Diseño
- [Figma](https://figma.com) - Diseño colaborativo
- [Unsplash](https://unsplash.com) - Imágenes gratis
- [Pexels](https://pexels.com) - Más imágenes

### Herramientas
- [VS Code](https://code.visualstudio.com)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Can I Use](https://caniuse.com) - Compatibilidad navegadores

---

## 👥 Soporte

- **Email**: clubfinanzasext@cfeexes.com
- **Teléfono**: +34 612 345 678
- **Ubicación**: Universidad de Extremadura, Badajoz

---

## ✅ Checklist de Publicación

Antes de publicar tu sitio:

- [ ] Todos los links funcionan
- [ ] Formularios se envían correctamente
- [ ] Probado en móvil y desktop
- [ ] Velocidad de carga < 3 segundos
- [ ] No hay errores en consola (F12)
- [ ] Meta tags agregados
- [ ] Imágenes optimizadas
- [ ] Dominio configurado
- [ ] SSL/HTTPS activo

---

**¡Tu sitio está listo para crecer!** 🌟

Próxima lectura: `DEPLOYMENT.md` para publicar en línea
