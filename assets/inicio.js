/* Laboratorio Textil · inicio: la tela de puntos de la portada, la escena de la palabra que cambia,
   el acordeón del desafío, el polerón que pasa de trama a imagen al bajar, el «Hecho en» que alterna
   con su globo, y la foto ancha que se mueve más lento que la página. */
(function () {
  const quieto = window.LT && LT.quieto;
  const TEAL = [0, 161, 157];

  // ── portada: una tela que ondula, dibujada en puntos ──
  const lienzo = document.getElementById('tela');
  if (lienzo) {
    const cx = lienzo.getContext('2d');
    let w, h, paso, dpr, vivo = true;
    function medir() {
      dpr = Math.min(2, devicePixelRatio || 1);
      w = lienzo.clientWidth; h = lienzo.clientHeight;
      lienzo.width = w * dpr; lienzo.height = h * dpr;
      paso = Math.max(5, Math.round(w / 190));
    }
    medir(); addEventListener('resize', medir);
    function altura(x, y, t) {
      // tres ondas que se cruzan, como una tela que flota
      const u = x / w, v = y / h;
      return Math.sin(u * 5.2 + t * 0.55 + Math.sin(v * 2.1 + t * 0.3) * 1.6) * 0.5
           + Math.sin(u * 2.3 - v * 3.1 + t * 0.35) * 0.35
           + Math.sin((u + v) * 7.5 - t * 0.8) * 0.15;
    }
    function dibujar(ms) {
      if (!vivo) return requestAnimationFrame(dibujar);
      const t = quieto ? 0 : ms / 1000;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx.clearRect(0, 0, w, h);
      for (let y = paso / 2; y < h; y += paso) {
        const banda = Math.max(0, 1 - Math.abs(y / h - 0.42) * 2.1);       // la tela ocupa una franja diagonal
        if (banda <= 0) continue;
        for (let x = paso / 2; x < w; x += paso) {
          const centro = y - (x / w - 0.5) * h * 0.18;                       // la franja se inclina
          const b2 = Math.max(0, 1 - Math.abs(centro / h - 0.42) * 2.4);
          if (b2 <= 0.02) continue;
          const z = altura(x, y, t);
          const d = paso * 3;
          const pend = (altura(x + d, y - d, t) - z) / (d / w);              // pendiente hacia la luz
          const luz = 0.45 + pend * 0.11 + z * 0.18;                         // luz rasante: las caras que miran la luz brillan
          const k = Math.max(0, Math.min(1, luz)) * Math.min(1, b2 * 1.6);
          if (k < 0.08) continue;
          const r = paso * (0.18 + 0.5 * k);
          const g = k > 0.8 ? (k - 0.8) * 5 : 0;                             // las crestas pasan a un verde más claro
          cx.fillStyle = `rgba(${Math.round(TEAL[0] + 95 * g)},${Math.round(TEAL[1] + 84 * g)},${Math.round(TEAL[2] + 71 * g)},${0.15 + 0.85 * k})`;
          cx.fillRect(x - r / 2, y - r / 2, r, r);
        }
      }
      if (!quieto) requestAnimationFrame(dibujar);
    }
    requestAnimationFrame(dibujar);
    new IntersectionObserver((e) => { vivo = e[0].isIntersecting; }).observe(lienzo);
  }

  // ── la escena: el avance del scroll elige la palabra y la foto ──
  const escena = document.querySelector('.escena');
  if (escena && typeof ScrollTrigger !== 'undefined') {
    const palabras = escena.querySelectorAll('.escena-palabras span');
    const fotos = escena.querySelectorAll('.escena-fotos img');
    const avance = escena.querySelector('.escena-avance');
    let actual = 0;
    ScrollTrigger.create({ trigger: escena, start: 'top top', end: 'bottom bottom',
      onUpdate: (st) => {
        avance.style.setProperty('--p', st.progress.toFixed(3));
        const i = Math.min(palabras.length - 1, Math.floor(st.progress * palabras.length * 0.999));
        if (i === actual) return;
        palabras.forEach((p, k) => { p.classList.toggle('activa', k === i); p.classList.toggle('antes', k < i); });
        fotos.forEach((f, k) => f.classList.toggle('activa', k === i % fotos.length));
        actual = i;
      } });
  }

  // ── el desafío: un acordeón, uno abierto a la vez ──
  const retos = document.querySelectorAll('.reto');
  retos.forEach((r) => r.querySelector('.reto-cabeza').addEventListener('click', () => {
    const abrir = !r.classList.contains('abierto');
    retos.forEach((o) => { o.classList.remove('abierto'); o.querySelector('.reto-cabeza').setAttribute('aria-expanded', 'false'); });
    if (abrir) { r.classList.add('abierto'); r.querySelector('.reto-cabeza').setAttribute('aria-expanded', 'true'); }
    setTimeout(() => window.ScrollTrigger && ScrollTrigger.refresh(), 650);
  }));

  // ── la solución: el polerón en trama de puntos, que se descubre al bajar ──
  const video = document.getElementById('giro');
  const trama = document.getElementById('giro-trama');
  const color = document.getElementById('giro-color');
  if (video && trama && color) {
    const tc = trama.getContext('2d'), cc = color.getContext('2d');
    const poster = new Image(); poster.src = video.poster;
    const muestra = document.createElement('canvas'); const mc = muestra.getContext('2d', { willReadFrequently: true });
    const COLS = 70;
    function cuadro() {
      const W = trama.clientWidth, H = trama.clientHeight; if (!W) return;
      const dpr = Math.min(2, devicePixelRatio || 1);
      if (trama.width !== Math.round(W * dpr)) { trama.width = color.width = Math.round(W * dpr); trama.height = color.height = Math.round(H * dpr); }
      // la imagen a color va sobre el color de la página: el negro del video se vuelve fondo
      const fuente = video.readyState >= 2 ? video : poster;
      cc.globalCompositeOperation = 'source-over'; cc.fillStyle = '#0a0a0a'; cc.fillRect(0, 0, color.width, color.height);
      cc.globalCompositeOperation = 'lighten'; cc.drawImage(fuente, 0, 0, color.width, color.height);
      const filas = Math.round(COLS * H / W);
      muestra.width = COLS; muestra.height = filas;
      mc.drawImage(fuente, 0, 0, COLS, filas);
      const px = mc.getImageData(0, 0, COLS, filas).data;
      const s = trama.width / COLS;
      tc.clearRect(0, 0, trama.width, trama.height);
      tc.fillStyle = 'rgb(0,161,157)';
      for (let j = 0; j < filas; j++) for (let i = 0; i < COLS; i++) {
        const o = (j * COLS + i) * 4, l = (px[o] + px[o + 1] + px[o + 2]) / 765;
        if (l < 0.12) continue;
        const r = s * 0.8 * Math.min(1, l * 1.1);
        tc.fillRect(i * s + (s - r) / 2, j * s + (s - r) / 2, r, r);
      }
    }
    let pedido = false;
    function bucle() { if (!video.paused) cuadro(); pedido = !video.paused; if (pedido) requestAnimationFrame(bucle); }
    video.addEventListener('play', () => { if (!pedido) requestAnimationFrame(bucle); });
    video.addEventListener('loadeddata', cuadro);
    poster.addEventListener('load', cuadro);
    addEventListener('resize', cuadro);
    new IntersectionObserver((e) => { if (e[0].isIntersecting) { if (!quieto) video.play().catch(() => {}); } else video.pause(); }, { threshold: 0.1 }).observe(video);
    const medio = document.querySelector('.solucion-medio');
    if (typeof ScrollTrigger !== 'undefined' && matchMedia('(min-width: 768px)').matches) {
      ScrollTrigger.create({ trigger: '.solucion', start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate: (st) => {
          const p = Math.min(1, Math.max(0, (st.progress - 0.15) / 0.6));
          medio.style.setProperty('--corte', (p * 100).toFixed(2) + '%');
          medio.style.setProperty('--luz', (p > 0 && p < 1 ? 1 : 0).toString());
        } });
    } else medio.style.setProperty('--corte', '55%');
  }

  // ── hecho en: la palabra y el globo se turnan ──
  const cambia = document.querySelectorAll('.hecho-cambia span');
  const mapas = document.querySelectorAll('.hecho-mapa img');
  if (cambia.length > 1 && !quieto) {
    let i = 0;
    setInterval(() => {
      const sig = (i + 1) % cambia.length;
      cambia.forEach((c, k) => { c.classList.toggle('activa', k === sig); c.classList.toggle('antes', k === i); });
      mapas.forEach((m, k) => m.classList.toggle('activa', k === sig));
      setTimeout(() => cambia[i === 0 ? 0 : i].classList.remove('antes'), 900);
      i = sig;
    }, 3200);
  }

  // ── la foto ancha se mueve más lento ──
  if (!quieto && typeof gsap !== 'undefined') {
    document.querySelectorAll('[data-paralaje]').forEach((im) => gsap.fromTo(im, { yPercent: -8 }, { yPercent: 8, ease: 'none',
      scrollTrigger: { trigger: im.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));
  }
})();
