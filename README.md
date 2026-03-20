# Mercadinho da Carmen 🛒

PWA de quick-commerce · Vila São José, Taubaté SP

## Stack
- React 18 + Vite 5
- React Router v6
- vite-plugin-pwa (PWA de alta performance)
- Deploy: Vercel

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

1. Faça push pro GitHub.
2. Acesse [Vercel](https://vercel.com) → New Project → Importe o repo.
3. Deploy automático a cada push no main ✅.

## Trocar foto de produto

Abra `src/lib/catalog.js`, encontre o produto e edite:
```js
imageOverride: 'https://link-da-imagem.jpg'
```
*Dica: Se deixar `imageOverride: null`, o app tenta buscar a foto automaticamente pelo código de barras no Open Food Facts.*

## Estrutura

```
src/
  lib/
    catalog.js      ← 50+ SKUs + lógica de imagem híbrida
  hooks/
    useCart.js      ← estado do carrinho (Context/Hook)
  components/
    ProductCard.jsx ← card animado com fallback de imagens
    BottomNav.jsx   ← navegação inferior estilo nativo
  pages/
    Splash.jsx      ← tela de abertura com animação
    Home.jsx        ← home premium com categorias e favoritos
    Categorias.jsx  ← grid de categorias + listagem filtrada
    Carrinho.jsx    ← fluxo de checkout animado
    Pedidos.jsx     ← tracking de pedidos + histórico
    Login.jsx       ← tela de login/cadastro moderna
```
