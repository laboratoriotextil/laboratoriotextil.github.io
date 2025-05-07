// js/i18n.js
// Internationalization setup using i18next
// Define translation resources
const resources = {
  es: {
    translation: {
      // Sections
      "philosophy.title": "Nuestra Filosofía",
      // Philosophy section paragraphs
      "philosophy.p1": "PUA nace como una respuesta creativa a la problemática del desecho textil, con la misión de reutilizar, reducir y reciclar materiales para transformarlos en objetos únicos, prácticos y útiles.",
      "philosophy.p2": "Somos la unión y creación de diversos materiales con la intención de reducir y reciclar el desecho textil, a través de diseños únicos enfocados principalmente en el mundo infantil.",
      "philosophy.p3": "Cada prenda que creamos es el resultado de un cuidadoso proceso artesanal, donde valoramos profundamente el oficio de la costura y la tradición textil, combinándolo con diseños contemporáneos y funcionales.",
      "philosophy.p4": "Mientras Laboratorio Textil representa nuestra rama de investigación y experimentación, PUA es nuestra línea de productos que materializa esa investigación en prendas y accesorios para los más pequeños.",
      // Contact section
      "contact.title": "Contáctanos para personalizar",
      // Footer
      "footer.links": "Enlaces",
      "footer.follow_us": "Síguenos",
      "footer.tagline": "Diseño textil infantil sostenible",
      "footer.location": "Valparaíso, Chile",
      "footer.copyright": "© 2025 PUA - Todos los derechos reservados",
      // Navigation
      "nav.polerones": "Polerones",
      "nav.frajacket": "Frajacket",
      "nav.accesorios": "Accesorios",
      "nav.hogar": "Hogar",
      "nav.haz_pedido": "Haz tu pedido",
      // Hero section
      "hero.title": "Laboratorio Textil Sostenible",
      "hero.subtitle": "Creamos prendas únicas y de calidad, valorando el oficio de la costura y respetando el medio ambiente",
      // Product listings
      "product.in_stock": "En stock",
      "product.out_of_stock": "Agotado",
      "product.none_found": "No se encontraron productos.",
      "product.materials_title": "Materiales",
      // Index custom section
      "section.custom.title": "A TU PINTA",
      "section.custom.p1": "En PUA creemos que cada prenda debe ser tan única como quien la usa. Por eso, te ofrecemos la posibilidad de personalizar cualquier producto según tus preferencias y necesidades específicas.",
      "section.custom.p2": "¿Te gusta un diseño que está agotado? ¿Quieres modificar colores o añadir detalles especiales? ¿Necesitas una talla diferente o una combinación de materiales distinta? ¡No hay problema! Podemos crear una versión personalizada especialmente para ti.",
      "section.custom.p3": "Cuéntanos tu idea y trabajaremos juntos para hacerla realidad, manteniendo siempre nuestra filosofía de reutilizar, reducir y reciclar. Cada pieza personalizada es una oportunidad para crear algo verdaderamente único y significativo.",
      "contact.wholesale": "Para peticiones al por mayor, envíanos un correo a <a href=\"mailto:pua@laboratoriotextil.com\" style=\"color: #f8f9fa; text-decoration: underline;\">pua@laboratoriotextil.com</a> y te enviaremos un presupuesto.",
      // Polerones page
      "polerones.info.title": "Sobre nuestros polerones",
      "polerones.info.p1": "Cada polerón de PUA es una pieza única, confeccionada artesanalmente con materiales reciclados y telas recuperadas. Nuestro proceso creativo comienza con la selección cuidadosa de telas y materiales recuperados, que luego transformamos en prendas funcionales y llenas de personalidad.",
      "polerones.info.p2": "Valoramos el oficio de la costura y cada detalle es trabajado con dedicación, asegurando que cada prenda no solo sea hermosa sino también duradera. Los diseños geométricos y coloridos que caracterizan nuestros polerones están pensados especialmente para los más pequeños, combinando estética y comodidad.",
      "polerones.info.p3": "Al adquirir un polerón PUA, estás apoyando un proyecto que busca reducir el impacto ambiental de la industria textil, mientras vistes a tus hijos con prendas únicas y llenas de historia.",
      // Frajacket page
      "frajacket.info.title": "Sobre nuestras Frajacket",
      "frajacket.info.p1": "Nuestras Frajacket representan la fusión perfecta entre funcionalidad, calidez y diseño sostenible. Cada pieza es confeccionada artesanalmente utilizando materiales reciclados de alta calidad, dando nueva vida a textiles que de otra forma serían desechados.",
      "frajacket.info.p2": "El proceso de creación de cada Frajacket comienza con la cuidadosa selección de materiales, priorizando texturas y tonalidades que se complementen entre sí. Luego, a través de un meticuloso trabajo de corte y confección, transformamos estos materiales en prendas únicas que combinan estética y practicidad.",
      "frajacket.info.p3": "Cada detalle, desde los bolsillos hasta los cierres, es considerado tanto por su funcionalidad como por su aporte al diseño general. El resultado son chaquetas con personalidad propia, que no solo mantienen el calor sino que también cuentan una historia de sostenibilidad y creatividad.",
      // Accesorios page
      "accesorios.header.subtitle": "Complementos textiles elaborados con retazos y materiales recuperados",
      "accesorios.info.title": "Sobre nuestros accesorios",
      "accesorios.info.p1": "Nuestros accesorios son el resultado de un proceso creativo que busca aprovechar al máximo los retazos textiles. Cada pieza es confeccionada a mano, dando una segunda vida a materiales que de otra forma serían desechados.",
      "accesorios.info.p2": "En PUA creemos que incluso los complementos más pequeños pueden tener un gran impacto, tanto en tu estilo como en el medio ambiente. Por eso, cada accesorio que creamos combina funcionalidad, estética y sostenibilidad.",
      "accesorios.info.p3": "Los diseños coloridos y las texturas variadas hacen que cada accesorio sea único, reflejando nuestra filosofía de valorar el oficio de la costura y generar productos de calidad que respetan el entorno.",
      // Colets page
      "colets.info.title": "Sobre nuestros colets y accesorios",
      "colets.info.p1": "Nuestros colets y accesorios son el resultado de un proceso creativo que busca aprovechar al máximo los retazos textiles. Cada pieza es confeccionada a mano, dando una segunda vida a materiales que de otra forma serían desechados.",
      "colets.info.p2": "En PUA creemos que incluso los complementos más pequeños pueden tener un gran impacto, tanto en tu estilo como en el medio ambiente. Por eso, cada colet que creamos combina funcionalidad, estética y sostenibilidad.",
      "colets.info.p3": "Los diseños coloridos y las texturas variadas hacen que cada accesorio sea único, reflejando nuestra filosofía de valorar el oficio de la costura y generar productos de calidad que respetan el entorno.",
      // Hogar page
      "hogar.info.title": "Sobre nuestros productos de hogar",
      "hogar.info.p1": "En PUA creemos que cada detalle en el hogar importa. Por eso, creamos productos que combinan funcionalidad y sostenibilidad, utilizando materiales reciclados para brindarte artículos únicos y responsables con el medio ambiente.",
      "hogar.info.p2": "Pronto podrás descubrir nuestra colección de productos para el hogar, pensada para aportar personalidad y calidez a tu espacio mientras cuidas el planeta.",
      // Order page
      "order.intro.p1": "En Laboratorio Textil cada prenda o pequeña serie es un proyecto único. Nos apasiona transformar tus ideas en realidad artesanal.",
      "order.intro.p2": "Para lograr un resultado impecable, cuéntanos con todo detalle: estilo, colores, materiales, tallas y cualquier otro requisito. ¡Cuanta más información, mejor!",
      "order.label.project": "Cuéntanos tu proyecto en detalle",
      "order.placeholder.project": "Ejemplo: Quiero un polerón infantil acolchado, talla M (6 años), en felpa de algodón orgánico color celeste, con estampado de montañas en la espalda, capucha forrada, puños elásticos y bolsillos laterales.",
      "order.note.fabrics": "Si tienes telas propias que quieras que utilicemos, envíanos sus imágenes al correo <a href=\"mailto:pua@laboratoriotextil.com\">pua@laboratoriotextil.com</a> y te responderemos a la brevedad.",
      "order.label.email": "Tu correo electrónico",
      "order.placeholder.email": "tucorreo@ejemplo.com",
      "order.note.reply": "Aquí recibirás información detallada del producto, presupuesto y formas de pago.",
      "order.button.submit": "Enviar",
      // Thank you page
      "thank.title": "¡Gracias por tu pedido!",
      "thank.subtitle": "Gracias por confiar en Laboratorio Textil.",
      "thank.info1": "Pronto recibirás en tu correo la información detallada de tu pedido junto con un presupuesto personalizado.",
      "thank.info2": "Si tienes alguna consulta, escríbenos a <a href=\"mailto:pua@laboratoriotextil.com\">pua@laboratoriotextil.com</a>.",
      "thank.button.home": "Volver al inicio"
    }
  },
  it: {
    translation: {
      // Sections
      "philosophy.title": "La nostra filosofia",
      // Philosophy section paragraphs
      "philosophy.p1": "PUA nasce come risposta creativa al problema degli scarti tessili, con la missione di riutilizzare, ridurre e riciclare materiali per trasformarli in oggetti unici, pratici e utili.",
      "philosophy.p2": "Siamo l'unione e la creazione di diversi materiali con l'obiettivo di ridurre e riciclare gli scarti tessili, attraverso design unici focalizzati principalmente sul mondo infantile.",
      "philosophy.p3": "Ogni capo che creiamo è il risultato di un attento processo artigianale, in cui valorizziamo profondamente l'arte della sartoria e la tradizione tessile, combinandole con design contemporanei e funzionali.",
      "philosophy.p4": "Mentre Laboratorio Textil rappresenta il nostro ramo di ricerca e sperimentazione, PUA è la nostra linea di prodotti che materializza quella ricerca in capi e accessori per i più piccoli.",
      // Contact section
      "contact.title": "Contattaci per personalizzare",
      // Footer
      "footer.links": "Link",
      "footer.follow_us": "Seguici",
      "footer.tagline": "Design tessile per l'infanzia sostenibile",
      "footer.location": "Valparaíso, Cile",
      "footer.copyright": "© 2025 PUA - Tutti i diritti riservati",
      // Navigation
      "nav.polerones": "Felpe",
      "nav.frajacket": "Frajacket",
      "nav.accesorios": "Accessori",
      "nav.hogar": "Casa",
      "nav.haz_pedido": "Fai il tuo ordine",
      // Hero section
      "hero.title": "Laboratorio Tessile Sostenibile",
      "hero.subtitle": "Creiamo capi unici e di qualità, valorizzando l'arte della sartoria e rispettando l'ambiente",
      // Product listings
      "product.in_stock": "In magazzino",
      "product.out_of_stock": "Esaurito",
      "product.none_found": "Nessun prodotto trovato.",
      "product.materials_title": "Materiali",
      // Index custom section
      "section.custom.title": "SU MISURA",
      "section.custom.p1": "In PUA crediamo che ogni capo debba essere unico quanto chi lo indossa. Per questo ti offriamo la possibilità di personalizzare qualsiasi prodotto secondo le tue preferenze e esigenze specifiche.",
      "section.custom.p2": "Ti piace un design esaurito? Vuoi modificare colori o aggiungere dettagli speciali? Hai bisogno di una taglia diversa o di una combinazione di materiali diversa? Nessun problema! Possiamo creare una versione personalizzata apposta per te.",
      "section.custom.p3": "Raccontaci la tua idea e lavoreremo insieme per realizzarla, mantenendo sempre la nostra filosofia di riutilizzare, ridurre e riciclare. Ogni pezzo personalizzato è un'opportunità per creare qualcosa di veramente unico e significativo.",
      "contact.wholesale": "Per ordini all'ingrosso, inviaci un'email a <a href=\"mailto:pua@laboratoriotextil.com\" style=\"color: #f8f9fa; text-decoration: underline;\">pua@laboratoriotextil.com</a> e ti invieremo un preventivo.",
      // Polerones page
      "polerones.info.title": "Informazioni sulle nostre felpe",
      "polerones.info.p1": "Ogni felpa PUA è un pezzo unico, realizzato artigianalmente con materiali riciclati e tessuti recuperati. Il nostro processo creativo inizia con la selezione accurata di stoffe e materiali recuperati, che trasformiamo in capi funzionali e pieni di personalità.",
      "polerones.info.p2": "Valorizziamo l'arte della sartoria e ogni dettaglio è curato con dedizione, assicurando che ogni capo non sia solo bello ma anche durevole. I design geometrici e colorati che caratterizzano le nostre felpe sono pensati appositamente per i più piccoli, combinando estetica e comfort.",
      "polerones.info.p3": "Acquistando una felpa PUA, sostieni un progetto che mira a ridurre l'impatto ambientale dell'industria tessile, vestendo i tuoi bambini con capi unici e ricchi di storia.",
      // Frajacket page
      "frajacket.info.title": "Informazioni sulle nostre Frajacket",
      "frajacket.info.p1": "Le nostre Frajacket rappresentano la fusione perfetta tra funzionalità, calore e design sostenibile. Ogni pezzo è realizzato artigianalmente utilizzando materiali riciclati di alta qualità, dando nuova vita a tessuti che altrimenti verrebbero buttati.",
      "frajacket.info.p2": "Il processo di creazione di ogni Frajacket inizia con l'attenta selezione dei materiali, privilegiando texture e tonalità che si completano tra loro. Successivamente, attraverso un meticoloso lavoro di taglio e cucito, trasformiamo questi materiali in capi unici che uniscono estetica e praticità.",
      "frajacket.info.p3": "Ogni dettaglio, dalle tasche alle chiusure, è studiato sia per la funzionalità che per il design complessivo. Il risultato sono giacche con una personalità propria, che non solo mantengono il calore ma raccontano anche una storia di sostenibilità e creatività.",
      // Accesorios page
      "accesorios.header.subtitle": "Accessori tessili realizzati con ritagli e materiali recuperati",
      "accesorios.info.title": "Informazioni sui nostri accessori",
      "accesorios.info.p1": "I nostri accessori sono il risultato di un processo creativo che mira a sfruttare al massimo gli avanzi di tessuto. Ogni pezzo è realizzato a mano, dando una seconda vita a materiali che altrimenti verrebbero scartati.",
      "accesorios.info.p2": "In PUA crediamo che anche i complementi più piccoli possano avere un grande impatto, sia sul tuo stile che sull'ambiente. Per questo, ogni accessorio che creiamo unisce funzionalità, estetica e sostenibilità.",
      "accesorios.info.p3": "Design colorati e texture varie rendono ogni accessorio unico, riflettendo la nostra filosofia di valorizzare l'arte della sartoria e realizzare prodotti di qualità che rispettano l'ambiente.",
      // Colets page
      "colets.info.title": "Informazioni sui nostri colets e accessori",
      "colets.info.p1": "I nostri colets e accessori sono il risultato di un processo creativo che mira a sfruttare al massimo i ritagli tessili. Ogni pezzo è realizzato a mano, dando una seconda vita a materiali che altrimenti verrebbero scartati.",
      "colets.info.p2": "In PUA crediamo che anche i complementi più piccoli possano avere un grande impatto, sia sul tuo stile che sull'ambiente. Per questo, ogni colet che creiamo unisce funzionalità, estetica e sostenibilità.",
      "colets.info.p3": "Design colorati e texture varie rendono ogni accessorio unico, riflettendo la nostra filosofia di valorizzare l'arte della sartoria e creare prodotti di qualità che rispettano l'ambiente.",
      // Hogar page
      "hogar.info.title": "Informazioni sui nostri prodotti per la casa",
      "hogar.info.p1": "In PUA crediamo che ogni dettaglio della casa sia importante. Per questo, creiamo prodotti che uniscono funzionalità e sostenibilità, utilizzando materiali riciclati per offrirti articoli unici e responsabili con l'ambiente.",
      "hogar.info.p2": "Presto potrai scoprire la nostra collezione di prodotti per la casa, pensata per dare personalità e calore al tuo spazio mentre proteggi il pianeta.",
      // Order page
      "order.intro.p1": "In Laboratorio Textil ogni capo o piccola serie è un progetto unico. Ci appassiona trasformare le tue idee in realtà artigianale.",
      "order.intro.p2": "Per ottenere un risultato impeccabile, raccontaci ogni dettaglio: stile, colori, materiali, taglie e qualsiasi altra esigenza. Più informazioni ci fornisci, meglio è!",
      "order.label.project": "Raccontaci il tuo progetto in dettaglio",
      "order.placeholder.project": "Esempio: Voglio una felpa infantile imbottita, taglia M (6 anni), in ciniglia di cotone biologico celeste, con stampa di montagne sulla schiena, cappuccio foderato, polsini elastici e tasche laterali.",
      "order.note.fabrics": "Se hai tessuti tuoi che desideri utilizzare, inviaci le loro immagini via email a <a href=\"mailto:pua@laboratoriotextil.com\">pua@laboratoriotextil.com</a> e ti risponderemo al più presto.",
      "order.label.email": "La tua email",
      "order.placeholder.email": "tuaemail@esempio.com",
      "order.note.reply": "Qui riceverai informazioni dettagliate sul prodotto, preventivo e modalità di pagamento.",
      "order.button.submit": "Invia",
      // Thank you page
      "thank.title": "Grazie per il tuo ordine!",
      "thank.subtitle": "Grazie per aver scelto Laboratorio Tessile.",
      "thank.info1": "Presto riceverai nella tua email le informazioni dettagliate del tuo ordine insieme a un preventivo personalizzato.",
      "thank.info2": "Se hai domande, scrivici a <a href=\"mailto:pua@laboratoriotextil.com\">pua@laboratoriotextil.com</a>.",
      "thank.button.home": "Torna alla home"
    }
  }
};

// Initialize i18next
i18next.init({
  lng: 'es',
  debug: false,
  resources: resources,
  fallbackLng: 'es'
}, function(err, t) {
  updateContent();
});

// Update all elements with data-i18n attributes
// Update all elements with data-i18n (text), data-i18n-html (innerHTML), and data-i18n-placeholder
function updateContent() {
  // plain text translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = i18next.t(key);
  });
  // HTML translations (allow markup)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    el.innerHTML = i18next.t(key);
  });
  // placeholder translations
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18next.t(key);
  });
}

// Highlight active language button
function updateLangSelector() {
  document.querySelectorAll('.lang-selector [data-lang]').forEach(el => {
    el.classList.toggle('active', el.getAttribute('data-lang') === i18next.language);
  });
}

// Setup language switcher on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateLangSelector();
  document.documentElement.lang = i18next.language;
  document.querySelectorAll('.lang-selector [data-lang]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      const lang = el.getAttribute('data-lang');
      i18next.changeLanguage(lang, () => {
        updateContent();
        updateLangSelector();
        document.documentElement.lang = lang;
        // Reload product listings if present
        if (typeof loadProducts === 'function') {
          loadProducts();
        }
      });
    });
  });
});