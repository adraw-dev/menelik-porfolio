import { initNav } from './nav';
import { initLightbox } from './lightbox';
import { initEmbeds } from './embeds';
import { initMotion } from './motion';
import { runLoader } from './loader';

initNav();
initLightbox();
initEmbeds();

// El sistema de movimiento se prepara mientras el loader cubre la pantalla;
// el loader entrega la "salida" y la intro del Hero se encadena con ella.
const motion = initMotion();
runLoader({ onExit: motion.playIntro }).then(() => motion.ready());
