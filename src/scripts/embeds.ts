// Instagram: el script y el iframe oficiales solo se cargan cuando la persona abre una pieza
// (patrón facade). Sin JS, las tarjetas son enlaces normales a Instagram.
declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

let scriptPromise: Promise<void> | null = null;
function loadScript() {
  scriptPromise ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://www.instagram.com/embed.js';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('embed.js'));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function initEmbeds() {
  const dialog = document.querySelector<HTMLDialogElement>('[data-embed-dialog]');
  if (!dialog) return;
  const body = dialog.querySelector<HTMLElement>('[data-embed-body]')!;
  const title = dialog.querySelector<HTMLElement>('[data-embed-dialog-title]')!;
  const link = dialog.querySelector<HTMLAnchorElement>('[data-embed-dialog-link]')!;
  const html = document.documentElement;

  document.addEventListener('click', async (e) => {
    const me = e as MouseEvent;
    if (me.button !== 0 || me.metaKey || me.ctrlKey || me.shiftKey || me.altKey) return;
    const card = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-embed]');
    if (!card) return;
    e.preventDefault();

    const url = card.dataset.embed!;
    title.textContent = card.dataset.embedTitle || 'Instagram';
    link.href = url;
    body.innerHTML = '<p class="embed__loading meta">Cargando desde Instagram…</p>';
    html.classList.add('is-locked');
    dialog.showModal();

    try {
      await loadScript();
      const q = document.createElement('blockquote');
      q.className = 'instagram-media';
      q.dataset.instgrmPermalink = url;
      q.dataset.instgrmVersion = '14';
      q.dataset.instgrmCaptioned = '';
      body.replaceChildren(q);
      window.instgrm?.Embeds.process();
    } catch {
      body.innerHTML = `<p class="embed__loading meta">No se pudo cargar la vista previa. <a href="${url}" target="_blank" rel="noopener">Ver en Instagram ↗</a></p>`;
    }
  });

  dialog.querySelector('[data-embed-close]')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => e.target === dialog && dialog.close());
  dialog.addEventListener('close', () => {
    html.classList.remove('is-locked');
    body.replaceChildren();
  });
}
