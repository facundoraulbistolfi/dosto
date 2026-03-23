# Dostoievski — Biblioteca Personal

Biblioteca personal interactiva de las novelas de **Fiódor Dostoievski** (1821–1881), desplegada como GitHub Pages.

**[Ver en vivo →](https://facundoraulbistolfi.github.io/dosto/)**

---

## Características

- **12 novelas** con portadas SVG ilustradas a mano, cada una con simbolismo propio de la obra
- **Seguimiento de lectura** persistido en `localStorage` — el progreso se guarda entre visitas
- **Filtros temáticos** por Existencialismo, Redención, Fe, Amor, Sociedad, Psicología, Política, Familia, Identidad, Crimen, Soledad y Adicción
- **Ordenación** por año, páginas o título
- **Modal de detalle** con portada ampliada, título en ruso, temas y descripción
- **Estadísticas**: novelas leídas, páginas leídas, páginas restantes y porcentaje de progreso

## Novelas incluidas

| Año | Título | Título original |
|-----|--------|-----------------|
| 1846 | Pobres gentes | Бедные люди |
| 1846 | El doble | Двойник |
| 1848 | Noches blancas | Белые ночи |
| 1861 | Humillados y ofendidos | Униженные и оскорблённые |
| 1864 | Memorias del subsuelo | Записки из подполья |
| 1866 | Crimen y castigo | Преступление и наказание |
| 1867 | El jugador | Игрок |
| 1869 | El idiota | Идиот |
| 1870 | El eterno marido | Вечный муж |
| 1872 | Los demonios | Бесы |
| 1875 | El adolescente | Подросток |
| 1880 | Los hermanos Karamázov | Братья Карамазовы |

## Stack

- **React 18** con Vite
- **SVG** puro para las portadas (sin imágenes externas)
- **EB Garamond** via Google Fonts
- **GitHub Actions** para despliegue continuo en GitHub Pages

## Desarrollo local

```bash
npm install
npm run dev
```

La app corre en `http://localhost:5173`.

## Despliegue

El despliegue es automático vía GitHub Actions al hacer push a `master`.

Para configurar GitHub Pages manualmente:
1. Ir a **Settings → Pages**
2. Seleccionar **Source: GitHub Actions**
3. El workflow `.github/workflows/deploy.yml` construye y publica automáticamente

```bash
npm run build   # genera dist/
npm run preview # previsualiza el build
```
