// Coreografías por escena (scroll-driven). Cada función es independiente y se crea dentro del
// contexto de gsap.matchMedia, así que se revierte sola al cambiar de breakpoint o preferencia.
import { gsap } from 'gsap';
import { SCRUB, EASE } from './tokens';

/* ---------- Hero: la composición se desarma con el scroll ---------- */
export function heroScroll() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return;
  const q = gsap.utils.selector(hero);
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom bottom', scrub: SCRUB },
  });
  tl.to(q('[data-hero-bg]'), { scale: 1.14, yPercent: 7 }, 0)
    .to(q('.hero__copy'), { yPercent: -22, opacity: 0 }, 0)
    .to(q('.print--a'), { yPercent: -140 }, 0)
    .to(q('.print--b'), { yPercent: -70 }, 0)
    .to(q('.print--c'), { yPercent: -190 }, 0)
    .to(q('.hero__exif, .hero__cue'), { opacity: 0, duration: 0.25 }, 0)
    .to(q('.hero__veil'), { opacity: 0.4 }, 0);
}

/** Estados iniciales + intro del Hero (se encadena a la salida del loader). */
export function heroIntroSetup() {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return null;
  const q = gsap.utils.selector(hero);
  const lines = q('[data-hero-line]');
  const fades = q('[data-hero-fade]');
  const prints = q('.print .photo__frame');
  const bg = q('[data-hero-bg] .photo');
  gsap.set(lines, { yPercent: 110 });
  gsap.set(fades, { opacity: 0, y: 16 });
  gsap.set(prints, { opacity: 0, y: 90 });
  gsap.set(bg, { scale: 1.16 });

  return (tl: gsap.core.Timeline, at: number | string = 0.55) => {
    tl.to(bg, { scale: 1, duration: 2.2, ease: EASE.out }, at)
      .to(lines, { yPercent: 0, duration: 1.3, ease: EASE.out, stagger: 0.12 }, `${at}+=0.35`)
      .to(prints, { opacity: 1, y: 0, duration: 1.4, ease: EASE.out, stagger: 0.14 }, `${at}+=0.5`)
      .to(fades, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.08, clearProps: 'transform' }, `${at}+=0.75`);
  };
}

/* ---------- En ruta: tira horizontal fijada ---------- */
export function stripScroll() {
  for (const sec of document.querySelectorAll<HTMLElement>('[data-strip]')) {
    const track = sec.querySelector<HTMLElement>('[data-strip-track]');
    if (!track) continue;
    gsap.to(track, {
      x: () => -(track.scrollWidth - innerWidth),
      ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: SCRUB, invalidateOnRefresh: true },
    });
  }
}

/* ---------- Altura: stack cinematográfico con niebla ---------- */
export function stackScroll() {
  for (const sec of document.querySelectorAll<HTMLElement>('[data-stack]')) {
    const scene = sec.querySelector<HTMLElement>('.stack__scene')!;
    const layers = gsap.utils.toArray<HTMLElement>(sec.querySelectorAll('[data-stack-layer]'));
    const captions = gsap.utils.toArray<HTMLElement>(sec.querySelectorAll('[data-stack-caption]'));
    const fog = sec.querySelector<HTMLElement>('[data-stack-fog]');
    const counter = sec.querySelector<HTMLElement>('[data-stack-current]');
    const n = layers.length;
    let active = -1;
    const setActive = (i: number) => {
      if (i === active) return;
      active = i;
      captions.forEach((c, k) => c.classList.toggle('is-active', k === i));
      if (counter) counter.textContent = String(i + 1).padStart(2, '0');
    };
    setActive(0);

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: scene,
        start: 'top top',
        end: 'bottom bottom',
        scrub: SCRUB,
        onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
      },
    });
    // la primera foto entra con un ligero acercamiento; cada cambio pasa por un velo de niebla
    tl.fromTo(layers[0], { scale: 1.05 }, { scale: 1, duration: 1 }, 0);
    for (let i = 1; i < n; i++) {
      const at = i;
      if (fog) {
        tl.fromTo(fog, { opacity: 0, xPercent: -6 }, { opacity: 1, xPercent: 0, duration: 0.35 }, at - 0.35)
          .to(fog, { opacity: 0, xPercent: 6, duration: 0.45 }, at);
      }
      tl.fromTo(layers[i], { opacity: 0, scale: 1.07 }, { opacity: 1, scale: 1, duration: 0.6 }, at - 0.2);
      tl.to(layers[i - 1], { opacity: 0, duration: 0.3 }, at + 0.1);
    }
    tl.to({}, { duration: 0.6 }); // respiro final
  }
}

/* ---------- Premio: el reflector se expande hacia la noche ---------- */
export function awardScroll() {
  const sec = document.querySelector<HTMLElement>('[data-award]');
  const glow = sec?.querySelector<HTMLElement>('[data-award-glow]');
  if (!sec || !glow) return;
  gsap.fromTo(
    glow,
    { scale: 0.45, opacity: 0.4 },
    { scale: 1.5, opacity: 1, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: SCRUB } },
  );
}

/* ---------- Servicios: línea del proceso ---------- */
export function processLine(vertical: boolean) {
  const line = document.querySelector<HTMLElement>('[data-process-line]');
  const list = document.querySelector<HTMLElement>('[data-process]');
  if (!line || !list) return;
  gsap.fromTo(
    line,
    vertical ? { scaleY: 0 } : { scaleX: 0 },
    {
      ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
      ease: 'none',
      scrollTrigger: { trigger: list, start: 'top 80%', end: 'bottom 55%', scrub: SCRUB },
    },
  );
}

/* ---------- Chibi: se vuelve a trazar con el scroll (eco del loader) ---------- */
export function chibiDraw() {
  for (const svg of document.querySelectorAll<SVGSVGElement>('svg[data-draw]')) {
    const paths = [...svg.querySelectorAll<SVGPathElement>('path')];
    const maxDelay = Math.max(...paths.map((p) => Number(p.dataset.delay) || 0), 1);
    const tl = gsap.timeline({
      scrollTrigger: { trigger: svg, start: 'top 85%', end: 'center 45%', scrub: SCRUB },
    });
    for (const p of paths) {
      const len = p.getTotalLength();
      const d = (Number(p.dataset.delay) || 0) / maxDelay;
      tl.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: 'none', duration: 1 }, d * 0.6);
    }
  }
}
