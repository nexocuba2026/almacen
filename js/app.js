import { obtenerProductos } from "./productos.js"

const container = document.getElementById("productosContainer")

async function cargarProductos(){

const productos = await obtenerProductos()

container.innerHTML=""

productos.forEach(producto=>{

const card = document.createElement("div")

card.className="producto"

if(producto.stock <= producto.limite_stock){

card.classList.add("stock-bajo")

}

card.innerHTML = `

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

Precio salida: ${producto.precio_salida}

Fecha entrada: ${producto.fecha_entrada}

Fecha salida: ${producto.fecha_salida}`

)

}

container.appendChild(card)

})

}

cargarProductos()