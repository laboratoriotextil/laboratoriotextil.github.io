#!/usr/bin/env python3
"""Arma las páginas del sitio desde fuente/: index.html, produccion/index.html y cursos/index.html.

Cada página de fuente/ usa marcadores que este programa reemplaza:
  {{cabeza}} {{cabecera}} {{pie}} {{llamado}}   las piezas comunes (fuente/cabeza.html, …)
  {{icono:nombre}} {{compara:nombre}}            los íconos de línea (herramientas/dibujos.py)
  {{flecha}} {{si}} {{no}}                        los íconos chicos
  {{pasos}}                                       las cuatro estaciones del proceso, con sus dibujos
  {{prendas:sufijo}}                              las prendas de la portada de producción
Desde la raíz del repositorio:  python3 herramientas/armar.py"""
import os, re, sys

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(RAIZ, "herramientas"))
import dibujos as d

PAGINAS = {
    "inicio": ("index.html", "/", "Laboratorio Textil · Taller textil a medida",
               "Laboratorio Textil es el taller textil de Natalia: producción, gestión y diseño de prendas y piezas a medida, y capacitación para todas las edades y escalas."),
    "produccion": ("produccion/index.html", "/produccion/", "Producción · Laboratorio Textil",
                   "Producción, gestión y diseño de prendas y piezas a medida en el taller de Laboratorio Textil, de una pieza a una serie."),
    "cursos": ("cursos/index.html", "/cursos/", "Cursos y talleres · Laboratorio Textil",
               "«Lo hice yo», el curso de costura básico en cuatro clases, y talleres de costura para niñas y niños. Inscríbete o pregúntanos."),
}
PRENDAS = [("laboratoriotextil-polera", "Polera Laboratorio Textil"), ("ochodelocho-poleron-capucha-espalda", "Polerón con capucha ochodelocho, espalda"),
           ("luche-poleron", "Polerón Luche"), ("laboratoriotextil-poleron-capucha", "Polerón con capucha Laboratorio Textil"),
           ("datoyrelato-polera-manga-larga", "Polera manga larga Dato y relato"), ("luche-poleron-capucha-espalda", "Polerón con capucha Luche, espalda"),
           ("ochodelocho-poleron-capucha", "Polerón con capucha ochodelocho"), ("laboratoriotextil-poleron-capucha-espalda", "Polerón con capucha Laboratorio Textil, espalda"),
           ("ochodelocho-buzo", "Buzo ochodelocho"), ("whitebox-pantalon", "Pantalón WhiteBox")]
PASOS = [("Medidas y molde", "Tomamos medidas y dibujamos el molde de cada pieza, para que la prenda calce desde el primer corte."),
         ("Tela y corte", "Elegimos la tela pensando en su uso, la probamos y cortamos las piezas sobre el molde."),
         ("Costura", "Cosemos cada pieza en la máquina del taller y probamos la prenda en el camino, para corregir a tiempo antes de coser el resto."),
         ("Terminación", "Rematamos, planchamos y revisamos cada prenda. Sale del taller terminada y lista para usar.")]
FLECHA = '<svg class="flecha" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8" stroke="currentColor" stroke-width="1.5"/></svg>'
SI = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="m8 12.5 2.5 2.5L16 9.5" stroke="currentColor" stroke-width="1.5"/></svg>'
NO = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m8 8 8 8M16 8l-8 8" stroke="currentColor" stroke-width="1.5"/></svg>'
LLAMADO = '''<section class="llamado" aria-labelledby="t-llamado">
    <div class="contenedor">
      <div class="llamado-caja esquinas">
        <div class="llamado-forma" aria-hidden="true"></div>
        <div class="llamado-txt">
          <h2 class="t-h2" id="t-llamado" data-lineas><span class="acento">¿Tienes una prenda</span><br>en mente?</h2>
          <a class="boton" href="/cursos/#inscripcion" data-rev><span class="boton-txt"><span>Escríbenos</span><span aria-hidden="true">Escríbenos</span></span></a>
        </div>
      </div>
    </div>
  </section>'''


def leer(nombre):
    return open(os.path.join(RAIZ, "fuente", nombre), encoding="utf-8").read()


def icono(s, clase="icono"):
    return d.a_html(s).replace('class="svg"', f'class="{clase}" aria-hidden="true"')


def pasos():
    out = []
    for i, (titulo, texto) in enumerate(PASOS, start=1):
        capas = "".join(f'<div class="paso-capa">{d.a_html(c)}</div>' for c in d.CAPAS[i])
        out.append(f'<div class="paso paso-{i}{" activo" if i == 1 else ""}" data-titulo="{titulo}" data-texto="{texto}">'
                   f'<div class="paso-marco esquinas">{capas}</div><p class="paso-n">Paso {i}</p></div>')
    return "".join(out)


def prendas(sufijo):
    return "".join(f'<img src="/assets/img/prendas/{p}{sufijo}.webp" alt="{"" if sufijo else n}" width="772" height="720" loading="eager">'
                   for p, n in PRENDAS)


def pie(clave):
    """El pie; en /cursos sin su llamado, porque el formulario está justo encima."""
    s = leer("pie.html")
    if clave == "cursos":
        s = re.sub(r'  <div class="pie-llamado">.*?\n  </div>\n(?=  <div class="pie-cuerpo">)', "", s, flags=re.S)
    return s


def armar(clave):
    salida, ruta, titulo, descripcion = PAGINAS[clave]
    s = leer(f"{clave}.html")
    cab = leer("cabecera.html")
    for k in PAGINAS:
        cab = cab.replace("{actual-%s}" % k, 'aria-current="page"' if k == clave else "")
    piezas = {
        "cabeza": leer("cabeza.html").replace("{titulo}", titulo).replace("{descripcion}", descripcion).replace("{ruta}", ruta),
        "cabecera": cab, "pie": pie(clave), "llamado": LLAMADO,
        "flecha": FLECHA, "si": SI, "no": NO, "pasos": pasos(),
    }
    def reemplazo(m):
        nombre, arg = m.group(1), m.group(2)
        if nombre == "icono": return icono(d.ICONOS.get(arg) or d.COMPARA[arg])
        if nombre == "compara": return icono(d.COMPARA[arg])
        if nombre == "prendas": return prendas(arg or "")
        if nombre in piezas: return piezas[nombre]
        raise SystemExit(f"marcador desconocido: {m.group(0)} en {clave}")
    s = re.sub(r"\{\{(\w+)(?::([\w-]*))?\}\}", reemplazo, s)
    destino = os.path.join(RAIZ, salida)
    os.makedirs(os.path.dirname(destino), exist_ok=True)
    open(destino, "w", encoding="utf-8").write(s)
    print("ok", salida)


for clave in PAGINAS:
    armar(clave)
