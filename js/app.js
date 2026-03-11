import { supabase } from "./supabaseClient.js"

const container = document.getElementById("productosContainer")

let productos = []

async function cargarProductos(){

const { data, error } = await supabase
.from("productos")
.select("*")

if(error){
console.error(error)
return
}

productos = data

renderProductos(productos)

}

cargarProductos()



function renderProductos(lista){

container.innerHTML=""

lista.forEach(producto=>{

const card = document.createElement("div")

card.className="producto"

if(producto.stock <= producto.limite_stock){
card.classList.add("stock-bajo")
}

card.innerHTML = `

<img src="${producto.imagen || 'assets/placeholder.png'}">

<p class="numero">No: ${producto.numero_inventario}</p>

<h3>${producto.nombre}</h3>

<p class="stock">Cantidad: ${producto.stock}</p>

<p class="precio">$${producto.precio_salida}</p>

<p class="categoria">${producto.categoria}</p>

<button class="btn-agregar">+</button>

`


/* BOTON + */

card.querySelector(".btn-agregar").onclick=(e)=>{

e.stopPropagation()

agregarStock(producto)

}


/* ABRIR DETALLE */

card.onclick=()=>{

abrirProducto(producto)

}

container.appendChild(card)

})

}



/* AGREGAR STOCK */

async function agregarStock(producto){

let cantidad = prompt("Cantidad a agregar")

if(!cantidad) return

let nuevoStock = producto.stock + parseInt(cantidad)

await supabase
.from("productos")
.update({stock:nuevoStock})
.eq("id",producto.id)

producto.stock = nuevoStock

renderProductos(productos)

}



/* TARJETA AMPLIADA */

function abrirProducto(producto){

const modal = document.createElement("div")

modal.className="modal open"

modal.innerHTML=`

<div class="modal-content">

<span class="modal-close">×</span>

<img src="${producto.imagen}" style="width:100%;border-radius:10px">

<h2>${producto.nombre}</h2>

<p>No Inventario: ${producto.numero_inventario}</p>

<p>Stock: ${producto.stock}</p>

<p>Precio Entrada: $${producto.precio_entrada}</p>

<p>Precio Salida: $${producto.precio_salida}</p>

<p>Categoria: ${producto.categoria}</p>

<p>Proveedor: ${producto.proveedor}</p>

<p>Fecha Entrada: ${producto.fecha_entrada}</p>

<p>Almacenero: ${producto.almacenero}</p>

<p>${producto.descripcion}</p>

</div>

`

document.body.appendChild(modal)

modal.querySelector(".modal-close").onclick=()=>{

modal.remove()

}

modal.onclick=(e)=>{

if(e.target===modal) modal.remove()

}

}
const sidebar = document.getElementById("sidebarCategorias")

const btnCategorias = document.getElementById("btnCategorias")

const tituloCategoria = document.getElementById("tituloCategoria")



/* ABRIR SIDEBAR */

if(btnCategorias){

btnCategorias.onclick=()=>{

sidebar.classList.toggle("open")

}

}



/* FILTRAR CATEGORIAS */

sidebar.querySelectorAll("button").forEach(btn=>{

btn.onclick=()=>{

const categoria = btn.dataset.cat

sidebar.classList.remove("open")

if(categoria==="todos"){

tituloCategoria.innerText="Todos los productos"

renderProductos(productos)

}else{

tituloCategoria.innerText=categoria

const filtrados = productos.filter(p=>p.categoria===categoria)

renderProductos(filtrados)

}

}

})