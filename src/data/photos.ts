// Manifiesto fotográfico. Los archivos se importan directamente desde info-mene/imagenes
// (sin copiarlos); Astro genera las versiones optimizadas al compilar.
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../../info-mene/imagenes/*.{jpg,jpeg,JPG,JPEG}',
  { eager: true },
);

const byName = new Map(
  Object.entries(files).map(([p, mod]) => [p.split('/').pop()!, mod.default]),
);

export type CollectionId = 'celebraciones' | 'ruta' | 'pueblo' | 'altura' | 'escena';

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

function photo(file: string, data: Omit<Photo, 'file' | 'src'>): Photo {
  const src = byName.get(file);
  if (!src) throw new Error(`Foto no encontrada en info-mene/imagenes: ${file}`);
  return { file, src, ...data };
}

export const P = {
  // Eventos y celebraciones
  bautizo: photo('DSC04264.jpg', { title: 'Bautizo', alt: 'Bebé en brazos de su madre mientras un hombre sostiene una vela encendida durante un bautizo en una iglesia de ladrillo.', year: 2022, tag: 'Celebraciones' }),
  globos: photo('DSC04376 (1).jpg', { title: 'Globos celestes', alt: 'Bebé con camisa blanca y tirantes mira hacia un lado frente a un arreglo de globos blancos, plateados y celestes.', year: 2022, tag: 'Celebraciones', focal: '62% 45%' }),
  comunion: photo('DSC08359.jpg', { title: 'Primera comunión', alt: 'Niño de traje negro y guantes blancos con las manos juntas frente a un altar adornado con poinsettias rojas y luces navideñas.', year: 2025, tag: 'Celebraciones' }),
  evento: photo('_MG_9702.jpg', { title: 'Rueda de negocios', alt: 'Dos personas concentradas frente a portátiles en una mesa numerada durante una rueda de negocios.', year: 2024, tag: 'Eventos', focal: '55% 50%' }),
  // En ruta
  motera: photo('DSC04804.jpg', { title: 'Casco en mano', alt: 'Mujer sentada en el borde de una carretera junto a barandas amarillas, abrazando su casco de moto bajo un cielo pastel.', year: 2023, tag: 'Retrato', focal: '55% 45%' }),
  motero: photo('DSC04816.jpg', { title: 'Visor celeste', alt: 'Hombre con gafas oscuras y camiseta de motocross sostiene un casco con visor espejado celeste.', year: 2023, tag: 'Retrato', focal: '55% 35%' }),
  arbol: photo('DSC04847.jpg', { title: 'Árbol en el pastizal', alt: 'Árbol solitario de copa amplia en medio de un pastizal dorado movido por el viento.', year: 2023, tag: 'Paisaje' }),
  // Pueblo
  balcon: photo('DSC09334.jpg', { title: 'Balcón tallado', alt: 'Balcón de madera tallada con faroles y macetas de flores bajo un alero de tejas.', year: 2026, tag: 'Viaje' }),
  campesino: photo('DSC09341.jpg', { title: 'Entre flores', alt: 'Hombre mayor con sombrero aguadeño camina entre flores moradas frente a una casa blanca de balcones verdes.', year: 2026, tag: 'Viaje', focal: '65% 60%' }),
  portada: photo('DSC09406.jpg', { title: 'La portada', alt: 'Perro tendido en las escaleras de una portada neogótica con la inscripción HIC DOMUS DEI ET PORTA CELI y vitrales al fondo.', year: 2026, tag: 'Arquitectura' }),
  bolso: photo('DSC09416.jpg', { title: 'Compañero de viaje', alt: 'Perro pinscher asoma la cabeza desde un bolso de cuadros bajo un árbol.', year: 2026, tag: 'Viaje' }),
  basilica: photo('DSC09441.jpg', { title: 'Frente a la basílica', alt: 'Perro pinscher con chaqueta y arnés en primer plano frente a la torre de una basílica y nubes blancas.', year: 2026, tag: 'Viaje' }),
  // Altura
  canon: photo('DSC08988.JPG.jpeg', { title: 'Cañón y cascada', alt: 'Cañón de alta montaña con paredes de roca oscura y una cascada al fondo bajo nubes.', year: 2025, tag: 'Paisaje' }),
  frailejones: photo('DSC09011.jpg', { title: 'Frailejones', alt: 'Frailejones altos sobre una ladera de pajonal contra un cielo azul profundo.', year: 2025, tag: 'Paisaje' }),
  arroyo: photo('DSC09064 (1).jpg', { title: 'Agua sobre musgo', alt: 'Agua que baja entre rocas cubiertas de musgo rojizo con una fila de frailejones en la cima neblinosa.', year: 2025, tag: 'Paisaje' }),
  valle: photo('DSC09093 (1).jpg', { title: 'Valle en niebla', alt: 'Valle de páramo cubierto de niebla con laderas iluminadas por una luz tenue.', year: 2025, tag: 'Paisaje' }),
  retrato: photo('DSC09102.jpg', { title: 'Menelik', alt: 'Menelik Puerta con gafas y gorro tejido rojo sonríe frente a una ladera de musgo verde.', year: 2025, tag: 'Retrato', focal: '60% 40%' }),
  farallon: photo('DSC09119.jpg', { title: 'Farallón', alt: 'Farallón de roca gris con restos de nieve y niebla sobre una planicie de arena.', year: 2025, tag: 'Paisaje' }),
  planta: photo('DSC09136.jpg', { title: 'Flora de páramo', alt: 'Primer plano de una planta de páramo de hojas escamosas con pequeñas flores secas y fondo desenfocado.', year: 2025, tag: 'Naturaleza' }),
  niebla: photo('DSC09172.jpg', { title: 'Figura en la niebla', alt: 'Una figura diminuta de pie sobre un afloramiento de rocas en medio de una planicie envuelta en niebla.', year: 2025, tag: 'Paisaje', focal: '50% 60%' }),
  // Escena
  cantanteColor: photo('IMG_20261030_223918_492@-1379222707 (1).jpg', { title: 'Luz violeta', alt: 'Cantante con astas de ciervo y maquillaje oscuro canta bajo una luz violeta difusa.', year: 2026, tag: 'Música en vivo' }),
  cantanteBN: photo('IMG_20261030_224153_049@-1379201843 (1).jpg', { title: 'Voz', alt: 'Fotografía en blanco y negro de una cantante con astas de ciervo cantando con fuerza al micrófono.', year: 2026, tag: 'Música en vivo', focal: '50% 35%' }),
  mascara: photo('IMG_3666 (1).jpg', { title: 'Máscara', alt: 'Músico con capucha y máscara de calavera bajo luz azul y violeta.', year: 2026, tag: 'Música en vivo' }),
  microfono: photo('IMG_3821.jpg', { title: 'Astas', alt: 'Cantante con astas sostiene el micrófono junto al rostro bajo luces magenta.', year: 2026, tag: 'Música en vivo' }),
  grito: photo('IMG_3859.jpg', { title: 'Canto', alt: 'Cantante con astas y collares canta con los ojos cerrados bajo luz violeta.', year: 2026, tag: 'Música en vivo' }),
  // Sueltas
  orquideorama: photo('1628559855266.jpg', { title: 'Estructura de luz', alt: 'Estructura de madera en forma de flores hexagonales filtra la luz dorada del sol sobre un jardín.', year: 2019, tag: 'Arquitectura' }),
  piedad: photo('1628563738101.jpg', { title: 'La Piedad', alt: 'Escultura de mármol de la Piedad bajo un arco blanco, con cipreses y cielo azul al fondo.', year: 2019, tag: 'Arquitectura' }),
  gata: photo('DSC09597.jpg', { title: 'En casa', alt: 'Gata blanca con manchas atigradas estira una pata hacia arriba bajo la luz de una ventana.', year: 2026, tag: 'Mascotas' }),
  premio: photo('premio.jpg', { title: 'Noche de lluvia', alt: 'Noche de lluvia en una cancha: un reflector ilumina la lluvia y una persona sentada sola sobre el césped.', year: 2020, tag: 'Premiada' }),
} as const;

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

export const collections: Collection[] = [
  {
    id: 'celebraciones', number: '01', title: 'Eventos y celebraciones', kicker: 'Eventos · Familia',
    years: '2022 — 2025', atmos: 'day',
    text: 'Bautizos, primeras comuniones y cobertura de eventos. Momentos que pasan una sola vez y se quedan en la familia.',
    photos: [P.globos, P.bautizo, P.comunion, P.evento],
  },
  {
    id: 'ruta', number: '02', title: 'En ruta', kicker: 'Retrato · Exteriores',
    years: '2023', atmos: 'day',
    text: 'Una sesión de retrato en carretera: casco en mano, barandas amarillas y el paisaje del camino.',
    photos: [P.motera, P.motero, P.arbol],
  },
  {
    id: 'pueblo', number: '03', title: 'Pueblo', kicker: 'Viaje · Calle',
    years: '2026', atmos: 'day',
    text: 'Balcones tallados, flores, una basílica y un pequeño compañero de viaje. Un día de pueblo contado en detalles.',
    photos: [P.balcon, P.campesino, P.portada, P.bolso, P.basilica],
  },
  {
    id: 'altura', number: '04', title: 'Altura', kicker: 'Paisaje · Páramo',
    years: '2025', atmos: 'fog',
    text: 'Una jornada en el páramo: frailejones, agua sobre musgo, roca, nieve y una niebla que lo cambia todo.',
    photos: [P.frailejones, P.valle, P.arroyo, P.farallon, P.canon, P.planta],
  },
  {
    id: 'escena', number: '05', title: 'Escena', kicker: 'Música en vivo',
    years: '2026', atmos: 'night',
    text: 'Luces violeta, astas, máscaras y voz. Fotografía de concierto donde la luz es tan protagonista como la banda.',
    photos: [P.cantanteBN, P.cantanteColor, P.mascara, P.microfono, P.grito],
  },
];
