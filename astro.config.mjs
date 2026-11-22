// @ts-check
import { defineConfig } from 'astro/config';

// URL pública (canonical, og:image, sitemap). Prioridad:
//  1. SITE_URL (definida a mano, p. ej. cuando haya dominio propio)
//  2. dominio de producción que Vercel inyecta en el build
//  3. localhost en desarrollo
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:4321';

export default defineConfig({
  site,
  output: 'static',
  image: {
    // Los originales pesan hasta 22 MB / 6000 px; se permiten píxeles altos al procesar.
    service: { entrypoint: 'astro/assets/services/sharp', config: { limitInputPixels: false } },
  },
  vite: {
    server: { fs: { allow: ['.'] } },
  },
});
