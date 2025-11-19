const pescadosDisponibles = [
    { id: 1, nombre: "Salmón", precioPorKg: 15000, imagen: "🐟"},
    { id: 2, nombre: "Albacora", precioPorKg: 12000, imagen: "🦈" },
    { id: 3, nombre: "Merluza Austral", precioPorKg: 18000, imagen: "🐡" },
    { id: 4, nombre: "Congrio", precioPorKg: 10000, imagen: "🐋"}
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function imprimirProductosEnHTML(pescadosDisponibles) {
  const contenedorPescados = document.getElementById("pescados-container");

  pescadosDisponibles.forEach((pescados) => {
    let cardPescado = document.createElement("article");
    cardPescado.classList = "pescados-item";

    cardPescado.innerHTML = `
        <h2>Pescado: ${pescados.nombre}</h2>
        <p>Precio: $${pescados.precioPorKg}</p>
        <p>Imagen: ${pescados.imagen}</p>
        <button id="btnComprar${pescados.id}">Comprar</button>
       
    `;

    contenedorPescados.appendChild(cardPescado);
    const botonComprar = document.getElementById(`btnComprar${pescados.id}`);

    // Agregar pescados al carrito
    botonComprar.addEventListener("click", () => {
      alert(`Has comprado: ${pescados.nombre} por $${pescados.precioPorKg}`);

      carrito.push({ pescado: pescados.nombre, precio: pescados.precioPorKg });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      imprimirCarrito();
    });
  });
}


function finalizarCompra() {
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega productos para finalizar la compra.");
        return;
    }
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    alert(`🎉 ¡Compra Finalizada! 🎉 El total de tu compra es: $${total} Gracias por preferirnos.`);

    carrito = [];
    localStorage.removeItem("carrito");
    imprimirCarrito(); 
}

function cancelarCompra() {
    if (carrito.length === 0) {
        alert("El carrito ya está vacío.");
        return;
    }
    const confirmacion = confirm("¿Estás seguro de que quieres cancelar y vaciar el carrito?");
    if (confirmacion) {
        carrito = []; 
        localStorage.removeItem("carrito");
        imprimirCarrito();
        alert("❌ Compra Cancelada. El carrito ha sido vaciado.");
    }
}

function imprimirCarrito() {
  const contenedorCarrito = document.getElementById("cart-container");
  contenedorCarrito.innerHTML = "<h2>Carrito de Compras</h2>";
  let total = 0;

  carrito.forEach((item, index) => {
    contenedorCarrito.innerHTML += `<p>${index + 1}. ${item.pescado} - $${item.precio}</p>`;
    total += item.precio;
  });

  contenedorCarrito.innerHTML += `<h3>Total: $${total}</h3>`;
}

// Event Listeners de botones finalizar compra, cancelar compra
        document.getElementById("btnFinalizarCompra").addEventListener("click", finalizarCompra);
        document.getElementById("btnCancelarCompra").addEventListener("click", cancelarCompra);


// Ejecución del programa
imprimirProductosEnHTML(pescadosDisponibles);

if (carrito.length > 0) {
  imprimirCarrito();
};