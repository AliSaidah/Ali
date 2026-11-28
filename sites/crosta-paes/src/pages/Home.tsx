import { useRef } from 'react';
import { site, photos, menu, posts, about, plans, brl, fullAddress, hours, closedLabel, mapsUrl } from '../content';

import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import { Img, Link, Arrow, Oven } from '../components/ui';
import { PostCard } from '../components/blocks';

const featured = [
  { ...menu[0].items[0], photo: photos.darkBoule },
  { ...menu[1].items[0], photo: photos.croissant },
  { ...menu[0].items[4], photo: photos.baguette },
  { ...menu[2].items[0], photo: photos.rye },
];

/* Topo: a foto se abre como o corte na casca do pão (a "pestana"). */
function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    tl.fromTo('.hero-cut', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut' }, 0.15)
      .fromTo('.hero-photo', { clipPath: 'polygon(62% 0%, 64% 0%, 40% 100%, 38% 100%)' }, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 1.5, ease: 'expo.inOut', onComplete: () => { gsap.set('.hero-photo', { clipPath: 'none' }); } }, 0.75)
      .to('.hero-cut', { autoAlpha: 0, duration: 0.4 }, 1.2)
      .fromTo('.hero-photo img', { scale: 1.15 }, { scale: 1, duration: 2.2, clearProps: 'transform' }, 0.75)
      .fromTo('.hero-title .w', { y: 0, yPercent: 110 }, { y: 0, yPercent: 0, duration: 1.2, stagger: 0.08 }, 0.3)
      .fromTo('.hero [data-in]', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.9);
  }, { scope: ref });

  return (
    <section ref={ref} className="hero">
      <div className="hero-text">
        <div data-in><Oven /></div>
        <h1 className="hero-title">
          <span className="hero-kicker" data-in>Padaria artesanal em São José do Rio Preto</span>
          {['Pão', 'que', 'leva'].map((w) => <span key={w}><span className="m"><span className="w">{w}</span></span>{' '}</span>)}
          <span className="m"><span className="w hero-em">tempo.</span></span>
        </h1>
        <p className="hero-lead">{site.description}</p>
        <div className="hero-actions" data-in>
          <Link href="/cardapio/" className="btn btn--flour">Ver o cardápio <Arrow /></Link>
          <Link href="/assinaturas-e-encomendas/" className="link-under">Assinatura de pães</Link>
        </div>
      </div>
      <div className="hero-media">
        <div className="hero-photo"><Img photo={photos.hero} eager sizes="(max-width: 860px) 100vw, 50vw" /></div>
        <svg className="hero-cut" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M63 0 L39 100" pathLength="1" />
        </svg>
        <p className="hero-stamp" data-in>Fermentação natural<br />desde a véspera</p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <section className="manifest">
        <div className="wrap">
          <div className="local-intro">
            <h2 className="h2" data-split>Pão de fermentação natural em Rio Preto.</h2>
            <p className="lead" data-reveal>A Crosta é uma padaria artesanal no bairro Redentora, em São José do Rio Preto. Fazemos pão italiano de fermentação natural, croissant, focaccia e pão de forma todos os dias, com assinatura semanal e entrega de cestas de café da manhã pela cidade.</p>
          </div>
          <p className="eyebrow" data-reveal>A receita inteira</p>
          <ul className="manifest-list">
            {about.values.map((v, i) => (
              <li key={v.title} data-reveal>
                <span className="manifest-word">{v.title}{i < 3 ? ',' : '.'}</span>
                <span className="manifest-text">{v.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="oven-picks">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2" data-split>Saindo do forno</h2>
            <Link href="/cardapio/" className="link-under" data-reveal>Cardápio completo <Arrow /></Link>
          </div>
          <ul className="picks">
            {featured.map((f) => (
              <li key={f.name} className="pick" data-reveal>
                <div className="pick-img" data-photo><Img photo={f.photo} sizes="(max-width: 600px) 100vw, (max-width: 1080px) 50vw, 25vw" /></div>
                {f.tag && <span className="tag">{f.tag}</span>}
                <h3 className="pick-name">{f.name}</h3>
                <p className="pick-desc">{f.desc}</p>
                <p className="pick-price">{brl(f.price)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="sub-band">
        <div className="wrap sub-grid">
          <div className="sub-text">
            <p className="eyebrow" data-reveal>Assinatura</p>
            <h2 className="h2" data-split>Pão fresco toda semana, sem fila.</h2>
            <p className="lead" data-reveal>Escolha o plano e o dia. O pão sai da fornada da manhã direto para você, na loja ou em casa.</p>
            <p className="sub-price" data-reveal>A partir de <strong>{brl(Math.min(...plans.map((p) => p.price)))}</strong> por mês</p>
            <div data-reveal><Link href="/assinaturas-e-encomendas/" className="btn btn--flour">Conhecer os planos <Arrow /></Link></div>
          </div>
          <div className="sub-img" data-photo><Img photo={photos.basket} sizes="(max-width: 860px) 100vw, 50vw" /></div>
        </div>
      </section>

      <section className="home-blog">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="h2" data-split>Do nosso caderno</h2>
            <Link href="/blog/" className="link-under" data-reveal>Todos os artigos <Arrow /></Link>
          </div>
          <div className="post-grid">
            {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
          </div>
        </div>
      </section>

      <section className="visit">
        <div className="wrap visit-grid">
          <div className="visit-img" data-photo><Img photo={photos.shelves} sizes="(max-width: 860px) 100vw, 55vw" /></div>
          <div className="visit-text">
            <p className="eyebrow" data-reveal>Visite</p>
            <h2 className="h2" data-split>A loja fica na Redentora.</h2>
            <p className="lead" data-reveal><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{fullAddress}</a></p>
            <ul className="hours" data-reveal>
              {hours.map((h) => <li key={h.label}><span>{h.label}</span><span>{h.opens.slice(0, 2)}h às {h.closes.slice(0, 2)}h</span></li>)}
              <li><span>{closedLabel}</span></li>
            </ul>
            <div className="areas" data-reveal>
              <h3>Entregamos em Rio Preto</h3>
              <ul>{site.areas.map((a) => <li key={a}>{a}</li>)}</ul>
            </div>
            <div className="visit-actions" data-reveal>
              <a className="btn btn--crust" href={mapsUrl} target="_blank" rel="noopener noreferrer">Como chegar <Arrow /></a>
              <Link href="/contato/" className="link-under">Contato</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
