// Loader integrado — adaptación del original (loader-animated.html):
// misma curva, mismos desfases por trazo y mismo layout responsive; reproducción única a ×0.75
// (≈2.9 s), versión corta si ya se vio en la sesión y salida coreografiada hacia la navegación.
import { gsap } from 'gsap';

const SPEED = 0.75;
const DRAW = 2650 * SPEED;
const FILL_AT = 3100 * SPEED;
const FILL_DUR = 700 * SPEED;
const DONE_AT = FILL_AT + FILL_DUR + 180;
const HERO_WAIT_MAX = 2500;
const SEEN_KEY = 'mp-intro-visto';

const ease = (v: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, v)));
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function storage(op: 'get' | 'set') {
  try {
    if (op === 'get') return sessionStorage.getItem(SEEN_KEY) === '1';
    sessionStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* modo privado: se ignora */
  }
  return false;
}

function heroImageReady() {
  const img = document.querySelector<HTMLImageElement>('[data-hero-bg] img');
  if (!img || img.complete) return Promise.resolve();
  return Promise.race([
    new Promise<void>((r) => {
      img.addEventListener('load', () => r(), { once: true });
      img.addEventListener('error', () => r(), { once: true });
    }),
    wait(HERO_WAIT_MAX),
  ]);
}

function unionRect(els: Iterable<Element>) {
  let l = Infinity, t = Infinity, r = -Infinity, b = -Infinity;
  for (const el of els) {
    const q = el.getBoundingClientRect();
    l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
  }
  return { left: l, top: t, width: r - l, height: b - t };
}

interface Options {
  onExit: (tl: gsap.core.Timeline) => void;
}

export function runLoader({ onExit }: Options): Promise<void> {
  const html = document.documentElement;
  const root = document.querySelector<HTMLElement>('[data-loader]');
  if (!root) {
    html.classList.remove('is-loading');
    return Promise.resolve();
  }

  const svg = root.querySelector('svg')!;
  const outline = root.querySelector<SVGGElement>('.cl-outline')!;
  const filled = root.querySelector<SVGGElement>('.cl-filled')!;
  const raster = root.querySelector<SVGImageElement>('.cl-raster')!;
  const words = [...root.querySelectorAll<SVGGElement>('.cl-word')];
  const bg = root.querySelector<HTMLElement>('[data-loader-bg]')!;
  const stage = root.querySelector<HTMLElement>('[data-loader-stage]')!;
  const skip = root.querySelector<HTMLButtonElement>('[data-loader-skip]')!;

  const paths = [...outline.querySelectorAll<SVGPathElement>('path')].map((p) => {
    const len = p.getTotalLength();
    p.style.strokeDasharray = String(len);
    p.style.strokeDashoffset = String(len);
    return { p, len, delay: (Number(p.dataset.delay) || 0) * SPEED };
  });

  // Layout responsive idéntico al original (horizontal / apilado)
  const wb = words[0].getBBox();
  let stacked: boolean | null = null;
  function layout() {
    const s = root!.clientWidth / Math.max(1, root!.clientHeight) < 1.05;
    if (s === stacked) return;
    stacked = s;
    const CW = 1199, CH = 1312, GAP = s ? 150 : 170, PAD = 40;
    let vb: number[], tx: number, ty: number, cx = 0;
    if (!s) {
      tx = CW + GAP - wb.x; ty = (CH - wb.height) / 2 - wb.y;
      vb = [-PAD, -PAD, CW + GAP + wb.width + 2 * PAD, CH + 2 * PAD];
    } else {
      const W = Math.max(CW, wb.width); cx = (W - CW) / 2; tx = (W - wb.width) / 2 - wb.x; ty = CH + GAP - wb.y;
      vb = [-PAD, -PAD, W + 2 * PAD, CH + GAP + wb.height + 2 * PAD];
    }
    svg.setAttribute('viewBox', vb.join(' '));
    svg.style.setProperty('--ar', (vb[2] / vb[3]).toFixed(4));
    root!.querySelectorAll('.cl-chibi').forEach((g) => g.setAttribute('transform', `translate(${cx} 0)`));
    words.forEach((g) => g.setAttribute('transform', `translate(${tx} ${ty})`));
  }
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(root);

  let rasterOk = true;
  function render(t: number) {
    for (const s of paths) s.p.style.strokeDashoffset = String(s.len * (1 - ease((t - s.delay) / DRAW)));
    const f = rasterOk ? ease((t - FILL_AT) / FILL_DUR) : 0;
    filled.setAttribute('opacity', String(f));
    outline.setAttribute('opacity', String(1 - f));
  }
  function staticFinal() {
    for (const s of paths) s.p.style.strokeDashoffset = '0';
    filled.setAttribute('opacity', rasterOk ? '1' : '0');
    outline.setAttribute('opacity', rasterOk ? '0' : '1');
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = storage('get');

  return new Promise<void>((resolve) => {
    let raf = 0;
    let finished = false;
    let skipRequested = false;

    const decode = new Image();
    decode.src = raster.getAttribute('href') || '';
    const rasterReady = decode
      .decode()
      .catch(() => {
        rasterOk = false;
      });

    const finish = () => {
      if (finished) return;
      finished = true;
      cancelAnimationFrame(raf);
      staticFinal();
      exit();
    };

    skip.addEventListener('click', () => {
      skipRequested = true;
      finish();
    });

    async function play() {
      await rasterReady;
      if (reduced || seen) {
        staticFinal();
        await Promise.all([wait(reduced ? 600 : 380), heroImageReady()]);
        return finish();
      }
      let elapsed = 0;
      let last: number | null = null;
      const drawn = new Promise<void>((done) => {
        const frame = (now: number) => {
          // rAF se pausa solo en pestañas ocultas; el tiempo se acumula como en el original
          if (last !== null) elapsed += Math.min(64, now - last);
          last = now;
          render(elapsed);
          if (elapsed >= DONE_AT) return done();
          raf = requestAnimationFrame(frame);
        };
        raf = requestAnimationFrame(frame);
      });
      await Promise.all([drawn, heroImageReady()]);
      if (!skipRequested) finish();
    }

    function exit() {
      storage('set');
      ro.disconnect();
      const navLogo = document.querySelector<SVGSVGElement>('.nav__logo');
      const word = filled.querySelector('.cl-word');
      // Se libera el scroll en cuanto el telón se retira; la intro del Hero sigue corriendo.
      let released = false;
      const release = () => {
        if (released) return;
        released = true;
        html.classList.remove('is-loading');
        navLogo?.style.removeProperty('visibility');
        resolve();
      };
      const tl = gsap.timeline({ onComplete: release });

      if (reduced || !navLogo || !word) {
        tl.to(root, { autoAlpha: 0, duration: 0.45, ease: 'power1.out' }).add(release);
        onExit(tl);
        return;
      }

      // FLIP del wordmark: del loader a su sitio en la navegación
      const from = unionRect(word.querySelectorAll('path'));
      const navBox = navLogo.getBoundingClientRect();
      const clone = navLogo.cloneNode(true) as SVGSVGElement;
      document.body.appendChild(clone);
      Object.assign(clone.style, {
        position: 'fixed',
        left: `${navBox.left}px`,
        top: `${navBox.top}px`,
        width: `${navBox.width}px`,
        height: `${navBox.height}px`,
        margin: '0',
        zIndex: '101',
        transformOrigin: '0 0',
        color: getComputedStyle(document.documentElement).getPropertyValue('--relleno') || '#faf6f9',
        pointerEvents: 'none',
      });
      const to = unionRect(clone.querySelectorAll('path'));
      const s = from.width / to.width;
      gsap.set(clone, {
        x: from.left - navBox.left - s * (to.left - navBox.left),
        y: from.top - navBox.top - s * (to.top - navBox.top),
        scale: s,
      });
      (word as SVGGElement).style.opacity = '0';
      navLogo.style.visibility = 'hidden';

      const chibis = root!.querySelectorAll('.cl-chibi');
      tl.to(chibis, { opacity: 0, scale: 0.9, svgOrigin: '600 656', duration: 0.6, ease: 'power2.in' }, 0)
        .to(skip, { autoAlpha: 0, duration: 0.3 }, 0)
        .to(clone, { x: 0, y: 0, scale: 1, color: '#13232c', duration: 1.15, ease: 'expo.inOut' }, 0.1)
        .to(bg, { clipPath: 'ellipse(150% 0% at 50% 0%)', duration: 1.1, ease: 'expo.inOut' }, 0.2)
        .set(stage, { autoAlpha: 0 }, 1.2)
        .add(() => {
          navLogo.style.removeProperty('visibility');
          clone.remove();
          release();
        }, 1.3);
      onExit(tl);
    }

    play();
  });
}
