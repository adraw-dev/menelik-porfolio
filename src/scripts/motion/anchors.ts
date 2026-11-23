// Navegación interna suave: los enlaces "#seccion" recorren la página con una curva
// de aceleración/desaceleración en lugar de saltar. Solo se activa con movimiento permitido
// (con "reducir movimiento" el salto es instantáneo, como debe ser).
// - La duración crece con la distancia, con tope, para que ir al contacto no sea eterno.
// - autoKill: si la persona toca o usa la rueda durante el recorrido, se le devuelve el control.
// - Al llegar, el foco pasa a la sección (accesibilidad) y se actualiza la URL.
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

export function scrollToSection(target: HTMLElement, id: string) {
  const distance = Math.abs(target.getBoundingClientRect().top);
  const duration = gsap.utils.clamp(0.9, 2.2, 0.7 + distance / 5000);

  gsap.to(window, {
    scrollTo: { y: target, autoKill: true },
    duration,
    ease: 'power3.inOut',
    overwrite: true,
    onComplete() {
      history.replaceState(null, '', id === 'inicio' ? location.pathname : `#${id}`);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    },
  });
}

export function initSmoothAnchors() {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const id = decodeURIComponent(link.getAttribute('href')!.slice(1));
    const target = id && document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    // deja que el menú móvil se cierre (y libere el scroll) antes de empezar
    requestAnimationFrame(() => scrollToSection(target, id));
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
