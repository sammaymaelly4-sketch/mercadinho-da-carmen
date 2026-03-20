# Setup Supabase — Mercadinho da Carmen

## 1. Criar projeto
Acesse https://supabase.com → New Project → preencha nome e senha do banco.

## 2. Criar tabela (SQL Editor)
Cole e execute no SQL Editor do Supabase:

```sql
create table pedidos (
  id          text primary key,
  itens       jsonb        not null,
  total       numeric      not null,
  pagamento   text         not null,
  status      text         default 'confirmado',
  criado_em   timestamptz  default now()
);

-- Permite leitura/escrita sem autenticação (MVP público)
alter table pedidos enable row level security;

create policy "Leitura pública" on pedidos
  for select using (true);

create policy "Inserção pública" on pedidos
  for insert with check (true);
```

## 3. Pegar as chaves
Settings → API → copie:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon / public key** → `VITE_SUPABASE_ANON_KEY`

## 4. Configurar variáveis

### Local (.env.local na raiz do projeto)
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Vercel (para o deploy)
Dashboard do projeto → Settings → Environment Variables → adicionar as duas variáveis acima.

## 5. Instalar dependência e fazer deploy
```bash
npm install
git add .
git commit -m "feat: integração Supabase para pedidos"
git push
```

## Como funciona
- **Sem as env vars**: app funciona normalmente com localStorage (fallback automático).
- **Com as env vars**: pedidos são salvos no Supabase e acessíveis de qualquer dispositivo.
- **Ordem de prioridade**: Supabase → fallback localStorage (sem quebrar nada).
