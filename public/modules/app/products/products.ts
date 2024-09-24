// @ts-nocheck
const productos = [
  {
    id: 1,
    nombre: 'Proteína en polvo',
    precio: 50,
    marca: 'NutriPro',
    categoria: 'Suplementos Nutricionales',
    imagen:
      'https://media.revistagq.com/photos/652e44ae0c7c0268f3e12874/3:4/w_748%2Cc_limit/Caseina.jpg',
    descripcion:
      'Proteína en polvo de alta calidad para aumentar la masa muscular.',
  },
  {
    id: 2,
    nombre: 'BCAA',
    precio: 30,
    marca: 'AminoForce',
    categoria: 'Suplementos Nutricionales',
    imagen:
      'https://www.vitaminshoppeparaguay.com.py/cdn/shop/products/bcaa-1000-200-capsulas_e87768cc-bcd5-49f1-a6f4-45e754e9a500.jpg?v=1597767506',
    descripcion:
      'Aminoácidos de cadena ramificada para mejorar la recuperación muscular.',
  },
  {
    id: 3,
    nombre: 'Creatina',
    precio: 25,
    marca: 'MusclePower',
    categoria: 'Suplementos Nutricionales',
    imagen:
      'https://i0.wp.com/nibray.pe/wp-content/uploads/2023/08/Creatina-Micronizada-Optimum-Nutrition-1.png?fit=600%2C600&ssl=1',
    descripcion:
      'Creatina monohidrato para aumentar la fuerza y el rendimiento.',
  },
  {
    id: 4,
    nombre: 'Mancuernas ajustables',
    precio: 200,
    marca: 'IronGrip',
    categoria: 'Equipos de Entrenamiento de Fuerza',
    imagen:
      'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/falabellaPE/883145866_1/w=800,h=800,fit=pad',
    descripcion:
      'Mancuernas ajustables de 5 a 25 kg para entrenamiento versátil.',
  },
  {
    id: 5,
    nombre: 'Barra olímpica',
    precio: 150,
    marca: 'PowerLift',
    categoria: 'Equipos de Entrenamiento de Fuerza',
    imagen:
      'https://maqfit.com/wp-content/uploads/2020/06/barra-olimpica-cromada.jpg',
    descripcion: 'Barra olímpica de 20 kg para levantamientos pesados.',
  },
  {
    id: 6,
    nombre: 'Banco de pesas',
    precio: 120,
    marca: 'GymPro',
    categoria: 'Equipos de Entrenamiento de Fuerza',
    imagen:
      'https://oechsle.vteximg.com.br/arquivos/ids/7499305-1000-1000/OX-0810--1-.jpg?v=637838545030600000',
    descripcion: 'Banco ajustable para ejercicios de press y otros.',
  },
  {
    id: 7,
    nombre: 'Cinta de correr',
    precio: 800,
    marca: 'SpeedMaster',
    categoria: 'Equipos de Entrenamiento Cardiovascular',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1HZSmOtPbM2gCC6EVw89ooko90nw9h_SMEw&s',
    descripcion:
      'Cinta de correr con inclinación ajustable y programas predefinidos.',
  },
  {
    id: 8,
    nombre: 'Bicicleta estática',
    precio: 300,
    marca: 'CycleMax',
    categoria: 'Equipos de Entrenamiento Cardiovascular',
    imagen:
      'https://promart.vteximg.com.br/arquivos/ids/7156728-1000-1000/image-c548a8d7acde4038b6d6e62bd9b8fd02.jpg?v=638233937160700000',
    descripcion: 'Bicicleta estática con resistencia magnética y pantalla LCD.',
  },
  {
    id: 9,
    nombre: 'Elíptica',
    precio: 400,
    marca: 'AeroFit',
    categoria: 'Equipos de Entrenamiento Cardiovascular',
    imagen:
      'https://promart.vteximg.com.br/arquivos/ids/818464-1000-1000/1723261.jpg?v=637512156659330000',
    descripcion: 'Elíptica con zancada ajustable y programas de entrenamiento.',
  },
  {
    id: 10,
    nombre: 'Banda elástica',
    precio: 15,
    marca: 'FlexPower',
    categoria: 'Accesorios de Entrenamiento',
    imagen:
      'https://promart.vteximg.com.br/arquivos/ids/870244-1000-1000/image-c8840168a0fc4ecea8f01cffd19254b7.jpg?v=637534062442730000',
    descripcion: 'Set de bandas elásticas de resistencia variable.',
  },
  {
    id: 11,
    nombre: 'Colchoneta de yoga',
    precio: 30,
    marca: 'ZenFlex',
    categoria: 'Accesorios de Entrenamiento',
    imagen:
      'https://promart.vteximg.com.br/arquivos/ids/948388-1000-1000/image-cc7bfa775e3240758134f11aaea77bb4.jpg?v=637583327910770000',
    descripcion: 'Colchoneta antideslizante para yoga y pilates.',
  },
  {
    id: 12,
    nombre: 'Pelota medicinal',
    precio: 40,
    marca: 'CoreStrength',
    categoria: 'Accesorios de Entrenamiento',
    imagen:
      'https://promart.vteximg.com.br/arquivos/ids/2854845-1000-1000/image-527c18b75f524c2597a8719b9184a18f.jpg?v=637720823026900000',
    descripcion: 'Pelota medicinal de 5 kg para ejercicios de core y fuerza.',
  },
  {
    id: 13,
    nombre: 'Camiseta deportiva',
    precio: 25,
    marca: 'AthleteWear',
    categoria: 'Ropa y Calzado Deportivo',
    imagen:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXJbExp2SoUL64MhvO4Ujv-4fXDnPv83uFbw&s',
    descripcion: 'Camiseta transpirable de secado rápido.',
  },
  {
    id: 14,
    nombre: 'Zapatillas de running',
    precio: 80,
    marca: 'SprintPro',
    categoria: 'Ropa y Calzado Deportivo',
    imagen:
      'https://home.ripley.com.pe/Attachment/WOP_5/2084337612073/2084337612073_2.jpg',
    descripcion: 'Zapatillas ligeras con amortiguación para running.',
  },
  {
    id: 15,
    nombre: 'Pantalones de yoga',
    precio: 35,
    marca: 'FlexFit',
    categoria: 'Ropa y Calzado Deportivo',
    imagen:
      'https://www.tao-distribution.com/contents/media/l_pant-yoga-gris_.jpg',
    descripcion: 'Pantalones elásticos y cómodos para yoga y pilates.',
  },
];

const categorias = [
  'Suplementos Nutricionales',
  'Equipos de Entrenamiento de Fuerza',
  'Equipos de Entrenamiento Cardiovascular',
  'Accesorios de Entrenamiento',
  'Ropa y Calzado Deportivo',
];

let carrito = [];
let productosFiltrados = [...productos];
let productosComparacion = [];

function inicializarCategorias() {
  const categorySelect = document.getElementById('category-select');
  categorias.forEach((categoria) => {
    const option = document.createElement('option');
    option.value = categoria;
    option.textContent = categoria;
    categorySelect.appendChild(option);
  });
}

function actualizarFiltrosMarca(categoria) {
  const brandFilters = document.getElementById('brand-filters');
  brandFilters.innerHTML = '<h6 class="mb-2">Marcas:</h6>';
  if (categoria) {
    const marcas = [
      ...new Set(
        productos.filter((p) => p.categoria === categoria).map((p) => p.marca)
      ),
    ];
    marcas.forEach((marca) => {
      const div = document.createElement('div');
      div.className = 'form-check';
      div.innerHTML = `
                  <input class="form-check-input" type="checkbox" id="${marca}" name="marca" value="${marca}">
                  <label class="form-check-label" for="${marca}">${marca}</label>
              `;
      brandFilters.appendChild(div);
    });
  }
}

function aplicarFiltros() {
  const busqueda = document.getElementById('search-input').value.toLowerCase();
  const categoria = document.getElementById('category-select').value;
  const marcasSeleccionadas = Array.from(
    document.querySelectorAll('input[name="marca"]:checked')
  ).map((el) => el.value);
  const precioMax = parseFloat(document.getElementById('price-range').value);

  productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda) &&
      (!categoria || producto.categoria === categoria) &&
      (marcasSeleccionadas.length === 0 ||
        marcasSeleccionadas.includes(producto.marca)) &&
      producto.precio <= precioMax
  );

  mostrarProductos();
}

function mostrarProductos() {
  const productosContainer = document.getElementById('products');
  productosContainer.innerHTML = '';
  productosFiltrados.forEach((producto) => {
    const productoElement = document.createElement('div');
    productoElement.className = 'col';
    productoElement.innerHTML = `
              <div class="card h-100 product-card">
                  <img src="${producto.imagen}" class="card-img-top product-image" alt="${producto.nombre}" onclick="irADetalleProducto(${producto.id})">
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">
                          <small class="text-muted">${producto.marca}</small><br>
                          <strong>$${producto.precio}</strong>
                      </p>
                      <button onclick="mostrarVistaRapida(${producto.id})" class="btn btn-outline-primary btn-sm">Vista Rápida</button>
                      <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary btn-sm">Agregar al carrito</button>
                  </div>
              </div>
          `;
    productosContainer.appendChild(productoElement);
  });
}

function irADetalleProducto(id) {
  const producto = productos.find((p) => p.id === id);
  const productosRelacionados = productos
    .filter((p) => p.categoria === producto.categoria && p.id !== producto.id)
    .slice(0, 4);

  localStorage.setItem('productoDetalle', JSON.stringify(producto));
  localStorage.setItem(
    'productosRelacionados',
    JSON.stringify(productosRelacionados)
  );

  window.location.href = `products/${id}`;
}

function mostrarVistaRapida(id) {
  const producto = productos.find((p) => p.id === id);
  const quickViewContent = document.getElementById('quickViewContent');
  quickViewContent.innerHTML = `
          <div class="row">
              <div class="col-md-6">
                  <img src="${producto.imagen}" alt="${producto.nombre}" class="img-fluid rounded">
              </div>
              <div class="col-md-6">
                  <h2>${producto.nombre}</h2>
                  <p><strong>Marca:</strong> ${producto.marca}</p>
                  <p><strong>Categoría:</strong> ${producto.categoria}</p>
                  <p><strong>Precio:</strong> $${producto.precio}</p>
                  <p>${producto.descripcion}</p>
                  <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-primary">Agregar al carrito</button>
              </div>
          </div>
      `;
  const quickViewModal = new bootstrap.Modal(
    document.getElementById('quickViewModal')
  );
  quickViewModal.show();
}

function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);
  const itemEnCarrito = carrito.find((item) => item.id === id);
  if (itemEnCarrito) {
    itemEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

function agregarComparacion(id) {
  const producto = productos.find((p) => p.id === id);
  if (!productosComparacion.some((p) => p.id === id)) {
    productosComparacion.push(producto);
    actualizarComparacion();
  }
}

function quitarComparacion(id) {
  productosComparacion = productosComparacion.filter((p) => p.id !== id);
  actualizarComparacion();
}

function actualizarComparacion() {
  const comparacionContainer = document.getElementById('comparacion-container');
  comparacionContainer.innerHTML = '';

  productosComparacion.forEach((producto) => {
    const productoElement = document.createElement('div');
    productoElement.className = 'comparacion-item';
    productoElement.innerHTML = `
              <img src="${producto.imagen}" alt="${producto.nombre}" class="comparacion-imagen">
              <h5>${producto.nombre}</h5>
              <p>Precio: $${producto.precio}</p>
              <button onclick="quitarComparacion(${producto.id})" class="btn btn-danger btn-sm">Quitar</button>
          `;
    comparacionContainer.appendChild(productoElement);
  });
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }
}

document
  .getElementById('category-select')
  .addEventListener('change', function () {
    actualizarFiltrosMarca(this.value);
  });

document
  .getElementById('apply-filters')
  .addEventListener('click', aplicarFiltros);

document
  .getElementById('search-input')
  .addEventListener('input', aplicarFiltros);

document.getElementById('price-range').addEventListener('input', function () {
  document.getElementById('price-value').textContent = '$' + this.value;
});

// document.getElementById('cart-btn').addEventListener('click', toggleCarrito);

// Inicialización
inicializarCategorias();
mostrarProductos();
cargarCarritoDesdeLocalStorage();
