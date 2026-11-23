import { useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, reducedMotion, scrollToTarget } from '../lib/motion';
import { site, contact } from '../content';
import { Logo } from './Logo';

/* ---------- Abertura: dois círculos se encontram e o logo nasce no centro ---------- */
export function Intro({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (reducedMotion) { gsap.set(ref.current, { display: 'none' }); onDone(); return; }
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });
    tl.from('.intro-c--a', { xPercent: -170, duration: 1.4 })
      .from('.intro-c--b', { xPercent: 170, duration: 1.4 }, 0)
      .from('.intro-tag', { autoAlpha: 0, y: 12, duration: 0.6, stagger: 0.1, ease: 'power2.out' }, 0.5)
      .to('.intro-tag', { autoAlpha: 0, duration: 0.3 }, 1.35)
      .to('.intro-c--a', { xPercent: 50, duration: 0.9 }, 1.4)
      .to('.intro-c--b', { xPercent: -50, duration: 0.9 }, 1.4)
      .fromTo('.intro-logo', { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 1.9)
      .to(ref.current, { clipPath: 'circle(0% at 50% 50%)', duration: 1.1, ease: 'expo.inOut' }, 2.7)
      .add(onDone, 3.05)
      .set(ref.current, { display: 'none' });
  }, { scope: ref });

  return (
    <div ref={ref} className="intro" aria-hidden="true">
      <div className="intro-stage">
        <span className="intro-c intro-c--a"><span className="intro-tag">Beleza</span></span>
        <span className="intro-c intro-c--b"><span className="intro-tag">Saúde mental</span></span>
        <Logo className="intro-logo" />
      </div>
    </div>
  );
}

/* ---------- Navegação ---------- */
const links = [
  { href: '#conceito', label: 'Conceito' },
  { href: '#integracao', label: 'Integração' },
  { href: '#cuidado', label: 'Cuidado' },
  { href: '#espaco', label: 'Espaço' },
  { href: '#contato', label: 'Contato' },
];

export function Nav({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!ready) return;
    if (!reducedMotion) gsap.from('.nav > *', { autoAlpha: 0, y: -12, duration: 1, ease: 'power3.out', stagger: 0.06 });
    const st = ScrollTrigger.create({
      start: 60,
      onUpdate: (s) => ref.current!.classList.toggle('is-solid', s.scroll() > 40),
    });
    return () => st.kill();
  }, { dependencies: [ready], scope: ref });

  useGSAP(() => {
    if (!open || reducedMotion) return;
    gsap.from('.menu-links li', { x: -40, autoAlpha: 0, duration: 0.8, ease: 'power3.out', stagger: 0.05 });
  }, { dependencies: [open] });

  const go = (e: React.MouseEvent, href: string) => { e.preventDefault(); setOpen(false); scrollToTarget(href); };

  return (
    <>
      <header ref={ref} className="nav-wrap">
        <nav className="nav" aria-label="Principal">
          <a href="#inicio" className="nav-logo" onClick={(e) => go(e, '#inicio')}>
            <Logo title="Tria · página inicial" />
          </a>
          <ul className="nav-links">
            {links.map((l, i) => (
              <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)}><span className="mono-idx">0{i + 1}</span>{l.label}</a></li>
            ))}
          </ul>
          <a className="nav-cta" href={contact.href} target="_blank" rel="noopener noreferrer">Fale conosco ↗</a>
          <button className="menu-btn" aria-expanded={open} aria-controls="menu" onClick={() => setOpen(!open)}>
            {open ? 'Fechar' : 'Menu'}
          </button>
        </nav>
      </header>
      <div id="menu" className="menu" hidden={!open}>
        <ul className="menu-links">
          {links.map((l, i) => (
            <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)}><span className="mono-idx">0{i + 1}</span>{l.label}</a></li>
          ))}
        </ul>
        <div className="menu-foot">
          <a href={contact.href} target="_blank" rel="noopener noreferrer" className="btn">Fale conosco ↗</a>
          <p className="mono">{site.kind} — {site.city}, {site.state}</p>
        </div>
      </div>
    </>
  );
}
