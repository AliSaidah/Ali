import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, ScrollTrigger, reducedMotion, scrollToTarget, EASE } from '../lib/motion';
import { site, contact } from '../content';
import { MagneticLink } from './ui';
import { Logo } from './Logo';

/* ---------- Preloader ---------- */
export function Preloader({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useGSAP(() => {
    if (reducedMotion) { gsap.set(ref.current, { autoAlpha: 0 }); onDone(); return; }
    const c = { v: 0 };
    const tl = gsap.timeline();
    tl.fromTo('.pl-logo', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.7, ease: 'power3.inOut' })
      .from('.pl-logo', { scale: 1.08, duration: 2.2, ease: 'power2.out' }, 0)
      .to(c, { v: 100, duration: 1.7, ease: 'power3.inOut', onUpdate: () => setCount(Math.round(c.v)) }, 0)
      .to('.pl-line', { scaleX: 1, duration: 1.7, ease: 'power3.inOut' }, 0)
      .from('.pl-sub', { yPercent: 120, duration: 1, ease: EASE }, 0.6)
      .to('.pl-center', { y: -40, autoAlpha: 0, duration: 0.6, ease: 'power3.in' }, '+=0.25')
      .to('.pl-meta', { autoAlpha: 0, duration: 0.3 }, '<')
      .to(ref.current, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=0.15')
      .add(onDone, '-=0.75')
      .set(ref.current, { display: 'none' });
  }, { scope: ref });

  return (
    <div ref={ref} className="preloader" aria-hidden="true">
      <div className="pl-center">
        <Logo className="pl-logo" />
        <div className="pl-sub-mask"><p className="pl-sub">{site.kind} · {site.areas}</p></div>
      </div>
      <div className="pl-meta">
        <span>{site.city}</span>
        <span className="pl-count">{String(count).padStart(3, '0')}</span>
      </div>
      <div className="pl-line" />
    </div>
  );
}

/* ---------- Cursor ---------- */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    document.documentElement.classList.add('has-cursor');
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.55, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.55, ease: 'power3' });
    const move = (e: PointerEvent) => { document.documentElement.classList.add('cursor-on'); dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e: PointerEvent) => {
      const t = (e.target as HTMLElement).closest<HTMLElement>('a, button, [data-cursor]');
      ring.current!.classList.toggle('is-hover', !!t);
      setLabel(t?.dataset.cursor ?? '');
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerover', over); document.documentElement.classList.remove('has-cursor'); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden="true" />
      <div ref={ring} className={`cursor-ring ${label ? 'has-label' : ''}`} aria-hidden="true"><span>{label}</span></div>
    </>
  );
}

/* ---------- Navigation ---------- */
const links = [
  { href: '#conceito', label: 'Conceito' },
  { href: '#integracao', label: 'Integração' },
  { href: '#espaco', label: 'O espaço' },
  { href: '#contato', label: 'Contato' },
];

export function Nav({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    if (!ready) return;
    gsap.from('.nav > *', { y: -30, autoAlpha: 0, duration: 1.2, ease: EASE, stagger: 0.08, delay: 0.5 });
    const st = ScrollTrigger.create({
      start: 120,
      onUpdate: (s) => {
        ref.current!.classList.toggle('is-hidden', s.direction === 1 && s.scroll() > 400 && !open);
        ref.current!.classList.toggle('is-solid', s.scroll() > 80);
      },
    });
    return () => st.kill();
  }, { dependencies: [ready], scope: ref });

  useGSAP(() => {
    if (!open) return;
    gsap.from('.menu-links a', { yPercent: 120, duration: 1, ease: EASE, stagger: 0.06, delay: 0.15 });
  }, { dependencies: [open] });

  const go = (e: React.MouseEvent, href: string) => { e.preventDefault(); setOpen(false); scrollToTarget(href); };

  return (
    <>
      <header ref={ref} className="nav-wrap">
        <nav className="nav" aria-label="Principal">
          <a href="#inicio" className="logo" onClick={(e) => go(e, '#inicio')}>
            <Logo className="logo-nav" title="Tria · página inicial" />
            <span className="logo-kind">Clínica<br />Integrada</span>
          </a>
          <ul className="nav-links">
            {links.map((l) => (
              <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)}><span data-text={l.label}>{l.label}</span></a></li>
            ))}
          </ul>
          <MagneticLink href={contact.href} className="btn btn-pill nav-cta" cursor={contact.label}>Fale conosco</MagneticLink>
          <button className={`burger ${open ? 'is-open' : ''}`} aria-expanded={open} aria-controls="menu" aria-label={open ? 'Fechar menu' : 'Abrir menu'} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </nav>
      </header>
      <div id="menu" className={`menu ${open ? 'is-open' : ''}`} hidden={!open}>
        <ul className="menu-links">
          {links.map((l) => <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a></li>)}
        </ul>
        <div className="menu-foot">
          <a href={contact.href} target="_blank" rel="noopener noreferrer" className="btn btn-copper"><span className="mag-inner">Fale conosco</span></a>
          <p>{site.kind} · {site.city}</p>
        </div>
      </div>
    </>
  );
}

/* ---------- Scroll progress + grain ---------- */
export function Atmosphere() {
  useGSAP(() => {
    gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
  });
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
    </>
  );
}
