import { useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText, reducedMotion, scrollToTarget, EASE } from '../lib/motion';
import { site, categories, waBooking, waAbout, type Category } from '../content';
import SilkCanvas from './SilkCanvas';
import { MagneticLink, Icon } from './ui';

/* ---------- Hero ---------- */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready) return;
    const split = SplitText.create('.hero-title', { type: 'lines,words', mask: 'lines', linesClass: 'line' });
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    if (!reducedMotion) {
      tl.from('.hero-silk', { scale: 1.25, autoAlpha: 0, duration: 2.4, ease: 'power2.out' })
        .from(split.words, { yPercent: 115, rotate: 4, duration: 1.5, stagger: 0.06 }, 0.15)
        .from('.hero-eyebrow > *', { y: 20, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 0.6)
        .from('.hero-foot > *', { y: 30, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 0.9)
        .from('.hero-rule', { scaleX: 0, duration: 1.6, ease: 'expo.inOut' }, 0.7);

      gsap.to('.hero-title', { yPercent: -18, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-silk', { yPercent: 20, scale: 1.08, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero-inner', { autoAlpha: 0.15, ease: 'none', scrollTrigger: { trigger: ref.current, start: '40% top', end: 'bottom top', scrub: true } });
    }
    return () => split.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className="hero" id="inicio">
      <SilkCanvas className="hero-silk" />
      <div className="hero-inner container">
        <div className="hero-eyebrow">
          <span>{site.title} {site.name}</span>
          <span className="dotsep" aria-hidden="true" />
          <span>{site.role}</span>
        </div>
        <h1 className="hero-title">
          A arte de realçar <br />o que já é <em>seu.</em>
        </h1>
        <div className="hero-rule" />
        <div className="hero-foot">
          <p className="hero-lede">{site.tagline} Atendimento no {site.address.place}, {site.address.city}.</p>
          <a href="#filosofia" className="scroll-cue" onClick={(e) => { e.preventDefault(); scrollToTarget('#filosofia'); }} aria-label="Rolar para a próxima seção">
            <span className="scroll-cue-line" /> Role
          </a>
          <MagneticLink href={waBooking} className="btn btn-champagne" cursor="WhatsApp">
            <Icon.WhatsApp /> Agendar avaliação
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const names = site.procedures.map((p) => p.name);
  const half = Math.ceil(names.length / 2);
  const rows = [names.slice(0, half), names.slice(half)];

  useGSAP(() => {
    if (reducedMotion) return;
    const tweens = gsap.utils.toArray<HTMLElement>('.mq-track').map((track, i) =>
      gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 48, ease: 'none', repeat: -1 }),
    );
    const skewTo = gsap.quickTo('.mq-row', 'skewX', { duration: 0.5, ease: 'power3' });
    ScrollTrigger.create({
      trigger: ref.current, start: 'top bottom', end: 'bottom top',
      onUpdate: (s) => {
        const v = s.getVelocity();
        const boost = 1 + Math.min(Math.abs(v) / 400, 5);
        tweens.forEach((t) => gsap.to(t, { timeScale: boost * (v < 0 ? -1 : 1), duration: 0.2, overwrite: true }));
        skewTo(gsap.utils.clamp(-8, 8, v / -250));
        gsap.delayedCall(0.25, () => { tweens.forEach((t) => gsap.to(t, { timeScale: 1, duration: 1.2 })); skewTo(0); });
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="marquee" aria-hidden="true">
      {rows.map((row, i) => (
        <div className={`mq-row ${i ? 'mq-row--alt' : ''}`} key={i}>
          <div className="mq-track">
            {[...row, ...row].map((n, j) => (
              <span className="mq-item" key={j}>{n}<Icon.Star /></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Manifesto ---------- */
export function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create('.manifesto-text', { type: 'words' });
    if (!reducedMotion) {
      gsap.fromTo(split.words, { opacity: 0.14 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.manifesto-text', start: 'top 80%', end: 'bottom 55%', scrub: true },
      });
      gsap.fromTo('.portrait-frame', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)', duration: 1.8, ease: 'expo.inOut',
        scrollTrigger: { trigger: '.portrait', start: 'top 80%' },
      });
      gsap.fromTo('.portrait-media', { yPercent: -12, scale: 1.2 }, {
        yPercent: 12, scale: 1.05, ease: 'none',
        scrollTrigger: { trigger: '.portrait', start: 'top bottom', end: 'bottom top', scrub: true },
      });
      gsap.from('.motto', { y: 60, autoAlpha: 0, duration: 1.4, ease: EASE, scrollTrigger: { trigger: '.motto', start: 'top 85%' } });
    }
    return () => split.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="manifesto section" id="filosofia">
      <div className="container manifesto-grid">
        <div className="manifesto-copy">
          <p className="eyebrow"><span className="eyebrow-line" />Filosofia</p>
          <p className="manifesto-text">{site.manifesto}</p>
          <div className="signature">
            <span className="sig-name">{site.title} {site.name}</span>
            <span className="sig-role">{site.role}</span>
          </div>
        </div>
        <figure className="portrait">
          <div className="portrait-frame">
            {site.portrait ? (
              <img className="portrait-media" src={site.portrait} alt={`Retrato da ${site.title} ${site.name}`} />
            ) : (
              <div className="portrait-media portrait-placeholder" role="img" aria-label="Espaço para o retrato da Dra. Carolina Baron">
                <span>CB</span>
              </div>
            )}
          </div>
          <figcaption><span>Retrato</span><span>{site.title} {site.name}</span></figcaption>
        </figure>
      </div>
      <blockquote className="motto container">
        <span className="motto-mark" aria-hidden="true">“</span>
        O maior investimento é aquele que <em>você faz em você.</em>
      </blockquote>
    </section>
  );
}

/* ---------- Method (pinned horizontal on desktop) ---------- */
export function Method() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
      const track = ref.current!.querySelector<HTMLElement>('.method-track')!;
      const dist = () => track.scrollWidth - window.innerWidth;
      const tween = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 },
      });
      gsap.to('.method-bar-fill', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top top', end: () => `+=${dist()}`, scrub: true } });
      gsap.utils.toArray<HTMLElement>('.step').forEach((step) => {
        gsap.from(step.querySelectorAll('.step-num, .step-title, .step-text'), {
          y: 80, autoAlpha: 0, stagger: 0.08, ease: EASE, duration: 1.2,
          scrollTrigger: { trigger: step, containerAnimation: tween, start: 'left 80%' },
        });
      });
    });
    mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.step').forEach((step) => {
        gsap.from(step, { y: 60, autoAlpha: 0, duration: 1.2, ease: EASE, scrollTrigger: { trigger: step, start: 'top 85%' } });
      });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="method" id="metodo">
      <div className="method-track">
        <div className="method-intro">
          <p className="eyebrow eyebrow--dark"><span className="eyebrow-line" />Método</p>
          <h2 className="h2">Um rosto,<br />um <em>plano.</em></h2>
          <p className="method-lede">Nenhum procedimento começa antes de entender o seu rosto. São quatro etapas, sempre nesta ordem.</p>
        </div>
        {site.method.map((m, i) => (
          <article className="step" key={m.title}>
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="step-title">{m.title}</h3>
            <p className="step-text">{m.text}</p>
          </article>
        ))}
      </div>
      <div className="method-bar" aria-hidden="true"><div className="method-bar-fill" /></div>
    </section>
  );
}

/* ---------- Procedures ---------- */
export function Procedures() {
  const ref = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<Category | 'Todos'>('Todos');
  const [active, setActive] = useState<number | null>(null);
  const list = site.procedures.filter((p) => filter === 'Todos' || p.category === filter);

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.from('.proc-head > *', { y: 60, autoAlpha: 0, duration: 1.3, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.proc-head', start: 'top 80%' } });
  }, { scope: ref });

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.fromTo('.proc-row', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, ease: EASE, stagger: 0.04, overwrite: true });
  }, { dependencies: [filter], scope: ref });

  useGSAP(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const card = ref.current!.querySelector<HTMLElement>('.proc-preview')!;
    const xTo = gsap.quickTo(card, 'x', { duration: 0.6, ease: 'power3' });
    const yTo = gsap.quickTo(card, 'y', { duration: 0.6, ease: 'power3' });
    const listEl = ref.current!.querySelector<HTMLElement>('.proc-list')!;
    const move = (e: PointerEvent) => { xTo(e.clientX + 32); yTo(e.clientY - 120); };
    listEl.addEventListener('pointermove', move);
    return () => listEl.removeEventListener('pointermove', move);
  }, { scope: ref });

  const current = active !== null ? list[active] : null;

  return (
    <section ref={ref} className="procedures section" id="procedimentos">
      <div className="container">
        <div className="proc-head">
          <p className="eyebrow"><span className="eyebrow-line" />Procedimentos</p>
          <h2 className="h2">Tratamentos para<br /><em>cada</em> objetivo.</h2>
          <p className="proc-lede">Escolha um tratamento para conversar direto com a Dra. Carolina pelo WhatsApp.</p>
        </div>

        <div className="chips" role="tablist" aria-label="Filtrar procedimentos">
          {(['Todos', ...categories] as const).map((c) => (
            <button key={c} role="tab" aria-selected={filter === c} className={`chip ${filter === c ? 'is-active' : ''}`} onClick={() => { setFilter(c); setActive(null); }}>
              {c}
              <sup>{c === 'Todos' ? site.procedures.length : site.procedures.filter((p) => p.category === c).length}</sup>
            </button>
          ))}
        </div>

        <ul className="proc-list" onPointerLeave={() => setActive(null)}>
          {list.map((p, i) => (
            <li key={p.name} className="proc-row">
              <a href={waAbout(p.name)} target="_blank" rel="noopener noreferrer" data-cursor="Conversar" onPointerEnter={() => setActive(i)} onFocus={() => setActive(i)}>
                <span className="proc-idx">{String(i + 1).padStart(2, '0')}</span>
                <span className="proc-name">{p.name}{p.detail && <i> · {p.detail}</i>}</span>
                <span className="proc-blurb">{p.blurb}</span>
                <span className="proc-cat">{p.category}</span>
                <span className="proc-go"><Icon.Arrow /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={`proc-preview ${current ? 'is-visible' : ''}`} aria-hidden="true">
        <div className={`pp-media pp-${(current?.category ?? 'Contorno').toLowerCase()}`}>
          <Icon.Star />
        </div>
        <div className="pp-body">
          <span className="pp-cat">{current?.category}</span>
          <strong>{current?.name}</strong>
          <span className="pp-cta"><Icon.WhatsApp /> Conversar no WhatsApp</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Visit ---------- */
export function Visit() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    const split = SplitText.create('.visit-title', { type: 'lines', mask: 'lines' });
    gsap.from(split.lines, { yPercent: 110, duration: 1.4, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.visit-title', start: 'top 85%' } });
    gsap.from('.visit-col > *', { y: 40, autoAlpha: 0, duration: 1.2, ease: EASE, stagger: 0.08, scrollTrigger: { trigger: '.visit-cols', start: 'top 85%' } });
    return () => split.revert();
  }, { scope: ref });

  const a = site.address;
  return (
    <section ref={ref} className="visit section" id="visita">
      <div className="container">
        <p className="eyebrow eyebrow--dark"><span className="eyebrow-line" />Visita</p>
        <h2 className="visit-title">{a.place}<br /><em>{a.city}</em></h2>
        <div className="visit-cols">
          <div className="visit-col">
            <span className="label">Endereço</span>
            <p>{a.street}<br />{a.city} · {a.state} · {a.cep}</p>
          </div>
          <div className="visit-col">
            <span className="label">Como chegar</span>
            <div className="visit-links">
              <a href={a.maps} target="_blank" rel="noopener noreferrer" className="ulink" data-cursor="Maps">Google Maps <Icon.Arrow /></a>
              <a href={a.waze} target="_blank" rel="noopener noreferrer" className="ulink" data-cursor="Waze">Waze <Icon.Arrow /></a>
            </div>
          </div>
          <div className="visit-col">
            <span className="label">Redes</span>
            <div className="visit-links">
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="ulink" data-cursor="Instagram"><Icon.Instagram /> {site.instagram.handle}</a>
              <a href={site.facebook.url} target="_blank" rel="noopener noreferrer" className="ulink" data-cursor="Facebook"><Icon.Facebook /> Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Final CTA ---------- */
export function Cta() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    const split = SplitText.create('.cta-title', { type: 'chars,words', mask: 'words' });
    gsap.from(split.chars, { yPercent: 120, duration: 1.2, ease: EASE, stagger: 0.018, scrollTrigger: { trigger: '.cta-title', start: 'top 80%' } });
    gsap.from('.cta-orb', { scale: 0.4, autoAlpha: 0, rotate: -90, duration: 1.6, ease: EASE, scrollTrigger: { trigger: '.cta-title', start: 'top 70%' } });
    gsap.to('.cta-ring', { rotate: 360, duration: 18, ease: 'none', repeat: -1 });
    if (ref.current!.querySelector('.cta-photo')) {
      gsap.fromTo('.cta-photo-frame', { clipPath: 'inset(0% 0% 100% 0% round 999px 999px 24px 24px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 999px 999px 24px 24px)', duration: 1.8, ease: 'expo.inOut',
        scrollTrigger: { trigger: '.cta-photo', start: 'top 80%' },
      });
      gsap.fromTo('.cta-photo img', { yPercent: -10, scale: 1.18 }, {
        yPercent: 8, scale: 1.04, ease: 'none',
        scrollTrigger: { trigger: '.cta-photo', start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }
    return () => split.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="cta" id="agendar">
      <SilkCanvas className="cta-silk" intensity={0.85} />
      <div className={`container cta-inner ${site.ctaPhoto ? 'has-photo' : ''}`}>
        <div className="cta-main">
        <p className="eyebrow"><span className="eyebrow-line" />Agendamentos</p>
        <h2 className="cta-title">Agende a sua <em>avaliação</em></h2>
        <div className="cta-row">
          <p className="cta-copy">Estamos esperando por você. Fale direto com a Dra. Carolina e marque o melhor horário.</p>
          <MagneticLink href={waBooking} className="cta-orb" strength={0.5} cursor="WhatsApp">
            <svg className="cta-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" /></defs>
              <text><textPath href="#ring" textLength="508" lengthAdjust="spacing">AGENDAR AVALIAÇÃO ✦ AGENDAR AVALIAÇÃO ✦</textPath></text>
            </svg>
            <span className="cta-orb-core"><Icon.WhatsApp /></span>
            <span className="sr-only">Agendar avaliação pelo WhatsApp</span>
          </MagneticLink>
          <p className="cta-phone"><span className="label">WhatsApp</span>{site.phoneDisplay}</p>
        </div>
        </div>
        {site.ctaPhoto && (
          <figure className="cta-photo">
            <div className="cta-photo-frame">
              <img src={site.ctaPhoto} alt={`${site.title} ${site.name}`} loading="lazy" />
            </div>
          </figure>
        )}
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    const split = SplitText.create('.footer-word', { type: 'chars', mask: 'chars' });
    gsap.from(split.chars, { yPercent: 100, ease: EASE, duration: 1.4, stagger: 0.03, scrollTrigger: { trigger: '.footer-word', start: 'top 95%' } });
    return () => split.revert();
  }, { scope: ref });

  return (
    <footer ref={ref} className="footer">
      <div className="container">
        <div className="footer-top">
          <p>{site.tagline}</p>
          <div className="footer-links">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="ulink">Instagram</a>
            <a href={site.facebook.url} target="_blank" rel="noopener noreferrer" className="ulink">Facebook</a>
            <a href={waBooking} target="_blank" rel="noopener noreferrer" className="ulink">WhatsApp</a>
          </div>
        </div>
        <p className="footer-word" aria-label={site.name}>Carolina Baron</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.title} {site.name}</span>
          <span>{site.address.city} · {site.address.state}</span>
          <button className="ulink" onClick={() => scrollToTarget('#inicio')}>Voltar ao topo</button>
        </div>
      </div>
    </footer>
  );
}
