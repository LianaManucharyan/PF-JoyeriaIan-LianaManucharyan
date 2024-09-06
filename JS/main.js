window.location.href = '../PAGES/login.html';

let carrito = [];
const divisa = '$';
const DOMitems = document.querySelector('#items');
const DOMcarrito = document.querySelector('#carrito');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const miLocalStorage = window.localStorage;
let data = [];

// Dibujamos todos los productos a partir de la base de datos json
function renderizarProductos() {
    fetch("./DB/data.json")
        .then(response => response.json())
        .then(jsonData => {
            data = jsonData; // Guardamos los datos para usarlos en otras funciones
            data.forEach(info => {
                // Card
                const miNodo = document.createElement('div');
                miNodo.classList.add('card', 'col-sm-3');
                // Body de la card
                const miNodoCardBody = document.createElement('div');
                miNodoCardBody.classList.add('card-body');
                // Nombre del producto
                const miNodoTitle = document.createElement('h5');
                miNodoTitle.classList.add('card-title');
                miNodoTitle.textContent = info.nombre;
                // Imagen del producto
                const miNodoImagen = document.createElement('img');
                miNodoImagen.classList.add('img-fluid');
                miNodoImagen.setAttribute('src', info.imagen);
                // Precio del producto
                const miNodoPrecio = document.createElement('p');
                miNodoPrecio.classList.add('card-text');
                miNodoPrecio.textContent = `${info.precio}${divisa}`;
                // Botón de compra
                const miNodoBoton = document.createElement('button');
                miNodoBoton.classList.add('btn', 'btn-dark');
                miNodoBoton.textContent = 'Comprar';
                miNodoBoton.setAttribute('marcador', info.id);
                miNodoBoton.addEventListener('click', anyadirProductoAlCarrito);
                // Insertamos los productos
                miNodoCardBody.appendChild(miNodoImagen);
                miNodoCardBody.appendChild(miNodoTitle);
                miNodoCardBody.appendChild(miNodoPrecio);
                miNodoCardBody.appendChild(miNodoBoton);
                miNodo.appendChild(miNodoCardBody);
                DOMitems.appendChild(miNodo);
            });
        });
}

// Evento para añadir un producto al carrito de compras
function anyadirProductoAlCarrito(evento) {
    try {
        // Intentar añadir el nodo al carrito
        carrito.push(evento.target.getAttribute('marcador'));

        // Intentar enviar una alerta al usuario
        Swal.fire({
            title: '¡Excelente!',
            text: 'Añadiste un producto al carrito de compras',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Intentar actualizar el carrito
        renderizarCarrito();

        // Intentar actualizar el LocalStorage
        guardarCarritoEnLocalStorage();
    } catch (error) {
        // Manejar cualquier error que ocurra
        Swal.fire({
            title: '¡Error!',
            text: 'Hubo un problema al añadir el producto al carrito.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    }
}

// Dibujamos los productos guardados en el carrito de compras
function renderizarCarrito() {
    // Vaciamos todo el html
    DOMcarrito.textContent = '';
    // Quitamos los duplicados
    const carritoSinDuplicados = [...new Set(carrito)];
    // Generamos los nodos a partir del carrito
    carritoSinDuplicados.forEach(item => {
        // Obtenemos el ítem que necesitamos de la variable "base de datos"
        const miItem = data.find(itemBaseDatos => itemBaseDatos.id === parseInt(item));
        if (!miItem) return; // Si el ítem no se encuentra en la base de datos, lo omitimos
        // Contamos las veces que se repite el producto
        const numeroUnidadesItem = carrito.reduce((total, itemId) => itemId === item ? total + 1 : total, 0);
        // Creamos el nodo del ítem del carrito
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem.nombre} - ${miItem.precio}${divisa}`;
        // Botón de eliminar producto del carrito
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-dark', 'mx-5');
        miBoton.textContent = 'Eliminar';
        miBoton.style.marginLeft = '1rem';
        miBoton.style.marginTop = '15px';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
    // Renderizamos el precio total en el HTML
    DOMtotal.textContent = `${calcularTotal()}${divisa}`;
}

// Evento para eliminar un ítem del carrito
function borrarItemCarrito(evento) {
    // Obtenemos el id del botón pulsado
    const id = evento.target.dataset.item;
    // Enviamos una alerta al usuario
    Swal.fire({
        title: '¡Atención!',
        text: 'Acabas de eliminar un producto de tu carrito de compras',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
    // Borramos todos los productos
    carrito = carrito.filter(carritoId => carritoId !== id);
    // volvemos a renderizar
    renderizarCarrito();
    // Actualizamos el LocalStorage
    guardarCarritoEnLocalStorage();
}

// Calculamos el precio total de los productos añadidos al carrito
function calcularTotal() {
    return carrito.reduce((total, item) => {
        const miItem = data.find(itemBaseDatos => itemBaseDatos.id === parseInt(item));
        return miItem ? total + miItem.precio : total;
    }, 0).toFixed(2);
}

// Vaciamos el carrito y lo volvemos a dibujar
function vaciarCarrito() {
    // Limpiamos los productos guardados
    carrito = [];
    // Enviamos una alerta al usuario
    Swal.fire({
        title: '¡Atención!',
        text: 'Acabas de vaciar tu carrito de compras',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
    });
    // Renderizamos los cambios
    renderizarCarrito();
    // Borramos el LocalStorage
    localStorage.clear();
}

// Vaciar carrito al finalizar el form
function vaciarCarritoForm() {
    // Limpiamos los productos guardados
    carrito = [];
    // Renderizamos los cambios
    renderizarCarrito();
    // Borramos el LocalStorage
    localStorage.clear();
}

function guardarCarritoEnLocalStorage() {
    miLocalStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDeLocalStorage() {
    // ¿Existe algo guardado previamente en el LocalStorage?
    if (miLocalStorage.getItem('carrito') !== null) {
        // Cargamos la información
        carrito = JSON.parse(miLocalStorage.getItem('carrito'));
    }
}

// Eventos
DOMbotonVaciar.addEventListener('click', vaciarCarrito);

// Invocamos las funciones
cargarCarritoDeLocalStorage();
renderizarProductos();
renderizarCarrito();


    //botón y form para finalizar
    document.getElementById('btnFinalizar').addEventListener('click', function() {
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const telefono = document.getElementById('telefono').value;
    
        if (nombre && email) {
            Swal.fire({
                title: 'Gracias por la compra',
                text: `${nombre}. Recibirás dentro de poco en tu mail: ${email} y en tu teléfono: ${telefono} tus detalles de compra`,
                icon: 'success',
            }).then(() => {
                // Limpiar el carrito
                vaciarCarritoForm(); // Llámalo para vaciar el carrito
    
                // Ocultar el formulario
                document.getElementById('formulario').style.display = 'none';
    
                // Limpiar los campos del formulario
                document.getElementById('nombre').value = '';
                document.getElementById('email').value = '';
                document.getElementById('telefono').value = '';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Por favor, completa todos los campos.',
                icon: 'error',
            });
        }
    });