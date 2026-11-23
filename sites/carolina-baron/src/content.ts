// Todo o conteúdo do site fica aqui. Para um novo cliente, troque este arquivo
// e os tokens de cor em styles.css.

export type Category = 'Contorno' | 'Rejuvenescimento' | 'Preenchimentos' | 'Cuidado';

export interface Procedure {
  name: string;
  detail?: string;
  category: Category;
  blurb: string;
}

export const site = {
  title: 'Dra.',
  name: 'Carolina Baron',
  role: 'Estética Avançada & Harmonização Facial',
  tagline: 'Harmonização com elegância, sem excessos.',
  motto: 'O maior investimento é aquele que você faz em você.',
  // Texto tirado das legendas do Instagram da Dra. Carolina.
  manifesto:
    'Estética é técnica, precisão e respeito à individualidade. Meu trabalho é valorizar o que já existe de bonito em cada paciente, com planejamento, conhecimento e naturalidade. Não é sobre mudar rostos. É sobre conduzir o seu olhar com mais gentileza, consciência e verdade.',

  whatsapp: '5517991410721',
  phoneDisplay: '(17) 99141-0721',
  instagram: { handle: '@baroncarolina', url: 'https://www.instagram.com/baroncarolina' },
  facebook: { label: 'Dra. Carolina Baron', url: 'https://www.facebook.com/profile.php?id=100078625039121' },

  address: {
    place: 'Shopping Iguatemi',
    street: 'Av. Pres. Juscelino K. de Oliveira, 5000',
    city: 'São José do Rio Preto',
    state: 'SP',
    cep: '15093-540',
    maps: 'https://maps.app.goo.gl/cBxcXmMHPvu7Ru4E6',
    waze: 'https://waze.com/ul/h6ukc79615',
  },

  // Coloque a foto em /public (ex.: /carolina.jpg) e informe o caminho aqui.
  portrait: '/carolina-retrato.jpg' as string | null,
  ctaPhoto: '/carolina-vermelho.jpg' as string | null,

  method: [
    { title: 'Análise facial', text: 'Estudo das proporções, da estrutura óssea, da pele e da sua expressão em movimento. Tudo começa ouvindo o que incomoda você.' },
    { title: 'Planejamento', text: 'Um plano por etapas, com os procedimentos certos para os seus objetivos e o seu tempo. Nada é feito por impulso.' },
    { title: 'Procedimento', text: 'Técnicas de estética avançada aplicadas com precisão, em doses pensadas para preservar a naturalidade.' },
    { title: 'Acompanhamento', text: 'Gerenciamento do envelhecimento ao longo dos anos, com retornos programados para manter o resultado.' },
  ],

  procedures: [
    { name: 'Harmonização Facial', category: 'Contorno', blurb: 'Equilíbrio entre as áreas do rosto a partir de um planejamento completo.' },
    { name: 'Preenchimento de Mandíbula', category: 'Contorno', blurb: 'Define o contorno inferior do rosto e dá mais estrutura ao perfil.' },
    { name: 'Preenchimento de Malar', detail: 'top model look', category: 'Contorno', blurb: 'Projeta as maçãs do rosto e devolve sustentação ao terço médio.' },
    { name: 'Preenchimento de Mento', category: 'Contorno', blurb: 'Ajusta a projeção do queixo para um perfil mais harmônico.' },
    { name: 'Rinomodelação', category: 'Contorno', blurb: 'Correção de pequenas irregularidades do nariz sem cirurgia.' },
    { name: 'Perfiloplastia', category: 'Contorno', blurb: 'Combinação de técnicas para equilibrar nariz, lábios e queixo de perfil.' },
    { name: 'Toxina Botulínica', detail: 'botox', category: 'Rejuvenescimento', blurb: 'Suaviza linhas de expressão da testa, da glabela e ao redor dos olhos.' },
    { name: 'Bioestimuladores de Colágeno', category: 'Rejuvenescimento', blurb: 'Estimulam a produção natural de colágeno para mais firmeza e qualidade de pele.' },
    { name: 'Skinbooster', category: 'Rejuvenescimento', blurb: 'Hidratação profunda que melhora o viço e a textura da pele.' },
    { name: 'Fios de PDO', category: 'Rejuvenescimento', blurb: 'Fios absorvíveis que estimulam colágeno e melhoram a firmeza.' },
    { name: 'Fios de Tração', category: 'Rejuvenescimento', blurb: 'Reposicionam tecidos com efeito lifting, sem cortes.' },
    { name: 'Preenchimento Labial', category: 'Preenchimentos', blurb: 'Contorno, hidratação e volume na medida certa para o seu rosto.' },
    { name: 'Preenchimento de Olheiras', category: 'Preenchimentos', blurb: 'Suaviza a depressão abaixo dos olhos e o aspecto de cansaço.' },
    { name: 'Preenchimento de Bigode Chinês', category: 'Preenchimentos', blurb: 'Atenua o sulco nasogeniano preservando a expressão.' },
    { name: 'Preenchimento de Marionete', category: 'Preenchimentos', blurb: 'Suaviza as linhas dos cantos da boca que dão ar de tristeza.' },
    { name: 'Análise Facial', category: 'Cuidado', blurb: 'Avaliação detalhada que orienta todas as indicações.' },
    { name: 'Planejamento Facial', category: 'Cuidado', blurb: 'Roteiro de tratamentos por etapas, feito para você.' },
    { name: 'Gerenciamento do Envelhecimento', category: 'Cuidado', blurb: 'Acompanhamento contínuo para envelhecer bem e com naturalidade.' },
    { name: 'Terapia Capilar', category: 'Cuidado', blurb: 'Tratamentos para fortalecer os fios e a saúde do couro cabeludo.' },
  ] satisfies Procedure[],
};

// Modo prévia de proposta: mostra um selo com o contato da agência.
// Quando o cliente comprar, mude enabled para false e tire a meta "robots" do index.html.
export const preview = {
  enabled: true,
  agency: '', // nome da sua agência (opcional)
  whatsapp: '5511932114092', // WhatsApp da agência (DDI + DDD + número)
};

export const categories: Category[] = ['Contorno', 'Rejuvenescimento', 'Preenchimentos', 'Cuidado'];

export function wa(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const waBooking = wa('Olá Dra. Carolina, gostaria de agendar uma avaliação.');
export const waAbout = (p: string) => wa(`Olá Dra. Carolina, gostaria de informações sobre ${p}.`);
