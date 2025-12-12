function cargarpescados(){
  fetch('pescados.json')
    .then(response => response.json())
    .then(data => {
      imprimirProductosEnHTML(data);
    })
    .catch(error => console.error('Error al cargar los pescados:', error));
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function imprimirProductosEnHTML(data) {
  const contenedorPescados = document.getElementById("pescados-container");
  contenedorPescados.innerHTML = "";

  data.forEach((pescados) => {
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
    const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
    }
    });
    Toast.fire({
    icon: "success",
    title: "¡Pescado agregado al carrito!"
   });

      carrito.push({ id: pescados.id, pescado: pescados.nombre, precio: pescados.precioPorKg });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      imprimirCarrito();
    });
  });
}

function finalizarCompra() {
    if (carrito.length === 0) {
        Swal.fire("El carrito está vacío. Agrega productos antes de finalizar la compra.");
    }
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    Swal.fire(`🎉 ¡Compra Finalizada! 🎉 El total de tu compra es: $${total} Gracias por preferirnos.`);

    carrito = [];
    localStorage.removeItem("carrito");
    imprimirCarrito(); 
}

function cancelarCompra() {
    
    if (carrito.length === 0) {
         Swal.fire({
            icon: "info",
            title: "Carrito vacío",
            text: "El carrito ya está vacío. No hay nada que cancelar."
        });
        return;
    }
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);

    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción vaciará completamente tu carrito y no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminarlo!",
        cancelButtonText: "No, cancelar!"
    }).then((result) => {
        
        if (result.isConfirmed) {
            
            carrito = []; 
            localStorage.removeItem("carrito");
            imprimirCarrito(); 

            Swal.fire({
                title: "Eliminado!",
                text: "Tu carrito ha sido vaciado",
                icon: "success"
            });
        
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            
            Swal.fire({
                title: "Cancelado",
                text: "Tu carrito y los productos están seguros :)",
                icon: "error"
            });
        }
    });
}

function imprimirCarrito() {
  const contenedorCarrito = document.getElementById("cart-container");
  contenedorCarrito.innerHTML = "<h2>Carrito de Compras</h2>";
  let total = 0;

  carrito.forEach((item) => {
    contenedorCarrito.innerHTML += `<article>
                                    <h3>${item.pescado}</h3> 
                                    <p>$${item.precio}</p>
                                    </article>`;
    total += item.precio;
  });

  contenedorCarrito.innerHTML += `<h3>Total: $${total}</h3>`;
};

// Event Listeners de botones finalizar compra, cancelar compra
        document.getElementById("btnFinalizarCompra").addEventListener("click", finalizarCompra);
        document.getElementById("btnCancelarCompra").addEventListener("click", cancelarCompra);


// Ejecución del programa
 cargarpescados();

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