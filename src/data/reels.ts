// Piezas audiovisuales editadas por Menelik (rol: edición). Publicadas en cuentas de clientes,
// por eso se enlazan/incrustan desde Instagram y no se alojan los videos.
export interface Reel {
  id: string;
  url: string;
  kind: 'Reel' | 'Carrusel';
  title: string;
  category: string;
  date: string;
  /** colores del póster tipográfico (no se usan fotogramas de clientes) */
  tone: [string, string];
}

export const reels: Reel[] = [
  {
    id: 'DPCEz-ZEWr2', url: 'https://www.instagram.com/reel/DPCEz-ZEWr2/', kind: 'Reel',
    title: 'Glamping entre montañas', category: 'Turismo', date: 'Sep 2025',
    tone: ['#6EC1F0', '#1F4A3A'],
  },
  {
    id: 'DQFAkQ6EZzH', url: 'https://www.instagram.com/reel/DQFAkQ6EZzH/', kind: 'Reel',
    title: 'Cuatrimotos y parapente', category: 'Turismo de aventura', date: 'Oct 2025',
    tone: ['#F2B45A', '#1B3F57'],
  },
  {
    id: 'DPospqSEfyZ', url: 'https://www.instagram.com/reel/DPospqSEfyZ/', kind: 'Reel',
    title: 'Un cumpleaños en Guatapé', category: 'Celebración', date: 'Oct 2025',
    tone: ['#F5EDDE', '#5B3A66'],
  },
  {
    id: 'DctrTOox5v5', url: 'https://www.instagram.com/reel/DctrTOox5v5/', kind: 'Reel',
    title: 'Humor para creadora de contenido', category: 'Creadores', date: 'Ago 2026',
    tone: ['#B79CE0', '#182B35'],
  },
  {
    id: 'DPkOsD1ktZj', url: 'https://www.instagram.com/p/DPkOsD1ktZj/', kind: 'Carrusel',
    title: 'Selección y retoque para carrusel', category: 'Edición fotográfica', date: 'Oct 2025',
    tone: ['#A9DCF7', '#F6FAFC'],
  },
];
