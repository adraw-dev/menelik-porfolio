<div align="center">

<img src="logo.png" alt="Ilustración de Menelik: una chica con gafas y los brazos en alto" width="150" />

# Menelik Puerta Herrera

**Portafolio de fotografía y realización audiovisual**
*Del celeste a la noche — un recorrido por la luz, contado con el scroll.*

![Astro](https://img.shields.io/badge/Astro-7-0E1A21?style=flat-square&logo=astro&logoColor=6EC1F0)
![GSAP](https://img.shields.io/badge/GSAP-ScrollTrigger-0E1A21?style=flat-square&logo=greensock&logoColor=6EC1F0)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-0E1A21?style=flat-square&logo=vercel&logoColor=white)
![Idiomas](https://img.shields.io/badge/ES%20%C2%B7%20EN-bilingüe-6EC1F0?style=flat-square)

[Plan y dirección de arte](PLAN-PORTAFOLIO.md) · [Instagram de Menelik](https://www.instagram.com/menelik_ph/)

</div>

---

## ✦ El concepto

El sitio recorre **un día de luz** sacado de las propias fotos de Menelik. El color del fondo cambia con el scroll: empieza en el celeste del amanecer, pasa por la niebla del páramo y llega a la noche del escenario.

| | Capítulo | Qué pasa en pantalla |
|---|---|---|
| ☁️ | **Portada** | El loader dibuja a la chibi y el nombre; luego "Menelik" vuela a la navegación y la foto del páramo se revela en capas. |
| 🙋‍♀️ | **Sobre mí** | El retrato queda fijo mientras la biografía se ilumina palabra a palabra. |
| 📷 | **Trabajo** | Cinco colecciones, cada una con su propia puesta en escena: álbum, carretera horizontal, collage 2.5D, stack con niebla y hoja de contactos. |
| 🏆 | **Premio** | 3.er puesto, Festival Municipal de Fotografía de Itagüí 2020. |
| 🎬 | **Video** | Reels editados para redes; el embed de Instagram solo carga al pedirlo. |
| ✉️ | **Servicios y contacto** | Qué hace, cómo trabaja y cómo escribirle (WhatsApp, correo, Instagram). |

---

## ✦ Empezar

> Requiere **Node 22.23 o superior** (lo exige Astro 7).

```bash
npm install
npm run dev        # → http://localhost:4321  (inglés en /en/)
```

| Comando | Para qué |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en vivo. |
| `npm run build` | Genera el sitio estático en `dist/`. La primera vez optimiza todas las fotos (~2–3 min). |
| `npm run preview` | Sirve `dist/` para revisarlo como en producción. |

---

## ✦ Dónde cambiar cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| 📝 Textos de la interfaz (ES/EN) | `src/i18n/index.ts` |
| 👤 Biografía, servicios y contacto | `src/data/profile.ts` |
| 🖼️ Fotos, títulos, descripciones y colecciones | `src/data/photos.ts` |
| 🎞️ Reels y carrusel | `src/data/reels.ts` |
| 🎨 Colores, tipografía y espaciado | `src/styles/tokens.css` |
| ✨ Animaciones | `src/scripts/motion/` (punto de entrada: `index.ts`) |
| ⏱️ Duración del loader | constante `SPEED` en `src/scripts/loader.ts` |

**Agregar una foto:** cópiala en `info-mene/imagenes/` y regístrala en `src/data/photos.ts` con su título y descripción en los dos idiomas. Astro genera solo las versiones AVIF/WebP.

---

## ✦ Cómo está hecho

```
info-mene/            originales (fotos y textos) — no se modifican
loader-animated.html  loader original — su SVG se lee al compilar
src/
├─ components/        secciones, colecciones, navegación, loader, visor
├─ data/              contenido bilingüe (perfil, fotos, reels)
├─ i18n/              idiomas y textos de interfaz
├─ scripts/motion/    sistema de animación centralizado (GSAP)
└─ styles/            tokens, tipografía y Liquid Glass
```

- **Astro** genera HTML estático, sin JavaScript de framework en el navegador.
- **GSAP + ScrollTrigger** dentro de `gsap.matchMedia()`: escritorio, móvil y *reducir movimiento* tienen cada uno su versión.
- **Imágenes:** AVIF + WebP en varios anchos, sin datos EXIF; los originales nunca se copian.
- **Accesible:** funciona sin JavaScript, navegable con teclado y respeta `prefers-reduced-motion`.

**Paleta**

![#6EC1F0](https://img.shields.io/badge/celeste-6EC1F0-6EC1F0?style=flat-square)
![#E8F4FB](https://img.shields.io/badge/hielo-E8F4FB-E8F4FB?style=flat-square)
![#182B35](https://img.shields.io/badge/profundo-182B35-182B35?style=flat-square)
![#0E1A21](https://img.shields.io/badge/noche-0E1A21-0E1A21?style=flat-square)
![#F5EDDE](https://img.shields.io/badge/crema-F5EDDE-F5EDDE?style=flat-square)

**Tipografía:** Fraunces (titulares) · Manrope (texto) · wordmark "Menelik" del loader.

---

## ✦ Publicar en Vercel

Ya está configurado (`vercel.json`, `.vercelignore`); es un sitio estático y no necesita adaptador.

1. En Vercel: **Add New → Project → Import** este repositorio.
2. Vercel detecta Astro y usa `npm run build` → `dist/`.
3. Cada push a `main` vuelve a publicar; las demás ramas generan una vista previa.

**Dominio propio:** añádelo en Vercel y define la variable `SITE_URL=https://tu-dominio.com`. Sin ella, las URL canónicas y la imagen para compartir usan el dominio `*.vercel.app`.

> El repositorio pesa ~210 MB por las fotos originales, así que conviene desplegar desde GitHub y no con la CLI.

---

<div align="center">
<sub>Fotografías © Menelik Puerta Herrera. El wordmark usa contornos derivados de <a href="https://github.com/Etcetera-Type-Co/Grandstander">Grandstander</a> (SIL Open Font License 1.1).</sub>
</div>
