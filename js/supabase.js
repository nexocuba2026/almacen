import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "TU_URL_SUPABASE"
const supabaseKey = "TU_ANON_KEY"

export const supabase = createClient(
supabaseUrl,
supabaseKey
)