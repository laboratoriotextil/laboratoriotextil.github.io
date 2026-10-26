/* Laboratorio Textil · inicio: la caja del video del taller que se abre, la escena de la palabra que
   cambia (entra creciendo y sale achicándose), el acordeón del desafío, la fila del polerón —se fija,
   el polerón pasa de trama a imagen y la fila corre hacia «Hecho en»—, el globo que alterna y la foto
   ancha que se mueve más lento que la página. */
(function () {
  const quieto = window.LT && LT.quieto;

  const hayST = typeof ScrollTrigger !== 'undefined' && !quieto;
  const computador = matchMedia('(min-width: 992px)').matches;

  // ── el taller: la caja del video se abre desde el centro al llegar ──
  const caja = document.getElementById('taller-foto');
  if (caja && hayST) {
    gsap.set(caja, { clipPath: 'inset(18% 18% 18% 18%)' });
    gsap.set(caja.querySelector('video'), { scale: 1.3 });
    ScrollTrigger.create({ trigger: caja, start: 'top 85%', once: true, onEnter: () => {
      gsap.to(caja, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut' });
      gsap.to(caja.querySelector('video'), { scale: 1, duration: 1.6, ease: 'expo.inOut' });
    } });
  }

  // ── la escena: el avance del scroll elige la palabra y la foto ──
  const escena = document.querySelector('.escena');
  if (escena && hayST) {
    const fotosCaja = escena.querySelector('.escena-fotos'), frase = escena.querySelector('.contenedor');
    gsap.fromTo(fotosCaja, { scale: 1.2, opacity: .5, transformOrigin: '50% 0%' }, { scale: 1, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: escena, start: 'top bottom', end: 'top top', scrub: 1 } });
    gsap.fromTo(frase, { scale: .95, opacity: .8 }, { scale: 1, opacity: 1, ease: 'power2.out',
      scrollTrigger: { trigger: escena, start: 'top bottom', end: 'top top', scrub: 1 } });
    const salida = gsap.timeline({ scrollTrigger: { trigger: escena, start: 'bottom-=150% bottom', end: 'bottom bottom', scrub: 1 } });
    salida.to(frase, { scale: .8, opacity: .6, ease: 'power2.in' }, 0).to(fotosCaja, { scale: 1.3, opacity: .5, transformOrigin: '50% 100%', ease: 'none' }, 0);
  }
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
      cc.globalCompositeOperation = 'source-over'; cc.fillStyle = '#000'; cc.fillRect(0, 0, color.width, color.height);
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
    const fila = document.getElementById('fila'), panelHecho = document.querySelector('.panel-hecho');
    if (hayST && computador && fila) {
      const pista = fila.querySelector('.fila-pista');
      const tl = gsap.timeline({ scrollTrigger: { trigger: fila, pin: true, start: 'top top', end: () => '+=' + innerHeight * 3.2, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true,
        onUpdate: (st) => { if (st.progress > .6) panelHecho.classList.add('visto'); } } });
      const escaneo = { p: 0 };
      tl.to(escaneo, { p: 1, duration: 1, ease: 'none', onUpdate: () => {
          medio.style.setProperty('--corte', (escaneo.p * 100).toFixed(2) + '%');
          medio.style.setProperty('--luz', escaneo.p > 0 && escaneo.p < 1 ? '1' : '0');
        } })
        .to({}, { duration: .25 })
        .to(medio.querySelector('.solucion-marco'), { rotationX: 30, ease: 'none', duration: 1.2 }, 'corre')
        .to(medio, { xPercent: 10, ease: 'none', duration: 1.2 }, 'corre')
        .to(pista, { x: () => -innerWidth, ease: 'none', duration: 1.2 }, 'corre')
        .to({}, { duration: .5 });
    } else {
      medio.style.setProperty('--corte', '55%');
      if (panelHecho) panelHecho.classList.add('visto');
    }
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
