// Revelados declarativos: los componentes solo marcan data-reveal="lines|scrub-words|fade|rise|focus".
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { DUR, EASE } from './tokens';

const imgReady = (img: HTMLImageElement) =>
  img.complete && img.naturalWidth
    ? Promise.resolve()
    : new Promise<void>((r) => {
        img.addEventListener('load', () => r(), { once: true });
        img.addEventListener('error', () => r(), { once: true });
      });

export function initReveals() {
  // Titulares: líneas enmascaradas
  for (const el of document.querySelectorAll<HTMLElement>('[data-reveal="lines"]')) {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit(self) {
        return gsap.from(self.lines, {
          yPercent: 108,
          duration: DUR.reveal,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      },
    });
  }

  // Biografía: palabras que se "encienden" con el progreso del scroll
  for (const el of document.querySelectorAll<HTMLElement>('[data-reveal="scrub-words"]')) {
    SplitText.create(el, {
      type: 'words',
      autoSplit: true,
      onSplit(self) {
        return gsap.fromTo(
          self.words,
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 48%', scrub: true },
          },
        );
      },
    });
  }

  // Fundidos y subidas por lotes (un trigger por grupo visible, no uno por elemento)
  gsap.set('[data-reveal="fade"]', { opacity: 0, y: 18 });
  ScrollTrigger.batch('[data-reveal="fade"]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: DUR.fade, ease: EASE.soft, stagger: 0.08, clearProps: 'transform' }),
  });

  gsap.set('[data-reveal="rise"]', { opacity: 0, y: 40 });
  ScrollTrigger.batch('[data-reveal="rise"]', {
    start: 'top 92%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: DUR.reveal, ease: EASE.out, stagger: 0.09, clearProps: 'transform' }),
  });

  // "Rack focus": la imagen nítida aparece sobre su placeholder desenfocado
  const focusImgs = [...document.querySelectorAll<HTMLElement>('[data-reveal="focus"]')]
    .map((fig) => fig.querySelector<HTMLImageElement>('.photo__img'))
    .filter((x): x is HTMLImageElement => !!x);
  gsap.set(focusImgs, { opacity: 0, scale: 1.06 });
  ScrollTrigger.batch(focusImgs, {
    start: 'top 94%',
    once: true,
    onEnter: (els) =>
      els.forEach((img, i) =>
        imgReady(img as HTMLImageElement).then(() =>
          gsap.to(img, { opacity: 1, scale: 1, duration: DUR.focus, ease: EASE.out, delay: i * 0.08, clearProps: 'transform,opacity' }),
        ),
      ),
  });
}
