/**
 * pedidosService.js
 * Camada de abstração para persistência de pedidos.
 * - Se Supabase estiver configurado (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY),
 *   usa o banco remoto como fonte de verdade e localStorage como cache.
 * - Caso contrário, funciona apenas com localStorage (modo offline/MVP).
 */
import { supabase } from './supabase'

const LS_KEY = 'pedidos'

// ─── helpers localStorage ────────────────────────────────────────────────────

function lsGet() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]') } catch { return [] }
}

function lsSet(pedidos) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(pedidos)) } catch { /* ignore */ }
}

// ─── salvar pedido ────────────────────────────────────────────────────────────

export async function salvarPedido(pedido) {
  // 1. Salva no localStorage imediatamente (UX rápida)
  const atual = lsGet()
  lsSet([pedido, ...atual])

  // 2. Se Supabase disponível, persiste remotamente (não bloqueia UI)
  if (supabase) {
    supabase.from('pedidos').insert({
      id:         pedido.id,
      itens:      pedido.itens,
      total:      pedido.total,
      pagamento:  pedido.pagamento,
      status:     pedido.status,
      criado_em:  pedido.criadoEm,
    }).then(({ error }) => {
      if (error) console.warn('[Supabase] Falha ao salvar pedido:', error.message)
    })
  }
}

// ─── listar pedidos ───────────────────────────────────────────────────────────

export async function listarPedidos() {
  // Se Supabase disponível, busca do banco e atualiza cache
  if (supabase) {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('criado_em', { ascending: false })
      .limit(50)

    if (!error && data) {
      // Mapeia campo criado_em → criadoEm para manter padrão camelCase do app
      const pedidos = data.map(p => ({ ...p, criadoEm: p.criado_em }))
      lsSet(pedidos)
      return pedidos
    }
    console.warn('[Supabase] Falha ao listar pedidos, usando cache local.')
  }

  // Fallback: localStorage
  return lsGet()
}
