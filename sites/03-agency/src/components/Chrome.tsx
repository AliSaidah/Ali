import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion, scrollToTarget } from '../lib/motion';
import { contact } from '../content';

/* Seta em SVG (os caracteres ↗ ↓ viram emoji no iPhone). */
const ROT = { ne: 0, down: 135, right: 45 } as const;
export function Arrow({ dir = 'ne' }: { dir?: keyof typeof ROT }) {
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false"
      style={ROT[dir] ? { rotate: `${ROT[dir]}deg` } : undefined}>
      <path d="M4 12 L12 4 M5.5 4 H12 V10.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Marca: "0" reto + "3" itálico, e "Agency" em caixa alta. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <span className="logo-num"><span>0</span><em>3</em></span>
      <span className="logo-word">Agency</span>
    </span>
  );
}

const links = [
  { href: '#experimente', label: 'Experimente' },
  { href: '#processo', label: 'Processo' },
  { href: '#inclui', label: 'O que vem' },
  { href: '#perguntas', label: 'Perguntas' },
];

export function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!reducedMotion) gsap.fromTo('.nav > *', { autoAlpha: 0, y: -10 }, { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06, delay: 0.2 });
  }, { scope: ref });

  const go = (e: React.MouseEvent, href: string) => { e.preventDefault(); scrollToTarget(href); };

  return (
    <header ref={ref} className="nav-wrap">
      <nav className="nav" aria-label="Principal">
        <a href="#topo" className="nav-logo" aria-label="03 Agency, início" onClick={(e) => go(e, '#topo')}><Logo /></a>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}><a href={l.href} onClick={(e) => go(e, l.href)}>{l.label}</a></li>
          ))}
        </ul>
        <a className="nav-cta" href={contact.href} target="_blank" rel="noopener noreferrer">Pedir prévia <Arrow /></a>
      </nav>
    </header>
  );
}
