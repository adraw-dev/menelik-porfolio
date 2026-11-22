// Viaje de color "del celeste a la noche": fundido de opacidad entre 4 capas fijas (solo compositor).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function initAtmosphere() {
  const layers = new Map(
    [...document.querySelectorAll<HTMLElement>('[data-atmos-layer]')].map((l) => [l.dataset.atmosLayer!, l]),
  );
  let current = 'dawn';

  const set = (name: string) => {
    if (name === current || !layers.has(name)) return;
    current = name;
    layers.forEach((layer, key) =>
      gsap.to(layer, { opacity: key === name ? 1 : 0, duration: 0.9, ease: 'power2.inOut', overwrite: true }),
    );
  };

  for (const sec of document.querySelectorAll<HTMLElement>('section[data-atmos]')) {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: (self) => self.isActive && set(sec.dataset.atmos!),
    });
  }
}
