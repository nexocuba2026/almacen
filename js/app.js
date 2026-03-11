import { obtenerProductos } from "./productos.js"

const container = document.getElementById("productosContainer")
let productos = []

async function cargarProductos() {
    productos = await obtenerProductos()

    /* PRODUCTOS DE EJEMPLO SI LA BASE ESTA VACIA */
    if (productos.length === 0) {
        productos = [
            {
                numero: 1,
                nombre: "Tornillo Acero 5cm",
                categoria: "tornilleria",
                stock: 120,
                entradas: 150,
                salidas: 30,
                precio_entrada: 0.10,
                precio_salida: 0.25,
                fecha_entrada: "2026-03-10",
                fecha_salida: "2026-03-11",
                descripcion: "Tornillo de acero inoxidable de alta resistencia utilizado en estructuras metálicas.",
                imagen: "assets/placeholder.png",
                limite_stock: 20,
                proveedor: "Ferretería Industrial",
                almacenero: "Juan Pérez"
            },
            {
                numero: 2,
                nombre: "Arroz Premium 1kg",
                categoria: "alimentos",
                stock: 80,
                entradas: 100,
                salidas: 20,
                precio_entrada: 1.80,
                precio_salida: 2.50,
                fecha_entrada: "2026-03-09",
                fecha_salida: "2026-03-11",
                descripcion: "Arroz blanco premium empaquetado en bolsa sellada de 1kg.",
                imagen: "assets/placeholder.png",
                limite_stock: 10,
                proveedor: "Distribuidora Alimentos Norte",
                almacenero: "María López"
            }
        ]
    }

    renderProductos(productos)
    activarBuscador()
    crearSidebarCategorias()
}

/* ------------------- RENDER DE PRODUCTOS ------------------- */
function renderProductos(lista) {
    container.innerHTML = ""

    lista.forEach(producto => {
        const card = document.createElement("div")
        card.className = "producto"
        if (producto.stock <= producto.limite_stock) {
            card.classList.add("stock-bajo")
        }

        card.innerHTML = `
        <img src="${producto.imagen || 'assets/placeholder.png'}">
        <p>No: ${producto.numero}</p>
        <h3>${producto.nombre}</h3>
        <p>Stock: ${producto.stock}</p>
        <p>Precio: $${producto.precio_salida}</p>
        <p>Categoria: ${producto.categoria}</p>
        <button class="btn-agregar">+</button>
        `

        // Botón + para agregar cantidad
        card.querySelector(".btn-agregar").onclick = (e) => {
            e.stopPropagation()
            let nuevaCantidad = prompt("Ingrese cantidad a agregar:", "0")
            if (nuevaCantidad !== null && !isNaN(nuevaCantidad)) {
                producto.stock = parseInt(producto.stock) + parseInt(nuevaCantidad)
                renderProductos(lista)
            }
        }

        // Al presionar la tarjeta se abre modal con info completa
        card.onclick = () => {
            abrirModal(producto)
        }

        container.appendChild(card)
    })
}

/* ------------------- MODAL ------------------- */
function abrirModal(producto) {
    let modal = document.createElement("div")
    modal.className = "modal open"
    modal.innerHTML = `
    <div class="modal-content">
        <span class="modal-close">&times;</span>
        <img src="${producto.imagen || 'assets/placeholder.png'}" style="width:100%;border-radius:10px">
        <h3>${producto.nombre}</h3>
        <p>No: ${producto.numero}</p>
        <p>Stock: ${producto.stock}</p>
        <p>Precio entrada: $${producto.precio_entrada}</p>
        <p>Precio salida: $${producto.precio_salida}</p>
        <p>Categoria: ${producto.categoria}</p>
        <p>Proveedor: ${producto.proveedor}</p>
        <p>Fecha entrada: ${producto.fecha_entrada}</p>
        <p>Almacenero: ${producto.almacenero || "N/A"}</p>
        <p>Descripción: ${producto.descripcion}</p>
    </div>
    `
    document.body.appendChild(modal)

    // Cerrar modal
    modal.querySelector(".modal-close").onclick = () => {
        modal.remove()
    }

    modal.onclick = (e) => {
        if (e.target === modal) modal.remove()
    }
}

/* ------------------- BUSCADOR ------------------- */
function activarBuscador() {
    const input = document.getElementById("buscarProducto")
    const btn = document.getElementById("btnBuscar")
    btn.onclick = () => {
        const texto = input.value.toLowerCase()
        const filtrados = productos.filter(p =>
            p.nombre.toLowerCase().includes(texto)
        )
        renderProductos(filtrados)
    }
}

/* ------------------- SIDEBAR CATEGORIAS ------------------- */
function crearSidebarCategorias() {
    const sidebar = document.createElement("div")
    sidebar.id = "sidebarCategorias"
    sidebar.innerHTML = `
    <div class="sidebar">
        <h3>Categorías</h3>
        <button data-cat="todos">Todos</button>
        <button data-cat="tornilleria">Tornillería</button>
        <button data-cat="alimentos">Alimentos</button>
        <button data-cat="herramientas">Herramientas</button>
        <button data-cat="electricos">Eléctricos</button>
    </div>
    `
    document.body.appendChild(sidebar)

    const btnCategorias = document.getElementById("btnCategorias")
    btnCategorias.onclick = () => {
        sidebar.classList.toggle("open")
    }

    sidebar.querySelectorAll("button").forEach(btn => {
        btn.onclick = () => {
            const cat = btn.dataset.cat
            if (cat === "todos") {
                renderProductos(productos)
            } else {
                const filtrados = productos.filter(p => p.categoria === cat)
                renderProductos(filtrados)
            }
            sidebar.classList.remove("open")
        }
    })
}

cargarProductos()