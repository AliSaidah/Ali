import { useEffect, useRef, useState } from 'react';
import { posts, categories, type Post } from '../content';
import { Img, Link, Arrow } from '../components/ui';
import { PageHead, PostCard, fmtDate } from '../components/blocks';
import { gsap, ScrollTrigger, reducedMotion } from '../lib/motion';

export function BlogIndex() {
  const [cat, setCat] = useState<string | null>(null);
  const list = cat ? posts.filter((p) => p.category === cat) : posts;
  const [first, ...rest] = list;

  useEffect(() => { ScrollTrigger.refresh(); }, [cat]);

  return (
    <>
      <PageHead kicker="Blog da Crosta · Pão artesanal" title={<>Caderno da <em>Crosta.</em></>} intro="Fermentação natural, dicas para conservar o pão, guias e ideias para receber. Escrito por quem passa a noite com a massa." />
      <section className="blog">
        <div className="wrap">
          <div className="chips" role="group" aria-label="Filtrar por assunto" data-reveal>
            <button type="button" aria-pressed={cat === null} onClick={() => setCat(null)}>Todos</button>
            {categories.map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          {first && <PostCard key={`big-${first.slug}`} post={first} big />}
          <div className="post-grid">
            {rest.map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>
    </>
  );
}

export function PostPage({ post }: { post: Post }) {
  const bar = useRef<HTMLDivElement>(null);
  const related = [...posts.filter((p) => p.slug !== post.slug && p.category === post.category), ...posts.filter((p) => p.slug !== post.slug && p.category !== post.category)].slice(0, 3);

  // Barra de progresso de leitura.
  useEffect(() => {
    if (reducedMotion) return;
    const st = ScrollTrigger.create({
      trigger: '.article-body', start: 'top 70%', end: 'bottom 70%',
      onUpdate: (s) => gsap.set(bar.current, { scaleX: s.progress }),
    });
    return () => st.kill();
  }, []);

  return (
    <>
      <div ref={bar} className="read-bar" aria-hidden="true" />
      <article className="article">
        <header className="article-head wrap">
          <p className="pcard-meta" data-reveal><span>{post.category}</span><time dateTime={post.date}>{fmtDate(post.date)}</time><span>{post.readMin} min de leitura</span></p>
          <h1 className="h1 article-title" data-split>{post.title}</h1>
          <p className="lead" data-reveal>{post.description}</p>
        </header>
        <div className="article-photo wrap" data-photo><Img photo={post.photo} eager sizes="(max-width: 1100px) 100vw, 1100px" /></div>
        <div className="article-body wrap">
          {post.body.map((b, i) => {
            if (b.h2) return <h2 key={i}>{b.h2}</h2>;
            if (b.p) return <p key={i}>{b.p}</p>;
            if (b.ul) return <ul key={i}>{b.ul.map((x) => <li key={x}>{x}</li>)}</ul>;
            if (b.ol) return <ol key={i}>{b.ol.map((x) => <li key={x}>{x}</li>)}</ol>;
            if (b.tip) return <aside key={i} className="tip"><strong>Dica</strong>{b.tip.replace(/^Dica de padeiro: /, '')}</aside>;
            if (b.cta) return (
              <aside key={i} className="cta-box">
                <p>{b.cta.text}</p>
                <Link href={b.cta.href} className="btn btn--crust">{b.cta.label} <Arrow /></Link>
              </aside>
            );
            return null;
          })}
          <p className="article-sign">Equipe Crosta · <Link href="/blog/">Voltar ao blog</Link></p>
        </div>
      </article>
      <section className="home-blog related">
        <div className="wrap">
          <h2 className="h2" data-split>Continue lendo</h2>
          <div className="post-grid">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </div>
      </section>
    </>
  );
}

