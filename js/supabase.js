import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://yefamhdggbaoqtzemptg.supabase.co"
const supabaseKey = "sb_publishable_YIhV-2Y214lyl3YRl4GBtg_E1do7qwX"

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
)