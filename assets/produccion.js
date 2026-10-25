/* Laboratorio Textil · producción: la línea que separa las prendas blancas de su trama (se arrastra,
   o se mueve con las flechas), y el carrusel de las cuatro estaciones del proceso. */
(function () {
  // ── la línea de la portada ──
  const esc = document.getElementById('escaneo');
  const linea = document.getElementById('escaneo-linea');
  if (esc && linea) {
    let x = 50, arrastre = false;
    const poner = (v) => { x = Math.max(4, Math.min(96, v)); esc.style.setProperty('--x', x + '%'); linea.setAttribute('aria-valuenow', Math.round(x)); };
    const desde = (e) => { const r = esc.getBoundingClientRect(); poner(((e.clientX - r.left) / r.width) * 100); };
    linea.addEventListener('pointerdown', (e) => { arrastre = true; linea.setPointerCapture(e.pointerId); });
    linea.addEventListener('pointermove', (e) => { if (arrastre) desde(e); });
    linea.addEventListener('pointerup', () => { arrastre = false; });
    linea.addEventListener('keydown', (e) => { if (e.key === 'ArrowLeft') poner(x - 4); if (e.key === 'ArrowRight') poner(x + 4); });
    poner(50);
  }

  // ── el carrusel del proceso ──
  const car = document.getElementById('carrusel');
  if (car) {
    const pista = car.querySelector('.carrusel-pista');
    const pasos = [...car.querySelectorAll('.paso')];
    const titulo = document.getElementById('paso-titulo'), texto = document.getElementById('paso-texto');
    let i = 0, reloj = null;
    function ir(n) {
      i = (n + pasos.length) % pasos.length;
      const ancho = pasos[0].getBoundingClientRect().width;
      const visibles = Math.round(car.clientWidth / ancho);
      const centro = visibles > 1 ? 1 : 0;
      pista.style.transform = `translateX(${-(i - centro) * ancho}px)`;
      pasos.forEach((p, k) => {
        const activo = k === i;
        if (activo && !p.classList.contains('activo')) { p.classList.remove('activo'); void p.offsetWidth; }
        p.classList.toggle('activo', activo);
      });
      titulo.textContent = pasos[i].dataset.titulo; texto.textContent = pasos[i].dataset.texto;
    }
    function seguir() { clearInterval(reloj); if (!(window.LT && LT.quieto)) reloj = setInterval(() => ir(i + 1), 6000); }
    car.querySelectorAll('[data-mover]').forEach((b) => b.addEventListener('click', () => { ir(i + Number(b.dataset.mover)); seguir(); }));
    pasos.forEach((p, k) => p.addEventListener('click', () => { ir(k); seguir(); }));
    addEventListener('resize', () => ir(i));
    new IntersectionObserver((e) => { if (e[0].isIntersecting) { ir(i); seguir(); } else clearInterval(reloj); }, { threshold: 0.3 }).observe(car);
    ir(0);
  }
})();
