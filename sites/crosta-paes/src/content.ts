// Todo o conteúdo do site fica aqui.
// TESTE: a Crosta é uma padaria fictícia. Endereço, horários, preços e textos são de exemplo.
// O WhatsApp é o da 03 Agency, para os testes de encomenda caírem no número da agência.
// Fotos: Unsplash (licença livre, sem obrigação de crédito).

export const SITE_URL = 'https://crosta-paes.pages.dev'; // troque pelo domínio quando houver

export const site = {
  name: 'Crosta',
  fullName: 'Crosta Pães Artesanais',
  tagline: 'Pão de fermentação natural, feito sem pressa.',
  description:
    'Padaria artesanal em São José do Rio Preto (SP). Pães de fermentação natural, croissants, focaccias, assinatura semanal de pães e encomendas de cestas e cafés da manhã.',
  whatsapp: '5511932114092',
  instagram: '', // vazio = não mostra (evita apontar para um perfil real de outra pessoa)
  address: {
    street: 'Rua das Fornadas, 48',
    district: 'Redentora',
    city: 'São José do Rio Preto',
    cityShort: 'Rio Preto',
    state: 'SP',
    zip: '15015-310',
    geo: { lat: -20.8186, lng: -49.3874 },
  },
  priceRange: 'R$ 12–R$ 39',
  // Bairros atendidos na entrega (assinatura e encomendas). Ajuda o Google a ligar o site à região.
  areas: ['Redentora', 'Centro', 'Boa Vista', 'Jardim Tarraf', 'Vila Imperial', 'Higienópolis', 'Jardim Walkíria', 'Parque Industrial'],
  demoNote: 'Site de demonstração criado pela 03 Agency. Padaria, endereço e preços fictícios.',
  googleVerification: '', // código do Google Search Console (meta google-site-verification)
};

export const fullAddress = `${site.address.street} · ${site.address.district}, ${site.address.city} – ${site.address.state}`;
export const cityLine = `${site.address.city} – ${site.address.state}`;
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.address.street}, ${site.address.district}, ${site.address.city} - ${site.address.state}`)}`;
export const wa = (text: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
export const phoneLabel = site.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');

// Horário de funcionamento (dias no padrão schema.org).
export const hours = [
  { label: 'Terça a sexta', days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '19:00' },
  { label: 'Sábado', days: ['Saturday'], opens: '07:00', closes: '15:00' },
  { label: 'Domingo', days: ['Sunday'], opens: '07:00', closes: '12:00' },
];
export const closedLabel = 'Segunda: fechado (dia de alimentar o fermento)';

// Fornadas por dia da semana (0 = domingo). Usadas no aviso "próxima fornada".
export const bakes: Record<number, string[]> = {
  0: ['07:00'],
  1: [],
  2: ['07:00', '11:00', '16:00'],
  3: ['07:00', '11:00', '16:00'],
  4: ['07:00', '11:00', '16:00'],
  5: ['07:00', '11:00', '16:00'],
  6: ['07:00', '11:00'],
};

export type Photo = { src: string; alt: string; w: number; h: number };
const photo = (name: string, alt: string, w: number, h: number): Photo => ({ src: `/fotos/${name}`, alt, w, h });

export const photos = {
  hero: photo('hero-paes', 'Pães rústicos de fermentação natural com espigas de trigo sobre a bancada enfarinhada', 2000, 1331),
  boule: photo('fermentacao-natural', 'Pão redondo de fermentação natural com corte na casca e farinha por cima', 2000, 1333),
  rye: photo('centeio', 'Pão de centeio fatiado sobre tábua de madeira', 2000, 1333),
  baguette: photo('baguete', 'Baguete fatiada com faca e espigas de trigo', 2000, 3000),
  croissant: photo('croissant', 'Croissants dourados polvilhados com açúcar', 2000, 1600),
  shelves: photo('loja-prateleiras', 'Prateleiras e balcão da padaria com baguetes, pães e doces', 2000, 1489),
  display: photo('vitrine', 'Vitrine com croissants, pães doces e folhados', 2000, 1335),
  painChoc: photo('pain-au-chocolat', 'Bandeja de pains au chocolat recém-assados', 2000, 1333),
  croissants: photo('croissants', 'Croissants empilhados no balcão', 2000, 2667),
  sandwichLoaf: photo('pao-de-forma', 'Pão de forma fatiado sobre tábua', 2000, 1333),
  bananaCake: photo('bolo-banana', 'Bolo de banana com nozes e gotas de chocolate fatiado', 2000, 1333),
  basket: photo('cesta', 'Cesta com pães variados, baguetes e espigas de trigo', 2000, 1125),
  slices: photo('fatias', 'Fatias de pão integral em fila', 2000, 3000),
  darkBoule: photo('rustico-escuro', 'Pão rústico redondo com casca enfarinhada sobre fundo escuro', 2000, 3000),
};

// ---------- Cardápio ----------
export type MenuItem = { name: string; desc: string; price: number; tag?: string };
export type MenuSection = { id: string; title: string; intro: string; photo: Photo; items: MenuItem[] };

export const menu: MenuSection[] = [
  {
    id: 'fermentacao-natural', title: 'Pães de fermentação natural', photo: photos.boule,
    intro: 'Feitos com levain, a nossa massa-mãe, e fermentação lenta. Só farinha, água, sal e tempo.',
    items: [
      { name: 'Rústico da casa', desc: 'Casca crocante, miolo aberto e um leve azedinho. O pão que dá nome à casa.', price: 32, tag: 'Mais pedido' },
      { name: 'Integral com sementes', desc: 'Trigo integral, linhaça, girassol e gergelim.', price: 36 },
      { name: 'Centeio', desc: 'Com farinha de centeio, miolo denso e sabor marcante.', price: 38 },
      { name: 'Azeitona e alecrim', desc: 'Azeitonas pretas e alecrim fresco na massa.', price: 39 },
      { name: 'Baguete', desc: 'Fina, crocante e perfeita para o almoço.', price: 14 },
      { name: 'Ciabatta', desc: 'Massa bem hidratada e furinhos grandes.', price: 12 },
    ],
  },
  {
    id: 'folhados-e-doces', title: 'Folhados e doces', photo: photos.croissant,
    intro: 'Laminados com manteiga e assados todas as manhãs.',
    items: [
      { name: 'Croissant de manteiga', desc: 'Camadas finas e muito crocantes.', price: 14, tag: 'Sai às 7h' },
      { name: 'Pain au chocolat', desc: 'Massa de croissant com duas barras de chocolate meio amargo.', price: 16 },
      { name: 'Rolinho de canela', desc: 'Massa macia, canela, açúcar mascavo e cobertura leve.', price: 15 },
      { name: 'Bolo de banana com nozes', desc: 'Fatia generosa, úmida e com pedaços de nozes.', price: 13 },
    ],
  },
  {
    id: 'focaccias-e-salgados', title: 'Focaccias e salgados', photo: photos.rye,
    intro: 'Para o lanche, o almoço rápido ou para levar para casa.',
    items: [
      { name: 'Focaccia de alecrim', desc: 'Azeite, alecrim e flor de sal. Vendida em pedaço.', price: 14 },
      { name: 'Focaccia de tomate confit', desc: 'Tomatinhos assados lentamente e manjericão.', price: 16 },
      { name: 'Pão de queijo da casa', desc: 'Porção com seis unidades.', price: 18 },
      { name: 'Sanduíche de mortadela', desc: 'Mortadela, queijo e mostarda no pão rústico.', price: 34 },
    ],
  },
  {
    id: 'dia-a-dia', title: 'Pães do dia a dia', photo: photos.sandwichLoaf,
    intro: 'Para a torrada de todo dia, também com fermentação natural.',
    items: [
      { name: 'Pão de forma', desc: 'Macio, de fermentação natural e sem conservantes.', price: 26 },
      { name: 'Brioche', desc: 'Amanteigado, ótimo para rabanada e sanduíche.', price: 28 },
      { name: 'Pão de leite', desc: 'Seis pãezinhos macios para o café da manhã.', price: 22 },
    ],
  },
  {
    id: 'cafes', title: 'Cafés', photo: photos.painChoc,
    intro: 'Café especial para acompanhar.',
    items: [
      { name: 'Espresso', desc: 'Grãos de torra média.', price: 7 },
      { name: 'Café coado', desc: 'Passado na hora.', price: 9 },
      { name: 'Cappuccino', desc: 'Espresso, leite vaporizado e espuma.', price: 12 },
    ],
  },
];

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 });

// ---------- Assinaturas e encomendas ----------
export const plans = [
  {
    id: 'quinzenal', name: 'Quinzenal', price: 62, period: 'mês',
    desc: 'Um pão de fermentação natural a cada 15 dias.',
    items: ['1 pão a cada 15 dias', 'Escolha o pão a cada entrega', 'Retirada na loja'],
  },
  {
    id: 'semanal', name: 'Fornada da semana', price: 120, period: 'mês', featured: true,
    desc: 'Um pão de fermentação natural toda semana.',
    items: ['1 pão por semana', 'Escolha o pão a cada entrega', 'Retirada na loja ou entrega no bairro'],
  },
  {
    id: 'mesa-cheia', name: 'Mesa cheia', price: 220, period: 'mês',
    desc: 'Dois pães e um doce por semana, para a casa toda.',
    items: ['2 pães + 1 doce por semana', 'Prioridade nas fornadas especiais', 'Retirada na loja ou entrega no bairro'],
  },
];

export const subscriptionSteps = [
  { title: 'Escolha o plano', text: 'Semanal, quinzenal ou para a casa toda.' },
  { title: 'Escolha o dia', text: 'Terça, quinta ou sábado, na loja ou em casa.' },
  { title: 'Pão fresco', text: 'O pão sai da fornada da manhã direto para você.' },
];

export const orderInfo = {
  title: 'Encomendas para eventos e cafés',
  text: 'Cestas de café da manhã, mesas de festa, coffee breaks e presentes em São José do Rio Preto. Peça com pelo menos 48 horas de antecedência.',
  options: ['Pães de fermentação natural', 'Folhados e doces', 'Focaccias e salgados', 'Cesta de café da manhã', 'Outro'],
};

// ---------- Perguntas ----------
export const faqOrders = [
  { q: 'Com quanta antecedência preciso encomendar?', a: 'Pedimos pelo menos 48 horas. Para pedidos grandes, como festas e eventos, o ideal é avisar com uma semana.' },
  { q: 'Vocês entregam em São José do Rio Preto?', a: 'Sim. Entregamos para assinantes e encomendas na Redentora, Centro, Boa Vista, Jardim Tarraf, Vila Imperial, Higienópolis e bairros próximos. Na loja, a retirada é na hora.' },
  { q: 'Posso pausar ou cancelar a assinatura?', a: 'Pode, a qualquer momento. É só avisar pelo WhatsApp até a véspera da próxima entrega.' },
  { q: 'Como faço o pagamento?', a: 'Pix, cartão de crédito ou débito. Assinaturas são cobradas mensalmente.' },
];

export const faqVisit = [
  { q: 'Onde fica a Crosta?', a: 'Na Rua das Fornadas, 48, no bairro Redentora, em São José do Rio Preto (SP). Há vagas na rua em frente.' },
  { q: 'Precisa reservar mesa?', a: 'Não. Temos poucas mesas e o atendimento é por ordem de chegada.' },
  { q: 'Que horas os pães saem do forno?', a: 'De terça a sexta, as fornadas saem às 7h, 11h e 16h. No sábado, às 7h e 11h, e no domingo, às 7h. Para garantir o seu pão, você pode encomendar pelo WhatsApp.' },
  { q: 'Tem opções sem lactose?', a: 'Os pães de fermentação natural (rústico, integral, centeio, azeitona, baguete e ciabatta) são feitos sem leite e sem ovos.' },
];

// ---------- Blog ----------
export type Block = { h2?: string; p?: string; ul?: string[]; ol?: string[]; tip?: string; cta?: { text: string; href: string; label: string } };
export type Post = {
  slug: string; title: string; seoTitle?: string; description: string; date: string; readMin: number; photo: Photo; category: string; body: Block[];
};

const postList: Post[] = [
  {
    slug: 'pao-de-fermentacao-natural-em-sao-jose-do-rio-preto',
    title: 'Onde comprar pão de fermentação natural em São José do Rio Preto',
    seoTitle: 'Pão de Fermentação Natural em São José do Rio Preto',
    description: 'Como reconhecer um pão de fermentação natural de verdade, o que perguntar na padaria e onde encontrar pão artesanal em Rio Preto, com entrega nos bairros.',
    date: '2026-11-26', readMin: 4, photo: photos.darkBoule, category: 'Rio Preto',
    body: [
      { p: 'A procura por pão de fermentação natural cresceu em São José do Rio Preto. Com isso, muita padaria passou a usar o nome, mas nem todo pão "de fermentação natural" é feito só com levain. Veja como escolher bem.' },
      { h2: 'O que é pão de fermentação natural de verdade' },
      { p: 'É o pão que cresce apenas com levain, a massa-mãe feita de farinha e água. A lista de ingredientes é curta: farinha, água, sal e fermento natural. Se o rótulo também traz fermento biológico, açúcar ou melhoradores, é um pão comum com um pouco de levain para dar sabor.' },
      { h2: 'O que perguntar na padaria' },
      { ul: [
        'O pão leva fermento biológico além do levain?',
        'Quanto tempo a massa fermenta? (Pães de fermentação natural costumam levar de 12 a 48 horas.)',
        'Em que horário os pães saem do forno?',
        'Vocês fazem entrega ou assinatura?',
      ] },
      { h2: 'Calor de Rio Preto e conservação' },
      { p: 'Com o calor da região, o pão artesanal deve ficar fora de sacos plásticos fechados e longe do sol. Em dias muito quentes, fatie o que não for comer em até dois dias e congele. As fatias vão direto do congelador para a torradeira.' },
      { h2: 'Pão artesanal com entrega em Rio Preto' },
      { p: 'A Crosta fica na Redentora e entrega para assinantes e encomendas no Centro, Boa Vista, Jardim Tarraf, Vila Imperial, Higienópolis e bairros próximos. As fornadas saem às 7h, 11h e 16h, de terça a sexta.' },
      { cta: { text: 'Pão de fermentação natural toda semana, em casa, em Rio Preto.', href: '/assinaturas-e-encomendas/', label: 'Ver planos de assinatura' } },
    ],
  },
  {
    slug: 'cesta-de-cafe-da-manha-em-rio-preto',
    title: 'Cesta de café da manhã em Rio Preto: como encomendar e o que incluir',
    seoTitle: 'Cesta de Café da Manhã em Rio Preto: Como Encomendar',
    description: 'Ideias para montar uma cesta de café da manhã para presentear em São José do Rio Preto: o que colocar, quanto encomendar e com quanta antecedência pedir.',
    date: '2026-11-19', readMin: 3, photo: photos.painChoc, category: 'Rio Preto',
    body: [
      { p: 'Cesta de café da manhã é um dos presentes mais pedidos para aniversários, Dia das Mães e datas especiais em Rio Preto. Uma boa cesta tem pão fresco, algo doce, algo salgado e um carinho a mais.' },
      { h2: 'O que colocar na cesta' },
      { ul: ['Um pão rústico de fermentação natural.', 'Croissants ou pains au chocolat.', 'Uma fatia generosa de bolo.', 'Geleia, manteiga e um queijo fresco.', 'Café especial e um bilhete escrito à mão.'] },
      { h2: 'Para quantas pessoas' },
      { p: 'Uma cesta para duas pessoas costuma ter um pão, dois folhados, duas fatias de bolo e acompanhamentos. Para a família, dobre os pães e inclua pão de leite para as crianças.' },
      { h2: 'Com quanta antecedência pedir' },
      { p: 'Peça com pelo menos 48 horas. Em datas como Dia das Mães, Dia dos Namorados e Natal, encomende com uma semana de antecedência, porque as fornadas lotam.' },
      { tip: 'Combine a entrega bem cedo, entre 7h e 9h: o pão chega ainda com a casca crocante.' },
      { cta: { text: 'Montamos a cesta e entregamos em São José do Rio Preto.', href: '/assinaturas-e-encomendas/', label: 'Encomendar uma cesta' } },
    ],
  },

  {
    slug: 'o-que-e-fermentacao-natural',
    title: 'O que é fermentação natural (e por que o pão fica melhor)',
    seoTitle: 'O que é Fermentação Natural no Pão | Crosta',
    description: 'Entenda o que é o levain, como funciona a fermentação natural e o que muda no sabor, na casca e na conservação do pão.',
    date: '2026-11-10', readMin: 4, photo: photos.boule, category: 'Fermentação',
    body: [
      { p: 'Antes do fermento biológico seco virar padrão, todo pão era de fermentação natural. A técnica é simples e antiga: em vez de um fermento comprado, a massa cresce com uma cultura viva de leveduras e bactérias que existem na própria farinha.' },
      { h2: 'O que é o levain' },
      { p: 'O levain, também chamado de fermento natural ou massa-mãe, é uma mistura de farinha e água que fermenta sozinha e é alimentada todos os dias. Com o tempo, ele forma uma colônia estável de leveduras selvagens e bactérias lácticas. É ele que faz a massa crescer e que dá ao pão o sabor levemente ácido.' },
      { h2: 'Por que leva mais tempo' },
      { p: 'As leveduras selvagens trabalham mais devagar do que o fermento industrial. Por isso, um pão de fermentação natural costuma levar de 12 a 48 horas entre a mistura e o forno. Esse tempo não é desperdício: é nele que o sabor se desenvolve.' },
      { h2: 'O que muda no pão' },
      { ul: [
        'Sabor: mais complexo, com notas ácidas e tostadas.',
        'Casca: mais grossa e crocante, com aquele som de "estalo".',
        'Miolo: úmido e com alvéolos irregulares.',
        'Conservação: o pão dura mais dias sem endurecer, graças à acidez natural da massa.',
      ] },
      { h2: 'Como reconhecer um pão de fermentação natural' },
      { p: 'Leia os ingredientes: em geral, a lista é curta, com farinha, água, sal e fermento natural. Desconfie de pães "de fermentação natural" que também levam fermento biológico, açúcar e melhoradores. E repare na casca e no miolo: cor bem dourada, crosta firme e miolo aberto são bons sinais.' },
      { p: 'Na Crosta, todos os pães da linha de fermentação natural levam só farinha, água, sal e levain. O resto é tempo.' },
      { cta: { text: 'Rústico, integral, centeio, azeitona e alecrim: todos de fermentação natural.', href: '/cardapio/', label: 'Ver o cardápio' } },
    ],
  },
  {
    slug: 'como-conservar-pao-artesanal',
    title: 'Como conservar pão artesanal por mais tempo',
    description: 'Onde guardar, como congelar e como devolver a crocância ao pão de fermentação natural. Um guia prático para não desperdiçar nenhuma fatia.',
    date: '2026-11-17', readMin: 3, photo: photos.rye, category: 'Dicas',
    body: [
      { p: 'Pão artesanal não tem conservantes. Ele dura bem, mas precisa de alguns cuidados para manter a casca crocante e o miolo macio por mais dias.' },
      { h2: 'Nos primeiros dias' },
      { ul: [
        'Guarde em saco de pano ou de papel, nunca em plástico fechado: o plástico amolece a casca.',
        'Deixe o pão com o lado cortado virado para baixo na tábua. Assim o miolo não resseca.',
        'Evite a geladeira: o frio acelera o endurecimento do pão.',
      ] },
      { h2: 'Para guardar por mais tempo, congele' },
      { p: 'Se não for consumir em até três dias, fatie e congele em saco bem fechado. As fatias podem ir direto do congelador para a torradeira ou para a frigideira, sem descongelar.' },
      { h2: 'Como devolver a crocância' },
      { p: 'Pão inteiro que endureceu um pouco? Passe rapidamente sob água corrente na casca e leve ao forno preaquecido a 200 °C por 8 a 10 minutos. A casca volta a ficar crocante e o miolo, macio.' },
      { h2: 'E quando ficar duro de vez' },
      { p: 'Nada se perde: pão amanhecido vira farinha de rosca, croutons para sopa e salada, rabanada ou pudim de pão.' },
      { tip: 'Com a assinatura quinzenal, o pão chega na medida certa para não sobrar.' },
      { cta: { text: 'Pão fresco toda semana, sem desperdício.', href: '/assinaturas-e-encomendas/', label: 'Conheça a assinatura' } },
    ],
  },
  {
    slug: 'pao-certo-para-cada-refeicao',
    title: 'Qual pão escolher para cada refeição',
    description: 'Do café da manhã ao jantar: um guia rápido para escolher entre rústico, baguete, brioche, focaccia e outros pães artesanais.',
    date: '2026-11-24', readMin: 3, photo: photos.sandwichLoaf, category: 'Guia',
    body: [
      { p: 'Cada pão tem um papel na mesa. Saber qual escolher faz diferença no sanduíche, na torrada e no prato do jantar.' },
      { h2: 'Café da manhã' },
      { p: 'Pão de forma de fermentação natural e brioche são ótimos para torrada e para comer com manteiga e geleia. O croissant é a escolha para os dias especiais.' },
      { h2: 'Almoço e sanduíches' },
      { p: 'A baguete e a ciabatta seguram bem recheios úmidos sem desmanchar. Para sanduíches mais robustos, o rústico fatiado é imbatível.' },
      { h2: 'Para acompanhar pratos' },
      { p: 'Sopas, saladas e massas combinam com pães de casca firme, como o rústico, o integral com sementes e o centeio. Eles são ótimos para "limpar" o prato.' },
      { h2: 'Para receber' },
      { p: 'Focaccia de alecrim cortada em quadrados é sucesso em qualquer mesa. Complete com azeite bom, queijos e embutidos.' },
      { ul: [
        'Rústico: o coringa, vai bem com tudo.',
        'Baguete: almoço e sanduíches.',
        'Brioche: café da manhã e rabanada.',
        'Focaccia: aperitivos e mesas para dividir.',
        'Centeio: queijos fortes, salmão e manteiga.',
      ] },
      { cta: { text: 'Todos esses pães estão no nosso cardápio, com preços.', href: '/cardapio/', label: 'Ver o cardápio' } },
    ],
  },

  {
    slug: 'como-comecar-um-levain-em-casa',
    title: 'Como começar um levain em casa, passo a passo',
    description: 'Um guia simples para criar a sua massa-mãe com farinha e água: o que fazer em cada dia, como alimentar e como saber se o fermento está pronto.',
    date: '2026-10-27', readMin: 5, photo: photos.hero, category: 'Fermentação',
    body: [
      { p: 'O levain é só farinha e água fermentando juntas. Leva alguns dias para ficar forte, mas o processo é simples, e você precisa de pouca coisa: um pote de vidro, farinha, água filtrada e paciência.' },
      { h2: 'Do que você precisa' },
      { ul: ['Um pote de vidro com tampa (lavado e seco).', 'Farinha de trigo integral e farinha branca.', 'Água filtrada em temperatura ambiente.', 'Uma balança de cozinha, se tiver.'] },
      { h2: 'O passo a passo' },
      { ol: [
        'Dia 1: misture 50 g de farinha integral com 50 g de água. Tampe sem apertar e deixe em temperatura ambiente.',
        'Dia 2: talvez apareçam algumas bolhas. Descarte metade e alimente com 50 g de farinha e 50 g de água.',
        'Dias 3 a 5: repita a alimentação uma ou duas vezes por dia. O cheiro pode ficar forte e azedo; é normal.',
        'Dias 6 a 10: passe a alimentar com farinha branca. O levain deve dobrar de volume em 4 a 8 horas depois de cada alimentação.',
      ] },
      { h2: 'Como saber se está pronto' },
      { p: 'Um levain pronto dobra de tamanho de forma previsível, tem bolhas por toda a massa e cheiro agradável, entre iogurte e frutas. Um teste clássico: uma colherada colocada na água deve boiar.' },
      { tip: 'Dica de padeiro: marque o nível do levain no pote com um elástico logo depois de alimentar. Fica fácil ver quanto ele cresceu.' },
      { h2: 'Como manter' },
      { p: 'Se você assa pão toda semana, guarde o levain na geladeira e alimente uma vez por semana. Tire da geladeira na véspera de usar e faça uma alimentação para ele acordar.' },
      { cta: { text: 'Sem tempo para cuidar de um fermento? A gente faz isso todos os dias.', href: '/assinaturas-e-encomendas/', label: 'Conheça a assinatura de pães' } },
    ],
  },
  {
    slug: 'por-que-a-laminacao-faz-o-croissant',
    title: 'Croissant: por que a laminação faz toda a diferença',
    description: 'Entenda como as camadas de massa e manteiga criam o folhado do croissant e o que observar para reconhecer um croissant bem feito.',
    date: '2026-10-20', readMin: 3, photo: photos.croissants, category: 'Folhados',
    body: [
      { p: 'Um croissant bem feito estala por fora, é leve por dentro e deixa farelos dourados na mesa. Esse resultado tem nome: laminação.' },
      { h2: 'O que é laminação' },
      { p: 'Laminar é intercalar camadas de massa e de manteiga. A manteiga fria é envolvida pela massa, que é aberta e dobrada várias vezes. Ao final, são dezenas de camadas finíssimas.' },
      { h2: 'O que acontece no forno' },
      { p: 'No calor do forno, a água da manteiga vira vapor e empurra as camadas de massa, que se separam e ficam crocantes. É por isso que a manteiga precisa estar fria e a massa, bem descansada.' },
      { h2: 'Como reconhecer um bom croissant' },
      { ul: ['Casca bem dourada e brilhante, sem partes pálidas.', 'Camadas visíveis nas pontas.', 'Miolo com formato de colmeia, cheio de espaços.', 'Cheiro de manteiga, não de gordura.'] },
      { cta: { text: 'Os nossos croissants saem do forno às 7h, de terça a domingo.', href: '/cardapio/', label: 'Ver folhados no cardápio' } },
    ],
  },
  {
    slug: 'pao-integral-ou-branco',
    title: 'Pão integral ou branco: qual é a diferença de verdade',
    description: 'Farinha integral, branca, centeio e sementes: o que muda no sabor, na textura e na composição de cada pão, sem mitos.',
    date: '2026-10-13', readMin: 3, photo: photos.slices, category: 'Guia',
    body: [
      { p: 'A diferença entre pão integral e branco está na farinha. E ela muda bastante coisa: cor, sabor, textura e até o tempo de fermentação.' },
      { h2: 'Farinha integral x farinha branca' },
      { p: 'A farinha integral é feita com o grão inteiro do trigo, incluindo a casca (farelo) e o gérmen. A farinha branca usa só a parte interna do grão. Por isso, a integral tem mais fibras e um sabor mais intenso, de nozes.' },
      { h2: 'O que muda no pão' },
      { ul: ['Pão integral: miolo mais fechado, sabor mais marcante e mais fibras.', 'Pão branco: miolo mais leve e aberto, sabor mais suave.', 'Centeio: denso, úmido e com sabor levemente azedo e terroso.'] },
      { h2: 'Atenção ao rótulo' },
      { p: 'Muitos pães vendidos como integrais usam pouca farinha integral e corante para escurecer a massa. Confira a lista de ingredientes: a farinha integral deve aparecer em primeiro lugar.' },
      { tip: 'Na dúvida, prove os dois. Um bom pão integral não é "pão de dieta": é um pão saboroso por si só.' },
      { cta: { text: 'Integral com sementes, centeio e rústico: veja os pães da casa.', href: '/cardapio/', label: 'Ver pães de fermentação natural' } },
    ],
  },
  {
    slug: 'mesa-de-cafe-da-manha-para-receber',
    title: 'Como montar uma mesa de café da manhã para receber',
    description: 'Quantidades por pessoa, o que não pode faltar e como organizar uma mesa de café da manhã bonita e prática para aniversários, visitas e escritórios.',
    date: '2026-10-06', readMin: 4, photo: photos.display, category: 'Receber',
    body: [
      { p: 'Café da manhã para receber é simples de organizar quando você pensa em três grupos: pães, acompanhamentos e bebidas.' },
      { h2: 'Quanto servir por pessoa' },
      { ul: ['Pães: 2 a 3 fatias ou pãezinhos por pessoa.', 'Folhados: 1 croissant ou doce por pessoa.', 'Bolo: 1 fatia por pessoa, se houver outros doces.', 'Frutas: cerca de 100 g por pessoa.'] },
      { h2: 'O que não pode faltar' },
      { ul: ['Um pão rústico inteiro, fatiado na hora.', 'Algo doce e algo salgado.', 'Manteiga, geleia e um queijo fresco.', 'Café coado, leite e uma opção sem lactose.'] },
      { h2: 'Como organizar a mesa' },
      { p: 'Coloque os pães em tábuas de madeira, os acompanhamentos em potes pequenos e deixe facas e guardanapos ao lado de cada tábua. Monte a mesa por altura: itens baixos na frente, cestas e bolos atrás.' },
      { tip: 'Fatie o pão rústico só na hora de servir. Ele fica crocante por mais tempo inteiro.' },
      { cta: { text: 'A gente monta a cesta completa para você, com 48 horas de antecedência.', href: '/assinaturas-e-encomendas/', label: 'Fazer uma encomenda' } },
    ],
  },
  {
    slug: 'focaccia-o-pao-de-azeite',
    title: 'Focaccia: o pão de azeite que virou estrela da mesa',
    description: 'De onde vem a focaccia, por que ela tem aqueles furinhos e como servir: com alecrim, tomate, cebola ou simplesmente com flor de sal.',
    date: '2026-09-29', readMin: 3, photo: photos.basket, category: 'Guia',
    body: [
      { p: 'A focaccia é um pão achatado de origem italiana, assado em assadeira com bastante azeite. A massa é muito hidratada, o que deixa o miolo leve e cheio de bolhas.' },
      { h2: 'Os furinhos' },
      { p: 'Antes de ir ao forno, a massa é pressionada com a ponta dos dedos. Os buracos seguram o azeite e os temperos, e criam a superfície ondulada e dourada.' },
      { h2: 'Coberturas clássicas' },
      { ul: ['Alecrim e flor de sal: a mais tradicional.', 'Tomate-cereja e manjericão.', 'Cebola roxa e azeitonas.', 'Batata em fatias finas com alecrim.'] },
      { h2: 'Como servir' },
      { p: 'Morna, cortada em quadrados, com um fio de azeite. Vai bem como entrada, no lanche ou aberta ao meio como sanduíche.' },
      { cta: { text: 'Focaccia de alecrim e de tomate confit todos os dias na loja.', href: '/cardapio/', label: 'Ver focaccias e salgados' } },
    ],
  },
  {
    slug: 'como-cortar-pao-rustico',
    title: 'Como cortar pão rústico sem esmagar o miolo',
    description: 'A faca certa, o momento certo e o jeito certo de fatiar pão de casca grossa para ter fatias bonitas e sem farelo para todo lado.',
    date: '2026-09-22', readMin: 2, photo: photos.baguette, category: 'Dicas',
    body: [
      { p: 'Pão de casca crocante pede um pouco de técnica na hora de cortar. Com a faca e o movimento certos, as fatias saem retas e o miolo não amassa.' },
      { h2: 'Use uma faca de serra longa' },
      { p: 'A faca de pão, com serrilha e lâmina comprida, corta a casca sem fazer força para baixo. Facas lisas ou curtas esmagam o miolo.' },
      { h2: 'Espere o pão esfriar' },
      { p: 'Pão recém-saído do forno ainda está terminando de cozinhar por dentro. Espere pelo menos uma hora antes de cortar.' },
      { h2: 'O movimento' },
      { ol: ['Apoie o pão de lado, com a parte mais alta para cima.', 'Faça movimentos longos de vaivém, deixando a serra trabalhar.', 'Não pressione: a faca desce sozinha.'] },
      { tip: 'Corte só o que for comer e guarde o pão com a parte cortada virada para baixo na tábua.' },
    ],
  },
];

// Mais recentes primeiro.
export const posts = [...postList].sort((a, b) => b.date.localeCompare(a.date));
export const categories = [...new Set(posts.map((p) => p.category))];

export const about = {
  title: 'Pão que leva tempo.',
  intro: 'A Crosta nasceu de um forno pequeno em São José do Rio Preto e de uma ideia simples: fazer pão como antigamente, com fermentação natural e sem pressa.',
  paragraphs: [
    'Todos os dias, a massa começa a ser preparada na véspera. O levain é alimentado, a farinha descansa com a água, e a fermentação acontece devagar, durante a noite. De manhã cedo, os pães são modelados, recebem o corte na casca e vão ao forno.',
    'Trabalhamos com poucos ingredientes e com receitas curtas: farinha, água, sal e tempo. Nos folhados, manteiga de verdade. Nada de conservantes ou melhoradores.',
    'Além da loja na Redentora, em São José do Rio Preto, a Crosta tem uma assinatura semanal de pães e aceita encomendas para cafés da manhã, festas e eventos em toda a cidade.',
  ],
  values: [
    { title: 'Farinha', text: 'Selecionada para cada receita, de trigo, integral e centeio.' },
    { title: 'Água', text: 'Massa bem hidratada para um miolo leve e aberto.' },
    { title: 'Sal', text: 'Na medida certa para realçar o sabor do trigo.' },
    { title: 'Tempo', text: 'O ingrediente principal: fermentação lenta, de um dia para o outro.' },
  ],
};
