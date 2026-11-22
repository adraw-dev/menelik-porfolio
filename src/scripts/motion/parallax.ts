// Parallax declarativo: data-depth (0–1.2) = cuánto se desplaza un plano respecto al scroll.
// El Hero y el stack de Altura tienen su propia coreografía y se excluyen.
import { gsap } from 'gsap';
import { SCRUB } from './tokens';

export function initParallax(amplitude: number) {
  const els = [...document.querySelectorAll<HTMLElement>('[data-depth]')].filter(
    (el) => !el.closest('[data-hero]') && !el.closest('[data-stack]'),
  );
  for (const el of els) {
    const d = Number(el.dataset.depth) || 0;
    if (!d) continue;
    const travel = d * amplitude;
    gsap.fromTo(
      el,
      { y: travel },
      {
        y: -travel,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: SCRUB },
      },
    );
  }
}
