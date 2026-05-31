# 🚀 Guía de Despliegue - Club Finanzas Extremadura

## Opciones de Despliegue

### 1️⃣ GitHub Pages (RECOMENDADO - Gratuito)

#### Pasos:
1. Crea un repositorio en GitHub llamado `clubfinanzas` (o tu nombre preferido)
2. Sube todos los archivos del proyecto
3. Ve a `Settings > Pages`
4. En "Source", selecciona `main` branch
5. La página estará disponible en: `https://tuusuario.github.io/clubfinanzas`

#### Ventajas:
- ✅ Completamente gratis
- ✅ SSL/HTTPS automático
- ✅ Fácil de actualizar
- ✅ Excelente para sitios estáticos

---

### 2️⃣ Netlify (EXCELENTE - Gratuito)

#### Pasos:
1. Ve a [netlify.com](https://netlify.com)
2. Haz clic en "New site from Git"
3. Conecta tu repositorio de GitHub
4. Configura:
   - **Build command**: Dejar vacío (es contenido estático)
   - **Publish directory**: `/` (raíz del proyecto)
5. ¡Hecho! Tu sitio se desplegará automáticamente

#### Ventajas:
- ✅ Dominio personalizado gratis
- ✅ Reenvíos automáticos en cada commit
- ✅ Estadísticas de rendimiento
- ✅ Certificado SSL automático

**URL típica**: `https://clubfinanzasextremadura.netlify.app`

---

### 3️⃣ Vercel (MODERNA - Gratuito)

#### Pasos:
1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio
5. Configura:
   - **Framework Preset**: Other (o Static Site)
   - **Root Directory**: `.`
6. Despliega

#### Ventajas:
- ✅ Performance extremo
- ✅ CDN global
- ✅ Despliegues automáticos
- ✅ Analytics incluido

**URL típica**: `https://clubfinanzasextremadura.vercel.app`

---

### 4️⃣ Hosting Compartido (Bluehost, SiteGround, etc.)

#### Pasos:
1. Contrata un hosting web
2. Accede al cPanel
3. Crea una carpeta `public_html` para el proyecto
4. Sube todos los archivos vía FTP/SFTP
5. Configura el dominio

#### Requisitos:
- Dominio propio
- FTP/SFTP
- Conocimientos básicos de servidores

**Costo**: Típicamente $3-15/mes

---

### 5️⃣ AWS/Azure/Google Cloud (Escable)

Para despliegues empresariales:
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Blob Storage

---

## 🌐 Configurar Dominio Personalizado

### Con GitHub Pages:
1. Crea archivo `CNAME` en la raíz:
   ```
   clubfinanzasextremadura.es
   ```
2. En tu registrador de dominios, configura:
   ```
   CNAME: username.github.io
   ```

### Con Netlify/Vercel:
1. En los settings, ve a "Domain settings"
2. Añade tu dominio personalizado
3. Copia los registros DNS proporcionados
4. Configura en tu registrador de dominios

**Registradores recomendados**: GoDaddy, Namecheap, Google Domains

---

## 📋 Pre-despliegue Checklist

- [ ] Todos los links funcionan correctamente
- [ ] Formularios tienen validación
- [ ] Imágenes están optimizadas
- [ ] CSS y JS están minimizados (opcional)
- [ ] Meta tags están correctos
- [ ] Title y descripción en todas las páginas
- [ ] Testeado en móvil y desktop
- [ ] Velocidad de carga aceptable (< 3s)
- [ ] No hay errores en console
- [ ] Links externos abren en nueva pestaña

---

## 🔍 SEO Recomendaciones

### 1. Meta Tags Esenciales
```html
<meta name="description" content="Club de Finanzas Estudiantes de Extremadura">
<meta name="keywords" content="finanzas, educación, inversión, extremadura">
<meta name="author" content="Club Finanzas Extremadura">
```

### 2. Open Graph (Redes Sociales)
```html
<meta property="og:title" content="Club Finanzas Extremadura">
<meta property="og:description" content="Educación financiera para estudiantes">
<meta property="og:image" content="https://tudominio.es/og-image.png">
<meta property="og:url" content="https://tudominio.es">
```

### 3. Sitemap
Crear `sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://clubfinanzasextremadura.es/</loc>
    <lastmod>2026-05-31</lastmod>
  </url>
  <url>
    <loc>https://clubfinanzasextremadura.es/pages/about.html</loc>
  </url>
  <url>
    <loc>https://clubfinanzasextremadura.es/pages/activities.html</loc>
  </url>
</urlset>
```

### 4. Robots.txt
```
User-agent: *
Allow: /
Sitemap: https://clubfinanzasextremadura.es/sitemap.xml
```

---

## 📊 Analytics

### Google Analytics 4
```html
<!-- Añade antes de </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 🔐 Seguridad en Producción

1. **HTTPS obligatorio**: Asegúrate de tener certificado SSL
2. **Headers de seguridad**: Ya incluidos en `.htaccess`
3. **Validación de formularios**: Implementada en JavaScript
4. **CORS**: Configurar si necesitas APIs externas
5. **Rate limiting**: En backend si lo añades

---

## 📈 Optimización de Performance

### Comprimir imágenes:
```bash
# Instalar ImageMagick y ejecutar:
convert original.jpg -quality 80 optimized.jpg
```

### Minimizar CSS/JS (opcional):
Usar online: [minifier.org](https://minifier.org)

### Lazy loading para imágenes:
```html
<img src="image.jpg" loading="lazy" alt="descripción">
```

---

## 🐛 Monitoreo Post-despliegue

1. **Prueba de carga**: [loadimpact.com](https://loadimpact.com)
2. **SEO Check**: [seobility.net](https://seobility.net)
3. **Velocidad**: [pagespeedinsights.google.com](https://pagespeedinsights.google.com)
4. **Accesibilidad**: [wave.webaim.org](https://wave.webaim.org)

---

## 📞 Soporte Post-despliegue

- Mantén backups regulares
- Actualiza contenido periódicamente
- Monitorea los formularios
- Responde mensajes de contacto

---

**¡Tu sitio está listo para desplegarse!** 🚀

Para dudas: `clubfinanzasext@cfeexes.com`
