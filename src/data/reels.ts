// Piezas audiovisuales editadas por Menelik (rol: edición). Publicadas en cuentas de clientes,
// por eso se enlazan/incrustan desde Instagram y no se alojan los videos.
import type { Lang } from '../i18n';

export interface Reel {
  id: string;
  url: string;
  kind: 'Reel' | 'Carrusel' | 'Carousel';
  isCarousel: boolean;
  title: string;
  category: string;
  date: string;
  /** colores del póster tipográfico (no se usan fotogramas de clientes) */
  tone: [string, string];
}

type L = { es: string; en: string };
const REELS: Array<{ id: string; url: string; carousel?: boolean; title: L; category: L; date: L; tone: [string, string] }> = [
  {
    id: 'DPCEz-ZEWr2', url: 'https://www.instagram.com/reel/DPCEz-ZEWr2/',
    title: { es: 'Glamping entre montañas', en: 'Glamping among the mountains' },
    category: { es: 'Turismo', en: 'Tourism' }, date: { es: 'Sep 2025', en: 'Sep 2025' },
    tone: ['#6EC1F0', '#1F4A3A'],
  },
  {
    id: 'DQFAkQ6EZzH', url: 'https://www.instagram.com/reel/DQFAkQ6EZzH/',
    title: { es: 'Cuatrimotos y parapente', en: 'ATVs and paragliding' },
    category: { es: 'Turismo de aventura', en: 'Adventure tourism' }, date: { es: 'Oct 2025', en: 'Oct 2025' },
    tone: ['#F2B45A', '#1B3F57'],
  },
  {
    id: 'DPospqSEfyZ', url: 'https://www.instagram.com/reel/DPospqSEfyZ/',
    title: { es: 'Un cumpleaños en Guatapé', en: 'A birthday in Guatapé' },
    category: { es: 'Celebración', en: 'Celebration' }, date: { es: 'Oct 2025', en: 'Oct 2025' },
    tone: ['#F5EDDE', '#5B3A66'],
  },
  {
    id: 'DctrTOox5v5', url: 'https://www.instagram.com/reel/DctrTOox5v5/',
    title: { es: 'Humor para creadora de contenido', en: 'Comedy for a content creator' },
    category: { es: 'Creadores', en: 'Creators' }, date: { es: 'Ago 2026', en: 'Aug 2026' },
    tone: ['#B79CE0', '#182B35'],
  },
  {
    id: 'DPkOsD1ktZj', url: 'https://www.instagram.com/p/DPkOsD1ktZj/', carousel: true,
    title: { es: 'Selección y retoque para carrusel', en: 'Curation and retouching for a carousel' },
    category: { es: 'Edición fotográfica', en: 'Photo editing' }, date: { es: 'Oct 2025', en: 'Oct 2025' },
    tone: ['#A9DCF7', '#F6FAFC'],
  },
];

export function getReels(lang: Lang): Reel[] {
  return REELS.map((r) => ({
    id: r.id,
    url: r.url,
    isCarousel: !!r.carousel,
    kind: r.carousel ? (lang === 'es' ? 'Carrusel' : 'Carousel') : 'Reel',
    title: r.title[lang],
    category: r.category[lang],
    date: r.date[lang],
    tone: r.tone,
  }));
}
