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

  // año
  document.querySelectorAll('[data-anio]').forEach((el) => { el.textContent = new Date().getFullYear(); });

  // entradas
  if (quieto || !hayGsap) { raiz.classList.remove('js'); return; }
  document.fonts.ready.then(() => {
    if (typeof SplitText !== 'undefined') {
      document.querySelectorAll('[data-lineas]').forEach((el) => {
        const sp = SplitText.create(el, { type: 'lines', mask: 'lines', linesClass: 'linea' });
        gsap.set(sp.lines, { yPercent: 105 });
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true,
          onEnter: () => gsap.to(sp.lines, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08 }) });
      });
    }
    ScrollTrigger.batch('[data-rev]', { start: 'top 90%', once: true,
      onEnter: (els) => els.forEach((el, i) => { el.style.setProperty('--d', el.style.getPropertyValue('--d') || (i * 0.08) + 's'); el.classList.add('visto'); }) });
    ScrollTrigger.refresh();
  });
})();
