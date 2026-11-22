// Interacciones de cursor (solo escritorio con puntero fino):
//  - UN bucle rAF con lerp que escribe --mx/--my en los campos visibles ([data-hero], [data-tilt-field])
//  - inclinación de tarjetas [data-tilt], botones magnéticos [data-magnetic]
//  - vista previa de servicios que sigue al cursor
import { gsap } from 'gsap';

export function initPointer() {
  const cleanups: Array<() => void> = [];
  const fields = [...document.querySelectorAll<HTMLElement>('[data-hero], [data-tilt-field]')];
  const visible = new Set<HTMLElement>();

  for (const f of fields) {
    for (const el of f.querySelectorAll<HTMLElement>('[data-depth]')) el.style.setProperty('--d', el.dataset.depth || '0');
  }
  document.documentElement.classList.add('has-pointer');
  cleanups.push(() => document.documentElement.classList.remove('has-pointer'));

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? visible.add(e.target as HTMLElement) : visible.delete(e.target as HTMLElement);
  });
  fields.forEach((f) => io.observe(f));
  cleanups.push(() => io.disconnect());

  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const loop = () => {
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    for (const f of visible) {
      f.style.setProperty('--mx', cx.toFixed(4));
      f.style.setProperty('--my', cy.toFixed(4));
    }
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
  };
  const onMove = (e: PointerEvent) => {
    tx = (e.clientX / innerWidth) * 2 - 1;
    ty = (e.clientY / innerHeight) * 2 - 1;
    if (!raf) raf = requestAnimationFrame(loop);
  };
  addEventListener('pointermove', onMove, { passive: true });
  cleanups.push(() => {
    removeEventListener('pointermove', onMove);
    cancelAnimationFrame(raf);
    fields.forEach((f) => (f.style.removeProperty('--mx'), f.style.removeProperty('--my')));
  });

  // Inclinación de tarjetas
  for (const card of document.querySelectorAll<HTMLElement>('[data-tilt]')) {
    gsap.set(card, { transformPerspective: 900 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 12);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
    };
    const leave = () => (rx(0), ry(0));
    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      card.removeEventListener('pointermove', move);
      card.removeEventListener('pointerleave', leave);
      gsap.set(card, { clearProps: 'transform' });
    });
  }

  // Botones magnéticos (desplazamiento leve)
  for (const btn of document.querySelectorAll<HTMLElement>('[data-magnetic]')) {
    const mx = gsap.quickTo(btn, 'x', { duration: 0.5, ease: 'power3.out' });
    const my = gsap.quickTo(btn, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = btn.getBoundingClientRect();
      mx((e.clientX - r.left - r.width / 2) * 0.22);
      my((e.clientY - r.top - r.height / 2) * 0.3);
    };
    const leave = () => (mx(0), my(0));
    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      btn.removeEventListener('pointermove', move);
      btn.removeEventListener('pointerleave', leave);
      gsap.set(btn, { clearProps: 'transform' });
    });
  }

  // Vista previa de servicios
  const list = document.querySelector<HTMLElement>('[data-svc]');
  const preview = document.querySelector<HTMLElement>('[data-svc-preview]');
  if (list && preview) {
    const px = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3.out' });
    const py = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3.out' });
    const imgs = [...preview.querySelectorAll<HTMLElement>('[data-svc-img]')];
    const move = (e: PointerEvent) => {
      px(e.clientX + 28);
      py(e.clientY - preview.offsetHeight / 2);
      const item = (e.target as HTMLElement).closest<HTMLElement>('[data-svc-item]');
      const idx = item?.dataset.svcItem;
      preview.classList.toggle('is-on', !!idx);
      imgs.forEach((im) => im.classList.toggle('is-on', im.dataset.svcImg === idx));
    };
    const leave = () => preview.classList.remove('is-on');
    list.addEventListener('pointermove', move);
    list.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      list.removeEventListener('pointermove', move);
      list.removeEventListener('pointerleave', leave);
    });
  }

  return () => cleanups.forEach((fn) => fn());
}
