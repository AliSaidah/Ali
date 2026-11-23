import { useRef } from 'react';
import { gsap, useGSAP, SplitText, reducedMotion, scrollToTarget } from '../lib/motion';
import { site, contact, contactAbout } from '../content';
import { Logo } from './Logo';
import { TRIAD } from '../lib/circles';

/* Vocabulário de movimento deste site: textos que "ganham foco" (blur → nítido),
   marca-texto na rolagem, círculos que se fundem, cartões que se empilham. */
function focusIn(targets: gsap.TweenTarget, vars: gsap.TweenVars = {}) {
  return gsap.from(targets, {
    autoAlpha: 0, filter: 'blur(14px)', y: 8, duration: 1.1, ease: 'power2.out',
    stagger: { each: 0.022, from: 'random' }, clearProps: 'filter,transform,opacity,visibility', ...vars,
  });
}

/* ---------- Hero ---------- */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready || reducedMotion) return;
    const split = SplitText.create('.hero-title', { type: 'words,chars' });
    const tl = gsap.timeline();
    tl.add(focusIn(split.chars, { duration: 1.3 }), 0.1)
      .from('.hero-ring', { scale: 0.6, autoAlpha: 0, rotate: -40, duration: 1.8, ease: 'expo.out' }, 0.6)
      .from('.hero-meta > *', { autoAlpha: 0, y: 10, duration: 0.8, ease: 'power2.out', stagger: 0.07 }, 0.4)
      .fromTo('.hero-photo', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(50% at 50% 50%)', duration: 1.6, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.3)
      .from('.hero-actions > *', { autoAlpha: 0, y: 14, duration: 0.9, ease: 'power2.out', stagger: 0.08 }, 1.0);

    const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('.hero-photo img', { scale: 1.3, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-photo-wrap', { yPercent: -18, ease: 'none', scrollTrigger: st });
    gsap.to('.hero-title', { yPercent: -10, ease: 'none', scrollTrigger: st });
    return () => split.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className="hero" id="inicio">
      <div className="container hero-grid">
        <ul className="hero-meta caps">
          <li><span className="idx">01</span>{site.kind}</li>
          <li>{site.motto}</li>
          <li>{site.city} — {site.state}</li>
          <li><span className="dot" /> Agendamentos abertos</li>
        </ul>
        <h1 className="hero-title">
          Um novo conceito que integra <span className="c-copper">beleza</span> e <span className="c-taupe">mente.</span>
        </h1>
        <div className="hero-photo-wrap">
          <span className="hero-ring" aria-hidden="true" />
          <figure className="hero-photo">
            <img src={site.photo} alt="Recepção da Clínica Tria com o logo na parede, lustre de globos e balcão de mármore" />
          </figure>
        </div>
        <div className="hero-actions">
          <a className="btn" href={contact.href} target="_blank" rel="noopener noreferrer">Agende sua visita ↗</a>
          <a className="link-caps" href="#conceito" onClick={(e) => { e.preventDefault(); scrollToTarget('#conceito'); }}>Conheça o conceito ↓</a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Conceito: marca-texto que acompanha a leitura ---------- */
export function Concept() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.utils.toArray<HTMLElement>('.hl').forEach((el) => {
      gsap.fromTo(el, { backgroundSize: '0% 38%' }, {
        backgroundSize: '100% 38%', ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 45%', scrub: true },
      });
    });
    gsap.from('.concept-text', { autoAlpha: 0, filter: 'blur(10px)', duration: 1.4, ease: 'power2.out', clearProps: 'filter', scrollTrigger: { trigger: '.concept-text', start: 'top 85%' } });
  }, { scope: ref });

  return (
    <section ref={ref} className="concept section" id="conceito">
      <div className="container concept-grid">
        <p className="sec-label caps"><span className="idx">02</span>O conceito</p>
        <p className="concept-text">
          A {site.fullName} é sobre compreender o indivíduo <mark className="hl hl--copper">em sua totalidade</mark>, respeitando suas{' '}
          <mark className="hl hl--taupe">particularidades, necessidades e momentos.</mark>
        </p>
        <p className="concept-caption caps">“{site.caption}” — {site.instagram.handle}</p>
      </div>
    </section>
  );
}

/* ---------- Integração: mente, face e corpo, três círculos que viram um ---------- */
export function Venn() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Posição de repouso (também para quem prefere menos movimento): o diagrama de três círculos.
    TRIAD.forEach((c) => gsap.set(`.vc--${c.key}`, { xPercent: c.x, yPercent: c.y }));
    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 900px)', motion: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      const { wide, motion } = ctx.conditions as { wide: boolean; motion: boolean };
      if (!motion) return;
      const far = wide ? 2.6 : 1.7;
      // Toca sozinha, rápida, quando a seção entra na tela (sem travar a rolagem).
      const tl = gsap.timeline({ scrollTrigger: { trigger: '.venn-field', start: 'top 70%', toggleActions: 'play none none none' } });
      TRIAD.forEach((c) => {
        tl.fromTo(`.vc--${c.key}`, { xPercent: c.x * far, yPercent: c.y * far }, { xPercent: c.x, yPercent: c.y, duration: 0.9, ease: 'power3.out' }, 0);
      });
      tl.fromTo('.venn-core', { autoAlpha: 0, scale: 0.4 }, { autoAlpha: 1, scale: 0.5, duration: 0.4, ease: 'power2.out' }, 0.6)
        .to('.vc-label', { autoAlpha: 0, duration: 0.3 }, 1.0)
        .to('.vc', { xPercent: 0, yPercent: 0, duration: 0.8, ease: 'power3.inOut' }, 1.05)
        .to('.venn-core', { scale: 1, duration: 0.8, ease: 'power3.inOut' }, 1.05)
        .fromTo('.venn-text', { autoAlpha: 0, filter: 'blur(10px)', y: 20 }, { autoAlpha: 1, filter: 'blur(0px)', y: 0, duration: 0.7, ease: 'power2.out', clearProps: 'filter' }, 1.65);
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="venn" id="integracao">
      <div className="venn-stage container">
        <p className="sec-label caps"><span className="idx">03</span>Integração</p>
        <div className="venn-field">
          {site.fronts.map((f) => (
            <div key={f.key} className={`vc vc--${f.key}`}>
              <span className="vc-label"><b>{f.title}</b><small className="caps">{f.area}</small></span>
            </div>
          ))}
          <div className="venn-core">
            <Logo solid="#F6EFE6" title="Tria" />
            <span className="caps">{site.motto}</span>
          </div>
        </div>
        <p className="venn-text">{site.integration}</p>
      </div>
    </section>
  );
}

/* ---------- Caminhos de cuidado: cartões que se empilham ---------- */
export function Pillars() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    focusIn(SplitText.create('.pillars-title', { type: 'words,chars' }).chars, { scrollTrigger: { trigger: '.pillars-title', start: 'top 85%' } });
    const cards = gsap.utils.toArray<HTMLElement>('.card');
    cards.forEach((card, i) => {
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.92, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
      });
      gsap.to(card.querySelector('.card-dim'), {
        opacity: 0.18, ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top 20%', scrub: true },
      });
    });
  }, { scope: ref });

  const tone = ['cement', 'cognac', 'oak', 'espresso'];
  const cards = [
    ...site.fronts.map((f) => ({ title: f.title, text: f.text, tag: f.area })),
    { title: 'Integração', text: site.integration, tag: 'O que nos une' },
  ];
  return (
    <section ref={ref} className="pillars section" id="cuidado">
      <div className="container">
        <div className="pillars-head">
          <p className="sec-label caps"><span className="idx">04</span>Caminhos de cuidado</p>
          <h2 className="pillars-title">O indivíduo em sua totalidade.</h2>
        </div>
        <div className="cards">
          {cards.map((p, i) => (
            <article className={`card card--${tone[i]}`} key={p.title} style={{ '--i': i } as React.CSSProperties}>
              <span className="card-dim" aria-hidden="true" />
              <div className="card-top caps">
                <span>{String(i + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
                <span>{p.tag}</span>
              </div>
              <div className="card-body">
                <h3 className="card-title">{p.title}</h3>
                <p className="card-text">{p.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Serviços: duas colunas, uma para cada círculo ---------- */
export function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    focusIn(SplitText.create('.services-title', { type: 'words,chars' }).chars, { scrollTrigger: { trigger: '.services-title', start: 'top 85%' } });
    gsap.utils.toArray<HTMLElement>('.svc-col').forEach((col) => {
      gsap.from(col.querySelector('.svc-dot'), { scale: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: col, start: 'top 80%' } });
      gsap.from(col.querySelectorAll('.svc-item'), { autoAlpha: 0, x: -24, duration: 0.8, ease: 'power3.out', stagger: 0.06, scrollTrigger: { trigger: col, start: 'top 75%' } });
    });
  }, { scope: ref });

  const cols = site.fronts.map((f) => ({ key: f.key, title: f.title, sub: f.area, items: f.services }));
  return (
    <section ref={ref} className="services section" id="servicos">
      <div className="container">
        <p className="sec-label caps"><span className="idx">05</span>Serviços</p>
        <h2 className="services-title">Cuidados para a mente, o rosto e o corpo.</h2>
        <div className="services-grid">
          {cols.map((c) => (
            <div className={`svc-col svc-col--${c.key}`} key={c.key}>
              <div className="svc-head">
                <span className="svc-dot" aria-hidden="true" />
                <h3 className="svc-title">{c.title}</h3>
                <span className="caps svc-sub">{c.sub}</span>
              </div>
              <ul className="svc-list">
                {c.items.map((name, i) => (
                  <li key={name}>
                    <a className="svc-item" href={contactAbout(name)} target="_blank" rel="noopener noreferrer">
                      <span className="svc-n">{String(i + 1).padStart(2, '0')}</span>
                      <span className="svc-name">{name}</span>
                      <span className="svc-go" aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="services-note caps">Toque em um serviço para falar com a equipe da Tria.</p>
      </div>
    </section>
  );
}

/* ---------- O espaço: galeria em que cada foto nasce de um círculo ---------- */
export function Space() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    focusIn(SplitText.create('.space-title', { type: 'words,chars' }).chars, { scrollTrigger: { trigger: '.space-title', start: 'top 85%' } });
    // Toca sozinha quando a galeria entra na tela (sem travar a rolagem).
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.space-gallery', start: 'top 75%', toggleActions: 'play none none none' } });
    tl.fromTo('.sg', { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1.3, ease: 'power3.inOut', stagger: 0.18, clearProps: 'clipPath' })
      .fromTo('.sg img', { scale: 1.3 }, { scale: 1, duration: 1.6, ease: 'power3.out', stagger: 0.18 }, 0);
    gsap.utils.toArray<HTMLElement>('.sg').forEach((el, i) => {
      gsap.fromTo(el, { y: 30 + i * 20 }, { y: -30 - i * 20, ease: 'none', scrollTrigger: { trigger: '.space-gallery', start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.from('.space-side > *', { autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.space-side', start: 'top 85%' } });
  }, { scope: ref });

  return (
    <section ref={ref} className="space section" id="espaco">
      <div className="container">
        <p className="sec-label caps"><span className="idx">06</span>O espaço</p>
        <div className="space-head">
          <h2 className="space-title">Um espaço pensado para o seu cuidado.</h2>
          <p className="space-text">{site.space}</p>
        </div>
        <div className="space-gallery">
          {site.gallery.map((g, i) => (
            <figure className={`sg sg--${i + 1}`} key={g.src}>
              <img src={g.src} alt={g.alt} loading="lazy" />
            </figure>
          ))}
        </div>
        <div className="space-side">
          <p className="space-soon">{site.visit}</p>
          <dl className="spec caps">
            <div><dt>Cidade</dt><dd>{site.city} — {site.state}</dd></div>
            <div><dt>Cuidado</dt><dd>{site.motto}</dd></div>
            <div><dt>Atendimento</dt><dd><span className="dot" /> Com agendamento</dd></div>
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contato ---------- */
export function Contact() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    focusIn(SplitText.create('.contact-title', { type: 'words,chars' }).chars, { scrollTrigger: { trigger: '.contact-title', start: 'top 80%' } });
    gsap.from('.row', { autoAlpha: 0, y: 30, duration: 1, ease: 'power3.out', stagger: 0.1, scrollTrigger: { trigger: '.rows', start: 'top 88%' } });
  }, { scope: ref });

  return (
    <section ref={ref} className="contact section" id="contato">
      <div className="container">
        <p className="sec-label caps"><span className="idx">07</span>Agendamentos</p>
        <h2 className="contact-title">Venha conhecer uma nova forma de <span className="c-copper">cuidar.</span></h2>
        <div className="rows">
          <a className="row" href={site.instagram.url} target="_blank" rel="noopener noreferrer">
            <span className="row-k caps">Instagram</span>
            <span className="row-v">{site.instagram.handle}</span>
            <span className="row-go" aria-hidden="true">↗</span>
          </a>
          <a className="row row--taupe" href={contact.href} target="_blank" rel="noopener noreferrer">
            <span className="row-k caps">{contact.kind === 'whatsapp' ? 'WhatsApp' : 'Mensagem direta'}</span>
            <span className="row-v">Fale com a Tria</span>
            <span className="row-go" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rodapé ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid caps">
        <Logo className="footer-logo" title={site.fullName} />
        <span>{site.kind}<br />{site.areas}</span>
        <span>{site.city}<br />{site.state} — Brasil</span>
        <span>© {new Date().getFullYear()}<br />{site.fullName}</span>
        <button className="link-caps" onClick={() => scrollToTarget('#inicio')}>Voltar ao topo ↑</button>
      </div>
    </footer>
  );
}
