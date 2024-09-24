function quitarDelCarrito(id: number) {
  carrito = carrito.filter((item) => item.id !== id);
  guardarCarritoEnLocalStorage();
  actualizarCarrito();
}

function actualizarCantidad(id: number, nuevaCantidad: number) {
  const item = carrito.find((item) => item.id === id);
  if (item) {
    item.cantidad = Math.max(1, nuevaCantidad);
    guardarCarritoEnLocalStorage();
    actualizarCarrito();
  }
}

function actualizarCarrito() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const cartCount = document.getElementById('cart-count');

  cartItems!.innerHTML = '';
  let total = 0;

  carrito.forEach((item) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'mb-3';
    itemElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <span>${item.nombre} - $${item.precio}</span>
        <div>
          <input type="number" value="${item.cantidad}" min="1" onchange="actualizarCantidad(${item.id}, this.value)" class="form-control form-control-sm d-inline-block" style="width: 60px;">
          <button onclick="quitarDelCarrito(${item.id})" class="btn btn-danger btn-sm ms-2">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
    cartItems!.appendChild(itemElement);
    total += item.precio * item.cantidad;
  });

  cartTotal!.textContent = `Total: $${total.toFixed(2)}`;
  cartCount!.textContent = carrito.reduce(
    (sum, item) => sum + item.cantidad,
    0
  );
}

function toggleCarrito() {
  const cartPanel = document.getElementById('cart-panel');
  if (cartPanel!.classList.contains('d-none')) {
    console.log('entra aqui');
    cartPanel!.classList.remove('d-none');
  } else {
    cartPanel!.classList.add('d-none');
  }
}

function cerrarResumenCarrito() {
  const cartPanel = document.getElementById('cart-panel');
  cartPanel.classList.add('d-none');
}

// function cargarCarritoDesdeLocalStorage() {
//   const carritoGuardado = localStorage.getItem('carrito');
//   if (carritoGuardado) {
//     carrito = JSON.parse(carritoGuardado);
//     actualizarCarrito();
//   }
// }

// function guardarCarritoEnLocalStorage() {
//   localStorage.setItem('carrito', JSON.stringify(carrito));
// }
