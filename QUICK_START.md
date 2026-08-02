# 🚀 GUÍA RÁPIDA DE INICIO

## Paso 1: Clonar el Repositorio
```bash
git clone https://github.com/drklion484-ai/index.html.git
cd index.html
```

## Paso 2: Iniciar Servidor Local

### Opción A: Python 3
```bash
python -m http.server 8000
```

### Opción B: Node.js
```bash
npx http-server
```

### Opción C: PHP
```bash
php -S localhost:8000
```

Luego abre: **http://localhost:8000**

## Paso 3: Personalización

### Cambiar Textos
Edita `index.html` y modifica:
- Títulos
- Mensajes
- Contenido de la carta de amor

### Cambiar Foto
Reemplaza `assets/foto.jpg` con tu imagen

### Cambiar Música
Reemplaza `assets/musica.mp3` con tu canción favorita

### Cambiar Colores
Edita las variables en `style.css`:
```css
:root {
  --pink: #ff4da6;
  --purple: #6d5dfc;
  --blue: #38bdf8;
  --gold: #ffd166;
}
```

## Paso 4: Desplegar Online

### GitHub Pages (Gratuito)
1. Sube todo a un repositorio en GitHub
2. Ve a Settings > Pages
3. Selecciona la rama 'main'
4. Tu sitio estará en: `https://tu-usuario.github.io/index.html`

### Vercel (Gratuito)
```bash
npm install -g vercel
vercel
```

### Netlify (Gratuito)
```bash
npm install -g netlify-cli
netlify deploy
```

## 🎮 Controles

- **Scroll o Flechas ↑↓**: Navegar entre secciones
- **Ratón**: La cámara sigue tu cursor
- **Botón 🔊**: Activar/desactivar música

## 📁 Estructura de Carpetas

```
index.html/
├── index.html          # Página principal
├── style.css           # Estilos principales
├── animations.css      # Animaciones
├── main.js             # Controlador principal
├── camera.js           # Sistema de cámara
├── particles.js        # Sistema de partículas
├── galaxy.js           # Galaxia 3D
├── fireworks.js        # Fuegos artificiales
├── music.js            # Control de música
├── loveLetter.js       # Interacciones especiales
├── README.md           # Documentación completa
├── QUICK_START.md      # Este archivo
├── package.json        # Configuración NPM
├── vercel.json         # Configuración Vercel
├── netlify.toml        # Configuración Netlify
├── sitemap.xml         # Mapa del sitio
├── robots.txt          # Robots config
└── assets/
    ├── foto.jpg        # Foto especial (CAMBIAR)
    └── musica.mp3      # Canción especial (CAMBIAR)
```

## ⚡ Requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- WebGL soportado
- Conexión a internet para CDN de Three.js

## 🎨 Secciones de la Experiencia

1. **🌌 Overlay Inicial** - Presentación épica
2. **💌 Mensaje Especial** - Primer mensaje romántico
3. **📸 Foto** - Tu foto especial flotante
4. **💕 Carta de Amor** - Mensaje manuscrito hermoso
5. **❤️ Declaración Final** - Mensaje épico con celebración

## 🎵 Recomendaciones de Música

Para mejor experiencia, usa canciones:
- Que tengan buenos ritmos
- Entre 3-5 minutos
- Formato MP3 comprimido (< 5MB)
- Románticas o significativas para ustedes

## 🐛 Solución de Problemas

### La música no suena
- Verifica que `assets/musica.mp3` existe
- Permite pop-ups y reproducción automática
- Prueba en otro navegador

### La foto no aparece
- Asegúrate de que `assets/foto.jpg` existe
- Verifica que sea un archivo JPG válido
- Intenta con una imagen más pequeña

### Bajo rendimiento
- Reduce la calidad de la imagen
- Prueba en otro navegador
- Cierra otras pestañas

## 📱 Responsive

La experiencia funciona en:
- ✅ Desktop (mejor experiencia)
- ✅ Tablet
- ✅ Móvil (adaptado)

## 💡 Tips Personales

1. **Mejora la sorpresa**: Personaliza cada sección con mensajes especiales
2. **Elige bien la música**: La música es importante para la experiencia
3. **Foto de calidad**: Usa una foto clara y bien iluminada
4. **Prueba primero**: Abre en privado y prueba toda la experiencia antes
5. **Comparte el link**: Simplemente pasa el URL de GitHub Pages o Vercel

## 🌟 Características Incluidas

✨ Galaxia 3D interactiva
💫 Efectos de partículas
🎆 Fuegos artificiales
💝 Lluvia de corazones
🎊 Confeti de celebración
🌠 Estrellas fugaces
🔊 Visualizador de audio
📱 Diseño responsive
⌨️ Navegación por teclado
🎯 Transiciones suaves

## ❤️ ¡Disfrútalo!

Creado con mucho amor para hacer especial a alguien especial.

---

¿Preguntas? Revisa el `README.md` para documentación completa.
