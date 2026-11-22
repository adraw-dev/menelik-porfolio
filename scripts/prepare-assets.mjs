// Genera recursos derivados SIN modificar los originales:
//  - public/loader/chibi.webp  ← raster PNG embebido en loader-animated.html (590 KB → WebP)
//  - public/favicon-*.png      ← logo.png
//  - public/og.jpg             ← imagen para compartir (foto de portada)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const out = (...p) => path.join(root, 'public', ...p);
fs.mkdirSync(out('loader'), { recursive: true });

async function once(target, task) {
  if (fs.existsSync(target)) return;
  await task();
  console.log('[assets] creado', path.relative(root, target));
}

// 1) Raster del loader
await once(out('loader', 'chibi.webp'), async () => {
  const html = fs.readFileSync(path.join(root, 'loader-animated.html'), 'utf8');
  const b64 = html.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/)?.[1];
  if (!b64) throw new Error('No se encontró el raster del loader');
  // El RGB es un color plano (#faf6f9); toda la forma vive en el alfa. Se limpia el ruido
  // casi invisible (alfa < 8/255) que inflaba el archivo y se recompone sobre el mismo color.
  const { data, info } = await sharp(Buffer.from(b64, 'base64'))
    .resize({ width: 900 })
    .extractChannel(3)
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i++) if (data[i] < 8) data[i] = 0;
  await sharp({ create: { width: info.width, height: info.height, channels: 3, background: '#faf6f9' } })
    .joinChannel(data, { raw: { width: info.width, height: info.height, channels: 1 } })
    .webp({ quality: 85, alphaQuality: 80 })
    .toFile(out('loader', 'chibi.webp'));
});

// 2) Favicons desde el logo (fondo celeste hielo para que el trazo negro se lea en pestañas oscuras)
for (const size of [32, 180, 512]) {
  await once(out(`favicon-${size}.png`), async () => {
    const pad = Math.round(size * 0.08);
    const inner = await sharp(path.join(root, 'logo.png'))
      .resize({ width: size - pad * 2, height: size - pad * 2, fit: 'contain', background: '#E8F4FB' })
      .toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: '#E8F4FB' } })
      .composite([{ input: inner, gravity: 'center' }])
      .png()
      .toFile(out(`favicon-${size}.png`));
  });
}

// 3) Imagen Open Graph (1200×630) desde la foto de portada
await once(out('og.jpg'), async () => {
  await sharp(path.join(root, 'info-mene', 'imagenes', 'DSC09172.jpg'))
    .rotate()
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out('og.jpg'));
});
