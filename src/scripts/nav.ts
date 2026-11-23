// Estado de navegación (no es animación): menú móvil, barra de progreso, capítulo activo,
// riel lateral y "zona" clara/oscura bajo la barra. Funciona igual con o sin movimiento reducido.

const NAV_GROUPS: Record<string, string[]> = {
  '#sobre': ['sobre'],
  '#trabajo': ['trabajo', 'celebraciones', 'ruta', 'pueblo', 'altura', 'escena'],
  '#video': ['premio', 'video'],
  '#servicios': ['servicios'],
  '#contacto': ['contacto'],
};

export function initNav() {
  const html = document.documentElement;
  initMenu(html);

  const bar = document.querySelector<HTMLElement>('[data-progress-bar]');
  const header = document.querySelector<HTMLElement>('[data-nav]');
  let scrolled: boolean | null = null;
  const rail = document.querySelector<HTMLElement>('[data-rail]');
  const railList = document.querySelector<HTMLElement>('[data-rail-list]');
  const railCurrent = document.querySelector<HTMLElement>('[data-rail-current]');
  const railTotal = document.querySelector<HTMLElement>('[data-rail-total]');
  const navLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const langSwitch = document.querySelector<HTMLAnchorElement>('[data-lang-switch]');

  const chapters = [...document.querySelectorAll<HTMLElement>('[data-chapter]')];
  const zoned = [...document.querySelectorAll<HTMLElement>('section[data-atmos]')];

  // Construir el riel a partir de los capítulos del documento
  const railLinks = chapters.map((sec, i) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `#${sec.id}`;
    a.innerHTML = `<span class="rail__label">${sec.dataset.chapter}</span><span class="rail__dot"></span>`;
    a.setAttribute('aria-label', `${String(i + 1).padStart(2, '0')}. ${sec.dataset.chapter}`);
    li.appendChild(a);
    railList?.appendChild(li);
    return a;
  });
  if (railTotal) railTotal.textContent = String(chapters.length).padStart(2, '0');

  let activeId = '';
  let zone = '';
  let railZone = '';
  let ticking = false;

  function update() {
    ticking = false;
    const vh = innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;

    // barra transparente en la parte superior; de vidrio en cuanto se baja
    const s = scrollY > 12;
    if (s !== scrolled) {
      scrolled = s;
      header?.classList.toggle('is-scrolled', s);
    }

    // capítulo que cruza el centro de la pantalla
    let current = chapters[0];
    for (const sec of chapters) {
      const r = sec.getBoundingClientRect();
      if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) current = sec;
    }
    if (current && current.id !== activeId) {
      activeId = current.id;
      const idx = chapters.indexOf(current);
      railLinks.forEach((a, i) => (i === idx ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      if (railCurrent) railCurrent.textContent = String(idx + 1).padStart(2, '0');
      // el cambio de idioma conserva la sección en la que está la persona
      if (langSwitch) langSwitch.href = langSwitch.dataset.langSwitch + (activeId === 'inicio' ? '' : `#${activeId}`);
      for (const link of navLinks) {
        const group = NAV_GROUPS[link.getAttribute('href') || ''] || [];
        if (group.includes(activeId)) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      }
    }

    // zona bajo la barra superior (para el color de la navegación) y bajo el riel
    const zoneAt = (y: number) => {
      for (const sec of zoned) {
        const r = sec.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) return sec.dataset.atmos === 'night' ? 'dark' : 'light';
      }
      return 'light';
    };
    const z = zoneAt(36);
    if (z !== zone) {
      zone = z;
      html.dataset.zone = z;
    }
    const rz = zoneAt(vh * 0.5);
    if (rail && rz !== railZone) {
      railZone = rz;
      rail.dataset.zone = rz;
    }
  }

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  update();
}

function initMenu(html: HTMLElement) {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;
  const label = toggle.querySelector('.nav__toggle-label');

  const set = (open: boolean) => {
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) || '';
    html.classList.toggle('is-locked', open);
    html.classList.toggle('menu-open', open);
    if (open) menu.querySelector<HTMLAnchorElement>('a')?.focus();
  };

  toggle.addEventListener('click', () => set(menu.hidden));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('[data-menu-link]')) set(false);
  });
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      set(false);
      toggle.focus();
    }
  });
  matchMedia('(min-width: 900px)').addEventListener('change', (e) => e.matches && set(false));
}
