// Contenido textual. Fuente: info-mene/about-mene.md + datos confirmados por el cliente.
// No agregar información que no esté respaldada por esas fuentes.

export const profile = {
  name: 'Menelik Puerta Herrera',
  shortName: 'Menelik Puerta',
  role: 'Fotógrafa y realizadora audiovisual',
  place: 'Itagüí, Colombia',
  since: 2017,
  statement:
    'Me enfoco en capturar momentos espontáneos y cuidar cada detalle para entregar imágenes auténticas que conserven recuerdos importantes.',
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
  tools: ['Lightroom', 'Photoshop', 'CapCut'],
  contact: {
    email: 'menelikpuerta2014@gmail.com',
    whatsappDisplay: '+57 304 134 1809',
    whatsappUrl:
      'https://wa.me/573041341809?text=' +
      encodeURIComponent('Hola Menelik, vi tu portafolio y me gustaría hablar contigo sobre un proyecto.'),
    instagram: 'menelik_ph',
    instagramUrl: 'https://www.instagram.com/menelik_ph/',
  },
} as const;

export const services = [
  {
    title: 'Fotografía de eventos',
    text: 'Cobertura de eventos con atención a lo que pasa sin guion: gestos, encuentros y detalles.',
    photo: '_MG_9702.jpg',
  },
  {
    title: 'Celebraciones familiares',
    text: 'Bautizos, primeras comuniones y momentos en familia que merecen conservarse.',
    photo: 'DSC04264.jpg',
  },
  {
    title: 'Retratos',
    text: 'Fotos naturales y retratos posados bien cuidados, en exteriores o en locación.',
    photo: 'DSC04804.jpg',
  },
  {
    title: 'Contenido para redes',
    text: 'Selección y retoque fotográfico para carruseles de Instagram y reels verticales editados en CapCut.',
    photo: null,
  },
  {
    title: 'Cámara y realización audiovisual',
    text: 'Experiencia en cámara y realización en TVN Global y en proyectos independientes.',
    photo: null,
  },
] as const;

export const process = [
  { step: 'Antes', text: 'Atención y comunicación cercana para entender el evento o la sesión.' },
  { step: 'Durante', text: 'Acompañamiento para lograr tanto fotos naturales como retratos posados bien cuidados.' },
  { step: 'Después', text: 'Selección, retoque y edición de cada imagen hasta la entrega.' },
] as const;
