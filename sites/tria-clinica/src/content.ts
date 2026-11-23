// Todo o conteúdo do site fica aqui. Textos tirados do Instagram @clinicaintegradatria.
// Campos marcados com "CONFIRMAR" são redação nossa ou dados ainda não informados pela clínica.

export const site = {
  name: 'Tria',
  fullName: 'Clínica Tria',
  kind: 'Clínica Integrada',
  areas: 'Beleza e Saúde Mental',
  // Inscrição da parede da recepção.
  motto: 'Mente · Face · Corpo',
  tagline: 'Um novo conceito que integra beleza e mente.',
  city: 'São José do Rio Preto',
  state: 'SP',

  // Legendas e artes do Instagram da clínica.
  concept:
    'A Clínica Tria é sobre compreender o indivíduo em sua totalidade, respeitando suas particularidades, necessidades e momentos.',
  space:
    'Um espaço criado para unir diferentes caminhos de cuidado em uma experiência mais completa, individualizada e conectada.',
  visit: 'Venha conhecer a clínica e conversar com a nossa equipe.',
  caption: 'Um novo olhar sobre o cuidado.',

  // As três frentes da inscrição da recepção: Mente · Face · Corpo.
  // CONFIRMAR: textos curtos e listas padrão de serviços; ajustar com a clínica.
  fronts: [
    {
      key: 'mente', title: 'Mente', area: 'Saúde mental',
      text: 'Um espaço de escuta e acolhimento para as suas emoções, a sua história e o seu momento.',
      services: ['Psicoterapia individual', 'Terapia de casal', 'Atendimento a adolescentes', 'Ansiedade e estresse', 'Autoestima e imagem corporal', 'Avaliação psicológica', 'Atendimento on-line'],
    },
    {
      key: 'face', title: 'Face', area: 'Estética facial',
      text: 'Estética facial com técnica, planejamento e naturalidade, valorizando o que já é seu.',
      services: ['Harmonização facial', 'Toxina botulínica', 'Preenchimento com ácido hialurônico', 'Bioestimuladores de colágeno', 'Skinbooster', 'Limpeza de pele', 'Peelings'],
    },
    {
      key: 'corpo', title: 'Corpo', area: 'Estética corporal',
      text: 'Cuidados corporais para o bem-estar, a autoestima e a saúde da pele.',
      services: ['Drenagem linfática', 'Massagem modeladora', 'Massagem relaxante', 'Gordura localizada', 'Celulite', 'Flacidez corporal', 'Estrias'],
    },
  ],
  integration: 'Diferentes caminhos de cuidado em uma experiência mais completa, individualizada e conectada.',

  instagram: { handle: '@clinicaintegradatria', url: 'https://www.instagram.com/clinicaintegradatria' },
  // CONFIRMAR: WhatsApp da clínica com DDI e DDD (ex.: 5517999999999). Vazio = botões levam ao Direct do Instagram.
  whatsapp: '',

  // Fotos do Instagram da clínica (recortadas de print; originais ficam melhores).
  photo: '/tria-recepcao-logo.jpg',
  gallery: [
    { src: '/tria-arvore.jpg', alt: 'Canto de espera com árvore, arandelas redondas e poltrona caramelo' },
    { src: '/tria-logo-parede.jpg', alt: 'Logo TRIA em dourado na parede, com a inscrição Mente, Face, Corpo, sob lustre de globos' },
    { src: '/tria-sala.jpg', alt: 'Sala de espera com poltronas caramelo, almofadas e árvore' },
  ],
};

// Modo prévia de proposta: mostra um selo com o contato da agência.
// Quando o cliente comprar, mude enabled para false e tire a meta "robots" do index.html.
export const preview = {
  enabled: true,
  agency: '', // nome da sua agência (opcional)
  whatsapp: '5511932114092', // WhatsApp da agência (DDI + DDD + número)
};

const contactText = 'Olá! Vi o site da Clínica Tria e gostaria de saber mais.';

export const contactAbout = (service: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service} na Clínica Tria.`)}`
    : contact.href;

export const contact = site.whatsapp
  ? { href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(contactText)}`, label: 'WhatsApp', kind: 'whatsapp' as const }
  : { href: `https://ig.me/m/${site.instagram.handle.slice(1)}`, label: 'Direct', kind: 'instagram' as const };
