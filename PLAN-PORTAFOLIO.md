# Portafolio de Menelik Puerta — Plan de implementación

> Fase 1: investigación, análisis y propuesta. **Todavía no hay código.** Este es el único archivo creado; no se modificó nada de `info-mene/`, `loader-animated.html` ni `logo.png`.
> Fecha: 22 nov 2026.

---

## 10.1 Auditoría del proyecto

### Estructura encontrada

```
mene-porfolio/
├─ info-mene/
│  ├─ about-mene.md          ← perfil, logros, enlaces de Instagram
│  └─ imagenes/              ← 29 fotografías JPG (210 MB en total)
├─ loader-animated.html      ← loader (archivo único de 850 KB, no es una carpeta)
└─ logo.png                  ← ilustración chibi en línea negra (1.3 MB)
```

- **No hay framework, ni `package.json`, ni git, ni componentes, ni rutas, ni sistema de estilos.** Es un proyecto desde cero; no hay arquitectura previa que respetar, así que la elección de stack queda abierta (propuesta en 10.6).
- El brief menciona una carpeta `loader-animated/`, pero en realidad es un único archivo `loader-animated.html`.
- Entorno: Node 24.14 / npm 11.11 disponibles. Python sin Pillow (no influye).

### Estado del loader (`loader-animated.html`)

Lo revisé por dentro y lo ejecuté en un navegador.

| Aspecto | Hallazgo |
|---|---|
| Tecnología | HTML, CSS y JS vanilla. Sin dependencias. SVG inline con 133 `<path>` y un `<image>` PNG en base64. |
| Composición | Chibi (la misma ilustración de `logo.png`) + la palabra **"Menelik"** dibujada con contornos derivados de **Grandstander** (licencia OFL 1.1; el comentario de atribución hay que conservarlo). |
| Secuencia | 1) Los trazos se dibujan con `stroke-dashoffset` (DRAW 2650 ms, con desfases por trazo de hasta 450 ms). 2) A los 3100 ms hace un fundido a la versión rellena (700 ms): wordmark sólido + chibi rasterizado en crema. 3) Se mantiene y desaparece hacia los 5000–5600 ms. 4) Repite en bucle. |
| Colores | Fondo `#182B35` (azul petróleo profundo), trazo `#F5EDDE` (crema), relleno `#FAF6F9`. |
| Responsive | `ResizeObserver` cambia entre composición horizontal (chibi a la izquierda y palabra a la derecha) y apilada cuando el viewport es vertical. |
| Calidad | Muy buena: respeta `prefers-reduced-motion` (muestra el fotograma final estático), se pausa con `visibilitychange`, `pagehide` e `IntersectionObserver`, espera al `decode()` del raster, expone una función `unmount()` que limpia todo y tiene botones accesibles de Pausar/Repetir. |
| Peso | **~790 KB son el PNG en base64** (590 KB en binario). El SVG de trazos pesa unos 62 KB (~20 KB con gzip). |
| Pensado para | Una demo en bucle. En el sitio tiene que reproducirse **una vez** y dar paso al contenido. |

### Skills de diseño disponibles y selección

| Uso | Skills seleccionadas |
|---|---|
| Dirección de arte, crítica y auditoría | `impeccable` (contrato de dirección, crítica y revisión final), `build-awwwards-quality-sites`, `no-ai-design-slop` (control de calidad) |
| Scroll storytelling | `cinematic-scroll-storytelling`, `gsap-scrolltrigger`, `horizontal-scroll-scenes` |
| Motor de animación | `gsap-core`, `gsap-timeline`, `gsap-utils`, `gsap-plugins` (SplitText, Flip), `gsap-performance` |
| Tipografía en movimiento | `masked-reveal` (titulares), `scroll-scrubbed-word-reveal` (bio) |
| Microinteracciones y pulido | `make-interfaces-feel-better`, `transitions-polish` |

**Descartadas, con motivo:** toda la familia Three.js/WebGL, los shaders de cursor, las partículas y los globos/rejillas WebGL. Los efectos 2.5D se resuelven con transforms CSS más ligeros, y estos efectos competirían con la fotografía. `cinematic-gsap-lenis-motion-system` se usa solo como referencia (Lenis queda en evaluación, ver 10.6). Las `replica-*` no aplican.

### Observaciones y limitaciones técnicas

1. **Peso de las fotos:** van de 0.08 a 22 MB y de 841 a 6016 px. (`Sin título.jpg` fue renombrada después a `premio.jpg`.) Necesitan un pipeline de optimización (AVIF/WebP, `srcset`) y **eliminar los metadatos EXIF** al publicar.
2. **Orientación:** **27 de 29 fotos son verticales** (2:3, 4:5, 3:4). Solo `_MG_9702` y `DSC04376 (1)` son horizontales. El diseño debe pensarse en vertical (columnas editoriales, collages y stacks) y no forzar galerías horizontales de formato ancho.
3. `DSC08988.JPG.jpeg` tiene orientación EXIF 8 (girada 90°). El pipeline debe aplicar la rotación automática.
4. Resoluciones bajas: `Sin título.jpg` (841×1280) no debe mostrarse a pantalla completa; `IMG_3666/3821/3859` (1512×2016, de teléfono) sirven hasta ~1000 px.
5. Instagram: los reels se ven sin iniciar sesión, pero **no se pueden descargar legítimamente** y el embed oficial es pesado (iframes, scripts de terceros y saltos de layout).

---

## 10.2 Análisis del contenido

### Perfil profesional (solo lo que respalda el material)

- **Nombre:** Menelik Puerta Herrera. En Instagram es **@menelik_ph**, con la bio "Camarógrafa · Itagüí/Colombia". El perfil lo comprobé en vivo.
- **Rol:** Fotógrafa y realizadora audiovisual. **Freelance desde 2017.**
- **Especialidades:** fotografía de eventos, celebraciones familiares, retratos y producción de contenido visual.
- **Formación:** Tecnóloga en Cámara y Fotografía para Cine (SENA).
- **Experiencia audiovisual:** cámara y realización audiovisual en **TVN Global** y en proyectos independientes.
- **Herramientas:** Lightroom, Photoshop y CapCut (reels y piezas para redes). Iluminación, composición, retoque y edición.
- **Reconocimiento:** **3.er puesto en el Festival Municipal de Fotografía de Itagüí (2020).**
- **Enfoque, en sus palabras:** "capturar momentos espontáneos y cuidar cada detalle para entregar imágenes auténticas que conserven recuerdos importantes".
- **Diferencial:** *acompañamiento completo* antes, durante y después de cada evento o sesión, buscando tanto fotos naturales como retratos posados bien cuidados.
- **Lado personal (bio de Instagram):** sus mascotas *Merry* 🐶 y *Sunny* 🐱.

**Qué debe tener más protagonismo:** 1) la fotografía (que habla por sí misma), 2) el enfoque humano ("momentos espontáneos, recuerdos importantes"), 3) la formación en cine, que aporta oficio técnico y diferencia, 4) el premio de 2020 y los años de experiencia como respaldo, y 5) la faceta audiovisual de reels para redes.

**Oportunidad narrativa:** las fotos recorren de forma natural un **día completo de luz**: interiores cálidos y cielos celestes → pueblo a pleno sol → niebla del páramo → luces de escenario → lluvia nocturna. Eso da pie al concepto creativo (10.3).

### Clasificación de las fotografías

Revisé las 29 imágenes visualmente y las crucé con los metadatos EXIF (fecha y cámara). Las colecciones se apoyan en **días reales de rodaje**, no en suposiciones.

| Colección propuesta | Fotos | Contenido real | Fecha (EXIF) |
|---|---|---|---|
| **A. Eventos y celebraciones** | `DSC04264`, `DSC04376 (1)`, `DSC08359`, `_MG_9702` | Bautizo: bebé, madre y padrino con vela en una iglesia. El mismo bebé con globos blancos y celestes. Niño de primera comunión ante un altar navideño con poinsettias. Cobertura de un evento corporativo: rueda de negocios con la señalética "#MEDMW" | 26–27 nov 2022 · 20 dic 2025 · 26 sep 2024 |
| **B. En ruta** (retrato lifestyle) | `DSC04804`, `DSC04816`, `DSC04847` | Sesión con motociclistas en un puente de barandas amarillas (cielo pastel), más el árbol solitario en un pastizal dorado del mismo día | 9 ene 2023 |
| **C. Pueblo** (viaje y calle) | `DSC09334`, `DSC09341`, `DSC09406`, `DSC09416`, `DSC09441` | Balcón colonial tallado, campesino con sombrero entre flores, portada neogótica "HIC DOMUS DEI ET PORTA CELI" con un perro, un pinscher asomado en un bolso y el mismo pinscher frente a una basílica | 20 sep 2026 |
| **D. Altura** (paisaje de páramo) | `DSC08988`, `DSC09011`, `DSC09064`, `DSC09093`, `DSC09102`, `DSC09119`, `DSC09136`, `DSC09172` | Cañón con cascada, frailejones bajo un cielo azul profundo, arroyo sobre musgo, valle con niebla, retrato de una mujer con gafas y gorro entre musgo, farallón con nieve y niebla, macro de una planta de páramo y una figura diminuta sobre rocas en la niebla | 28 dic 2025 (una sola expedición) |
| **E. Escena** (música en vivo) | `IMG_20261030_223918…`, `IMG_20261030_224153…`, `IMG_3666 (1)`, `IMG_3821`, `IMG_3859` | Cantante con astas de ciervo (color violeta y versión B/N) y músico con máscara de calavera | 30 oct 2026 (las 3 IMG_ sin EXIF parecen del mismo show) |
| **F. Primeros encuadres** (arquitectura y archivo) | `1628559855266`, `1628563738101` | Orquideorama en contraluz dorado y Piedad de mármol bajo un arco con cipreses | jun 2019 |
| Piezas sueltas | `DSC09597` · `Sin título` | Gata blanca y atigrada jugando bajo luz de ventana (probablemente *Sunny*) · noche lluviosa: reflector de estadio y una figura sola en la cancha | 9 nov 2026 · sin EXIF |

Total: 29/29 sin duplicados.

**Etiquetas transversales** (para filtros y metadatos): Eventos · Retrato · Paisaje · Viaje · Música en vivo · Arquitectura · Mascotas · Noche.

### Selección de imágenes destacadas

| Rol | Imagen | Por qué |
|---|---|---|
| **Fondo del Hero** | `DSC09172` (figura en la niebla) | Mucho espacio negativo gris-celeste que deja respirar al texto. Recortada a 16:9 conserva rocas y figura (el cielo es vacío). Tonalmente casa con la paleta. |
| Impresiones flotantes del Hero | `DSC04376` (niño con globos celestes), `DSC04804` (motociclista), `IMG_20261030_224153` (cantante B/N) | Una por mundo (celebraciones, retrato y escena), para anunciar que no es solo paisaje. |
| Imagen de cierre del páramo | `DSC09011` (frailejones y cielo azul profundo) | Su cielo es literalmente el "azul profundo" de la paleta. |
| Puente hacia lo audiovisual | `premio.jpg` (noche de lluvia, foto ganadora Itagüí 2020) | Atmósfera cinematográfica; el reflector funciona como un "foco" que da paso a los reels. Solo a tamaño medio por su resolución. |
| Formato ancho | `_MG_9702`, `DSC04376` | Las únicas horizontales: se reservan para huecos panorámicos. |
| Gran formato vertical | `DSC09093`, `DSC09119`, `DSC09441`, `DSC09406` | Composiciones fuertes a pantalla completa en móvil. |

**Jerarquía:** Hero (1 fondo y 3 impresiones) → una imagen ancla por colección → imágenes de apoyo → lightbox con la colección completa.

### Análisis de los reels y del carrusel

Los 5 enlaces abrieron sin iniciar sesión. Reproduje los videos y tomé fotogramas, pero **no escuché el audio ni vi cada reel completo**. **Todos están publicados en cuentas de clientes o creadores, no en la de Menelik.**

| Pieza | Cuenta / colaboración | Fecha | Lo observado |
|---|---|---|---|
| Reel `DPCEz-ZEWr2` | katira___ × luar_ecohotel | 25 sep 2025 | Glamping en La Ceja: montañas, arcoíris, flores, interior de cabaña y una mujer de espaldas mirando el paisaje. Turismo y hospitalidad. |
| Reel `DQFAkQ6EZzH` | katira___ × hosteriaelsendero | 21 oct 2025 | Cuatrimotos, parapente, columpio, platos de comida y textos en pantalla ("aquí cada rincón", "cada plato una obra de arte"). Reel de experiencia turística, dinámico. |
| Reel `DPospqSEfyZ` | katira___ | oct 2025 | Cumpleaños: pastel con bengalas, banda y corona, helicóptero, Guatapé, Hotel Marriott. Títulos manuscritos ("Prepárense!!", "Luz y aventura"). Celebración y lifestyle. |
| Reel `DctrTOox5v5` | byveronicataborda_ × veroinlondon_ | 31 ago 2026 | Creadora de contenido de humor ("paisa en Londres") hablando a cámara en una cocina, con subtítulos. Menelik aparece comentando. |
| Carrusel `DPkOsD1ktZj` | katira___ | 8 oct 2025 | ~10 fotos editadas: una mujer con atuendo celeste en escaleras de azulejos, puertas azules, carretera entre palmas y un arco de madera. **La paleta es celeste y blanco**, coherente con la del sitio. |

**Estilo audiovisual:** vertical 9:16, contenido de turismo, hospitalidad y lifestyle para creadoras, luz natural, cortes rápidos, textos superpuestos y títulos tipo manuscrito.

**Valor para el portafolio:** demuestra que entrega piezas para redes a marcas de hospitalidad y a creadoras de contenido, y cubre el servicio de "contenido visual para redes".

**Integración recomendada:**
1. **Ideal:** que Menelik entregue los MP4 originales exportados. Se alojan comprimidos (720p, H.264, sin audio en la vista previa) con póster propio, autoplay silenciado al entrar en pantalla, sonido al hacer clic y enlace "Ver en Instagram ↗".
2. **Alternativa:** tarjetas con póster propio (capturas que ella entregue) que abren Instagram. El embed oficial solo se carga al hacer clic (patrón *facade*) para no penalizar el rendimiento.
3. Hay que confirmar su **rol en cada pieza** (grabación, edición o ambos) y el **permiso para mostrar nombres de clientes**.

### Proyectos y colecciones identificados

- 5 colecciones fotográficas de autor/encargo (A–E), más un archivo de 2019 (F).
- 1 proyecto de edición para carrusel (cliente).
- 4 reels para clientes y creadoras (2025–2026).
- 1 hito: 3.er puesto del festival de Itagüí 2020.

### Información que falta o conviene solicitar

1. **¿La mujer de `DSC09102` (gafas y gorro en el páramo) es Menelik?** Si lo es, sería el retrato de la sección "Sobre mí". Si no, hace falta un retrato suyo.
2. **Contacto:** correo, WhatsApp, otras redes (TikTok, Behance…) y zona de cobertura.
3. **Fechas y detalle:** año de formación en el SENA, periodo y rol en TVN Global, y **qué foto ganó en Itagüí 2020** (¿`Sin título`?, y si existe en mayor resolución).
4. **Reels:** su rol en cada uno, permiso para nombrar a los clientes y los archivos MP4 originales con pósters.
5. **Consentimiento** para publicar personas identificables, **en especial menores** (bautizo y comunión) y músicos.
6. **Créditos y contexto:** nombre de la banda del 30 oct 2026, nombre del páramo y confirmación de que el evento "#MEDMW" fue un encargo.
7. ¿El pinscher es *Merry* y la gata es *Sunny*? (Permitiría un pequeño guiño personal.)
8. Idioma: ¿solo español o ES/EN?
9. Nombre público: "Menelik Puerta" o "Menelik Puerta Herrera".
10. Dominio y hosting preferidos.

---

## 10.3 Dirección artística

### Concepto: **"Jornada — del celeste a la noche"**

El scroll recorre **un día de luz** tomado de sus propias fotos. El color ambiente del sitio cambia con el progreso:

```
Amanecer celeste (Hero) → Luz de día (Sobre mí, Celebraciones, En ruta, Pueblo)
→ Niebla (Altura) → Noche de escenario (Escena, Noche, Reels)
→ Amanecer de nuevo (Servicios, Contacto)
```

Hay dos motivos de oficio que vienen de su formación en cine:
- **"Rack focus"** (cambio de foco): la firma de revelado. Las imágenes pasan de desenfocadas a nítidas como una cámara que encuentra el foco. Se implementa sin coste: un placeholder diminuto ampliado (que ya se ve borroso) hace fundido a la imagen nítida, animando solo `opacity` y `transform`.
- **Visor de cámara:** esquinas de encuadre y puntos AF como detalle de UI en los estados hover y foco, y metadatos tipo hoja de contactos (colección · año). Con moderación, nunca como disfraz.

El **chibi** es el hilo emocional: se dibuja en el loader, se vuelve a trazar con el scroll en "Sobre mí" y despide con los brazos en alto en Contacto.

### Paleta cromática

| Token | HEX | Uso |
|---|---|---|
| `--celeste-500` | `#6EC1F0` | **Color de identidad.** Superficies, acentos, indicadores, halos de vidrio y CTAs sobre fondo oscuro. (Contraste 7.3:1 sobre `#182B35`.) |
| `--celeste-300` | `#A9DCF7` | Degradados, estados hover y bordes luminosos. |
| `--celeste-700` | `#1F6E9E` | Enlaces y texto de acento **sobre fondos claros** (5.6:1 sobre blanco; el celeste-500 sobre blanco no llega al 2:1). |
| `--hielo-100` | `#E8F4FB` | Azul hielo: fondo de secciones diurnas. |
| `--niebla-50` | `#F6FAFC` | Blanco con matiz azul: fondo base. |
| `--niebla-400` | `#A7B4BC` | Gris niebla para la colección Altura (sale de las propias fotos). |
| `--profundo-900` | `#182B35` | **Azul profundo, heredado del loader.** Secciones cinematográficas y continuidad con la intro. |
| `--profundo-950` | `#0E1A21` | Noche: Escena, Noche y Reels. |
| `--crema` | `#F5EDDE` | **Heredado del trazo del loader.** Texto sobre oscuro y contrapunto cálido que dialoga con los dorados y maderas de las fotos. |
| `--tinta` | `#13232C` | Texto principal sobre claro. |
| `--tinta-suave` | `#55697A` | Texto secundario y metadatos. |

**Regla:** las fotos nunca llevan tinte de color. La paleta vive en fondos, tipografía y vidrio. El celeste no se usa como texto pequeño sobre claro.

### Tipografía

| Rol | Fuente | Justificación |
|---|---|---|
| Logotipo | **Wordmark SVG del loader** (contornos Grandstander) | Continuidad loader → navegación → cierre. No se carga como fuente. |
| Display / editorial | **Fraunces** (variable, ejes `SOFT` y `WONK`, con cursivas) | Serif editorial con terminales suaves que dialogan con el trazo redondeado del chibi y del wordmark. Tamaños enormes y cursivas para acentos ("*recuerdos*"). |
| Texto / UI | **Manrope** (variable) | Sans moderna, muy legible en tamaños pequeños, buen soporte de tildes y cifras tabulares para metadatos. |

Escala de contraste: display hasta `clamp(4rem, 12vw, 11rem)`, cuerpo de 17–18 px y metadatos de 12–13 px en mayúsculas espaciadas. Ambas fuentes son OFL y se alojan en el propio sitio.

### Tratamiento de imágenes

- Se respetan siempre la proporción y la edición original de Menelik: sin filtros, sin tintes y sin recortes que traicionen la composición. Los recortes de Hero y miniaturas se hacen con **punto focal definido por foto**.
- Marcos sin bordes redondeados grandes (radio de 2–4 px, de "copia impresa"), sombras suaves con tinte azul profundo en las impresiones flotantes y fondo de placeholder del color dominante de cada foto.
- Texto alternativo descriptivo escrito para cada foto.

### Liquid Glass (con estrategia y no en todas partes)

- **Dónde se usa:** la píldora de navegación, el indicador de progreso o capítulo, los chips de filtro y colección, las etiquetas de pie de foto sobre imagen, los botones de los reels y el CTA de contacto.
- **Dónde no se usa:** bloques de texto largos, fondos de sección y tarjetas de servicios (ahí van superficies limpias).
- **Receta:** `backdrop-filter: blur(18px) saturate(160%)`, relleno `rgba(246,250,252,.14–.55)` según el fondo, borde interior de 1 px `rgba(255,255,255,.35)`, reflejo superior con un degradado en `::before` y un halo celeste muy sutil en hover. En Chromium de escritorio se puede añadir una refracción leve con un filtro SVG de desplazamiento (mejora progresiva).
- **Límite:** como máximo 3–4 superficies de vidrio visibles a la vez. En móvil, menos blur y más opacidad. Si `backdrop-filter` no está soportado o con `prefers-reduced-transparency`, se usan superficies sólidas translúcidas. El contraste de texto ≥ 4.5:1 se garantiza con fondo de respaldo.

### Profundidad 2.5D

Hay tres planos por escena: **fondo** (foto ambiente, se mueve lento), **medio** (impresiones flotantes, velocidad media, inclinación leve) y **frente** (tipografía y UI, que siguen el scroll). La profundidad se construye con diferencias de velocidad, escala, sombra y `perspective` CSS, con inclinaciones de 6° como máximo. No hay WebGL.

### Referencias de dirección editorial

Revistas de fotografía impresas (pliegos asimétricos, márgenes generosos y pies de foto técnicos), hojas de contacto de laboratorio y la interfaz de visor de una cámara de cine. Son referencias de lenguaje y no se copia ningún sitio concreto.

---

## 10.4 Arquitectura de la página

Una sola página (one-page) con anclas y un lightbox. Orden y objetivo de cada sección:

| # | Sección | Objetivo | Contenido |
|---|---|---|---|
| 0 | **Loader** | Identidad desde el primer segundo | Chibi y "Menelik" que se dibujan y rellenan, más la transición al Hero |
| 1 | **Portada (Hero)** | Enganchar y decir quién es | "Menelik" (wordmark), "Puerta Herrera" en Fraunces cursiva, "Fotógrafa y realizadora audiovisual · Itagüí, Colombia", CTA "Ver trabajo" y la composición de 3 planos |
| 2 | **Sobre Menelik** | Humanizar y dar confianza | Bio (del md), enfoque ("momentos espontáneos…"), datos: *Desde 2017 · SENA Cámara y Fotografía para Cine · TVN Global · 3.er puesto Itagüí 2020*, retrato (pendiente de confirmar) y guiño a Merry y Sunny (opcional) |
| 3 | **Recorrido** | Trayectoria en el tiempo | Línea de tiempo 2017 → 2026 solo con hitos confirmados, más los años de las colecciones (2019 *Primeros encuadres*, 2020 premio, 2022 celebraciones, 2023 En ruta, 2025 Altura y reels, 2026 Pueblo y Escena). **Depende de que confirmes los años del SENA y de TVN; sin ellos se fusiona con la sección 2.** |
| 4 | **Trabajo seleccionado** | La fotografía como protagonista | Índice de colecciones y 5 capítulos: Eventos y celebraciones → En ruta → Pueblo → Altura → Escena |
| 5 | **Noche** (puente) | Transición cinematográfica a lo audiovisual | `Sin título` a pantalla media con una frase corta |
| 6 | **En movimiento** (audiovisual) | Mostrar la faceta de reels y edición | 4 reels y el carrusel, con créditos de cliente si hay permiso |
| 7 | **Servicios y cómo trabajo** | Convertir | Servicios reales (abajo) y el proceso *Antes · Durante · Después* |
| 8 | **Contacto** | Cerrar y llamar a la acción | "Hablemos", Instagram @menelik_ph, correo/WhatsApp (pendientes), chibi con los brazos en alto, pie con créditos y atribución OFL |

**Servicios (todos respaldados por el md):**
1. Fotografía de eventos.
2. Celebraciones familiares.
3. Retratos (naturales y posados).
4. Contenido visual para redes: edición y retoque para carruseles, y reels verticales editados en CapCut.
5. Cámara y realización audiovisual.

Herramientas: Lightroom, Photoshop y CapCut. No se inventan paquetes ni precios.

**Navegación:**
- **Escritorio:** píldora de vidrio superior con el wordmark mini y las anclas *Sobre · Trabajo · Video · Servicios · Contacto*, más un riel lateral de progreso con puntos de capítulo y contador tipo timecode ("04 / 08").
- **Móvil:** barra inferior de vidrio con progreso y botón de menú, que abre una hoja a pantalla completa.
- Enlace "Saltar al contenido" y foco visible en todo.

**Narrativa visual:** quién es (Hero) → cómo mira (Sobre) → de dónde viene (Recorrido) → qué ha hecho, del día a la noche (Trabajo) → la noche se vuelve imagen en movimiento (Noche → Video) → qué puede hacer por ti, al amanecer (Servicios) → hablemos (Contacto).

---

## 10.5 Experiencia visual y animaciones

### Loader → contenido

1. Fondo `#182B35`. Se reproduce **una sola vez** la secuencia original (trazo, relleno), con las mismas curvas, desfases y layout responsive.
2. Duración: la original llega al relleno completo a los ~3.8 s. Propuesta: **factor de tiempo de 0.75 (~2.9 s)** en la primera visita y versión corta (~0.8 s, fotograma relleno + salida) en las visitas siguientes de la misma sesión. Hay un botón accesible "Saltar intro". *(La duración final la decides tú.)*
3. **Salida (~0.9 s):** el chibi se encoge y se desvanece. El **wordmark "Menelik" vuela (FLIP) a su sitio en la navegación**. El fondo petróleo se retira hacia arriba con un borde curvo (`clip-path`) y revela el Hero, cuyos planos entran escalonados (fondo de `scale 1.15→1`, impresiones flotantes que suben con rack focus y texto con un revelado enmascarado).
4. Con movimiento reducido: el fotograma final se muestra estático ~600 ms y luego hace un fundido.
5. El Hero ya está renderizado debajo y su imagen precargada, así que el loader no retrasa la carga real.

### Hero

Está fijado durante ~120 vh de scroll.
- La foto de niebla de fondo se mueve con una deriva de parallax lenta.
- Las 3 impresiones flotantes están en planos distintos y responden al cursor (lerp suave, ±12 px y ±4°).
- Al hacer scroll, las impresiones se separan a velocidades distintas, el nombre sube y se desvanece por capas, y la niebla aclara hacia el celeste de la siguiente sección.
- El CTA de vidrio "Ver trabajo" tiene microinteracción magnética leve (solo en escritorio).

### Qué tiene profundidad 2.5D

Las impresiones del Hero, el collage de *Pueblo*, las tarjetas de reel (inclinación con el cursor), el chibi en "Sobre" (capa propia) y los puntos de capítulo de la navegación.

### Parallax

Hero (3 planos), Sobre (retrato contra texto), Pueblo (collage de 5 planos), Altura (capa de niebla sobre las fotos), Reels (tarjetas a distintas velocidades) y Contacto (chibi y titular).

### Sticky / pinned

| Sección | Comportamiento |
|---|---|
| Hero | Fijado; la composición se desarma con el scroll |
| Sobre | Retrato fijo a la izquierda mientras la bio se revela **palabra a palabra con el scroll** y los datos aparecen como chips de vidrio; el chibi se vuelve a trazar en el fondo |
| Recorrido | Línea de tiempo **horizontal fijada** (el scroll vertical la hace avanzar), con un año por escena y su foto |
| En ruta | Tira horizontal fijada de 3 fotos ("la carretera") |
| Altura | **Stack cinematográfico:** un marco fijo donde las fotos se suceden a través de un velo de niebla con pies de foto sincronizados y el fondo virando a gris niebla |
| Servicios | El proceso *Antes · Durante · Después* fijado, con una línea de progreso |

### Revelado de la información con el scroll

- Titulares: revelado enmascarado por líneas o palabras (SplitText).
- Bio: palabras que pasan de 20 % a 100 % de opacidad atadas al scroll (`scrub`).
- Fotos: rack focus (de borroso a nítido, con escala 1.04 → 1).
- Metadatos: aparecen tipo "timecode".
- Todo con scrub suavizado (`scrub: 0.6–1`) para evitar saltos con la rueda del ratón.

### Transiciones entre secciones

- **Viaje de color:** una capa ambiente fija con 4 degradados (amanecer, día, niebla y noche) que hacen fundido de opacidad según la sección. Corre en el compositor, sin repintar el layout.
- Cada colección entra con su número y título grandes en Fraunces y una "cortina" de niebla entre Pueblo y Altura.
- Hacia la noche: el reflector de la foto `Sin título` se usa como punto de luz que se expande y da paso a la sección de video.

### Galería: interacciones

- **Hover y foco:** aparecen las esquinas de visor y una etiqueta de vidrio (colección · año · etiqueta), con una ligera elevación.
- **Clic, Enter o Espacio:** lightbox en un `<dialog>` nativo con transición **Flip** desde la miniatura. Navegación con flechas, deslizar en táctil, Esc, contador y pie de foto. El foco queda atrapado y se devuelve al cerrar.
- **Índice de colecciones:** chips de vidrio fijos (sticky) que llevan a cada capítulo y marcan el activo.
- Cada colección tiene su propia composición para evitar monotonía:

| Colección | Composición |
|---|---|
| Eventos y celebraciones | Álbum asimétrico: horizontal ancha + 2 verticales desplazadas + coda ancha |
| En ruta | Tira horizontal fijada |
| Pueblo | Collage 2.5D en capas |
| Altura | Stack cinematográfico |
| Escena | Hoja de contactos oscura con brillo violeta del escenario (sombra estática) |

### Adaptación a móvil (no se clona el escritorio)

- Sin inclinación ni efectos de cursor. Parallax en 2 planos y con la mitad de amplitud.
- Los pins largos se acortan. **Las secuencias horizontales pasan a carruseles nativos con `scroll-snap`** (se deslizan con el dedo; no se secuestra el scroll).
- El stack de Altura se convierte en una secuencia vertical a pantalla completa con fundidos de niebla al entrar en pantalla.
- Vidrio con menos blur. Unidades `svh` y `ScrollTrigger.config({ ignoreMobileResize: true })` para evitar saltos de la barra del navegador.
- Imágenes con `srcset` adaptado al ancho real.

### Movimiento reducido

Con `prefers-reduced-motion: reduce` se eliminan pins, parallax, scrub e inclinaciones, y quedan solo fundidos breves de opacidad. Todo el contenido es legible y navegable **sin JavaScript**.

---

## 10.6 Arquitectura técnica

### Stack propuesto (no existe uno previo)

| Pieza | Elección | Justificación |
|---|---|---|
| Framework | **Astro** (salida estática) | HTML estático sin JS por defecto, componentes sin hidratación (no hay riesgo de errores de hidratación), y sobre todo un **pipeline de imágenes integrado** (`astro:assets` + sharp → AVIF/WebP, `srcset`, `width`/`height` automáticos, metadatos eliminados). Es justo lo que exigen 210 MB de originales. |
| Animación | **GSAP** + ScrollTrigger + SplitText + Flip | Un único motor para scroll, pins, timelines, texto y la transición del lightbox. Hoy todos sus plugins son gratuitos. Framer Motion no se usa (requiere React y duplicaría el motor). Las animaciones CSS por scroll tampoco, para no mantener dos sistemas. |
| 3D/profundidad | Transforms CSS 3D | Sin coste de dependencias. |
| Estilos | CSS nativo con tokens (custom properties) y estilos con alcance de Astro | Sitio pequeño con sistema de diseño propio. Tailwind no aporta lo suficiente aquí. |
| Fuentes | `@fontsource-variable/fraunces` y `@fontsource-variable/manrope` | Alojadas en el propio sitio, con subconjunto latino y `font-display: swap` y precarga de la display. |
| Lightbox | `<dialog>` nativo + GSAP Flip | Cero dependencias extra. |
| Smooth scroll | **Lenis: no al inicio.** Se usa el scroll nativo con `scrub` suavizado. Se reevalúa en la fase de pulido solo en escritorio con puntero fino y nunca en táctil ni con movimiento reducido. | El brief pide no secuestrar el scroll. |

Dependencias totales previstas: `astro`, `gsap`, 2 paquetes de fuentes (y `sharp`, que ya viene con Astro).

### Organización

```
src/
├─ pages/index.astro
├─ layouts/Base.astro            (head, meta/OG, fuentes, preload del Hero)
├─ data/
│  ├─ profile.ts                 (textos literales del md: bio, datos, servicios)
│  ├─ photos.ts                  (manifiesto: id, import, colección, etiquetas, orientación, alt, punto focal, año)
│  ├─ collections.ts
│  └─ reels.ts
├─ components/
│  ├─ loader/Loader.astro        (SVG del loader original + raster externo)
│  ├─ nav/  Nav · ProgressRail · MobileMenu
│  ├─ ui/   Photo (picture + LQIP + data-attrs) · Glass · GlassButton · Viewfinder · Chip
│  ├─ sections/ Hero · About · Journey · WorkIndex · Night · Reels · Services · Contact · Footer
│  ├─ collections/ Album · Strip · Collage · Stack · ContactSheet
│  └─ lightbox/Lightbox.astro
├─ scripts/motion/
│  ├─ index.ts        (registro de plugins, gsap.matchMedia: escritorio / móvil / reducido)
│  ├─ tokens.ts       (curvas, duraciones, distancias)
│  ├─ reveal.ts       (declarativo: data-reveal="mask|words|focus|fade")
│  ├─ parallax.ts     (declarativo: data-depth; un trigger por sección)
│  ├─ pointer.ts      (UN solo bucle rAF con lerp → variables CSS --mx/--my)
│  ├─ atmosphere.ts   (viaje de color)
│  ├─ loader.ts       (ciclo único, salida y FLIP del wordmark)
│  └─ scenes/ hero · about · journey · altura · strip · reels · services
└─ styles/ tokens.css · base.css · type.css · glass.css
```

- **Assets:** las fotos se importan **directamente desde `info-mene/imagenes/`**, a través del manifiesto. Los originales no se tocan ni se copian (no hay imágenes duplicadas); las versiones optimizadas se generan al compilar.
- `logo.png` se usa para generar el favicon y la imagen OG.
- El raster del loader se extrae a un AVIF/WebP aparte, sin modificar el archivo original.

**Estrategia de animación centralizada:** los componentes solo declaran intención con `data-*` (`data-reveal`, `data-depth`, `data-tilt`, `data-scene`). Un único módulo inicializa todo dentro de contextos de `gsap.matchMedia()`, que se revierten solos al cambiar el breakpoint o la preferencia de movimiento. Hay un solo listener de puntero para todo el sitio. Se llama a `ScrollTrigger.refresh()` tras cargar las fuentes y el loader.

### Rendimiento

| Métrica | Presupuesto / medida |
|---|---|
| JS | ≤ 90 KB gzip (GSAP + plugins ~55 KB, más el código propio) |
| LCP | < 2.5 s: imagen del Hero precargada con `fetchpriority="high"` en AVIF de ~200 KB a 1920 px. El loader **se pinta con el primer HTML**. Su raster pasa de 590 KB en PNG a ~40–70 KB en AVIF/WebP. |
| CLS | < 0.05: `width`/`height` en todas las imágenes, fuentes con métricas de respaldo ajustadas. |
| INP | < 200 ms: sin trabajo pesado en los handlers; el lerp va en rAF. |
| Imágenes | Anchos de 480/800/1200/1600/2400. `loading="lazy"` y `decoding="async"` fuera del primer pantallazo. LQIP de ~24 px para el rack focus. |
| Animaciones | Solo `transform` y `opacity`; `will-change` aplicado y retirado según se use; sin animar `filter: blur` en grande; triggers que se desactivan fuera de pantalla. |
| Precaución | No usar `content-visibility` en secciones con pins (rompe las mediciones). |

### Responsive

Mobile-first. Puntos de corte de 640 / 1024 / 1440 px. Tipografía fluida con `clamp()`. Rejillas editoriales de 4/8/12 columnas. Consultas `(pointer: fine)` y `(hover: hover)` para activar lo que depende del cursor.

### Accesibilidad

- HTML semántico (`header`, `nav`, `main`, `section` con encabezados, `figure`/`figcaption`) y un `h1` único.
- Texto alternativo real para cada foto y contraste AA verificado (los tokens ya están calculados).
- Foco visible con el estilo visor, "Saltar al contenido", navegación de la galería y el lightbox con teclado, objetivos táctiles de ≥ 44 px.
- Videos silenciados por defecto con controles.
- Respeta `prefers-reduced-motion` y `prefers-reduced-transparency`. Contenido completo sin JS.
- `lang="es"`.

### SEO / metadatos

Título y descripción, OG/Twitter con una imagen compuesta (chibi + foto), JSON-LD `Person`, sitemap y favicon desde el chibi.

---

## 10.7 Roadmap de desarrollo

| Fase | Objetivo | Tareas principales | Depende de | Prioridad | Criterios de aceptación |
|---|---|---|---|---|---|
| **F0 · Confirmaciones** | Cerrar huecos de contenido | Respuestas a la lista de 10.2, MP4 y pósters de reels, consentimientos | Tú / Menelik | Alta, pero no bloquea F1–F3 | Lista resuelta o con decisión de alternativa |
| **F1 · Base** | Proyecto funcionando | Inicializar Astro, estructura, tokens, fuentes, manifiesto de fotos, pipeline de imágenes, layout base | Aprobación de este plan | Crítica | `npm run build` sin errores; las 29 fotos generan AVIF/WebP con la orientación correcta y **sin EXIF**; los originales intactos |
| **F2 · Maqueta estática** | Todo el contenido, sin movimiento | Todas las secciones semánticas, responsive y con el contenido real; navegación; lightbox básico | F1 | Crítica | Navegable y completo sin JS; Lighthouse Accesibilidad ≥ 95; sin scroll horizontal en 360 px |
| **F3 · Loader** | Intro integrada | Componente del loader con raster externo, ciclo único, saltar intro, versión corta en sesión, salida con FLIP al nav | F2 | Alta | Mismo trazo y relleno que el original; respeta el movimiento reducido; sin bloquear el LCP; sin fugas (unmount) |
| **F4 · Sistema de movimiento** | Motor central | `motion/` (matchMedia, reveal, parallax, pointer, atmosphere), Hero completo, progreso de navegación | F2–F3 | Alta | 60 FPS en escritorio medio; un solo listener de puntero; cero CLS por animación |
| **F5 · Colecciones** | La experiencia fotográfica | Álbum, tira, collage 2.5D, stack Altura, hoja de contactos, Flip del lightbox, índice sticky | F4 | Alta | Teclado y táctil completos; las imágenes fuera de pantalla no se cargan hasta acercarse |
| **F6 · Video, servicios y contacto** | Conversión | Reels (MP4 propios o facade), carrusel, servicios con proceso fijado, contacto y pie | F4 (+ material de F0) | Media-alta | Sin scripts de Instagram en la carga inicial; los CTA funcionan |
| **F7 · Móvil y movimiento reducido** | Adaptación real | Variantes móviles (snap, pins cortos, menos vidrio), pase de movimiento reducido | F5–F6 | Alta | Prueba en iOS Safari y Android Chrome; sin saltos de la barra del navegador; experiencia completa con movimiento reducido |
| **F8 · Pulido y QA** | Calidad de entrega | Auditorías `impeccable`/`no-ai-design-slop`, `transitions-polish`, Lighthouse y CWV, revisión en varios navegadores, SEO y OG, despliegue | Todo | Alta | LCP < 2.5 s, CLS < 0.05, INP < 200 ms (móvil, 4G simulado); Rendimiento ≥ 90 y Accesibilidad ≥ 95 |

**Resultado esperado de cada fase:** F1 base compilable → F2 sitio completo estático → F3 intro de marca → F4 Hero vivo → F5 galería protagonista → F6 conversión → F7 móvil sólido → F8 listo para publicar.

---

## Decisiones que necesito de ti antes de empezar

1. **Aprobar el stack:** Astro + GSAP, sin Lenis al inicio.
2. **Aprobar el concepto "Jornada — del celeste a la noche"**, la paleta y la tipografía (Fraunces + Manrope).
3. **Duración del loader en el sitio:** ~2.9 s (propuesta), la original de ~3.8 s, o más corta.
4. Las respuestas de la lista "Información que falta" de 10.2. Las más urgentes: **#1 retrato**, **#2 contacto** y **#5 consentimiento de menores**.
