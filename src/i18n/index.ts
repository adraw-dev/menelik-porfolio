// Idiomas del sitio: español (por defecto, en /) e inglés (en /en/).
export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

export function getLang(locale: string | undefined): Lang {
  return locale === 'en' ? 'en' : 'es';
}

export const otherLang = (lang: Lang): Lang => (lang === 'es' ? 'en' : 'es');
export const homePath = (lang: Lang) => (lang === 'es' ? '/' : '/en/');

const ui = {
  es: {
    meta: {
      title: 'Menelik Puerta Herrera — Fotógrafa y realizadora audiovisual',
      description:
        'Portafolio de Menelik Puerta Herrera, fotógrafa y realizadora audiovisual en Itagüí, Colombia. Eventos, celebraciones familiares, retratos y contenido visual para redes.',
      ogLocale: 'es_CO',
    },
    skip: 'Saltar al contenido',
    loader: { skip: 'Saltar intro', status: 'Cargando el portafolio de Menelik Puerta' },
    nav: {
      main: 'Principal',
      mobile: 'Menú móvil',
      home: 'Menelik Puerta, volver al inicio',
      links: { sobre: 'Sobre mí', trabajo: 'Trabajo', video: 'Video', servicios: 'Servicios', contacto: 'Contacto' },
      cta: 'Hablemos',
      menu: 'Menú',
      close: 'Cerrar',
      switchLabel: 'English version',
      switchShort: 'EN',
      rail: 'Capítulos',
    },
    chapters: { inicio: 'Portada', sobre: 'Sobre mí', trabajo: 'Trabajo', premio: 'Premio', video: 'Video', servicios: 'Servicios', contacto: 'Contacto' },
    hero: {
      lede: 'Momentos espontáneos, cuidados en cada detalle.',
      view: 'Ver trabajo',
      write: 'Escríbeme',
      exif: 'Altura · Páramo · 2025',
      cue: 'Desliza',
    },
    about: {
      eyebrow: '01 — Sobre mí',
      title: 'Imágenes que <em>conservan</em> lo importante.',
      portrait: 'Menelik Puerta · Páramo, 2025',
      archive: 'Archivo personal',
      archiveTitle: 'Desde 2017 detrás de la cámara',
      sunny: 'Sunny, en casa · 2026',
    },
    work: {
      eyebrow: '02 — Trabajo seleccionado',
      title: 'Del celeste <em>a la noche</em>',
      lede: 'Cinco colecciones ordenadas como un día de luz: de las celebraciones a la carretera, del pueblo al páramo y al escenario.',
      index: 'Colecciones',
      photos: (n: number) => `${n} fotografías`,
      viewAll: 'Ver colección completa',
      stripHint: 'Sigue bajando — la carretera avanza →',
    },
    award: {
      eyebrow: 'Reconocimiento',
      title: '3.<sup>er</sup> puesto',
      lede: 'Festival Municipal de Fotografía de Itagüí, 2020.',
      note: 'Una noche de lluvia, un reflector encendido y una sola persona en la cancha.',
      caption: 'Fotografía premiada · 2020',
    },
    reels: {
      eyebrow: '03 — En movimiento',
      title: 'Edición para <em>redes</em>',
      lede: 'Reels verticales editados en CapCut y selección y retoque fotográfico para carruseles de Instagram.',
      role: 'Edición',
      opens: '(abre la publicación de Instagram)',
      open: 'Abrir en Instagram ↗',
      close: 'Cerrar',
      loading: 'Cargando desde Instagram…',
      error: 'No se pudo cargar la vista previa.',
      errorLink: 'Ver en Instagram ↗',
    },
    services: {
      eyebrow: '04 — Servicios',
      title: 'Qué <em>hago</em>',
      process: 'Cómo trabajo · acompañamiento completo',
      tools: 'Herramientas',
    },
    contact: {
      eyebrow: '05 — Contacto',
      title: 'Hablemos de tu <em>próximo recuerdo</em>.',
      lede: 'Eventos, celebraciones familiares, retratos o contenido para redes.',
      whatsapp: 'Escríbeme por WhatsApp',
      email: 'Enviar un correo',
      labels: { whatsapp: 'WhatsApp', email: 'Correo', instagram: 'Instagram', base: 'Base' },
      top: 'Volver al inicio',
    },
    lightbox: {
      label: 'Visor de fotografías',
      prev: 'Fotografía anterior',
      next: 'Fotografía siguiente',
      close: 'Cerrar visor',
      enlarge: 'Ampliar fotografía',
    },
  },
  en: {
    meta: {
      title: 'Menelik Puerta Herrera — Photographer and filmmaker',
      description:
        'Portfolio of Menelik Puerta Herrera, photographer and filmmaker based in Itagüí, Colombia. Events, family celebrations, portraits and visual content for social media.',
      ogLocale: 'en_US',
    },
    skip: 'Skip to content',
    loader: { skip: 'Skip intro', status: 'Loading Menelik Puerta’s portfolio' },
    nav: {
      main: 'Main',
      mobile: 'Mobile menu',
      home: 'Menelik Puerta, back to top',
      links: { sobre: 'About', trabajo: 'Work', video: 'Video', servicios: 'Services', contacto: 'Contact' },
      cta: 'Let’s talk',
      menu: 'Menu',
      close: 'Close',
      switchLabel: 'Versión en español',
      switchShort: 'ES',
      rail: 'Chapters',
    },
    chapters: { inicio: 'Home', sobre: 'About', trabajo: 'Work', premio: 'Award', video: 'Video', servicios: 'Services', contacto: 'Contact' },
    hero: {
      lede: 'Spontaneous moments, cared for in every detail.',
      view: 'View work',
      write: 'Get in touch',
      exif: 'Altitude · Páramo · 2025',
      cue: 'Scroll',
    },
    about: {
      eyebrow: '01 — About me',
      title: 'Images that <em>keep</em> what matters.',
      portrait: 'Menelik Puerta · Páramo, 2025',
      archive: 'Personal archive',
      archiveTitle: 'Behind the camera since 2017',
      sunny: 'Sunny, at home · 2026',
    },
    work: {
      eyebrow: '02 — Selected work',
      title: 'From sky blue <em>to night</em>',
      lede: 'Five collections arranged like a day of light: from celebrations to the road, from a small town to the páramo and the stage.',
      index: 'Collections',
      photos: (n: number) => `${n} photographs`,
      viewAll: 'View full collection',
      stripHint: 'Keep scrolling — the road moves on →',
    },
    award: {
      eyebrow: 'Recognition',
      title: '3<sup>rd</sup> place',
      lede: 'Itagüí Municipal Photography Festival, 2020.',
      note: 'A rainy night, a floodlight switched on and a single person on the field.',
      caption: 'Award-winning photograph · 2020',
    },
    reels: {
      eyebrow: '03 — In motion',
      title: 'Editing for <em>social media</em>',
      lede: 'Vertical reels edited in CapCut, plus photo curation and retouching for Instagram carousels.',
      role: 'Editing',
      opens: '(opens the Instagram post)',
      open: 'Open on Instagram ↗',
      close: 'Close',
      loading: 'Loading from Instagram…',
      error: 'The preview could not be loaded.',
      errorLink: 'View on Instagram ↗',
    },
    services: {
      eyebrow: '04 — Services',
      title: 'What I <em>do</em>',
      process: 'How I work · full support',
      tools: 'Tools',
    },
    contact: {
      eyebrow: '05 — Contact',
      title: 'Let’s talk about your <em>next memory</em>.',
      lede: 'Events, family celebrations, portraits or social media content.',
      whatsapp: 'Message me on WhatsApp',
      email: 'Send an email',
      labels: { whatsapp: 'WhatsApp', email: 'Email', instagram: 'Instagram', base: 'Based in' },
      top: 'Back to top',
    },
    lightbox: {
      label: 'Photo viewer',
      prev: 'Previous photo',
      next: 'Next photo',
      close: 'Close viewer',
      enlarge: 'Enlarge photo',
    },
  },
} as const;

export type UI = (typeof ui)['es'];
export const t = (lang: Lang): UI => ui[lang] as UI;
