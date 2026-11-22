// Visor de fotografías sobre <dialog> nativo: teclado, deslizamiento táctil, contador,
// precarga de vecinas y transición FLIP desde la miniatura (solo con movimiento permitido).
import { gsap } from 'gsap';

interface Item {
  link: HTMLAnchorElement;
  src: string;
  alt: string;
  caption: string;
}

export function initLightbox() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  if (!dialog) return;
  const media = dialog.querySelector<HTMLElement>('[data-lightbox-media]')!;
  const cap = dialog.querySelector<HTMLElement>('[data-lightbox-caption]')!;
  const count = dialog.querySelector<HTMLElement>('[data-lightbox-count]')!;
  const html = document.documentElement;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

  const groups = new Map<string, Item[]>();
  for (const link of document.querySelectorAll<HTMLAnchorElement>('a[data-lightbox]')) {
    const g = link.dataset.lightbox!;
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push({ link, src: link.href, alt: link.dataset.alt || '', caption: link.dataset.caption || '' });
  }

  let group: Item[] = [];
  let index = 0;
  let img: HTMLImageElement | null = null;
  let trigger: HTMLElement | null = null;

  function preload(i: number) {
    const it = group[(i + group.length) % group.length];
    if (it) new Image().src = it.src;
  }

  async function show(i: number, origin?: Element | null) {
    index = (i + group.length) % group.length;
    const it = group[index];
    const next = new Image();
    next.alt = it.alt;
    next.decoding = 'async';
    next.src = it.src;
    try {
      await next.decode();
    } catch {
      /* se muestra igual */
    }
    media.replaceChildren(next);
    img = next;
    cap.textContent = it.caption;
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(group.length).padStart(2, '0')}`;
    preload(index + 1);
    preload(index - 1);

    if (reduced()) return;
    if (origin) {
      const from = origin.getBoundingClientRect();
      const to = next.getBoundingClientRect();
      gsap.fromTo(
        next,
        { x: from.left - to.left, y: from.top - to.top, scaleX: from.width / to.width, scaleY: from.height / to.height },
        { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: 0.75, ease: 'expo.out', clearProps: 'transform' },
      );
    } else {
      gsap.fromTo(next, { opacity: 0, scale: 0.985 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out', clearProps: 'all' });
    }
  }

  function open(name: string, i: number, origin?: Element | null) {
    trigger = document.activeElement as HTMLElement | null;
    group = groups.get(name) || [];
    if (!group.length) return;
    html.classList.add('is-locked');
    dialog!.showModal();
    show(i, origin);
  }

  function close() {
    if (dialog!.open) dialog!.close();
  }

  dialog.addEventListener('close', () => {
    html.classList.remove('is-locked');
    media.replaceChildren();
    img = null;
    trigger?.focus?.({ preventScroll: true });
  });

  document.addEventListener('click', (e) => {
    const me = e as MouseEvent;
    if (me.button !== 0 || me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
    const target = e.target as HTMLElement;
    const link = target.closest<HTMLAnchorElement>('a[data-lightbox]');
    if (link) {
      e.preventDefault();
      const name = link.dataset.lightbox!;
      const list = groups.get(name) || [];
      open(name, list.findIndex((it) => it.link === link), link.querySelector('img'));
      return;
    }
    const opener = target.closest<HTMLElement>('[data-open-collection]');
    if (opener) {
      const name = opener.dataset.openCollection!;
      open(name, 0, groups.get(name)?.[0]?.link.querySelector('img'));
    }
  });

  dialog.querySelector('[data-lightbox-prev]')!.addEventListener('click', () => show(index - 1));
  dialog.querySelector('[data-lightbox-next]')!.addEventListener('click', () => show(index + 1));
  dialog.querySelector('[data-lightbox-close]')!.addEventListener('click', close);

  // clic en el fondo cierra
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog || (e.target as HTMLElement).classList.contains('lightbox__figure')) close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); show(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(index - 1); }
  });

  // deslizamiento táctil
  let startX = 0;
  let startY = 0;
  dialog.addEventListener('pointerdown', (e) => { startX = e.clientX; startY = e.clientY; });
  dialog.addEventListener('pointerup', (e) => {
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - startY) && img) show(index + (dx < 0 ? 1 : -1));
  });
}
