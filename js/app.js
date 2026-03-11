import { obtenerProductos } from "./productos.js"

const container = document.getElementById("productosContainer")

let productos = []

async function cargarProductos(){

productos = await obtenerProductos()

/* productos de ejemplo si la base está vacía */

if(productos.length === 0){

productos = [

{
nombre:"Tornillo acero",
stock:120,
entradas:150,
salidas:30,
precio_salida:0.25,
precio_entrada:0.10,
categoria:"tornilleria",
descripcion:"Tornillo de acero inoxidable",
imagen:"assets/placeholder.png",
limite_stock:20
},

{
nombre:"Arroz 1kg",
stock:80,
entradas:100,
salidas:20,
precio_salida:2.50,
precio_entrada:1.80,
categoria:"alimentos",
descripcion:"Arroz blanco premium",
imagen:"assets/placeholder.png",
limite_stock:10
}

]

}

renderProductos(productos)

activarBuscador()

crearSidebarCategorias()

}

/* render productos */

function renderProductos(lista){

container.innerHTML=""

lista.forEach(producto=>{

const card = document.createElement("div")

card.className="producto"

if(producto.stock <= producto.limite_stock){

card.classList.add("stock-bajo")

}

card.innerHTML=`

<img src="${producto.imagen || 'assets/placeholder.png'}">

<h3>${producto.nombre}</h3>

<p>Stock: ${producto.stock}</p>

<p>Entradas: ${producto.entradas}</p>

<p>Salidas: ${producto.salidas}</p>

<p>$${producto.precio_salida}</p>

`

card.onclick = ()=>{

alert(

`Producto: ${producto.nombre}

Descripción: ${producto.descripcion}

Precio entrada: ${producto.precio_entrada}

Precio salida: ${producto.precio_salida}`

)

}

container.appendChild(card)

})

}

/* buscador */

function activarBuscador(){

const input = document.getElementById("buscarProducto")

const btn = document.getElementById("btnBuscar")

btn.onclick = ()=>{

const texto = input.value.toLowerCase()

const filtrados = productos.filter(p =>

p.nombre.toLowerCase().includes(texto)

)

renderProductos(filtrados)

}

}

/* sidebar categorias */

function crearSidebarCategorias(){

const sidebar = document.createElement("div")

sidebar.id="sidebarCategorias"

sidebar.innerHTML = `

<div class="sidebar">

<h3>Categorías</h3>

<button data-cat="todos">Todos</button>
<button data-cat="tornilleria">Tornilleria</button>
<button data-cat="alimentos">Alimentos</button>
<button data-cat="herramientas">Herramientas</button>
<button data-cat="electricos">Eléctricos</button>

</div>

`

document.body.appendChild(sidebar)

const btnCategorias = document.getElementById("btnCategorias")

btnCategorias.onclick = ()=>{

sidebar.classList.toggle("open")

}

sidebar.querySelectorAll("button").forEach(btn=>{

btn.onclick = ()=>{

const cat = btn.dataset.cat

if(cat === "todos"){

renderProductos(productos)

}else{

const filtrados = productos.filter(p => p.categoria === cat)

renderProductos(filtrados)

}

sidebar.classList.remove("open")

}

})

}

cargarProductos()