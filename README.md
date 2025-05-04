# PUA - Sitio Web

Este repositorio contiene el sitio web de PUA, una marca de diseño textil infantil sostenible que se enfoca en reutilizar, reducir y reciclar materiales textiles para crear productos únicos y de calidad.

## Estructura del Sitio

- `index.html` - Página principal con la filosofía de PUA
- `polerones.html` - Página de polerones
- `colets.html` - Página de colets y accesorios
- `css/` - Estilos del sitio
- `js/` - Scripts de JavaScript
- `images/` - Imágenes del sitio
- `products/` - Datos de productos en formato JSON

## Sistema de Gestión de Productos

El sitio utiliza un sistema simple basado en archivos JSON para gestionar los productos. Esto permite agregar, modificar o eliminar productos fácilmente sin necesidad de modificar el código HTML.

### Estructura de Archivos de Productos

Los productos están organizados en las siguientes carpetas:

- `products/polerones/products.json` - Datos de polerones
- `products/colets/products.json` - Datos de colets y accesorios

### Cómo Agregar Nuevos Productos

Para agregar un nuevo producto, sigue estos pasos:

1. Guarda la imagen del producto en la carpeta `images/`
2. Abre el archivo JSON correspondiente (`products/polerones/products.json` o `products/colets/products.json`)
3. Agrega un nuevo objeto JSON con la siguiente estructura:

```json
{
  "id": "producto-nuevo",
  "name": "Nombre del Producto",
  "description": "Descripción detallada del producto",
  "price": 30000,
  "image": "/images/nombre-imagen.png",
  "materials": ["Material 1", "Material 2", "Material 3"],
  "workHours": 8,
  "stock": 5
}
```

4. Guarda el archivo JSON

### Estructura de Datos de Productos

Cada producto debe tener los siguientes campos:

- `id` (string): Identificador único del producto
- `name` (string): Nombre del producto
- `description` (string): Descripción detallada
- `price` (number): Precio en pesos chilenos (sin puntos ni símbolos)
- `image` (string): Ruta a la imagen del producto (desde la raíz del sitio)
- `materials` (array): Lista de materiales utilizados
- `workHours` (number): Horas de trabajo aproximadas
- `stock` (number): Cantidad disponible (0 para productos agotados)

### Ejemplo

```json
{
  "id": "poleron-geometrico",
  "name": "Poleron Geométrico Verde",
  "description": "Poleron infantil verde con aplicación geométrica multicolor.",
  "price": 33500,
  "image": "/images/poleron-geometrico.png",
  "materials": ["Felpa de algodón reciclado", "Telas estampadas recuperadas", "Ribetes elásticos reciclados"],
  "workHours": 8,
  "stock": 2
}
```

## Cómo Marcar Productos como Agotados

Para marcar un producto como agotado, simplemente cambia el valor de `stock` a `0` en el archivo JSON correspondiente. El sitio automáticamente mostrará el producto como "Agotado".

## Cómo Actualizar Precios

Para actualizar el precio de un producto, modifica el valor del campo `price` en el archivo JSON correspondiente. El precio debe ser un número entero en pesos chilenos (sin puntos ni símbolos).

## Automatización con Python

Hemos creado herramientas en Python para agilizar la adición de nuevos productos a la web.

### Requisitos
- Python 3.7 o superior
- Variables de entorno: `OPENAI_API_KEY` (tu clave de OpenAI)

### Script de línea de comandos
El archivo `add_product.py` automatiza el flujo completo:
1. Copia tu imagen fuente a `images/`
2. Genera una versión de estudio vía la API de OpenAI
3. Genera en español una descripción persuasiva
4. Actualiza el archivo de datos JS correspondiente en `js/data/` con el nuevo producto
5. Deja las imágenes y el JS listos y staged para commit

Ejemplo de uso:
```bash
export OPENAI_API_KEY="sk-..."
pip install openai requests
./add_product.py \
  --type polerones \
  --name "Polerón Sol" \
  --price 29900 \
  --materials "Algodón reciclado, ribetes elásticos" \
  --labor 5 \
  --in-stock \
  --image path/to/source.png
```

### Aplicación Streamlit
Para una interfaz gráfica más intuitiva, usa la app Streamlit:
1. Instala dependencias:
   ```bash
   pip install streamlit openai requests
   ```
2. Ejecuta la app:
   ```bash
   streamlit run streamlit_app.py
   ```
La interfaz te guiará para subir la imagen, completar datos, generar descriptión y previsualizar antes de actualizar el sitio.

