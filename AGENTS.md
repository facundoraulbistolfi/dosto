# AGENTS.md — Dosto

Guía de desarrollo para Codex en este repositorio.

## Descripción del proyecto

Biblioteca personal interactiva de las novelas de Fiódor Dostoievski, construida con React + Vite y desplegada en GitHub Pages en `https://facundoraulbistolfi.github.io/dosto/`.

## Stack técnico

- **React 18** + **Vite 5**
- **Estilos**: inline styles (sin CSS externo, sin Tailwind)
- **Tipografía**: EB Garamond via Google Fonts (cargada en `index.html`)
- **Persistencia**: `localStorage` con la clave `dostoevsky-read`
- **Portadas**: SVG inline en `src/components/CoverArt.jsx`
- **Despliegue**: GitHub Actions → GitHub Pages

## Estructura

```
dosto/
├── .github/workflows/deploy.yml   # CI/CD hacia GitHub Pages
├── src/
│   ├── main.jsx                   # Punto de entrada React
│   ├── App.jsx                    # Componente raíz
│   ├── data.js                    # NOVELS y THEMES (datos estáticos)
│   └── components/
│       ├── CoverArt.jsx           # SVG de portadas por tipo
│       └── StatsBar.jsx           # Barra de progreso de lectura
├── index.html                     # Plantilla HTML con fuentes
├── vite.config.js                 # base: '/dosto/' para GitHub Pages
└── package.json
```

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # desarrollo local en :5173
npm run build    # compilar a dist/
npm run preview  # previsualizar el build en :4173
```

## Datos

- Los datos de novelas están en `src/data.js` como arrays/objetos exportados.
- Cada novela tiene: `id`, `title`, `titleOrig` (ruso), `year`, `pages`, `themes[]`, `desc`, `cover` (clave para `CoverArt`).
- Los temas disponibles están en el objeto `THEMES` con `label` y `color`.

## Portadas SVG

Cada portada es un SVG de `200×280` con fondo oscuro (`#0d0d1a` sin leer, `#1a1a2e` leído) y trazos dorados (`#7a6a38` sin leer, `#d4a853` leído). Para agregar una portada nueva, añadir una clave nueva en el objeto `covers` de `CoverArt.jsx` y referenciarla en el campo `cover` de la novela en `data.js`.

## Despliegue

El workflow `.github/workflows/deploy.yml` se activa automáticamente al hacer push a `master`. Requiere que GitHub Pages esté configurado con **Source: GitHub Actions** en Settings → Pages.

## Paleta de colores

| Uso | Color |
|-----|-------|
| Fondo principal | `#0a0a14` |
| Fondo tarjeta sin leer | `#0d0d1a` |
| Fondo tarjeta leída | `#1a1a2e` |
| Oro (leído / activo) | `#d4a853` |
| Oro apagado (no leído) | `#7a6a38` |
| Texto principal | `#c9b99a` |
| Texto secundario | `#6a5d40` |
| Borde sutil | `#2a2a3e` |
