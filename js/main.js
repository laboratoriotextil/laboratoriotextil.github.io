// Funcionalidad para el sitio web de PUA

// Cargar los scripts de datos
document.write('<script src="js/data/polerones.js"></script>');
document.write('<script src="js/data/colets.js"></script>');
document.write('<script src="js/data/frajackets.js"></script>');

document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.querySelector('nav ul').classList.toggle('show');
        });
    }

    // Filtrado de productos (para futuras implementaciones)
    setupProductFilters();
    
    // Inicializar visualización de productos
    loadProducts();
});

// Función para cargar productos desde los datos embebidos
function loadProducts() {
    const productContainer = document.querySelector('.product-grid');
    if (!productContainer) return;
    
    const productType = productContainer.dataset.productType;
    let products = [];
    
    // Seleccionar los datos según el tipo de producto
    if (productType === 'polerones') {
        products = poleronesData;
    } else if (productType === 'colets') {
        products = coletsData;
    } else if (productType === 'frajackets') {
        products = frajacketsData;
    }
    
    if (products.length > 0) {
        productContainer.innerHTML = '';
        
        products.forEach(product => {
            const productCard = createProductCard(product);
            productContainer.appendChild(productCard);
        });
    } else {
        productContainer.innerHTML = '<p>No se encontraron productos.</p>';
    }
}

// Crear tarjeta de producto
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stockClass = product.in_stock ? '' : 'out-of-stock';
    const stockText = product.in_stock ? 'En stock' : 'Agotado';
    
    // Formatear precio en pesos chilenos
    const formattedPrice = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(product.price);
    
    // Crear galería de imágenes si hay múltiples, o mostrar una sola imagen
    let imageHTML = '';
    if (product.images && product.images.length > 1) {
        imageHTML = `
            <div class="product-gallery">
                <div class="main-image">
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image current">
                </div>
                <div class="image-thumbnails">
                    ${product.images.map((img, index) => 
                        `<img src="${img}" alt="${product.name} - imagen ${index+1}" 
                              class="thumbnail ${index === 0 ? 'active' : ''}" 
                              data-index="${index}">`
                    ).join('')}
                </div>
            </div>
        `;
    } else {
        // Si solo hay una imagen o se usa el formato antiguo
        const imageSrc = product.images ? product.images[0] : product.image;
        imageHTML = `<img src="${imageSrc}" alt="${product.name}" class="product-image">`;
    }
    
    card.innerHTML = `
        ${imageHTML}
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">${formattedPrice}</p>
            <p class="product-description">${product.description}</p>
            <p class="${stockClass}">${stockText}</p>
            
            <div class="product-details">
                <h4>Materiales:</h4>
                <p>${product.materials}</p>
                
                <h4>Proceso de elaboración:</h4>
                <p>Tiempo de trabajo: ${product.labor_hours} horas</p>
            </div>
        </div>
    `;
    
    // Agregar funcionalidad de galería si hay múltiples imágenes
    if (product.images && product.images.length > 1) {
        setTimeout(() => {
            const thumbnails = card.querySelectorAll('.thumbnail');
            const mainImage = card.querySelector('.main-image img');
            
            thumbnails.forEach(thumb => {
                thumb.addEventListener('click', function() {
                    // Actualizar imagen principal
                    const index = this.dataset.index;
                    mainImage.src = product.images[index];
                    
                    // Actualizar clase activa
                    thumbnails.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        }, 100);
    }
    
    return card;
}

// Configurar filtros de productos (para implementación futura)
function setupProductFilters() {
    const filterButtons = document.querySelectorAll('.filter-button');
    if (filterButtons.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Remover clase activa de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón seleccionado
            this.classList.add('active');
            
            // Filtrar productos
            const products = document.querySelectorAll('.product-card');
            
            products.forEach(product => {
                if (filter === 'all') {
                    product.style.display = 'block';
                } else {
                    if (product.classList.contains(filter)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                }
            });
        });
    });
}
