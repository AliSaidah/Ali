// Gera o <head> de cada página na pré-renderização: título, descrição, canonical,
// Open Graph, Twitter e dados estruturados (JSON-LD) para o Google.
import { SITE_URL, site, hours, menu, plans, faqOrders, faqVisit, posts, mapsUrl } from './content';
import type { Route } from './routes';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p}`);

const city = { '@type': 'City', name: site.address.city, containedInPlace: { '@type': 'State', name: 'São Paulo' } };
const areaServed = [city, ...site.areas.map((a) => ({ '@type': 'Place', name: `${a}, ${site.address.city} - SP` }))];

const bakery = {
  '@type': 'Bakery',
  '@id': `${SITE_URL}/#padaria`,
  name: site.fullName,
  description: site.description,
  url: `${SITE_URL}/`,
  image: [abs('/fotos/hero-paes-1600.webp'), abs('/fotos/loja-prateleiras-1600.webp')],
  logo: abs('/icon-512.png'),
  telephone: `+${site.whatsapp}`,
  priceRange: site.priceRange,
  servesCuisine: ['Padaria artesanal', 'Pães de fermentação natural'],
  menu: `${SITE_URL}/cardapio/`,
  acceptsReservations: false,
  slogan: 'Pão que leva tempo.',
  hasMap: mapsUrl,
  areaServed,
  currenciesAccepted: 'BRL',
  paymentAccepted: 'Pix, cartão de crédito, cartão de débito, dinheiro',
  keywords: 'padaria artesanal, pão de fermentação natural, pão italiano, croissant, focaccia, cesta de café da manhã, São José do Rio Preto',
  hasOfferCatalog: {
    '@type': 'OfferCatalog', name: 'Assinatura de pães',
    itemListElement: plans.map((p) => ({ '@type': 'Offer', name: p.name, price: p.price.toFixed(2), priceCurrency: 'BRL', url: `${SITE_URL}/assinaturas-e-encomendas/` })),
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.district}`,
    addressLocality: site.address.city,
    addressRegion: site.address.state,
    addressCountry: 'BR',
    postalCode: site.address.zip,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  openingHoursSpecification: hours.map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
  ...(site.instagram ? { sameAs: [site.instagram] } : {}),
};

const website = { '@type': 'WebSite', '@id': `${SITE_URL}/#site`, name: site.fullName, url: `${SITE_URL}/`, inLanguage: 'pt-BR', publisher: { '@id': bakery['@id'] } };

const faq = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

function crumbs(r: Route) {
  const list = [{ name: 'Início', url: `${SITE_URL}/` }];
  if (r.page === 'post') list.push({ name: 'Blog', url: `${SITE_URL}/blog/` });
  if (r.label) list.push({ name: r.label, url: abs(r.path) });
  return {
    '@type': 'BreadcrumbList',
    itemListElement: list.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  };
}

function pageSchema(r: Route): object[] {
  const out: object[] = [bakery, website];
  if (r.page !== 'home' && r.page !== 'notfound') out.push(crumbs(r));
  if (r.page === 'cardapio') {
    out.push({
      '@type': 'Menu', name: 'Cardápio da Crosta', url: abs(r.path), inLanguage: 'pt-BR',
      hasMenuSection: menu.map((s) => ({
        '@type': 'MenuSection', name: s.title, description: s.intro,
        hasMenuItem: s.items.map((it) => ({
          '@type': 'MenuItem', name: it.name, description: it.desc,
          offers: { '@type': 'Offer', price: it.price.toFixed(2), priceCurrency: 'BRL' },
        })),
      })),
    });
  }
  if (r.page === 'assinaturas') {
    out.push({
      '@type': 'Service', name: 'Assinatura de pães de fermentação natural', provider: { '@id': bakery['@id'] },
      areaServed: areaServed,
      offers: plans.map((p) => ({ '@type': 'Offer', name: p.name, description: p.desc, price: p.price.toFixed(2), priceCurrency: 'BRL' })),
    });
    out.push(faq(faqOrders));
  }
  if (r.page === 'contato') out.push(faq(faqVisit));
  if (r.page === 'blog') {
    out.push({
      '@type': 'Blog', name: 'Blog da Crosta', url: abs(r.path), inLanguage: 'pt-BR',
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}/`, datePublished: p.date })),
    });
  }
  if (r.page === 'post' && r.post) {
    const p = r.post;
    out.push({
      '@type': 'BlogPosting', headline: p.title, description: p.description, inLanguage: 'pt-BR',
      image: abs(`${p.photo.src}-1600.webp`), datePublished: p.date, dateModified: p.date,
      author: { '@type': 'Organization', name: site.fullName, url: `${SITE_URL}/` },
      publisher: { '@id': bakery['@id'] },
      mainEntityOfPage: abs(r.path),
    });
  }
  return out;
}

export function headFor(r: Route, extra = '') {
  const url = abs(r.path);
  const img = abs(r.image ?? '/og-crosta.jpg');
  const isPost = r.page === 'post';
  const tags = [
    `<title>${esc(r.title)}</title>`,
    `<meta name="description" content="${esc(r.description)}" />`,
    r.page === 'notfound' ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    r.page === 'notfound' ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${isPost ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(site.fullName)}" />`,
    `<meta property="og:locale" content="pt_BR" />`,
    `<meta property="og:title" content="${esc(r.title)}" />`,
    `<meta property="og:description" content="${esc(r.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:alt" content="${esc(r.title)}" />`,
    `<link rel="alternate" hreflang="pt-BR" href="${url}" />`,
    `<meta name="geo.region" content="BR-SP" />`,
    `<meta name="geo.placename" content="${site.address.city}" />`,
    `<meta name="geo.position" content="${site.address.geo.lat};${site.address.geo.lng}" />`,
    `<meta name="ICBM" content="${site.address.geo.lat}, ${site.address.geo.lng}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    isPost && r.post ? `<meta property="article:published_time" content="${r.post.date}" />` : '',
    site.googleVerification ? `<meta name="google-site-verification" content="${esc(site.googleVerification)}" />` : '',
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': pageSchema(r) }).replace(/</g, '\\u003c')}</script>`,
    extra,
  ];
  return tags.filter(Boolean).join('\n    ');
}
