import { useRef } from 'react';
import { gsap, useGSAP, ScrollTrigger, SplitText, reducedMotion, scrollToTarget, EASE } from '../lib/motion';
import { site, contact } from '../content';
import LightCanvas from './LightCanvas';
import { Logo } from './Logo';
import { MagneticLink, Icon } from './ui';

const ContactIcon = contact.kind === 'whatsapp' ? Icon.WhatsApp : Icon.Instagram;

/* Desenha um caminho SVG (pathLength=1) com a rolagem ou no tempo. */
const drawFrom = { strokeDashoffset: 1 };

/* ---------- Hero ---------- */
export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ready) return;
    const split = SplitText.create('.hero-title', { type: 'lines,words', mask: 'lines', linesClass: 'line' });
    if (!reducedMotion) {
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.from('.hero-light', { autoAlpha: 0, scale: 1.15, duration: 2.6, ease: 'power2.out' })
        .fromTo('.hero-logo-svg', { clipPath: 'inset(100% 0 0 0)', yPercent: 18 }, { clipPath: 'inset(0% 0 0 0)', yPercent: 0, duration: 1.9, ease: 'expo.out' }, 0.1)
        .fromTo('.hero-thread', drawFrom, { strokeDashoffset: 0, duration: 3.2, ease: 'power2.inOut', stagger: 0.25 }, 0.2)
        .from('.hero-eyebrow > *', { y: 16, autoAlpha: 0, duration: 1.2, stagger: 0.08 }, 0.6)
        .from(split.words, { yPercent: 115, duration: 1.4, stagger: 0.05 }, 0.75)
        .from('.hero-actions > *', { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.1 }, 1.0);

      const st = { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to('.hero-logo', { yPercent: -22, scale: 1.06, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-light', { yPercent: 18, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-threads', { yPercent: -10, ease: 'none', scrollTrigger: st });
      gsap.to('.hero-inner', { autoAlpha: 0.1, ease: 'none', scrollTrigger: { ...st, start: '45% top' } });
    }
    return () => split.revert();
  }, { dependencies: [ready], scope: ref });

  return (
    <section ref={ref} className="hero" id="inicio">
      <LightCanvas className="hero-light" />
      <svg className="hero-threads" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <path className="hero-thread" pathLength={1} d="M-20 120 C 240 60, 380 420, 520 520 S 820 760, 1020 640" />
        <path className="hero-thread hero-thread--b" pathLength={1} d="M1020 80 C 760 160, 700 460, 520 520 S 160 700, -20 900" />
      </svg>
      <div className="hero-inner container">
        <p className="hero-eyebrow">
          <span>{site.kind}</span>
          <span className="dotsep" aria-hidden="true" />
          <span>{site.areas}</span>
          <span className="dotsep" aria-hidden="true" />
          <span>{site.city}</span>
        </p>
        <h1 className="hero-logo">
          <Logo shine className="hero-logo-svg" title={`${site.fullName} · ${site.kind} de ${site.areas}`} />
        </h1>
        <div className="hero-foot">
          <p className="hero-title">Um novo conceito que integra <em>beleza</em> e <em>mente.</em></p>
          <div className="hero-actions">
            <span className="status"><span className="status-dot" />Em breve · inauguração</span>
            <MagneticLink href={contact.href} className="btn btn-copper" cursor={contact.label}>
              <ContactIcon /> Fale com a Tria
            </MagneticLink>
          </div>
        </div>
        <a href="#conceito" className="scroll-cue" onClick={(e) => { e.preventDefault(); scrollToTarget('#conceito'); }} aria-label="Rolar para o conceito">
          <span className="scroll-cue-line" /> Role
        </a>
      </div>
    </section>
  );
}

/* ---------- Conceito (texto que acende) ---------- */
export function Concept() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const split = SplitText.create('.concept-text', { type: 'words' });
    if (!reducedMotion) {
      gsap.fromTo(split.words, { opacity: 0.12 }, {
        opacity: 1, stagger: 0.1, ease: 'none',
        scrollTrigger: { trigger: '.concept-text', start: 'top 78%', end: 'bottom 50%', scrub: true },
      });
      gsap.fromTo('.concept-thread', drawFrom, {
        strokeDashoffset: 0, ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 70%', end: 'bottom 60%', scrub: true },
      });
      gsap.from('.concept-side > *', { y: 30, autoAlpha: 0, duration: 1.2, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.concept-side', start: 'top 85%' } });
    }
    return () => split.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="concept section" id="conceito">
      <svg className="concept-threads" viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true">
        <path className="concept-thread" pathLength={1} d="M-10 40 C 200 10, 260 260, 480 300 S 820 180, 1010 360" />
      </svg>
      <div className="container concept-grid">
        <p className="eyebrow"><span className="eyebrow-line" />O conceito</p>
        <p className="concept-text">{site.concept}</p>
        <div className="concept-side">
          <p className="concept-caption"><em>“{site.caption}”</em></p>
          <span className="label">{site.instagram.handle}</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Integração (seção travada: beleza + mente se encontram) ---------- */
export function Integration() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ wide: '(min-width: 900px)', narrow: '(max-width: 899px)', motion: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
      const { wide, motion } = ctx.conditions as { wide: boolean; motion: boolean };
      if (!motion) return;
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=170%', pin: true, scrub: 1, anticipatePin: 1 },
      });
      const off = wide ? { a: { xPercent: -95 }, b: { xPercent: 95 } } : { a: { yPercent: -140, xPercent: -20 }, b: { yPercent: 140, xPercent: 20 } };
      tl.fromTo('.iw-a', { ...off.a, autoAlpha: 0.25 }, { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 1 }, 0)
        .fromTo('.iw-b', { ...off.b, autoAlpha: 0.25 }, { xPercent: 0, yPercent: 0, autoAlpha: 1, duration: 1 }, 0)
        .fromTo('.integra-thread', drawFrom, { strokeDashoffset: 0, duration: 1 }, 0)
        .fromTo('.iw-plus', { scale: 0, rotate: -180 }, { scale: 1, rotate: 0, duration: 0.4 }, 0.7)
        .fromTo('.integra-knot', { scale: 0, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3 }, 0.85)
        .fromTo('.integra-down', drawFrom, { strokeDashoffset: 0, duration: 0.5 }, 1.0)
        .from('.integra-result > *', { y: 50, autoAlpha: 0, duration: 0.5, stagger: 0.12 }, 1.15)
        .to({}, { duration: 0.3 });
    });
    return () => mm.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="integra" id="integracao">
      <LightCanvas dark className="integra-light" />
      <svg className="integra-threads" viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        <path className="integra-thread" pathLength={1} d="M-20 260 C 220 120, 300 520, 500 470" />
        <path className="integra-thread" pathLength={1} d="M1020 740 C 780 880, 700 420, 500 470" />
        <path className="integra-down" pathLength={1} d="M500 470 C 520 600, 470 700, 500 1010" />
      </svg>
      <div className="integra-stage container">
        <p className="eyebrow"><span className="eyebrow-line" />Integração</p>
        <h2 className="integra-words">
          <span className="iw iw-a">Beleza</span>
          <span className="iw-plus" aria-hidden="true"><span className="integra-knot" /></span>
          <span className="iw iw-b"><em>Mente</em></span>
        </h2>
        <div className="integra-result">
          <p className="integra-text">{site.pillars[2].text}</p>
          <span className="label">Cuidado integrado</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Frentes de cuidado ---------- */
export function Pillars() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    const split = SplitText.create('.pillars-title', { type: 'lines', mask: 'lines' });
    gsap.from(split.lines, { yPercent: 110, duration: 1.4, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.pillars-title', start: 'top 85%' } });
    gsap.utils.toArray<HTMLElement>('.pillar').forEach((el, i) => {
      gsap.from(el.querySelectorAll('.pillar-num, .pillar-title, .pillar-text'), {
        y: 60, autoAlpha: 0, duration: 1.3, ease: EASE, stagger: 0.08, delay: i * 0.12,
        scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' },
      });
      gsap.fromTo(el.querySelector('.pillar-rule'), { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: 'expo.inOut', delay: i * 0.12, scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' } });
    });
    return () => split.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="pillars section" id="cuidado">
      <div className="container">
        <div className="pillars-head">
          <p className="eyebrow"><span className="eyebrow-line" />Caminhos de cuidado</p>
          <h2 className="h2 pillars-title">O indivíduo em sua <em>totalidade.</em></h2>
        </div>
        <div className="pillars-grid">
          {site.pillars.map((p, i) => (
            <article className="pillar" key={p.title}>
              <span className="pillar-rule" aria-hidden="true" />
              <span className="pillar-num">{['I', 'II', 'III'][i]}</span>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-text">{p.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- O espaço ---------- */
export function Space() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    gsap.fromTo('.space-frame', { clipPath: 'inset(100% 0% 0% 0% round 999px 999px 0 0)' }, {
      clipPath: 'inset(0% 0% 0% 0% round 999px 999px 0 0)', duration: 2, ease: 'expo.inOut',
      scrollTrigger: { trigger: '.space-photo', start: 'top 80%' },
    });
    gsap.fromTo('.space-frame img', { yPercent: -6, scale: 1.14 }, {
      yPercent: 6, scale: 1.02, ease: 'none',
      scrollTrigger: { trigger: '.space-photo', start: 'top bottom', end: 'bottom top', scrub: true },
    });
    gsap.fromTo('.space-arch', { yPercent: 20 }, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.space-photo', start: 'top bottom', end: 'bottom top', scrub: true } });
    const split = SplitText.create('.space-title', { type: 'lines', mask: 'lines' });
    gsap.from(split.lines, { yPercent: 110, duration: 1.4, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.space-title', start: 'top 85%' } });
    gsap.from('.space-copy > :not(.space-title):not(.eyebrow)', { y: 40, autoAlpha: 0, duration: 1.2, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.space-copy', start: 'top 70%' } });
    return () => split.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="space section" id="espaco">
      <div className="container space-grid">
        <figure className="space-photo">
          <span className="space-arch" aria-hidden="true" />
          <div className="space-frame">
            <img src={site.photo} alt="Recepção da Clínica Tria: balcão de mármore e madeira, lustre dourado e parede em cimento queimado" loading="lazy" />
          </div>
          <figcaption><span>Recepção</span><span>{site.city}</span></figcaption>
        </figure>
        <div className="space-copy">
          <p className="eyebrow"><span className="eyebrow-line" />O espaço</p>
          <h2 className="h2 space-title">Um novo espaço <em>tomando forma.</em></h2>
          <p className="space-text">{site.space}</p>
          <p className="space-soon">{site.soon}</p>
          <div className="space-meta">
            <div><span className="label">Status</span><p><span className="status-dot" /> Em preparação</p></div>
            <div><span className="label">Cidade</span><p>{site.city} · {site.state}</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Marquee ---------- */
export function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const words = ['Beleza', 'Saúde mental', 'Cuidado integrado', 'Um novo olhar sobre o cuidado'];

  useGSAP(() => {
    if (reducedMotion) return;
    const tweens = gsap.utils.toArray<HTMLElement>('.mq-track').map((track, i) =>
      gsap.fromTo(track, { xPercent: i % 2 ? -50 : 0 }, { xPercent: i % 2 ? 0 : -50, duration: 40, ease: 'none', repeat: -1 }),
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
      {[0, 1].map((i) => (
        <div className={`mq-row ${i ? 'mq-row--alt' : ''}`} key={i}>
          <div className="mq-track">
            {[...words, ...words, ...words, ...words].map((n, j) => (
              <span className="mq-item" key={j}>{n}<Icon.Star /></span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- Contato ---------- */
export function Cta() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    const split = SplitText.create('.cta-title', { type: 'chars,words', mask: 'words' });
    gsap.from(split.chars, { yPercent: 120, duration: 1.2, ease: EASE, stagger: 0.016, scrollTrigger: { trigger: '.cta-title', start: 'top 80%' } });
    gsap.from('.cta-orb', { scale: 0.4, autoAlpha: 0, rotate: -90, duration: 1.6, ease: EASE, scrollTrigger: { trigger: '.cta-row', start: 'top 85%' } });
    gsap.from('.cta-copy, .cta-ig', { y: 30, autoAlpha: 0, duration: 1.2, ease: EASE, stagger: 0.1, scrollTrigger: { trigger: '.cta-row', start: 'top 85%' } });
    gsap.to('.cta-ring', { rotate: 360, duration: 20, ease: 'none', repeat: -1 });
    return () => split.revert();
  }, { scope: ref });

  return (
    <section ref={ref} className="cta" id="contato">
      <LightCanvas dark className="cta-light" />
      <div className="container cta-inner">
        <p className="eyebrow"><span className="eyebrow-line" />Em breve</p>
        <h2 className="cta-title">Uma nova forma de <em>cuidar</em> já começou.</h2>
        <div className="cta-row">
          <p className="cta-copy">{site.closing} Acompanhe a abertura e fale com a equipe da Tria.</p>
          <MagneticLink href={contact.href} className="cta-orb" strength={0.5} cursor={contact.label}>
            <svg className="cta-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="ring" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" /></defs>
              <text><textPath href="#ring" textLength="508" lengthAdjust="spacing">FALE CONOSCO ✦ CLÍNICA TRIA ✦</textPath></text>
            </svg>
            <span className="cta-orb-core"><ContactIcon /></span>
            <span className="sr-only">Falar com a Clínica Tria</span>
          </MagneticLink>
          <a className="cta-ig" href={site.instagram.url} target="_blank" rel="noopener noreferrer" data-cursor="Instagram">
            <span className="label">Instagram</span>
            <span className="cta-ig-handle">{site.instagram.handle} <Icon.Arrow /></span>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- Rodapé ---------- */
export function Footer() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (reducedMotion) return;
    gsap.fromTo('.footer-logo', { clipPath: 'inset(100% 0 0 0)', yPercent: 30 }, {
      clipPath: 'inset(0% 0 0 0)', yPercent: 0, duration: 1.8, ease: 'expo.out',
      scrollTrigger: { trigger: '.footer-logo', start: 'top 95%' },
    });
  }, { scope: ref });

  return (
    <footer ref={ref} className="footer">
      <div className="container">
        <div className="footer-top">
          <p>{site.kind} · {site.areas}</p>
          <div className="footer-links">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="ulink">Instagram</a>
            <a href={contact.href} target="_blank" rel="noopener noreferrer" className="ulink">{contact.label}</a>
          </div>
        </div>
        <Logo className="footer-logo" shine title={site.fullName} />
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.fullName}</span>
          <span>{site.city} · {site.state}</span>
          <button className="ulink" onClick={() => scrollToTarget('#inicio')}>Voltar ao topo</button>
        </div>
      </div>
    </footer>
  );
}
