// PRODUCTOS EJEMPLO
let productos = [
  {
    id:1,
    nombre:"Tornillo acero",
    categoria:"Tornillería",
    stock:120,
    precio:0.50,
    descripcion:"Tornillo de acero inoxidable para uso industrial",
    proveedor:"Ferretería Central",
    fecha:"2026-03-11",
    almacenero:"Carlos",
    imagen:"img/tornillo.jpg"
  },
  {
    id:2,
    nombre:"Arroz premium",
    categoria:"Alimentos",
    stock:60,
    precio:1.20,
    descripcion:"Arroz blanco premium 1kg",
    proveedor:"Distribuidora Alimentos SA",
    fecha:"2026-03-10",
    almacenero:"Luis",
    imagen:"img/arroz.jpg"
  }
]

const container = document.getElementById("productosContainer")
const modal = document.getElementById("modalProducto")
const detalleProducto = document.getElementById("detalleProducto")
const cerrarModal = document.getElementById("cerrarModal")
const tituloCategoria = document.getElementById("tituloCategoria")

/* MOSTRAR PRODUCTOS */
function renderProductos(lista){
  container.innerHTML=""
  lista.forEach(p=>{
    let tarjeta = document.createElement("div")
    tarjeta.className = "producto"
    if(p.stock<=10) tarjeta.classList.add("stock-bajo")

    // HTML de tarjeta horizontal
    tarjeta.innerHTML = `
      <img src="${p.imagen}">
      <div class="datos">
        <h3>${p.nombre}</h3>
        <p><b>No:</b> ${p.id}</p>
        <p><b>Stock:</b> ${p.stock}</p>
        <p><b>Precio:</b> $${p.precio}</p>
        <p><b>Categoría:</b> ${p.categoria}</p>
      </div>
      <button class="btn-agregar">+</button>
    `

    tarjeta.onclick = ()=>abrirProducto(p)

    container.appendChild(tarjeta)
  })
}

renderProductos(productos)

/* MODAL PRODUCTO */
function abrirProducto(p){
  detalleProducto.innerHTML=`
    <img src="${p.imagen}" style="width:100%;border-radius:8px">
    <h2>${p.nombre}</h2>
    <p><b>No inventario:</b> ${p.id}</p>
    <p><b>Stock:</b> ${p.stock}</p>
    <p><b>Precio:</b> $${p.precio}</p>
    <p><b>Categoría:</b> ${p.categoria}</p>
    <p><b>Descripción:</b> ${p.descripcion}</p>
    <p><b>Proveedor:</b> ${p.proveedor}</p>
    <p><b>Fecha entrada:</b> ${p.fecha}</p>
    <p><b>Almacenero:</b> ${p.almacenero}</p>
  `
  modal.style.display="flex"
}

cerrarModal.onclick=()=>{
  modal.style.display="none"
}

/* BUSCADOR */
const buscadorInput = document.getElementById("buscadorInput")
const btnBuscar = document.getElementById("btnBuscar")
btnBuscar.onclick=()=>{
  let texto = buscadorInput.value.toLowerCase()
  let filtrados = productos.filter(p=>p.nombre.toLowerCase().includes(texto))
  renderProductos(filtrados)
}

/* CATEGORIAS */
const btnCategorias = document.getElementById("btnCategorias")
const sidebar = document.getElementById("sidebarCategorias")
btnCategorias.onclick = ()=>{
  sidebar.classList.toggle("open")
}

const botonesCategorias = sidebar.querySelectorAll("button")
botonesCategorias.forEach(btn=>{
  btn.onclick=()=>{
    let cat = btn.dataset.cat
    sidebar.classList.remove("open")
    if(cat==="todos"){
      tituloCategoria.innerText="Todos los productos"
      renderProductos(productos)
    } else {
      tituloCategoria.innerText = cat
      let filtrados = productos.filter(p=>p.categoria===cat)
      renderProductos(filtrados)
    }
  }
})