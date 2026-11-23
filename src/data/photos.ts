// Manifiesto fotográfico bilingüe. Los archivos se importan directamente desde info-mene/imagenes
// (sin copiarlos); Astro genera las versiones optimizadas al compilar.
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../../info-mene/imagenes/*.{jpg,jpeg,JPG,JPEG}',
  { eager: true },
);

const byName = new Map(
  Object.entries(files).map(([p, mod]) => [p.split('/').pop()!, mod.default]),
);

type L = { es: string; en: string };

export type CollectionId = 'celebraciones' | 'ruta' | 'pueblo' | 'altura' | 'escena';

/** Foto ya resuelta en un idioma (forma que consumen los componentes). */
export interface Photo {
  file: string;
  src: ImageMetadata;
  title: string;
  alt: string;
  year: number;
  tag: string;
  /** object-position para recortes (portada, miniaturas) */
  focal?: string;
}

interface PhotoDef {
  file: string;
  title: L;
  alt: L;
  tag: L;
  year: number;
  focal?: string;
}

const TAG = {
  celebraciones: { es: 'Celebraciones', en: 'Celebrations' },
  eventos: { es: 'Eventos', en: 'Events' },
  retrato: { es: 'Retrato', en: 'Portrait' },
  paisaje: { es: 'Paisaje', en: 'Landscape' },
  viaje: { es: 'Viaje', en: 'Travel' },
  arquitectura: { es: 'Arquitectura', en: 'Architecture' },
  naturaleza: { es: 'Naturaleza', en: 'Nature' },
  musica: { es: 'Música en vivo', en: 'Live music' },
  mascotas: { es: 'Mascotas', en: 'Pets' },
  premiada: { es: 'Premiada', en: 'Award-winning' },
} satisfies Record<string, L>;

const DEFS = {
  // Eventos y celebraciones
  bautizo: { file: 'DSC04264.jpg', year: 2022, tag: TAG.celebraciones,
    title: { es: 'Bautizo', en: 'Baptism' },
    alt: { es: 'Bebé en brazos de su madre mientras un hombre sostiene una vela encendida durante un bautizo en una iglesia de ladrillo.', en: 'A baby in his mother’s arms while a man holds a lit candle during a baptism in a brick church.' } },
  globos: { file: 'DSC04376 (1).jpg', year: 2022, tag: TAG.celebraciones, focal: '62% 45%',
    title: { es: 'Globos celestes', en: 'Sky-blue balloons' },
    alt: { es: 'Bebé con camisa blanca y tirantes mira hacia un lado frente a un arreglo de globos blancos, plateados y celestes.', en: 'A baby in a white shirt and suspenders looks aside in front of white, silver and sky-blue balloons.' } },
  comunion: { file: 'DSC08359.jpg', year: 2025, tag: TAG.celebraciones,
    title: { es: 'Primera comunión', en: 'First communion' },
    alt: { es: 'Niño de traje negro y guantes blancos con las manos juntas frente a un altar adornado con poinsettias rojas y luces navideñas.', en: 'A boy in a black suit and white gloves with hands together before an altar decorated with red poinsettias and Christmas lights.' } },
  evento: { file: '_MG_9702.jpg', year: 2024, tag: TAG.eventos, focal: '55% 50%',
    title: { es: 'Rueda de negocios', en: 'Business matchmaking' },
    alt: { es: 'Dos personas concentradas frente a portátiles en una mesa numerada durante una rueda de negocios.', en: 'Two people focused on their laptops at a numbered table during a business matchmaking session.' } },
  // En ruta
  motera: { file: 'DSC04804.jpg', year: 2023, tag: TAG.retrato, focal: '55% 45%',
    title: { es: 'Casco en mano', en: 'Helmet in hand' },
    alt: { es: 'Mujer sentada en el borde de una carretera junto a barandas amarillas, abrazando su casco de moto bajo un cielo pastel.', en: 'A woman sitting at the edge of a road by yellow guardrails, holding her motorcycle helmet under a pastel sky.' } },
  motero: { file: 'DSC04816.jpg', year: 2023, tag: TAG.retrato, focal: '55% 35%',
    title: { es: 'Visor celeste', en: 'Sky-blue visor' },
    alt: { es: 'Hombre con gafas oscuras y camiseta de motocross sostiene un casco con visor espejado celeste.', en: 'A man in sunglasses and a motocross jersey holds a helmet with a mirrored sky-blue visor.' } },
  arbol: { file: 'DSC04847.jpg', year: 2023, tag: TAG.paisaje,
    title: { es: 'Árbol en el pastizal', en: 'Tree in the grassland' },
    alt: { es: 'Árbol solitario de copa amplia en medio de un pastizal dorado movido por el viento.', en: 'A lone, wide-crowned tree in the middle of a golden, windswept grassland.' } },
  // Pueblo
  balcon: { file: 'DSC09334.jpg', year: 2026, tag: TAG.viaje,
    title: { es: 'Balcón tallado', en: 'Carved balcony' },
    alt: { es: 'Balcón de madera tallada con faroles y macetas de flores bajo un alero de tejas.', en: 'A carved wooden balcony with lanterns and flower pots under a tiled eave.' } },
  campesino: { file: 'DSC09341.jpg', year: 2026, tag: TAG.viaje, focal: '65% 60%',
    title: { es: 'Entre flores', en: 'Among flowers' },
    alt: { es: 'Hombre mayor con sombrero aguadeño camina entre flores moradas frente a una casa blanca de balcones verdes.', en: 'An older man in a traditional straw hat walks among purple flowers in front of a white house with green balconies.' } },
  portada: { file: 'DSC09406.jpg', year: 2026, tag: TAG.arquitectura,
    title: { es: 'La portada', en: 'The doorway' },
    alt: { es: 'Perro tendido en las escaleras de una portada neogótica con la inscripción HIC DOMUS DEI ET PORTA CELI y vitrales al fondo.', en: 'A dog lying on the steps of a neo-Gothic doorway inscribed HIC DOMUS DEI ET PORTA CELI, with stained glass behind.' } },
  bolso: { file: 'DSC09416.jpg', year: 2026, tag: TAG.mascotas,
    title: { es: 'Merry de viaje', en: 'Merry on the road' },
    alt: { es: 'Merry, una perrita pinscher, asoma la cabeza desde un bolso de cuadros bajo un árbol.', en: 'Merry, a little pinscher, peeks out of a checkered bag under a tree.' } },
  basilica: { file: 'DSC09441.jpg', year: 2026, tag: TAG.mascotas,
    title: { es: 'Merry y la basílica', en: 'Merry and the basilica' },
    alt: { es: 'Merry, una perrita pinscher con chaqueta y arnés, en primer plano frente a la torre de una basílica y nubes blancas.', en: 'Merry, a little pinscher in a jacket and harness, in the foreground before a basilica tower and white clouds.' } },
  // Altura
  canon: { file: 'DSC08988.JPG.jpeg', year: 2025, tag: TAG.paisaje,
    title: { es: 'Cañón y cascada', en: 'Canyon and waterfall' },
    alt: { es: 'Cañón de alta montaña con paredes de roca oscura y una cascada al fondo bajo nubes.', en: 'A high-mountain canyon with dark rock walls and a waterfall in the distance under clouds.' } },
  frailejones: { file: 'DSC09011.jpg', year: 2025, tag: TAG.paisaje,
    title: { es: 'Frailejones', en: 'Frailejones' },
    alt: { es: 'Frailejones altos sobre una ladera de pajonal contra un cielo azul profundo.', en: 'Tall frailejón plants on a grassy slope against a deep blue sky.' } },
  arroyo: { file: 'DSC09064 (1).jpg', year: 2025, tag: TAG.paisaje,
    title: { es: 'Agua sobre musgo', en: 'Water over moss' },
    alt: { es: 'Agua que baja entre rocas cubiertas de musgo rojizo con una fila de frailejones en la cima neblinosa.', en: 'Water running between rocks covered in reddish moss, with a row of frailejones on the misty ridge.' } },
  valle: { file: 'DSC09093 (1).jpg', year: 2025, tag: TAG.paisaje,
    title: { es: 'Valle en niebla', en: 'Valley in the fog' },
    alt: { es: 'Valle de páramo cubierto de niebla con laderas iluminadas por una luz tenue.', en: 'A páramo valley covered in fog, its slopes lit by a soft light.' } },
  retrato: { file: 'DSC09102.jpg', year: 2025, tag: TAG.retrato, focal: '60% 40%',
    title: { es: 'Menelik', en: 'Menelik' },
    alt: { es: 'Menelik Puerta con gafas y gorro tejido rojo sonríe frente a una ladera de musgo verde.', en: 'Menelik Puerta, wearing glasses and a red knit hat, smiles in front of a slope of green moss.' } },
  farallon: { file: 'DSC09119.jpg', year: 2025, tag: TAG.paisaje,
    title: { es: 'Farallón', en: 'Rock face' },
    alt: { es: 'Farallón de roca gris con restos de nieve y niebla sobre una planicie de arena.', en: 'A grey rock face with patches of snow and mist above a sandy plain.' } },
  planta: { file: 'DSC09136.jpg', year: 2025, tag: TAG.naturaleza,
    title: { es: 'Flora de páramo', en: 'Páramo flora' },
    alt: { es: 'Primer plano de una planta de páramo de hojas escamosas con pequeñas flores secas y fondo desenfocado.', en: 'Close-up of a scaly-leaved páramo plant with small dried flowers and a blurred background.' } },
  niebla: { file: 'DSC09172.jpg', year: 2025, tag: TAG.paisaje, focal: '50% 60%',
    title: { es: 'Figura en la niebla', en: 'Figure in the fog' },
    alt: { es: 'Una figura diminuta de pie sobre un afloramiento de rocas en medio de una planicie envuelta en niebla.', en: 'A tiny figure standing on a rock outcrop in the middle of a fog-wrapped plain.' } },
  // Escena — Riavila
  cantanteColor: { file: 'IMG_20261030_223918_492@-1379222707 (1).jpg', year: 2026, tag: TAG.musica,
    title: { es: 'Luz violeta', en: 'Violet light' },
    alt: { es: 'La cantante de Riavila, con astas de ciervo y maquillaje oscuro, canta bajo una luz violeta difusa.', en: 'Riavila’s singer, wearing deer antlers and dark makeup, sings under a hazy violet light.' } },
  cantanteBN: { file: 'IMG_20261030_224153_049@-1379201843 (1).jpg', year: 2026, tag: TAG.musica, focal: '50% 35%',
    title: { es: 'Voz', en: 'Voice' },
    alt: { es: 'Fotografía en blanco y negro de la cantante de Riavila con astas de ciervo cantando con fuerza al micrófono.', en: 'Black-and-white photograph of Riavila’s singer, wearing deer antlers, singing powerfully into the microphone.' } },
  mascara: { file: 'IMG_3666 (1).jpg', year: 2026, tag: TAG.musica,
    title: { es: 'Máscara', en: 'Mask' },
    alt: { es: 'Músico de Riavila con capucha y máscara de calavera bajo luz azul y violeta.', en: 'A Riavila musician in a hood and skull mask under blue and violet light.' } },
  microfono: { file: 'IMG_3821.jpg', year: 2026, tag: TAG.musica,
    title: { es: 'Astas', en: 'Antlers' },
    alt: { es: 'La cantante de Riavila sostiene el micrófono junto al rostro bajo luces magenta.', en: 'Riavila’s singer holds the microphone close to her face under magenta lights.' } },
  grito: { file: 'IMG_3859.jpg', year: 2026, tag: TAG.musica,
    title: { es: 'Canto', en: 'Song' },
    alt: { es: 'La cantante de Riavila, con astas y collares, canta con los ojos cerrados bajo luz violeta.', en: 'Riavila’s singer, wearing antlers and necklaces, sings with her eyes closed under violet light.' } },
  // Sueltas
  orquideorama: { file: '1628559855266.jpg', year: 2019, tag: TAG.arquitectura,
    title: { es: 'Estructura de luz', en: 'Structure of light' },
    alt: { es: 'Estructura de madera en forma de flores hexagonales filtra la luz dorada del sol sobre un jardín.', en: 'A wooden structure of hexagonal flower shapes filters golden sunlight over a garden.' } },
  piedad: { file: '1628563738101.jpg', year: 2019, tag: TAG.arquitectura,
    title: { es: 'La Piedad', en: 'The Pietà' },
    alt: { es: 'Escultura de mármol de la Piedad bajo un arco blanco, con cipreses y cielo azul al fondo.', en: 'A marble Pietà sculpture under a white arch, with cypresses and blue sky behind.' } },
  gata: { file: 'DSC09597.jpg', year: 2026, tag: TAG.mascotas,
    title: { es: 'Sunny', en: 'Sunny' },
    alt: { es: 'Sunny, una gata blanca con manchas atigradas, estira una pata hacia arriba bajo la luz de una ventana.', en: 'Sunny, a white cat with tabby patches, stretches a paw upward in the light from a window.' } },
  premio: { file: 'premio.jpg', year: 2020, tag: TAG.premiada,
    title: { es: 'Noche de lluvia', en: 'Rainy night' },
    alt: { es: 'Noche de lluvia en una cancha: un reflector ilumina la lluvia y una persona sentada sola sobre el césped.', en: 'A rainy night on a sports field: a floodlight lights up the rain and a person sits alone on the grass.' } },
} satisfies Record<string, PhotoDef>;

export type PhotoKey = keyof typeof DEFS;

function resolve(def: PhotoDef, lang: Lang): Photo {
  const src = byName.get(def.file);
  if (!src) throw new Error(`Foto no encontrada en info-mene/imagenes: ${def.file}`);
  return { file: def.file, src, title: def.title[lang], alt: def.alt[lang], tag: def.tag[lang], year: def.year, focal: def.focal };
}

export function getPhotos(lang: Lang): Record<PhotoKey, Photo> {
  return Object.fromEntries(
    Object.entries(DEFS).map(([k, d]) => [k, resolve(d, lang)]),
  ) as Record<PhotoKey, Photo>;
}

export interface Collection {
  id: CollectionId;
  number: string;
  title: string;
  kicker: string;
  years: string;
  text: string;
  atmos: 'day' | 'fog' | 'night';
  photos: Photo[];
}

const COLLECTIONS: Array<{ id: CollectionId; number: string; years: string; atmos: Collection['atmos']; title: L; kicker: L; text: L; photos: PhotoKey[] }> = [
  {
    id: 'celebraciones', number: '01', years: '2022 — 2025', atmos: 'day',
    title: { es: 'Eventos y celebraciones', en: 'Events & celebrations' },
    kicker: { es: 'Eventos · Familia', en: 'Events · Family' },
    text: {
      es: 'Bautizos, primeras comuniones y cobertura de eventos. Momentos que pasan una sola vez y se quedan en la familia.',
      en: 'Baptisms, first communions and event coverage. Moments that happen only once and stay in the family.',
    },
    photos: ['globos', 'bautizo', 'comunion', 'evento'],
  },
  {
    id: 'ruta', number: '02', years: '2023', atmos: 'day',
    title: { es: 'En ruta', en: 'On the road' },
    kicker: { es: 'Retrato · Exteriores', en: 'Portrait · Outdoors' },
    text: {
      es: 'Una sesión de retrato en carretera: casco en mano, barandas amarillas y el paisaje del camino.',
      en: 'A roadside portrait session: helmet in hand, yellow guardrails and the landscape along the way.',
    },
    photos: ['motera', 'motero', 'arbol'],
  },
  {
    id: 'pueblo', number: '03', years: '2026', atmos: 'day',
    title: { es: 'Pueblo', en: 'Small town' },
    kicker: { es: 'Viaje · Calle', en: 'Travel · Street' },
    text: {
      es: 'Balcones tallados, flores, una basílica y Merry, compañera de viaje. Un día de pueblo contado en detalles.',
      en: 'Carved balconies, flowers, a basilica and Merry, a travel companion. A day in a small town told through details.',
    },
    photos: ['balcon', 'campesino', 'portada', 'bolso', 'basilica'],
  },
  {
    id: 'altura', number: '04', years: '2025', atmos: 'fog',
    title: { es: 'Altura', en: 'Altitude' },
    kicker: { es: 'Paisaje · Páramo', en: 'Landscape · Páramo' },
    text: {
      es: 'Una jornada en el páramo: frailejones, agua sobre musgo, roca, nieve y una niebla que lo cambia todo.',
      en: 'A day in the páramo: frailejones, water over moss, rock, snow and a fog that changes everything.',
    },
    photos: ['frailejones', 'valle', 'arroyo', 'farallon', 'canon', 'planta'],
  },
  {
    id: 'escena', number: '05', years: '2026', atmos: 'night',
    title: { es: 'Escena', en: 'Stage' },
    kicker: { es: 'Música en vivo · Riavila', en: 'Live music · Riavila' },
    text: {
      es: 'Riavila en vivo: luces violeta, astas, máscaras y voz. Fotografía de concierto donde la luz es tan protagonista como la banda.',
      en: 'Riavila live: violet lights, antlers, masks and voice. Concert photography where the light is as much the star as the band.',
    },
    photos: ['cantanteBN', 'cantanteColor', 'mascara', 'microfono', 'grito'],
  },
];

export function getCollections(lang: Lang): Collection[] {
  const P = getPhotos(lang);
  return COLLECTIONS.map((c) => ({
    id: c.id,
    number: c.number,
    years: c.years,
    atmos: c.atmos,
    title: c.title[lang],
    kicker: c.kicker[lang],
    text: c.text[lang],
    photos: c.photos.map((k) => P[k]),
  }));
}
