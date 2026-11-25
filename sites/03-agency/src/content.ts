// Todo o conteúdo do site da agência fica aqui.
// Campos marcados com "CONFIRMAR" são promessas comerciais: revise se mudar o jeito de vender.

export const agency = {
  name: '03 Agency',
  tagline: 'Sites personalizados para negócios',
  whatsapp: '5511932114092',
  city: 'São Paulo',
  year: 2026,
};

export const wa = (text: string) => `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(text)}`;

export const contact = {
  href: wa('Olá! Vim pelo site da 03 Agency e quero uma prévia do site do meu negócio.'),
};

export const hero = {
  kicker: agency.tagline,
  // Trechos com em: true ficam em roxo; dot: true é o ponto roxo do logo.
  title: [
    [{ t: 'Você vê o seu' }],
    [{ t: 'site ' }, { t: 'pronto', em: true }, { t: '.' }],
    [{ t: 'Depois decide' }, { dot: true }],
  ] as ({ t: string; em?: boolean } | { dot: true })[][],
  // CONFIRMAR: a prévia antes de qualquer pagamento é o modelo de venda atual.
  lead: 'A 03 estuda o seu negócio e cria uma prévia do seu site, sob medida e com o seu conteúdo, antes de qualquer pagamento.',
  status: 'Aceitando novos projetos',
};

// Projetos conceito do simulador. Cada site real é criado do zero.
export const skins = [
  {
    id: 'noir', label: 'Noir', segment: 'Estética e beleza',
    kicker: 'Estética avançada', line: 'Beleza com assinatura.', cta: 'Agendar avaliação',
  },
  {
    id: 'linho', label: 'Linho', segment: 'Clínicas e saúde',
    kicker: 'Clínica integrada', line: 'Cuidado que começa na escuta.', cta: 'Agendar consulta',
  },
  {
    id: 'cor', label: 'Cor', segment: 'Cafés, restaurantes e lojas',
    kicker: 'Café · Padaria · Bistrô', line: 'Feito para voltar.', cta: 'Ver cardápio',
  },
] as const;

export type SkinId = (typeof skins)[number]['id'];

export const steps = [
  {
    title: 'Prévia',
    text: 'Estudamos o seu negócio, a sua marca e o seu público, e criamos o seu site de verdade, com o seu nome e o seu conteúdo. Você recebe um link para abrir no celular.',
  },
  {
    title: 'Ajustes',
    text: 'Você conta o que quer mudar: textos, fotos, serviços, contatos. A gente ajusta até o site ficar com a cara do seu negócio.',
  },
  {
    title: 'No ar',
    text: 'Publicamos no seu domínio, com WhatsApp, mapa e redes sociais conectados. O site é seu.',
  },
];

export const included = [
  { title: 'Design sob medida', text: 'Nada de template. Cada site nasce do zero, a partir da sua marca.' },
  { title: 'Movimento e tipografia', text: 'Animações suaves e letras com personalidade, como numa revista.' },
  { title: 'Pensado para o celular', text: 'Rápido, leve e confortável de usar com uma mão só.' },
  { title: 'WhatsApp com mensagem pronta', text: 'O cliente toca no botão e a conversa já começa com o assunto certo.' },
  { title: 'Mapa e redes sociais', text: 'Endereço no Google Maps e o seu Instagram a um toque.' },
  { title: 'Seu domínio', text: 'Publicado em um endereço com o nome do seu negócio, registrado em seu nome.' },
];

export const faq = [
  {
    q: 'Preciso pagar pela prévia?',
    // CONFIRMAR
    a: 'Não. A prévia é feita sem compromisso: você só decide depois de ver o seu site pronto.',
  },
  {
    q: 'Quanto custa um site?',
    a: 'Depende do tamanho do projeto. Chame no WhatsApp e mande o seu Instagram ou o que já tiver: a gente responde com um orçamento.',
  },
  {
    q: 'Do que vocês precisam para começar?',
    a: 'Só do nome e do Instagram do seu negócio. Textos, fotos e serviços a gente organiza com você.',
  },
  {
    q: 'O domínio fica no meu nome?',
    a: 'Sim. O endereço do site (por exemplo, seunegocio.com.br) é registrado em nome do seu negócio.',
  },
  {
    q: 'E se eu quiser mudar algo depois?',
    a: 'Você pode pedir ajustes avulsos ou contratar a manutenção mensal, que cuida das atualizações para você.',
  },
];
