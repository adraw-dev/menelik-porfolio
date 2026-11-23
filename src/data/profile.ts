// Contenido textual bilingüe. Fuente: info-mene/about-mene.md + datos confirmados por el cliente.
// No agregar información que no esté respaldada por esas fuentes.
// La versión en inglés es una traducción del texto original en español.
import type { Lang } from '../i18n';

const CONTACT = {
  email: 'menelikpuerta2014@gmail.com',
  phone: '573041341809',
  whatsappDisplay: '+57 304 134 1809',
  instagram: 'menelik_ph',
  instagramUrl: 'https://www.instagram.com/menelik_ph/',
};

const TEXT = {
  es: {
    role: 'Fotógrafa y realizadora audiovisual',
    bio: [
      'Fotógrafa y realizadora audiovisual con experiencia desde 2017 en fotografía de eventos, celebraciones familiares, retratos y producción de contenido visual.',
      'Me enfoco en capturar momentos espontáneos y cuidar cada detalle para entregar imágenes auténticas que conserven recuerdos importantes.',
    ],
    craft:
      'Soy Tecnóloga en Cámara y Fotografía para Cine del SENA. Trabajo la iluminación, la composición, el retoque y la edición en Lightroom, Photoshop y CapCut.',
    facts: [
      { value: '2017', label: 'Fotógrafa freelance desde' },
      { value: 'SENA', label: 'Tecnóloga en Cámara y Fotografía para Cine' },
      { value: 'TVN Global', label: 'Cámara y realización audiovisual' },
      { value: '3.er puesto', label: 'Festival Municipal de Fotografía de Itagüí, 2020' },
    ],
    whatsappMessage: 'Hola Menelik, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.',
    services: [
      { title: 'Fotografía de eventos', text: 'Cobertura de eventos con atención a lo que pasa sin guion: gestos, encuentros y detalles.', photo: 'evento' },
      { title: 'Celebraciones familiares', text: 'Bautizos, primeras comuniones y momentos en familia que merecen conservarse.', photo: 'bautizo' },
      { title: 'Retratos', text: 'Fotos naturales y retratos posados bien cuidados, en exteriores o en locación.', photo: 'motera' },
      { title: 'Contenido para redes', text: 'Selección y retoque fotográfico para carruseles de Instagram y reels verticales editados en CapCut.', photo: null },
      { title: 'Cámara y realización audiovisual', text: 'Experiencia en cámara y realización en TVN Global y en proyectos independientes.', photo: null },
    ],
    process: [
      { step: 'Antes', text: 'Atención y comunicación cercana para entender el evento o la sesión.' },
      { step: 'Durante', text: 'Acompañamiento para lograr tanto fotos naturales como retratos posados bien cuidados.' },
      { step: 'Después', text: 'Selección, retoque y edición de cada imagen hasta la entrega.' },
    ],
  },
  en: {
    role: 'Photographer and filmmaker',
    bio: [
      'Photographer and filmmaker with experience since 2017 in event photography, family celebrations, portraits and visual content production.',
      'I focus on capturing spontaneous moments and taking care of every detail to deliver authentic images that preserve important memories.',
    ],
    craft:
      'I trained as a Technologist in Camera and Photography for Film at SENA. I work with lighting, composition, retouching and editing in Lightroom, Photoshop and CapCut.',
    facts: [
      { value: '2017', label: 'Freelance photographer since' },
      { value: 'SENA', label: 'Technologist in Camera and Photography for Film' },
      { value: 'TVN Global', label: 'Camera operation and video production' },
      { value: '3rd place', label: 'Itagüí Municipal Photography Festival, 2020' },
    ],
    whatsappMessage: 'Hi Menelik, I saw your portfolio and I’d like to talk to you about a project.',
    services: [
      { title: 'Event photography', text: 'Event coverage that pays attention to what happens unscripted: gestures, encounters and details.', photo: 'evento' },
      { title: 'Family celebrations', text: 'Baptisms, first communions and family moments worth preserving.', photo: 'bautizo' },
      { title: 'Portraits', text: 'Natural photos and carefully crafted posed portraits, outdoors or on location.', photo: 'motera' },
      { title: 'Social media content', text: 'Photo curation and retouching for Instagram carousels, and vertical reels edited in CapCut.', photo: null },
      { title: 'Camera and video production', text: 'Camera and production experience at TVN Global and on independent projects.', photo: null },
    ],
    process: [
      { step: 'Before', text: 'Close attention and communication to understand the event or session.' },
      { step: 'During', text: 'On-site support to capture both natural photos and carefully crafted posed portraits.' },
      { step: 'After', text: 'Selection, retouching and editing of every image through to delivery.' },
    ],
  },
} as const;

export function getProfile(lang: Lang) {
  const tx = TEXT[lang];
  return {
    name: 'Menelik Puerta Herrera',
    shortName: 'Menelik Puerta',
    place: 'Itagüí, Colombia',
    since: 2017,
    role: tx.role,
    bio: tx.bio,
    craft: tx.craft,
    facts: tx.facts,
    tools: ['Lightroom', 'Photoshop', 'CapCut'],
    contact: {
      ...CONTACT,
      whatsappUrl: `https://wa.me/${CONTACT.phone}?text=${encodeURIComponent(tx.whatsappMessage)}`,
    },
  };
}

export const getServices = (lang: Lang) => TEXT[lang].services;
export const getProcess = (lang: Lang) => TEXT[lang].process;
