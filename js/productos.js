import { supabase } from "./supabase.js"

export async function obtenerProductos(){
  const { data, error } = await supabase
    .from("productos")
    .select("*")
  if(error){
    console.log(error)
    return []
  }
  return data
}