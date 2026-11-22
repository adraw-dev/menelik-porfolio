// Lee el loader ORIGINAL (loader-animated.html) en tiempo de compilación.
// No se copia ni se modifica: se extraen el SVG, los trazos del chibi y del wordmark
// para reutilizarlos en el loader integrado, la navegación y las ilustraciones del sitio.
import fs from 'node:fs';
import path from 'node:path';

const html = fs.readFileSync(path.join(process.cwd(), 'loader-animated.html'), 'utf8');

/** <svg> completo, con el raster base64 sustituido por la versión optimizada. */
export const loaderSvg = (html.match(/<svg[\s\S]*?<\/svg>/)?.[0] ?? '')
  .replace(/href="data:image\/png;base64,[^"]+"/, 'href="/loader/chibi.webp"')
  // nombre accesible más descriptivo dentro del sitio
  .replace(/aria-label="[^"]*"/, 'aria-label="Menelik"');

const outline = html.match(/<g class="cl-outline"[\s\S]*?<g class="cl-filled"/)?.[0] ?? '';
const chibiBlock = outline.match(/<g class="cl-chibi">([\s\S]*?)<\/g>/)?.[1] ?? '';
const wordBlock = outline.match(/<g class="cl-word">([\s\S]*?)<\/g>/)?.[1] ?? '';

const readPaths = (block: string) =>
  [...block.matchAll(/<path d="([^"]+)"(?: data-delay="(\d+)")?/g)].map((m) => ({
    d: m[1],
    delay: Number(m[2] ?? 0),
  }));

export const chibiPaths = readPaths(chibiBlock);
export const wordPaths = readPaths(wordBlock).map((p) => p.d);

/** Caja aproximada a partir de los puntos de control (las cuadráticas quedan dentro de su casco). */
function bbox(ds: string[]) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const d of ds) {
    const nums = d.match(/-?\d*\.?\d+(?:e-?\d+)?/gi)?.map(Number) ?? [];
    for (let i = 0; i + 1 < nums.length; i += 2) {
      const [x, y] = [nums[i], nums[i + 1]];
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  const pad = 6;
  return [x0 - pad, y0 - pad, x1 - x0 + pad * 2, y1 - y0 + pad * 2].map((n) => +n.toFixed(1));
}

export const wordViewBox = bbox(wordPaths).join(' ');
/** El chibi original mide 1199×1312 (tamaño del raster). */
export const chibiViewBox = '-12 -12 1223 1336';
