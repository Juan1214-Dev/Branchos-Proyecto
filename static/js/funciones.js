// Esta será la lista donde almacenaremos los productos del carrito
const carrito = [];

function obtenerProductosYCrearCartas() {
    //Aqui no se porque mi api de la fakestore no me cargaba o se me demoraba mucho, entonces coloque la principal
    // la de por aqui por si algo https://fakestore-auboy.onrender.com/products
    const apiUrl = 'https://fakestoreapi.com/products';

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const productosDiv = document.getElementById('productos');

            data.forEach((producto) => {
                const carta = document.createElement('div');
                carta.className = 'carta';
                carta.innerHTML = `
                    <h6>${producto.title}</h6>
                    <p><strong>Price:</strong> $${producto.price}</p>
                    <p><strong>Category:</strong> ${producto.category}</p>
                    <img src="${producto.image}" alt="${producto.title}" />
                    <p><strong>Rating:</strong> ${producto.rating.rate} (based on ${producto.rating.count} ratings)</p>
                    
                    <button class="agregar-carrito" data-id="${producto.id}" data-titulo="${producto.title}" data-precio="${producto.price}" data-imagen="${producto.image}">Agregar</button>
                `;
                productosDiv.appendChild(carta);
            });
        });
}

document.addEventListener("click", (evento) => {
    if (evento.target.classList.contains('agregar-carrito')) {
        const id = evento.target.getAttribute('data-id');
        const titulo = evento.target.getAttribute('data-titulo');
        const precio = parseFloat(evento.target.getAttribute('data-precio'));
        const imagen = evento.target.getAttribute('data-imagen');
        addProduct(id, titulo, precio, imagen);
    }
});

// Nueva función para eliminar un producto del carrito
function eliminarProducto(id) {
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        carrito.splice(index, 1);
        actualizarCarrito();
    }
}

function addProduct(id, titulo, precio, imagen) {
    const productoEnCarrito = carrito.find(item => item.id === id);
    if (productoEnCarrito) {
        // Si el producto ya está en el carrito, incrementa la cantidad
        productoEnCarrito.cantidad += 1;
    } else {
        // Si el producto no está en el carrito, agrégalo
        carrito.push({ id, titulo, precio, imagen, cantidad: 1 });
    }
    actualizarCarrito();
}

// Función para actualizar el contenido del carrito en el HTML
function actualizarCarrito() {
    const carritoContenedor = document.getElementById('carrito-contenedor');
    carritoContenedor.innerHTML = '';
    carrito.forEach(item => {
        const producto = document.createElement('div');
        producto.innerHTML = `
            <div class="producto-en-carrito">
                <img src="${item.imagen}" alt="${item.titulo}" style="width: 100px; height: 100px;">
                <p>${item.titulo} - Precio: $${item.precio.toFixed(2)} - Cantidad: ${item.cantidad}</p>
                <button class="eliminar-producto" data-id="${item.id}">Eliminar</button>
                <button class="confirmar-compra" onclick="IRconfirmarcompra()">Comprar</button>


            </div>
        `;
        carritoContenedor.appendChild(producto);
    });
   

    // Calcula y muestra el total
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const totalElement = document.getElementById('total');
    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Agrega un event listener para los botones de eliminar
    document.querySelectorAll('.eliminar-producto').forEach(button => {
        button.addEventListener('click', (evento) => {
            const id = evento.target.getAttribute('data-id');
            eliminarProducto(id);
        });
    });
}
function IRconfirmarcompra() {
  window.location.href = '/confirmar-compra';
}



//Aqui termina el carrito

//Lista de los productos

function listarProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(productos => {
            let tabla = document.getElementById('tabla');
            productos.forEach(producto => {
                const celda = document.createElement('td');
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${producto.title}</td>
                    <td>${producto.price}</td>
                    <td>${producto.category}</td>
                    <td><button class="editar_informacion" data-id="${producto.id}" data-titulo="${producto.title}" data-precio="${producto.price}" data-category="${producto.category}">Editar</button>
                    <button class="eliminar_informacion" data-id="${producto.id} " >Eliminar</button></td>
                    `;
                tabla.appendChild(fila);
            });
        });
}
//Aqui termina la tabla de productos

