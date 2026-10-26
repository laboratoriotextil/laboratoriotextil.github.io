# laboratoriotextil.com

Sitio público de **Laboratorio Textil**, el taller textil de Natalia: producción, gestión y diseño de
prendas y piezas a medida, y capacitación para todas las edades y escalas. Tres páginas en español de
Chile, fondo oscuro con acento verde azulado (#00a19d), tipografía Inter Tight, la marca «Botón con aguja».

| Página | Qué tiene |
|---|---|
| `/` | Portada con una tela en puntos (canvas), el taller, la escena «Un taller de …» que cambia con el scroll, el desafío de la industria (acordeón con cifras y su fuente), el polerón que pasa de trama a imagen, «Hecho en Chile» con el globo, cifras del taller, enlaces a los videos |
| `/produccion/` | Prendas del taller que cruzan una línea (blancas a un lado, en puntos al otro; la línea se arrastra), los tres oficios y capacitación, el proceso en cuatro estaciones con dibujos animados, la tabla «a medida / en serie» |
| `/cursos/` | «Lo hice yo» (cuatro clases y su video), talleres para niñas y niños (video y fotos), el taller y PUA, el formulario de inscripción |

Todos los «Escríbenos» llevan a `/cursos/#inscripcion`.

## Cómo se arma

Las páginas se escriben en `fuente/` y se arman con un programa, sin dependencias:

```sh
python3 herramientas/armar.py    # escribe index.html, produccion/index.html, cursos/index.html
```

- `fuente/cabeza.html`, `cabecera.html`, `pie.html`: piezas comunes. `fuente/inicio.html`,
  `produccion.html`, `cursos.html`: cada página, con marcadores `{{…}}` que `armar.py` reemplaza
  (piezas comunes, íconos, las estaciones del proceso, las prendas).
- `herramientas/dibujos.py`: los dibujos de línea (las capas de cada estación del proceso y los
  íconos), en SVG.
- Las páginas armadas se versionan, porque GitHub Pages las sirve tal cual. Se edita `fuente/` y se vuelve
  a armar; no se editan los `index.html` a mano.

## Archivos

```
assets/sitio.css        estilos de las tres páginas (medida fluida: 1rem = ancho/172,8 en computador)
assets/sitio.js         lo común: desplazamiento suave, cabecera, menú del teléfono, entradas, cintas
assets/inicio.js        la tela de la portada, la escena, el acordeón, el polerón, el globo
assets/produccion.js    la línea de las prendas y el carrusel del proceso
assets/app.js           el formulario de inscripción
assets/lib/             GSAP 3.13 con ScrollTrigger y SplitText (licencia estándar gratuita, uso comercial
                        permitido) y Lenis 1.3.4 (MIT, LICENSE-lenis.txt)
assets/fonts/           Inter Tight 300/400/500 (OFL, OFL-InterTight.txt)
assets/img/             logo, fotos del taller, portadas de video, prendas/ (20 prendas, blancas y en trama),
                        mapas/ (globo y acercamiento de Chile), marcas/ (logos blancos de las marcas)
assets/video/           lo-hice-yo.mp4, talleres-ninas-ninos.mp4, poleron-giro, tela (portada), maquina (caja del taller)
favicon.svg, apple-touch-icon.png, CNAME
```

De dónde sale cada cosa:

- **Logo:** `~/System/WhiteBox/estudio/marca-laboratoriotextil/exploracion/logo-boton-aguja.svg`.
- **Fotos:** `~/System/WhiteBox/proyectos/laboratoriotextil/media/2026-10-taller-costura/`, reducidas a
  1000 px. Ninguna muestra la cara de un menor: la 06 está recortada para dejar solo a la niña de espaldas.
- **Videos del curso:** las copias para la intranet de `~/Documents/videos/lt-lo-hice-yo` y
  `lt-taller-promo` (`~/System/WhiteBox/galerias/salida/video/`).
- **Prendas, polerón que gira, globos y logos de marcas:** el proyecto de prendas
  (`~/System/WhiteBox/estudio/prendas`, `forge:pancho/prendas`), imágenes hechas con modelos locales
  de pesos abiertos, y `scripts/activos.py` del estudio `forge:pancho/laboratoriotextil-produccion`.
- **Texto del curso:** el programa de Natalia (`proyectos/laboratoriotextil/talleres/lo-hice-yo-programa.md`).
  El sitio no da edades, horarios, precios ni dirección: están por confirmar con ella.
- **Videos de la portada y del taller, imágenes grandes:** hechos en whitebox con modelos locales de pesos
  abiertos y sin marca de agua, desde `herramientas/medios/`. La tela de la portada es una imagen de
  Lumina-Image-2.0 animada con Wan 2.2; la caja del taller es una foto real de la máquina del taller (Immich)
  animada con Wan 2.2; las ondas del llamado son de Lumina; la escena, la foto ancha y la máquina de
  producción son de Qwen-Image a 1664 px (`imagenes.json` lleva los prompts, `imagenes.py` y `videos.sh`
  los generan). Los clips se repiten de ida y vuelta para no tener corte.
- **Sin comida en las imágenes:** ninguna foto ni cuadro de video muestra comida.
- **Cifras de la industria** (portada, «El desafío»): cada una lleva su fuente y año en el texto.

## Inscripciones

El formulario envía a `https://app.laboratoriotextil.com/api/inscripciones`, el servidor del taller en
whitebox (`proyectos/laboratoriotextil/platform/server.py`), que acepta ese origen por CORS, limita a
5 envíos por hora por IP, descarta lo que llena el campo trampa y guarda en
`platform/data/inscripciones.json`. Natalia las ve y les cambia el estado (nueva, contactada, inscrita,
descartada) en la intranet, botón **INSCRIPCIONES** (puatextil.com/intranet o app.laboratoriotextil.com).

## Publicar

GitHub Pages sirve el sitio desde `laboratoriotextil/laboratoriotextil.github.io` (remoto `github`);
publicar es hacer push a su `main`. El código vive en `forge:pancho/laboratoriotextil` (remoto `origin`).

```sh
python3 -m http.server 8800      # ver en local: http://localhost:8800 (el servidor del taller acepta ese origen)
git push origin main             # forge
git push github main             # publica en www.laboratoriotextil.com
```

## Estado

- En vivo en www.laboratoriotextil.com (tres páginas, 2026-10-26).
- Falta confirmar con Natalia las edades, horarios, valor y lugar, para sumarlos.
