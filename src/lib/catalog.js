export const CATEGORIAS = {
  bebidas: { id:'bebidas', nome:'Bebidas',  emoji:'🍺', cor:'#FFB300', bg:'linear-gradient(135deg,#FFF8DC,#FFE57F)' },
  snacks:  { id:'snacks',  nome:'Snacks',   emoji:'🍿', cor:'#FF7043', bg:'linear-gradient(135deg,#FFF3EE,#FFCCBC)' },
  higiene: { id:'higiene', nome:'Higiene',  emoji:'🧴', cor:'#66BB6A', bg:'linear-gradient(135deg,#F1F8E9,#C8E6C9)' },
  limpeza: { id:'limpeza', nome:'Limpeza',  emoji:'🧹', cor:'#42A5F5', bg:'linear-gradient(135deg,#E3F2FD,#BBDEFB)' },
  gelo:    { id:'gelo',    nome:'Gelo',     emoji:'🧊', cor:'#AB47BC', bg:'linear-gradient(135deg,#F3E5F5,#E1BEE7)' },
}

export const PRODUTOS = [
  { id:'B01', nome:'Heineken Long Neck', marca:'Heineken',        descricao:'330ml · lager premium',    categoria:'bebidas', preco:7.90,  barcode:'8710791005009', imageOverride:null, imageFallback:'🍺', badge:'TOP',      destaque:true  },
  { id:'B02', nome:'Skol Lata',          marca:'Skol',            descricao:'350ml · pilsen gelada',     categoria:'bebidas', preco:4.50,  barcode:'7891149100309', imageOverride:null, imageFallback:'🍻', badge:null,       destaque:false },
  { id:'B03', nome:'Coca-Cola Lata',     marca:'Coca-Cola',       descricao:'350ml · original gelada',   categoria:'bebidas', preco:5.50,  barcode:'7894900011517', imageOverride:null, imageFallback:'🥤', badge:'HOT',      destaque:true  },
  { id:'B04', nome:'Água Mineral',       marca:'Crystal',         descricao:'500ml · sem gás',           categoria:'bebidas', preco:2.50,  barcode:'7896020000018', imageOverride:null, imageFallback:'💧', badge:'ESSENCIAL',destaque:false },
  { id:'B05', nome:'Monster Energy',     marca:'Monster',         descricao:'473ml · original verde',    categoria:'bebidas', preco:12.90, barcode:'5060166694945', imageOverride:null, imageFallback:'⚡', badge:'HOT',      destaque:true  },
  { id:'B06', nome:'Suco Caixinha',      marca:'Del Valle',       descricao:'200ml · sabores variados',  categoria:'bebidas', preco:3.50,  barcode:'7894900700923', imageOverride:null, imageFallback:'🧃', badge:null,       destaque:false },
  { id:'B07', nome:'Gatorade',           marca:'Gatorade',        descricao:'500ml · isotônico',         categoria:'bebidas', preco:8.90,  barcode:'7892840819973', imageOverride:null, imageFallback:'🏃', badge:'FIT',      destaque:true  },
  { id:'S01', nome:'Biscoito Oreo',      marca:'Mondelez',        descricao:'90g · recheado original',   categoria:'snacks',  preco:5.90,  barcode:'7622210951359', imageOverride:null, imageFallback:'🍪', badge:null,       destaque:false },
  { id:'S02', nome:'Ruffles Original',   marca:'Elma Chips',      descricao:'96g · batata ondulada',     categoria:'snacks',  preco:6.90,  barcode:'7892840247004', imageOverride:null, imageFallback:'🥔', badge:'TOP',      destaque:true  },
  { id:'S03', nome:'Amendoim Torrado',   marca:'Yoki',            descricao:'100g · salgado',            categoria:'snacks',  preco:4.00,  barcode:'7896336014018', imageOverride:null, imageFallback:'🥜', badge:null,       destaque:false },
  { id:'S04', nome:'Chocolate Lacta',    marca:'Mondelez',        descricao:'80g · ao leite',            categoria:'snacks',  preco:5.50,  barcode:'7622210570482', imageOverride:null, imageFallback:'🍫', badge:null,       destaque:false },
  { id:'S05', nome:'Gelo 1kg',           marca:'Mercadinho',      descricao:'pacote selado',             categoria:'snacks',  preco:5.00,  barcode:null,            imageOverride:null, imageFallback:'🧊', badge:'ESSENCIAL',destaque:true  },
  { id:'S06', nome:'Cigarro Marlboro',   marca:'Philip Morris',   descricao:'maço · vermelho / gold',    categoria:'snacks',  preco:14.00, barcode:'7896150900018', imageOverride:null, imageFallback:'🚬', badge:null,       destaque:false },
  { id:'H01', nome:'Desodorante Rexona', marca:'Unilever',        descricao:'150ml · aerossol',          categoria:'higiene', preco:14.90, barcode:'7891150075817', imageOverride:null, imageFallback:'🌬️',badge:'ESSENCIAL',destaque:true  },
  { id:'H02', nome:'Papel Higiênico',    marca:'Neve',            descricao:'4 rolos · folha dupla',     categoria:'higiene', preco:8.90,  barcode:'7896007552802', imageOverride:null, imageFallback:'🧻', badge:null,       destaque:false },
  { id:'H03', nome:'Absorvente',         marca:'Sempre Livre',    descricao:'pacote básico · com abas',  categoria:'higiene', preco:9.90,  barcode:'7891058009397', imageOverride:null, imageFallback:'🩸', badge:null,       destaque:false },
  { id:'H04', nome:'Shampoo',            marca:'Seda',            descricao:'200ml · hidratação',        categoria:'higiene', preco:11.90, barcode:'7891150057899', imageOverride:null, imageFallback:'🚿', badge:null,       destaque:false },
  { id:'H05', nome:'Sabonete',           marca:'Dove',            descricao:'90g · hidratante',          categoria:'higiene', preco:3.90,  barcode:'7891150022644', imageOverride:null, imageFallback:'🧼', badge:null,       destaque:false },
  { id:'H06', nome:'Kit Escova + Pasta', marca:'Colgate',         descricao:'escova + creme dental 70g', categoria:'higiene', preco:12.90, barcode:'7891024174708', imageOverride:null, imageFallback:'🦷', badge:'NEW',      destaque:false },
  { id:'H07', nome:'Preservativo',       marca:'Jontex',          descricao:'caixa 3un · tradicional',   categoria:'higiene', preco:13.90, barcode:'7896222700027', imageOverride:null, imageFallback:'💊', badge:'HOT',      destaque:false },
  { id:'L01', nome:'Álcool 70%',         marca:'Audax',           descricao:'500ml · líquido multiuso',  categoria:'limpeza', preco:7.90,  barcode:'7898964000027', imageOverride:null, imageFallback:'🧪', badge:'ESSENCIAL',destaque:false },
  { id:'L02', nome:'Detergente Ypê',     marca:'Ypê',             descricao:'500ml · limão',             categoria:'limpeza', preco:4.90,  barcode:'7896098900027', imageOverride:null, imageFallback:'🫧', badge:null,       destaque:false },
  { id:'L03', nome:'Esponja Scotch-Brite',marca:'3M',             descricao:'2un · dupla face',          categoria:'limpeza', preco:5.90,  barcode:'7891040030508', imageOverride:null, imageFallback:'🧽', badge:null,       destaque:false },
  { id:'L04', nome:'Saco de Lixo',       marca:'Veja',            descricao:'rolo 30L · 30 unidades',    categoria:'limpeza', preco:6.90,  barcode:'7896007095112', imageOverride:null, imageFallback:'🗑️',badge:null,       destaque:false },
  { id:'L05', nome:'Pano Multiuso',      marca:'Perfex',          descricao:'pacote 5un · colorido',     categoria:'limpeza', preco:8.90,  barcode:'7896007024106', imageOverride:null, imageFallback:'🧹', badge:null,       destaque:false },
]

export const formatPreco  = (p) => 'R$ ' + p.toFixed(2).replace('.', ',')
export const getPorCategoria = (cat) => PRODUTOS.filter(p => p.categoria === cat)
export const getDestaques    = ()    => PRODUTOS.filter(p => p.destaque)
export const getPorId        = (id)  => PRODUTOS.find(p => p.id === id)

// Cache em memória: evita chamadas repetidas à API para o mesmo produto
const _imgCache = new Map()

export function resolveImage(produto) {
  if (produto.imageOverride) return Promise.resolve({ type: 'override', url: produto.imageOverride })

  const key = produto.barcode || produto.id
  if (_imgCache.has(key)) return Promise.resolve(_imgCache.get(key))

  // Serializa requisições em andamento para o mesmo barcode (sem double-fetch)
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

  // Armazena a promise no cache para evitar chamadas paralelas duplicadas
  _imgCache.set(key, promise)
  return promise
}
