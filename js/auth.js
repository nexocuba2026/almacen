import { supabase } from "./supabase.js"

async function verificarLogin(){
  const { data: { user } } = await supabase.auth.getUser()
  if(!user){
    // Si no está logueado, redirige a login.html
    window.location.href = "login.html"
    return
  }

  // Revisar rol
  const { data: perfil } = await supabase
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .single()

  window.usuarioRol = perfil?.rol || "usuario"
}

// Ejecutar verificación al cargar la página
verificarLogin()