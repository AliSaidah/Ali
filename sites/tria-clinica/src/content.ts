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

  // CONFIRMAR: lista padrão de serviços. Ajustar com a clínica o que é oferecido de fato.
  services: {
    estetica: [
      'Harmonização facial',
      'Toxina botulínica',
      'Preenchimento com ácido hialurônico',
      'Bioestimuladores de colágeno',
      'Skinbooster',
      'Limpeza de pele',
      'Peelings',
    ],
    mente: [
      'Psicoterapia individual',
      'Terapia de casal',
      'Atendimento a adolescentes',
      'Ansiedade e estresse',
      'Autoestima e imagem corporal',
      'Avaliação psicológica',
      'Atendimento on-line',
    ],
  },

  // CONFIRMAR: textos curtos de apresentação de cada frente.
  pillars: [
    { title: 'Beleza', text: 'Cuidar da aparência com técnica, planejamento e naturalidade, valorizando o que já é seu.' },
    { title: 'Saúde mental', text: 'Um espaço de escuta e acolhimento para as suas emoções, a sua história e o seu momento.' },
    { title: 'Integração', text: 'Diferentes caminhos de cuidado em uma experiência mais completa, individualizada e conectada.' },
  ],

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
  whatsapp: '', // seu WhatsApp com DDI e DDD, ex.: 5517999999999
};

const contactText = 'Olá! Vi o site da Clínica Tria e gostaria de saber mais.';

export const contactAbout = (service: string) =>
  site.whatsapp
    ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${service} na Clínica Tria.`)}`
    : contact.href;

export const contact = site.whatsapp
  ? { href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(contactText)}`, label: 'WhatsApp', kind: 'whatsapp' as const }
  : { href: `https://ig.me/m/${site.instagram.handle.slice(1)}`, label: 'Direct', kind: 'instagram' as const };
