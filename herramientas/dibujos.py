"""Los dibujos de línea del sitio: trazos de 1 px claros para el dibujo, líneas de construcción
punteadas en el acento, un relleno al 10 %. Las capas de cada paso del proceso miden 276 × 276, los
íconos 48 × 48 y 40 × 40 (1,5 px, currentColor). Salen en sintaxis de React; a_html() las pasa a HTML."""
import math
W, G, GF = "#FAFAFA", "#00A19D", "#00A19D1A"
def svg(vb, body): return f'<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 {vb} {vb}" fill="none" className="svg">{body}</svg>'
def P(d, stroke=W, extra=""): return f'<path d="{d}" stroke="{stroke}"{extra}></path>'
DASH = ' strokeDasharray="3 5" strokeLinejoin="bevel"'

# ── step 1 · medidas y molde ──
def tape():
    # a ribbon along a gentle curve with ticks, and its case
    pts = []
    for i in range(41):
        t = i / 40
        x = 30 + 216 * t
        y = 196 - 70 * t + 26 * math.sin(math.pi * t * 1.2)
        pts.append((x, y))
    def offset(k):
        out = []
        for i, (x, y) in enumerate(pts):
            x2, y2 = pts[min(i + 1, len(pts) - 1)]; x1, y1 = pts[max(i - 1, 0)]
            dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1
            out.append((x - dy / L * k, y + dx / L * k))
        return out
    a, b = offset(-9), offset(9)
    edge = lambda q: "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in q)
    ticks = []
    for i in range(1, 40):
        x, y = pts[i]; (xa, ya), (xb, yb) = a[i], b[i]
        f = 0.55 if i % 5 else 0.95
        ticks.append(f"M{xa:.1f} {ya:.1f} L{xa + (xb - xa) * f:.1f} {ya + (yb - ya) * f:.1f}")
    case = "M14 176h34v34H14z M31 193m-9 0a9 9 0 1 0 18 0a9 9 0 1 0-18 0"
    return svg(276, P(edge(a) + " " + edge(b) + " " + " ".join(ticks)) + P(case))
def guias():
    d = "M138 34V246 M58 62H218 M52 112H224 M66 236H210 M58 56v12 M218 56v12 M52 106v12 M224 106v12 M66 230v12 M210 230v12"
    return svg(276, P(d, G, DASH))
def molde():
    out = "M72 44 C92 52 108 52 120 42 L190 58 C184 82 186 104 204 122 L198 236 H72 Z"
    sa = "M64 36 C92 45 108 45 121 34 L199 52 C192 80 195 102 213 120 L206 244 H64 Z"
    grain = "M132 112V204 M126 120l6-8 6 8 M126 196l6 8 6-8"
    notch = "M186 92l8 4 M198 178h-8 M72 140h8"
    holes = "M100 170m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0 M160 170m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0"
    return svg(276, f'<path d="{out}" stroke="{W}" fill="{GF}"></path>' + P(sa, G, DASH) + P(grain + " " + notch) + P(holes))

# ── step 2 · tela y corte ──
def tijeras():
    d = ("M138 98 L112 168 L118 170 Z M138 98 L164 168 L158 170 Z "
         "M138 98 L124 70 M138 98 L152 70 "
         "M124 70m-14 -14a14 14 0 1 0 0.1 0Z M152 70m14 -14a14 14 0 1 1 -0.1 0Z")
    d = ("M138 100 L114 170 M138 100 L162 170 M119 171 L114 170 L121 150 M157 171 L162 170 L155 150 "
         "M138 100 L126 74 M138 100 L150 74 "
         "M116 58m-14 0a14 14 0 1 0 28 0a14 14 0 1 0-28 0 M160 58m-14 0a14 14 0 1 0 28 0a14 14 0 1 0-28 0 "
         "M138 100m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0")
    return svg(276, P(d))
def pieza():
    p = "M96 176 C108 182 118 182 126 174 L170 184 C166 198 168 212 180 222 L176 250 H96 Z"
    cut = "M90 170 C108 176 118 176 127 167 L177 179 C173 196 175 210 188 222 L183 256 H90 Z"
    return svg(276, f'<path d="{p}" stroke="{W}" fill="{GF}"></path>' + P(cut, G, ' strokeDasharray="2 4" strokeLinejoin="bevel"'))

# ── step 3 · costura (the classes the page's CSS animates: .dashed-line runs) ──
def tela_puntada():
    fabric = "M36 182 L186 182 L192 196 L42 196 Z"
    return svg(276, f'<path d="{fabric}" stroke="{W}" fill="{GF}"></path>' + f'<path className="puntada" d="M44 189 H88" stroke="{G}" strokeDasharray="3 5"></path>')
def aguja():
    d = "M88 112V150 M88 150V176 M80 168h16 M78 176h20 M84 150h8"
    thread = '<path className="puntada" d="M150 66 C130 74 104 84 92 112" stroke="%s" strokeDasharray="3 5"></path>' % G
    return svg(276, P(d) + thread)
def volante():
    d = ("M206 100m-18 0a18 18 0 1 0 36 0a18 18 0 1 0-36 0 M206 100m-5 0a5 5 0 1 0 10 0a5 5 0 1 0-10 0 "
         "M206 95V82 M210 103l11 7 M202 103l-11 7")
    return svg(276, P(d))
def maquina():
    d = ("M28 200 H248 V216 H28 Z "
         "M196 200 V96 Q196 74 174 74 H82 Q66 74 66 90 V112 Q66 122 76 122 H100 Q106 122 106 116 V104 H176 Q184 104 184 112 V200 "
         "M150 74 V60 M140 60 H160")
    return svg(276, P(d))

# ── step 4 · terminación ──
def poleron():
    d = ("M98 70 C92 30 112 18 138 18 C164 18 184 30 178 70 L214 82 L242 190 L216 198 L198 130 L198 238 H78 L78 130 L60 198 L34 190 L62 82 Z "
         "M112 66 C112 40 124 32 138 32 C152 32 164 40 164 66 C156 80 120 80 112 66 Z "
         "M128 78 V106 M148 78 V106 M100 186 H176 L170 222 H106 Z M78 228 H198 M42 186 L64 194 M234 186 L212 194")
    return svg(276, P(d, W, ' strokeLinejoin="round"'))
def etiqueta():
    tag = "M206 92 L230 86 L238 116 L214 122 Z M222 94m-2.5 0a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0"
    string = "M220 94 C210 84 192 74 172 62"
    hem = "M82 232 H194 M70 186 L58 190"
    return svg(276, f'<path d="{tag}" stroke="{W}" fill="{GF}"></path>' + P(string + " " + hem, G, DASH))

# ── icons ──
I = ' strokeWidth="1.5" strokeMiterlimit="10" strokeLinejoin="round" strokeLinecap="round"'
def icon(vb, d): return svg(vb, f'<path d="{d}" stroke="currentColor"{I}></path>')
ICONOS = {
  "produccion": icon(48, "M6 38H42 M8 34H40V38H8Z M34 34V14Q34 10 30 10H14Q11 10 11 13V17Q11 19 13 19H17V16H30V34 M14 19V27 M11 27H17 M29 10V7 M25 7H33"),
  "gestion": icon(48, "M12 9H36V42H12Z M19 6H29V12H19Z M18 21l3 3 5-6 M30 21H32 M18 30l3 3 5-6 M30 30H32"),
  "diseno": icon(48, "M8 38L38 8L42 12L12 42Z M16 30l3 3 M21 25l2 2 M25 21l3 3 M30 16l2 2 M8 14C18 12 22 22 30 36"),
  "clases": icon(48, "M14 10H30 M14 34H30 M17 10V34 M27 10V34 M17 16C21 18 23 18 27 16 M17 22C21 24 23 24 27 22 M17 28C21 30 23 30 27 28 M38 6L32 40 M37 9.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0 M27 30C33 30 36 26 36.5 18"),
}
COMPARA = {
  "medidas": icon(40, "M6 12H22V28H6Z M14 20m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0 M22 22H35V28H22 M26 22V25 M30 22V25 M34 22V24"),
  "cantidad": icon(40, "M14 8L8 12L5 19L10 21L12 17V33H28V17L30 21L35 19L32 12L26 8C24 11 16 11 14 8Z"),
  "conquien": icon(40, "M6 9H24V21H14L9 25V21H6Z M18 25V29H27L32 33V29H34V17H28"),
  "cambios": icon(40, "M31 16A12 12 0 0 0 9 15 M9 24A12 12 0 0 0 31 25 M31 8V16H23 M9 32V24H17"),
}
CAPAS = {1: [tape(), guias(), molde()], 2: [tijeras(), pieza()], 3: [tela_puntada(), aguja(), volante(), maquina()], 4: [poleron(), etiqueta()]}


# ── las tres estrellas del último paso ──
def destellos():
    def estrella(cx, cy, r):
        pts = []
        for k in range(8):
            ang = k * math.pi / 4 - math.pi / 2
            rr = r if k % 2 == 0 else r * 0.22
            pts.append(f"{cx + rr * math.cos(ang):.1f} {cy + rr * math.sin(ang):.1f}")
        return f'<path className="destello" d="M{" L".join(pts)} Z" fill="#9ff7ee"></path>'
    return svg(276, estrella(92, 64, 10) + estrella(196, 168, 7) + estrella(70, 196, 6))
CAPAS[4] = CAPAS[4] + [destellos()]

def a_html(s):
    """Sintaxis de React a HTML: class y atributos con guion."""
    s = s.replace("className=", "class=")
    for a, b in (("strokeDasharray", "stroke-dasharray"), ("strokeLinejoin", "stroke-linejoin"), ("strokeLinecap", "stroke-linecap"),
                 ("strokeWidth", "stroke-width"), ("strokeMiterlimit", "stroke-miterlimit"), ("clipPath", "clip-path")):
        s = s.replace(a + "=", b + "=")
    return s.replace('width="100%" ', '')
