import { posts, site, type Post } from './content';

export type PageKey = 'home' | 'cardapio' | 'assinaturas' | 'blog' | 'post' | 'sobre' | 'contato' | 'notfound';

export type Route = {
  path: string;          // sempre com barra no fim (ex.: /cardapio/)
  page: PageKey;
  title: string;         // <title> (até ~60 caracteres)
  description: string;   // meta description (até ~155 caracteres)
  label?: string;        // nome no menu e na trilha de navegação
  image?: string;        // imagem de compartilhamento (Open Graph)
  post?: Post;
  sitemap?: { priority: number; changefreq: string };
};

export const nav: { path: string; label: string }[] = [
  { path: '/cardapio/', label: 'Cardápio' },
  { path: '/assinaturas-e-encomendas/', label: 'Assinaturas e encomendas' },
  { path: '/blog/', label: 'Blog' },
  { path: '/sobre/', label: 'Sobre' },
  { path: '/contato/', label: 'Contato' },
];

export const routes: Route[] = [
  {
    path: '/', page: 'home',
    title: 'Padaria Artesanal em São José do Rio Preto | Crosta Pães',
    description: 'Pão de fermentação natural, croissant e focaccia em São José do Rio Preto. Assinatura semanal de pães, cestas de café da manhã e encomendas com entrega.',
    sitemap: { priority: 1, changefreq: 'weekly' },
  },
  {
    path: '/cardapio/', page: 'cardapio', label: 'Cardápio',
    title: 'Cardápio e Preços · Pães Artesanais em Rio Preto | Crosta',
    description: 'Cardápio da Crosta em Rio Preto: pão de fermentação natural, croissant, pain au chocolat, focaccia, pão de forma e cafés, com preços atualizados.',
    image: '/fotos/fermentacao-natural-1600.webp',
    sitemap: { priority: 0.9, changefreq: 'weekly' },
  },
  {
    path: '/assinaturas-e-encomendas/', page: 'assinaturas', label: 'Assinaturas e encomendas',
    title: 'Assinatura de Pães e Cesta de Café da Manhã em Rio Preto',
    description: 'Pão de fermentação natural toda semana em casa, em São José do Rio Preto. Encomende cestas de café da manhã, coffee breaks e mesas para festas.',
    image: '/fotos/cesta-1600.webp',
    sitemap: { priority: 0.9, changefreq: 'monthly' },
  },
  {
    path: '/blog/', page: 'blog', label: 'Blog',
    title: 'Blog sobre Pão Artesanal e Fermentação Natural | Crosta',
    description: 'Dicas de padaria artesanal de Rio Preto: fermentação natural, levain em casa, como conservar o pão, cestas de café da manhã e mais.',
    image: '/fotos/centeio-1600.webp',
    sitemap: { priority: 0.7, changefreq: 'weekly' },
  },
  ...posts.map<Route>((p) => ({
    path: `/blog/${p.slug}/`, page: 'post', label: p.title, post: p,
    title: p.seoTitle ?? `${p.title} | Crosta`,
    description: p.description,
    image: `${p.photo.src}-1600.webp`,
    sitemap: { priority: 0.6, changefreq: 'yearly' },
  })),
  {
    path: '/sobre/', page: 'sobre', label: 'Sobre',
    title: 'Sobre a Crosta · Padaria de Fermentação Natural em Rio Preto',
    description: 'Conheça a Crosta, padaria artesanal na Redentora, em São José do Rio Preto: pão feito com farinha, água, sal e tempo, sem conservantes.',
    image: '/fotos/loja-prateleiras-1600.webp',
    sitemap: { priority: 0.6, changefreq: 'yearly' },
  },
  {
    path: '/contato/', page: 'contato', label: 'Contato',
    title: 'Endereço, Horários e WhatsApp | Crosta Pães · Rio Preto',
    description: 'Crosta Pães Artesanais: Rua das Fornadas, 48, Redentora, São José do Rio Preto (SP). Horários, como chegar, WhatsApp e encomendas.',
    image: '/fotos/vitrine-1600.webp',
    sitemap: { priority: 0.8, changefreq: 'monthly' },
  },
  {
    path: '/404/', page: 'notfound',
    title: 'Página não encontrada | Crosta Pães Artesanais',
    description: 'Esta página não existe. Veja o cardápio, a assinatura de pães ou fale com a Crosta.',
  },
];

export const normalize = (p: string) => (p.endsWith('/') ? p : `${p}/`);
export const findRoute = (path: string) => routes.find((r) => r.path === normalize(path)) ?? routes.find((r) => r.page === 'notfound')!;
