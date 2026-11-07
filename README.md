# Micro Apps · Web

Web estática (HTML, CSS y JavaScript). Sin dependencias, sin servidor.

## Estructura

```
index.html          Página principal
css/styles.css      Estilos
js/config.js        ← AQUÍ se editan los enlaces y el correo
js/main.js          Comportamiento (menú, avisos, animaciones)
assets/logo.png            Logo oficial (fondo transparente)
assets/favicon.png         Icono de la pestaña
assets/apple-touch-icon.png Icono para iPhone/iPad
assets/habit-tracker.webp  Miniatura de Habit Tracker
assets/focus-timer.webp    Miniatura de Focus Timer
```

## Cambiar enlaces

Todos los enlaces (Whop, TikTok, Instagram, privacidad, condiciones) y el
correo están en `js/config.js`. Instagram, Privacidad y Condiciones se
mantienen ocultos mientras su valor empiece por `PENDIENTE`; al poner la
dirección real aparecen solos.

## Cambiar logo o miniaturas

Sustituye el archivo correspondiente de `assets/` conservando el nombre.
Las miniaturas se muestran en formato 16:10 (se recortan, no se deforman).

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub y sube todo el contenido de esta carpeta
   (`index.html` debe quedar en la raíz).
2. En el repositorio: Settings → Pages → Source: "Deploy from a branch" →
   rama `main`, carpeta `/ (root)` → Save.
3. En un par de minutos la web estará disponible en la dirección que muestra GitHub.
