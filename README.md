# Portafolio — Menelik Puerta Herrera

Sitio estático (Astro + GSAP). Plan y dirección de arte: [PLAN-PORTAFOLIO.md](PLAN-PORTAFOLIO.md).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # genera dist/ (la primera vez optimiza las 29 fotos: ~2 min)
npm run preview   # sirve dist/
```

## Fuentes de contenido (no se modifican)

- `info-mene/imagenes/` — fotografías originales; se importan desde `src/data/photos.ts` y Astro genera AVIF/WebP al compilar.
- `info-mene/about-mene.md` — textos; volcados en `src/data/profile.ts`.
- `loader-animated.html` — loader original; su SVG se lee en compilación (`src/lib/loader-source.ts`).
- `logo.png` — favicon e imagen para compartir (`scripts/prepare-assets.mjs`, se ejecuta antes de `dev`/`build`).

## Dónde cambiar cosas

| Qué | Archivo |
|---|---|
| Textos, servicios, contacto | `src/data/profile.ts` |
| Fotos, títulos, colecciones | `src/data/photos.ts` |
| Reels / carrusel | `src/data/reels.ts` |
| Colores, tipografía, espaciado | `src/styles/tokens.css` |
| Animaciones (todas) | `src/scripts/motion/` (`index.ts` es el punto de entrada) |
| Duración del loader | `SPEED` en `src/scripts/loader.ts` |

## Despliegue en Vercel

Ya está configurado (`vercel.json`, `.vercelignore`). Es un sitio estático: no necesita adaptador.

**Recomendado — desde GitHub:** sube este proyecto a un repositorio (incluida la carpeta `info-mene/`, que el build necesita) y en Vercel elige *Add New → Project → Import*. Vercel detecta Astro y usa `npm run build` → `dist/`. Cada push redepliega solo.

**Alternativa — CLI:** `npx vercel` desde esta carpeta. Ojo: el código fuente pesa ~212 MB por las fotos originales y la documentación de Vercel indica un límite de subida por CLI de 100 MB en el plan Hobby.

**Dominio:** sin configurar nada, las URLs canónicas y la imagen para compartir usan el dominio de producción de Vercel (`*.vercel.app`). Cuando haya dominio propio, añádelo en Vercel y define la variable de entorno `SITE_URL=https://tu-dominio.com`.

Datos del build: ~56 MB de salida (AVIF + WebP en varios anchos), la primera compilación tarda ~2–3 min por el procesado de las fotos.
