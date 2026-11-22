// Tokens de movimiento — espejo de las variables CSS (--ease-*, --dur-*).
export const EASE = {
  out: 'expo.out',
  inOut: 'expo.inOut',
  soft: 'power3.out',
} as const;

export const DUR = {
  reveal: 1.1,
  focus: 1.3,
  fade: 0.9,
} as const;

/** suavizado del scrub: evita saltos con la rueda del ratón sin secuestrar el scroll */
export const SCRUB = 0.7;

export const MQ = {
  motion: '(prefers-reduced-motion: no-preference)',
  desktop: '(min-width: 1024px)',
  fine: '(hover: hover) and (pointer: fine)',
} as const;
