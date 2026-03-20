import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY

// Se as env vars não estiverem definidas, o client não é criado
// e o app cai no fallback de localStorage sem quebrar
export const supabase = url && key ? createClient(url, key) : null
