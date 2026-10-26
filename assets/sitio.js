/* Laboratorio Textil · lo que comparten las tres páginas: el desplazamiento suave (Lenis, al ritmo de
   GSAP), la cabecera que se esconde al bajar y vuelve al subir, el menú del teléfono, los títulos que
   entran por líneas, lo que aparece al llegar ([data-rev]), las cintas que se repiten y el año. */
(function () {
  const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const raiz = document.documentElement;
  const hayGsap = typeof gsap !== 'undefined';
  if (hayGsap) gsap.registerPlugin(ScrollTrigger, ...(typeof SplitText !== 'undefined' ? [SplitText] : []));

  // desplazamiento suave
  let lenis = null;
  if (!quieto && typeof Lenis !== 'undefined' && hayGsap) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // los enlaces a una sección de la misma página
    document.querySelectorAll('a[href*="#"]').forEach((a) => {
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      a.addEventListener('click', (e) => {
        const destino = document.querySelector(url.hash);
        if (!destino) return;
        e.preventDefault();
        cerrarMenu();
        lenis.scrollTo(destino, { offset: -parseFloat(getComputedStyle(raiz).fontSize) * 9.5 });
        history.replaceState(null, '', url.hash);
      });
    });
  }
  window.LT = { lenis, quieto };

  // cabecera
  const cab = document.getElementById('cabecera');
  const boton = cab && cab.querySelector('.menu-boton');
  let ultimo = 0;
  function alDesplazar(y) {
    if (!cab || cab.classList.contains('abierta')) return;
    const h = cab.offsetHeight;
    cab.classList.toggle('con-fondo', y > h * 2);
    if (y > h * 3 && y > ultimo + 2) cab.classList.add('oculta');
    else if (y < ultimo - 2 || y <= h * 3) cab.classList.remove('oculta');
    ultimo = y;
  }
  if (lenis) lenis.on('scroll', (e) => alDesplazar(e.scroll));
  else addEventListener('scroll', () => alDesplazar(scrollY), { passive: true });
  alDesplazar(scrollY);
  function cerrarMenu() {
    if (!cab || !cab.classList.contains('abierta')) return;
    cab.classList.remove('abierta'); boton.setAttribute('aria-expanded', 'false'); boton.setAttribute('aria-label', 'Abrir el menú');
    lenis && lenis.start();
  }
  if (boton) boton.addEventListener('click', () => {
    if (cab.classList.contains('abierta')) return cerrarMenu();
    cab.classList.add('abierta'); cab.classList.remove('oculta'); boton.setAttribute('aria-expanded', 'true'); boton.setAttribute('aria-label', 'Cerrar el menú');
    lenis && lenis.stop();
  });
  document.querySelectorAll('.menu a').forEach((a) => a.addEventListener('click', () => setTimeout(cerrarMenu, 50)));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });

  // cintas: se duplica el contenido para que el bucle no tenga costura
  document.querySelectorAll('[data-duplicar]').forEach((p) => { p.innerHTML += p.innerHTML; p.querySelectorAll('img').forEach((im, i) => { if (i >= p.children.length / 2) im.alt = ''; }); });

  // paso entre páginas: la página se desvanece antes de ir a otra del sitio
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank' || a.hasAttribute('download')) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.hash)) return;
    e.preventDefault();
    cerrarMenu();
    raiz.classList.add('saliendo');
    setTimeout(() => { location.href = url.href; }, quieto ? 0 : 600);
  });
  addEventListener('pageshow', (e) => { if (e.persisted) raiz.classList.remove('saliendo'); });

  // el correo del pie: llega a la intranet del taller como una consulta «Novedades del taller»
  const pieCorreo = document.getElementById('pie-correo');
  if (pieCorreo) pieCorreo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const campo = pieCorreo.querySelector('input[type="email"]'), estado = pieCorreo.querySelector('.pie-correo-estado');
    const aviso = (t, error) => { estado.textContent = t; estado.classList.toggle('error', !!error); };
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(campo.value.trim())) { aviso('Escribe un correo válido.', true); campo.focus(); return; }
    aviso('Enviando…');
    try {
      const r = await fetch('https://app.laboratoriotextil.com/api/inscripciones', { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ curso: 'otro', nombre: 'Novedades del taller', contacto: campo.value.trim(), sitio_web: pieCorreo.sitio_web.value,
          mensaje: 'Quiere recibir las novedades del taller (correo dejado en el pie de la página).' }) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.ok === false) throw new Error(j.error || 'No se pudo enviar.');
      pieCorreo.reset(); aviso('¡Listo! Te avisaremos de los próximos cursos.');
    } catch (err) { aviso(err.message + ' Inténtalo en unos minutos.', true); }
  });

  // año
  document.querySelectorAll('[data-anio]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // entradas
  if (quieto || !hayGsap) { raiz.classList.remove('js'); return; }
  document.fonts.ready.then(() => {
    // los textos entran palabra por palabra, cada línea con máscara (títulos, etiquetas y párrafos)
    const textos = [...document.querySelectorAll('[data-lineas], p[data-rev], h2[data-rev], .t-etiqueta[data-rev]')];
    if (typeof SplitText !== 'undefined') {
      textos.forEach((el) => {
        el.removeAttribute('data-rev');
        SplitText.create(el, { type: 'lines words', mask: 'lines', autoSplit: true, onSplit: (self) => {
          gsap.set(self.words, { autoAlpha: 0, yPercent: 100 });
          return ScrollTrigger.create({ trigger: el, start: 'top 70%', once: true,
            onEnter: () => gsap.to(self.words, { autoAlpha: 1, yPercent: 0, stagger: 0.02, duration: 0.8, ease: 'power2.out' }) });
        } });
      });
    }
    ScrollTrigger.batch('[data-rev]', { start: 'top 90%', once: true,
      onEnter: (els) => els.forEach((el, i) => { el.style.setProperty('--d', el.style.getPropertyValue('--d') || (i * 0.08) + 's'); el.classList.add('visto'); }) });
    ScrollTrigger.refresh();
  });
})();
