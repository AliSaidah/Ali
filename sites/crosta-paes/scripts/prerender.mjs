// Pré-renderiza cada página em HTML próprio (bom para o Google) e gera sitemap.xml e robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render, routes, headFor, SITE_URL, posts } = await import(path.join(root, 'dist-ssr/entry-server.js'));

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Pré-carrega a fonte dos títulos (Young Serif, latim) para o texto grande aparecer rápido.
const assets = fs.readdirSync(path.join(dist, 'assets'));
const serif = assets.find((f) => /^young-serif-latin-400-normal.*\.woff2$/.test(f));
const preloadFont = serif ? `<link rel="preload" href="/assets/${serif}" as="font" type="font/woff2" crossorigin />` : '';

for (const r of routes) {
  const extra = [preloadFont];
  if (r.page === 'home') extra.push('<link rel="preload" as="image" href="/fotos/hero-paes-1600.webp" imagesrcset="/fotos/hero-paes-800.webp 800w, /fotos/hero-paes-1600.webp 1600w" imagesizes="(max-width: 860px) 100vw, 50vw" fetchpriority="high" />');
  const html = template
    .replace('<!--head-->', headFor(r, extra.join('\n    ')))
    .replace('<div id="root"></div>', `<div id="root">${render(r.path)}</div>`);
  const file = r.page === 'notfound' ? path.join(dist, '404.html') : path.join(dist, r.path, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log('página', r.path);
}

// sitemap.xml (com as fotos de cada página, para a busca de imagens do Google)
const today = new Date().toISOString().slice(0, 10);
const lastmod = (r) => (r.post ? r.post.date : r.page === 'blog' ? posts[0].date : today);
const imagesOf = (r) => {
  const file = r.page === 'home' ? path.join(dist, 'index.html') : path.join(dist, r.path, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const found = [...html.matchAll(/<img[^>]+src="(\/fotos\/[^"]+)"/g)].map((m) => m[1]);
  return [...new Set(found)].slice(0, 10);
};
const urls = routes.filter((r) => r.sitemap).map((r) => {
  const imgs = imagesOf(r).map((src) => `\n    <image:image><image:loc>${SITE_URL}${src}</image:loc></image:image>`).join('');
  return `  <url>\n    <loc>${SITE_URL}${r.path}</loc>\n    <lastmod>${lastmod(r)}</lastmod>\n    <changefreq>${r.sitemap.changefreq}</changefreq>\n    <priority>${r.sitemap.priority.toFixed(1)}</priority>${imgs}\n  </url>`;
});
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`);

// robots.txt
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /404/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
fs.rmSync(path.join(dist, '404'), { recursive: true, force: true });
console.log('sitemap.xml e robots.txt prontos:', urls.length, 'endereços');

// Relatório de SEO: confere o básico em cada página gerada.
const problems = [];
const seenTitles = new Map(), seenDesc = new Map();
for (const r of routes.filter((x) => x.sitemap)) {
  const file = r.page === 'home' ? path.join(dist, 'index.html') : path.join(dist, r.path, 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  const noAlt = (html.match(/<img(?![^>]*\salt="[^"]+")[^>]*>/g) || []).length;
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  ld.forEach((m) => { try { JSON.parse(m[1]); } catch { problems.push(`${r.path}: JSON-LD inválido`); } });
  if (title.length > 62) problems.push(`${r.path}: título com ${title.length} caracteres`);
  if (desc.length < 70 || desc.length > 160) problems.push(`${r.path}: descrição com ${desc.length} caracteres`);
  if (h1 !== 1) problems.push(`${r.path}: ${h1} títulos h1`);
  if (noAlt) problems.push(`${r.path}: ${noAlt} imagem(ns) sem texto alternativo`);
  if (!html.includes('rel="canonical"')) problems.push(`${r.path}: sem canonical`);
  if (seenTitles.has(title)) problems.push(`${r.path}: título repetido de ${seenTitles.get(title)}`); else seenTitles.set(title, r.path);
  if (seenDesc.has(desc)) problems.push(`${r.path}: descrição repetida de ${seenDesc.get(desc)}`); else seenDesc.set(desc, r.path);
}
console.log(problems.length ? `SEO: ${problems.length} aviso(s)\n- ${problems.join('\n- ')}` : 'SEO: todas as páginas passaram na conferência (título, descrição, h1, alt, canonical, JSON-LD).');
