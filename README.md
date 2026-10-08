# laboratoriotextil.com

Sitio público de **Laboratorio Textil**, el taller textil de Natalia: el curso de costura básico
«Lo hice yo» (cuatro clases, con su video), los talleres de costura para niñas y niños (con su video y
fotos), qué hace el taller y un formulario de inscripción. Una sola página, en español de Chile, con la
marca «Botón con aguja».

## Archivos

```
index.html            la página
assets/styles.css     estilos: paleta y tipografía de la marca, diseño para computador y teléfono
assets/app.js         el formulario de inscripción
assets/img/           logo (botón con aguja, normal y negativo, PNG 512), fotos del taller, portadas de video
assets/video/         lo-hice-yo.mp4 (61 s) y talleres-ninas-ninos.mp4 (29 s), versiones de 720 px
assets/fonts/         IBM Plex Sans 400/500/600 e IBM Plex Mono 500
favicon.svg, apple-touch-icon.png
CNAME                 www.laboratoriotextil.com (GitHub Pages)
```

De dónde sale cada cosa:

- **Logo:** `~/System/WhiteBox/estudio/marca-laboratoriotextil/exploracion/logo-boton-aguja.svg`.
- **Fotos:** `~/System/WhiteBox/proyectos/laboratoriotextil/media/2026-10-taller-costura/`, reducidas a
  1000 px. Ninguna muestra la cara de un menor: la 06 está recortada para dejar solo a la niña de espaldas.
- **Videos:** las copias para la intranet de `~/Documents/videos/lt-lo-hice-yo` y `lt-taller-promo`
  (`~/System/WhiteBox/galerias/salida/video/`).
- **Texto del curso:** el programa de Natalia (`proyectos/laboratoriotextil/talleres/lo-hice-yo-programa.md`),
  corregido. El sitio no da edades, horarios, precios ni dirección: están por confirmar con ella.

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

- En vivo en www.laboratoriotextil.com (2026-10-08). El sitio anterior, la tienda de PUA, vive en puatextil.com.
- Falta confirmar con Natalia las edades, horarios, valor y lugar, para sumarlos.
- Los dos videos abren y cierran con el logo «Botón con aguja».
