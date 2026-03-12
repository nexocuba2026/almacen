import { supabase } from "./supabase.js"

const container = document.getElementById("proveedoresContainer")

async function cargarProveedores(){
  const { data } = await supabase
    .from("proveedores")
    .select("*")
  
  container.innerHTML=""
  data.forEach(p=>{
    const div = document.createElement("div")
    div.className="producto"
    div.innerHTML=`
      <h3>${p.nombre}</h3>
      <p>NIT: ${p.nit || "-"}</p>
      <p>Cuenta: ${p.cuenta_bancaria || "-"}</p>
      <p>Dirección: ${p.direccion || "-"}</p>
      <p>Contrato: ${p.contrato || "-"}</p>
    `
    container.appendChild(div)
  })
}

cargarProveedores()