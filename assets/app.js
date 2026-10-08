// Formulario de inscripción → servidor del taller (el mismo de la intranet). Las inscripciones
// aparecen en la intranet, sección INSCRIPCIONES. Los botones «Quiero inscribirme» eligen el curso.
(function () {
  const ENDPOINT = 'https://app.laboratoriotextil.com/api/inscripciones';
  const form = document.getElementById('form-inscripcion');
  const estado = document.getElementById('f-estado');
  const curso = document.getElementById('f-curso');
  const boton = form.querySelector('button[type="submit"]');

  document.querySelectorAll('[data-curso]').forEach((a) => a.addEventListener('click', () => {
    curso.value = a.dataset.curso;
    setTimeout(() => document.getElementById('f-nombre').focus({ preventScroll: true }), 400);
  }));

  function aviso(texto, tipo) {
    estado.textContent = texto;
    estado.className = 'estado' + (tipo ? ' estado-' + tipo : '');
  }

  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const datos = Object.fromEntries(new FormData(form));
    if ((datos.nombre || '').trim().length < 2) { aviso('Escribe tu nombre.', 'error'); form.nombre.focus(); return; }
    if ((datos.contacto || '').trim().length < 6) { aviso('Déjanos un teléfono o un correo para responderte.', 'error'); form.contacto.focus(); return; }
    boton.disabled = true;
    aviso('Enviando…');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datos) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.ok === false) throw new Error(j.error || 'No se pudo enviar.');
      form.reset();
      aviso('¡Gracias! Recibimos tus datos y te escribimos pronto.', 'ok');
    } catch (e) {
      aviso(`${e.message} Si sigue fallando, inténtalo en unos minutos.`, 'error');
    } finally {
      boton.disabled = false;
    }
  });
})();
