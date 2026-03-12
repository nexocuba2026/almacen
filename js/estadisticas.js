import { supabase } from "./supabase.js"

const container = document.getElementById("statsContainer")

async function cargarStats(){
  const { data } = await supabase
    .from("productos")
    .select("*")

  let totalStock = 0
  let totalEntradas = 0
  let totalSalidas = 0

  data.forEach(p=>{
    totalStock += p.stock || 0
    totalEntradas += p.entradas || 0
    totalSalidas += p.salidas || 0
  })

  container.innerHTML = `
    <div class="producto">
      <h3>Stock total</h3>
      <p>${totalStock}</p>
    </div>
    <div class="producto">
      <h3>Entradas totales</h3>
      <p>${totalEntradas}</p>
    </div>
    <div class="producto">
      <h3>Salidas totales</h3>
      <p>${totalSalidas}</p>
    </div>
  `
}

cargarStats()