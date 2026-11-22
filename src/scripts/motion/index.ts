// Punto único de entrada del movimiento. Todo se crea dentro de gsap.matchMedia():
//  - sin "prefers-reduced-motion": nada de pins, parallax ni scrub (el contenido ya es visible)
//  - escritorio: escenas fijadas completas; móvil: parallax a media amplitud, carruseles nativos
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { MQ } from './tokens';
import { initReveals } from './reveal';
import { initParallax } from './parallax';
import { initAtmosphere } from './atmosphere';
import { initPointer } from './pointer';
import { heroScroll, heroIntroSetup, stripScroll, stackScroll, awardScroll, processLine, chibiDraw } from './scenes';

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

export function initMotion() {
  const html = document.documentElement;
  const mm = gsap.matchMedia();
  let intro: ((tl: gsap.core.Timeline) => void) | null = null;
  let introDone = false;

  mm.add({ motion: MQ.motion, desktop: MQ.desktop, fine: MQ.fine }, (ctx) => {
    const { motion, desktop, fine } = ctx.conditions as Record<string, boolean>;
    if (!motion) {
      intro = null;
      return;
    }
    html.classList.add('has-motion', 'has-atmos');

    // los estados iniciales de la intro solo se aplican antes de que se reproduzca
    intro = introDone ? null : heroIntroSetup();
    heroScroll();
    initAtmosphere();
    initReveals();
    initParallax(desktop ? 70 : 32);
    chibiDraw();
    awardScroll();
    processLine(!desktop && innerWidth < 768);
    if (desktop) {
      stripScroll();
      stackScroll();
    }
    const stopPointer = desktop && fine ? initPointer() : null;

    return () => {
      stopPointer?.();
      html.classList.remove('has-motion', 'has-atmos');
    };
  });

  // Recalcular posiciones cuando las fuentes cambian la altura del texto
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return {
    /** Recibe la línea de tiempo de salida del loader y le encadena la intro del Hero. */
    playIntro(tl: gsap.core.Timeline) {
      intro?.(tl);
      introDone = true;
    },
    ready() {
      ScrollTrigger.refresh();
    },
  };
}
