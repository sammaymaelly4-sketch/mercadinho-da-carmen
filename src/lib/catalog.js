export const CATEGORIAS = {
  bebidas: { id:'bebidas', nome:'Bebidas',  emoji:'🍺', cor:'#FFB300', bg:'linear-gradient(135deg,#FFF8DC,#FFE57F)' },
  snacks:  { id:'snacks',  nome:'Snacks',   emoji:'🍿', cor:'#FF7043', bg:'linear-gradient(135deg,#FFF3EE,#FFCCBC)' },
  higiene: { id:'higiene', nome:'Higiene',  emoji:'🧴', cor:'#66BB6A', bg:'linear-gradient(135deg,#F1F8E9,#C8E6C9)' },
  limpeza: { id:'limpeza', nome:'Limpeza',  emoji:'🧹', cor:'#42A5F5', bg:'linear-gradient(135deg,#E3F2FD,#BBDEFB)' },
  gelo:    { id:'gelo',    nome:'Gelo',     emoji:'🧊', cor:'#AB47BC', bg:'linear-gradient(135deg,#F3E5F5,#E1BEE7)' },
  adega:   { id:'adega',   nome:'Adega',    emoji:'🍷', cor:'#C8922A', bg:'linear-gradient(135deg,#0D2B1A,#1E4A30)' },
}

export const PRODUTOS = [
  // ─── BEBIDAS ──────────────────────────────────────────────────────────────
  { id:'B01', nome:'Heineken Long Neck', marca:'Heineken',      descricao:'330ml · lager premium',    categoria:'bebidas', preco:7.90,  barcode:'8710791005009', imageOverride:null, imageFallback:'🍺', badge:'TOP',      destaque:true  },
  { id:'B02', nome:'Skol Lata',          marca:'Skol',          descricao:'350ml · pilsen gelada',     categoria:'bebidas', preco:4.50,  barcode:'7891149100309', imageOverride:null, imageFallback:'🍻', badge:null,       destaque:false },
  { id:'B03', nome:'Coca-Cola Lata',     marca:'Coca-Cola',     descricao:'350ml · original gelada',   categoria:'bebidas', preco:5.50,  barcode:'7894900011517', imageOverride:null, imageFallback:'🥤', badge:'HOT',      destaque:true  },
  { id:'B04', nome:'Água Mineral',       marca:'Crystal',       descricao:'500ml · sem gás',           categoria:'bebidas', preco:2.50,  barcode:'7896020000018', imageOverride:null, imageFallback:'💧', badge:'ESSENCIAL',destaque:false },
  { id:'B05', nome:'Monster Energy',     marca:'Monster',       descricao:'473ml · original verde',    categoria:'bebidas', preco:12.90, barcode:'5060166694945', imageOverride:null, imageFallback:'⚡', badge:'HOT',      destaque:true  },
  { id:'B06', nome:'Suco Caixinha',      marca:'Del Valle',     descricao:'200ml · sabores variados',  categoria:'bebidas', preco:3.50,  barcode:'7894900700923', imageOverride:null, imageFallback:'🧃', badge:null,       destaque:false },
  { id:'B07', nome:'Gatorade',           marca:'Gatorade',      descricao:'500ml · isotônico',         categoria:'bebidas', preco:8.90,  barcode:'7892840819973', imageOverride:null, imageFallback:'🏃', badge:'FIT',      destaque:true  },
  // ─── SNACKS ───────────────────────────────────────────────────────────────
  { id:'S01', nome:'Biscoito Oreo',      marca:'Mondelez',      descricao:'90g · recheado original',   categoria:'snacks',  preco:5.90,  barcode:'7622210951359', imageOverride:null, imageFallback:'🍪', badge:null,       destaque:false },
  { id:'S02', nome:'Ruffles Original',   marca:'Elma Chips',    descricao:'96g · batata ondulada',     categoria:'snacks',  preco:6.90,  barcode:'7892840247004', imageOverride:null, imageFallback:'🥔', badge:'TOP',      destaque:true  },
  { id:'S03', nome:'Amendoim Torrado',   marca:'Yoki',          descricao:'100g · salgado',            categoria:'snacks',  preco:4.00,  barcode:'7896336014018', imageOverride:null, imageFallback:'🥜', badge:null,       destaque:false },
  { id:'S04', nome:'Chocolate Lacta',    marca:'Mondelez',      descricao:'80g · ao leite',            categoria:'snacks',  preco:5.50,  barcode:'7622210570482', imageOverride:null, imageFallback:'🍫', badge:null,       destaque:false },
  { id:'S05', nome:'Gelo 1kg',           marca:'Mercadinho',    descricao:'pacote selado',             categoria:'snacks',  preco:5.00,  barcode:null,            imageOverride:null, imageFallback:'🧊', badge:'ESSENCIAL',destaque:true  },
  { id:'S06', nome:'Cigarro Marlboro',   marca:'Philip Morris', descricao:'maço · vermelho / gold',    categoria:'snacks',  preco:14.00, barcode:'7896150900018', imageOverride:null, imageFallback:'🚬', badge:null,       destaque:false },
  // ─── HIGIENE ──────────────────────────────────────────────────────────────
  { id:'H01', nome:'Desodorante Rexona', marca:'Unilever',      descricao:'150ml · aerossol',          categoria:'higiene', preco:14.90, barcode:'7891150075817', imageOverride:null, imageFallback:'🌬️',badge:'ESSENCIAL',destaque:true  },
  { id:'H02', nome:'Papel Higiênico',    marca:'Neve',          descricao:'4 rolos · folha dupla',     categoria:'higiene', preco:8.90,  barcode:'7896007552802', imageOverride:null, imageFallback:'🧻', badge:null,       destaque:false },
  { id:'H03', nome:'Absorvente',         marca:'Sempre Livre',  descricao:'pacote básico · com abas',  categoria:'higiene', preco:9.90,  barcode:'7891058009397', imageOverride:null, imageFallback:'🩸', badge:null,       destaque:false },
  { id:'H04', nome:'Shampoo',            marca:'Seda',          descricao:'200ml · hidratação',        categoria:'higiene', preco:11.90, barcode:'7891150057899', imageOverride:null, imageFallback:'🚿', badge:null,       destaque:false },
  { id:'H05', nome:'Sabonete',           marca:'Dove',          descricao:'90g · hidratante',          categoria:'higiene', preco:3.90,  barcode:'7891150022644', imageOverride:null, imageFallback:'🧼', badge:null,       destaque:false },
  { id:'H06', nome:'Kit Escova + Pasta', marca:'Colgate',       descricao:'escova + creme dental 70g', categoria:'higiene', preco:12.90, barcode:'7891024174708', imageOverride:null, imageFallback:'🦷', badge:'NEW',      destaque:false },
  { id:'H07', nome:'Preservativo',       marca:'Jontex',        descricao:'caixa 3un · tradicional',   categoria:'higiene', preco:13.90, barcode:'7896222700027', imageOverride:null, imageFallback:'💊', badge:'HOT',      destaque:false },
  // ─── LIMPEZA ──────────────────────────────────────────────────────────────
  { id:'L01', nome:'Álcool 70%',          marca:'Audax',        descricao:'500ml · líquido multiuso',  categoria:'limpeza', preco:7.90,  barcode:'7898964000027', imageOverride:null, imageFallback:'🧪', badge:'ESSENCIAL',destaque:false },
  { id:'L02', nome:'Detergente Ypê',      marca:'Ypê',          descricao:'500ml · limão',             categoria:'limpeza', preco:4.90,  barcode:'7896098900027', imageOverride:null, imageFallback:'🫧', badge:null,       destaque:false },
  { id:'L03', nome:'Esponja Scotch-Brite',marca:'3M',           descricao:'2un · dupla face',          categoria:'limpeza', preco:5.90,  barcode:'7891040030508', imageOverride:null, imageFallback:'🧽', badge:null,       destaque:false },
  { id:'L04', nome:'Saco de Lixo',        marca:'Veja',         descricao:'rolo 30L · 30 unidades',    categoria:'limpeza', preco:6.90,  barcode:'7896007095112', imageOverride:null, imageFallback:'🗑️',badge:null,       destaque:false },
  { id:'L05', nome:'Pano Multiuso',       marca:'Perfex',       descricao:'pacote 5un · colorido',     categoria:'limpeza', preco:8.90,  barcode:'7896007024106', imageOverride:null, imageFallback:'🧹', badge:null,       destaque:false },

  // ─── ADEGA · CERVEJAS ─────────────────────────────────────────────────────
  { id:'AD01', nome:'Heineken Long Neck',  marca:'Heineken',     descricao:'330ml · lager premium gelada',    categoria:'adega', preco:7.90,   barcode:'8710791005009', imageOverride:null, imageFallback:'🍺', badge:'GELADA',   destaque:true,  adega:true, secao:'cervejas' },
  { id:'AD02', nome:'Heineken Pack 6',     marca:'Heineken',     descricao:'6 × 330ml · long neck',           categoria:'adega', preco:43.90,  barcode:null,            imageOverride:null, imageFallback:'🍺', badge:'PACK',     destaque:true,  adega:true, secao:'cervejas' },
  { id:'AD03', nome:'Skol Pack 12',        marca:'Skol',         descricao:'12 × 350ml · lata pilsen',        categoria:'adega', preco:49.90,  barcode:null,            imageOverride:null, imageFallback:'🍻', badge:'PACK',     destaque:false, adega:true, secao:'cervejas' },
  { id:'AD04', nome:'Brahma Chopp Lata',   marca:'Brahma',       descricao:'350ml · malte especial',          categoria:'adega', preco:4.90,   barcode:'7891149100484', imageOverride:null, imageFallback:'🍻', badge:'GELADA',   destaque:false, adega:true, secao:'cervejas' },
  { id:'AD13', nome:'Cerveja Litrão',      marca:'Skol',         descricao:'1L · pilsen bem gelada',          categoria:'adega', preco:9.90,   barcode:null,            imageOverride:null, imageFallback:'🍺', badge:'GELADA',   destaque:true,  adega:true, secao:'cervejas' },
  { id:'AD14', nome:'Smirnoff Ice 275ml',  marca:'Smirnoff Ice', descricao:'275ml · bebida pronta limão',     categoria:'adega', preco:8.90,   barcode:null,            imageOverride:null, imageFallback:'🍋', badge:'HOT',      destaque:true,  adega:true, secao:'cervejas' },

  // ─── ADEGA · DESTILADOS ────────────────────────────────────────────────────
  { id:'AD05', nome:'Vodka Smirnoff',      marca:'Smirnoff',     descricao:'600ml · original premium',        categoria:'adega', preco:39.90,  barcode:null,            imageOverride:null, imageFallback:'🥃', badge:'HOT',      destaque:true,  adega:true, secao:'destilados' },
  { id:'AD06', nome:"Jack Daniel's",       marca:"Jack Daniel's",descricao:'375ml · Tennessee Whiskey',       categoria:'adega', preco:79.90,  barcode:null,            imageOverride:null, imageFallback:'🥃', badge:null,       destaque:false, adega:true, secao:'destilados' },
  { id:'AD07', nome:'Cachaça 51',          marca:'51',           descricao:'965ml · pinga tradicional',       categoria:'adega', preco:24.90,  barcode:'7896048010012', imageOverride:null, imageFallback:'🍶', badge:null,       destaque:false, adega:true, secao:'destilados' },
  { id:'AD15', nome:'Gin Tanqueray',       marca:'Tanqueray',    descricao:'750ml · London Dry clássico',     categoria:'adega', preco:134.90, barcode:null,            imageOverride:null, imageFallback:'🫙', badge:'PREMIUM',  destaque:true,  adega:true, secao:'destilados' },
  { id:'AD16', nome:'Tequila Jose Cuervo', marca:'Jose Cuervo',  descricao:'750ml · gold',                    categoria:'adega', preco:89.90,  barcode:null,            imageOverride:null, imageFallback:'🌵', badge:null,       destaque:false, adega:true, secao:'destilados' },
  { id:'AD17', nome:'Licor Baileys',       marca:'Baileys',      descricao:'750ml · original irish cream',    categoria:'adega', preco:99.90,  barcode:null,            imageOverride:null, imageFallback:'🍮', badge:'PREMIUM',  destaque:false, adega:true, secao:'destilados' },

  // ─── ADEGA · VINHOS ────────────────────────────────────────────────────────
  { id:'AD08', nome:'Vinho Pérgola Tinto', marca:'Pérgola',      descricao:'750ml · suave e encorpado',       categoria:'adega', preco:29.90,  barcode:null,            imageOverride:null, imageFallback:'🍷', badge:null,       destaque:true,  adega:true, secao:'vinhos' },
  { id:'AD09', nome:'Vinho Pérgola Branco',marca:'Pérgola',      descricao:'750ml · seco e refrescante',      categoria:'adega', preco:29.90,  barcode:null,            imageOverride:null, imageFallback:'🥂', badge:null,       destaque:false, adega:true, secao:'vinhos' },
  { id:'AD18', nome:'Malbec Reserva',      marca:'Carmen',       descricao:'750ml · corpo intenso, carvalho', categoria:'adega', preco:189.00, barcode:null,            imageOverride:null, imageFallback:'🍷', badge:'DESTAQUE', destaque:true,  adega:true, secao:'vinhos' },
  { id:'AD19', nome:'Chandon Brut',        marca:'Chandon',      descricao:'750ml · espumante brut',          categoria:'adega', preco:79.90,  barcode:null,            imageOverride:null, imageFallback:'🍾', badge:'ESPECIAL', destaque:true,  adega:true, secao:'vinhos' },

  // ─── ADEGA · ENERGÉTICOS ──────────────────────────────────────────────────
  { id:'AD10', nome:'Monster Energy',      marca:'Monster',      descricao:'473ml · original verde',          categoria:'adega', preco:12.90,  barcode:'5060166694945', imageOverride:null, imageFallback:'⚡', badge:'HOT',      destaque:true,  adega:true, secao:'energeticos' },
  { id:'AD11', nome:'Red Bull',            marca:'Red Bull',     descricao:'250ml · classic',                 categoria:'adega', preco:14.90,  barcode:'9002490200337', imageOverride:null, imageFallback:'🐂', badge:'HOT',      destaque:false, adega:true, secao:'energeticos' },
  { id:'AD20', nome:'Água Tônica',         marca:'Schweppes',    descricao:'350ml · tônica original',         categoria:'adega', preco:5.90,   barcode:null,            imageOverride:null, imageFallback:'💧', badge:null,       destaque:false, adega:true, secao:'energeticos' },

  // ─── ADEGA · COMPLEMENTOS ─────────────────────────────────────────────────
  { id:'AD12', nome:'Gelo 5kg',            marca:'Mercadinho',   descricao:'saco 5kg · moído fino',           categoria:'adega', preco:12.00,  barcode:null,            imageOverride:null, imageFallback:'🧊', badge:'ESSENCIAL',destaque:false, adega:false, secao:'complementos' },
  { id:'AD21', nome:'Limão Taiti 500g',    marca:'Hortifruti',   descricao:'500g · para drinks e caipirinhas',categoria:'adega', preco:4.90,   barcode:null,            imageOverride:null, imageFallback:'🍋', badge:null,       destaque:false, adega:false, secao:'complementos' },
  { id:'AD22', nome:'Copo Descartável',    marca:'Coposul',      descricao:'50un · 200ml transparente',       categoria:'adega', preco:8.90,   barcode:null,            imageOverride:null, imageFallback:'🥤', badge:null,       destaque:false, adega:false, secao:'complementos' },
  { id:'AD23', nome:'Canudo Colorido',     marca:'Coposul',      descricao:'100un · colorido',                categoria:'adega', preco:3.90,   barcode:null,            imageOverride:null, imageFallback:'🥤', badge:null,       destaque:false, adega:false, secao:'complementos' },
  { id:'AD24', nome:'Carvão 3kg',          marca:'Brasa Viva',   descricao:'3kg · churrasco',                 categoria:'adega', preco:19.90,  barcode:null,            imageOverride:null, imageFallback:'🔥', badge:null,       destaque:false, adega:false, secao:'complementos' },
  { id:'AD25', nome:'Combo Resenha',       marca:'Carmen',       descricao:'6× Heineken + Gelo 5kg + Copo',  categoria:'adega', preco:59.90,  barcode:null,            imageOverride:null, imageFallback:'🎉', badge:'HOT',      destaque:true,  adega:true, secao:'complementos' },
]

export const formatPreco     = (p)   => 'R$ ' + p.toFixed(2).replace('.', ',')
export const getPorCategoria = (cat) => PRODUTOS.filter(p => p.categoria === cat)
export const getDestaques    = ()    => PRODUTOS.filter(p => p.destaque)
export const getPorId        = (id)  => PRODUTOS.find(p => p.id === id)
export const getPorAdega     = ()    => PRODUTOS.filter(p => p.categoria === 'adega')
export const getPorSecao     = (sec) => PRODUTOS.filter(p => p.categoria === 'adega' && p.secao === sec)

// Desconto progressivo — aplica-se a produtos com adega:true
export const getAdegazDiscount = (qty) => {
  if (qty >= 12) return 0.15
  if (qty >= 6)  return 0.10
  if (qty >= 3)  return 0.05
  return 0
}

export const DESCONTO_FAIXAS = [
  { min: 3,  pct: 5  },
  { min: 6,  pct: 10 },
  { min: 12, pct: 15 },
]

// Cache em memória: evita chamadas repetidas à API para o mesmo produto
const _imgCache = new Map()

export function resolveImage(produto) {
  if (produto.imageOverride) return Promise.resolve({ type: 'override', url: produto.imageOverride })

  const key = produto.barcode || produto.id
  if (_imgCache.has(key)) return Promise.resolve(_imgCache.get(key))

  const fallback = { type: 'fallback', emoji: produto.imageFallback }

  if (!produto.barcode) {
    _imgCache.set(key, fallback)
    return Promise.resolve(fallback)
  }

  const promise = fetch(
    'https://world.openfoodfacts.org/api/v2/product/' + produto.barcode + '.json',
    { headers: { 'User-Agent': 'MercadinhoCarmen/1.0' } }
  )
    .then(r => r.json())
    .then(d => {
      const url = d?.product?.image_front_url || d?.product?.image_url
      const result = url ? { type: 'off', url } : fallback
      _imgCache.set(key, result)
      return result
    })
    .catch(() => {
      _imgCache.set(key, fallback)
      return fallback
    })

  _imgCache.set(key, promise)
  return promise
}
