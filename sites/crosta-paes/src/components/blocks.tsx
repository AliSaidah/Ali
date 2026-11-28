import type { Post } from '../content';
import { Img, Link, Arrow } from './ui';

export const fmtDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function PostCard({ post, big = false }: { post: Post; big?: boolean }) {
  return (
    <article className={`pcard${big ? ' pcard--big' : ''}`} data-reveal>
      <Link href={`/blog/${post.slug}/`} className="pcard-link">
        <div className="pcard-img" data-photo><Img photo={post.photo} sizes={big ? '(max-width: 860px) 100vw, 60vw' : '(max-width: 860px) 100vw, 33vw'} /></div>
        <p className="pcard-meta"><span>{post.category}</span><span>{post.readMin} min de leitura</span></p>
        <h3 className="pcard-title">{post.title}</h3>
        {big && <p className="pcard-desc">{post.description}</p>}
        <span className="pcard-more">Ler artigo <Arrow /></span>
      </Link>
    </article>
  );
}

export function Faq({ items, title = 'Perguntas frequentes' }: { items: { q: string; a: string }[]; title?: string }) {
  return (
    <section className="faq" aria-labelledby="faq-t">
      <div className="wrap faq-grid">
        <h2 id="faq-t" className="h2" data-split>{title}</h2>
        <div className="faq-list" data-reveal>
          {items.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary><span>{f.q}</span><i aria-hidden="true" /></summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PageHead({ kicker, title, intro, children }: { kicker?: string; title: React.ReactNode; intro?: string; children?: React.ReactNode }) {
  return (
    <header className="phead">
      <div className="wrap">
        {/* O título h1 leva a frase de busca (ex.: "Cardápio · Padaria em Rio Preto") como linha pequena. */}
        <h1 className="h1">
          {kicker && <span className="eyebrow h1-kicker" data-reveal>{kicker}</span>}
          <span className="h1-title" data-split>{title}</span>
        </h1>
        {intro && <p className="lead">{intro}</p>}
        {children}
      </div>
    </header>
  );
}
