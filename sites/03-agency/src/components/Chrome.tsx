import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion, scrollToTarget } from '../lib/motion';
import { contact } from '../content';
import { DOT, ZERO, THREE, LINE, AGENCY, VIOLET, VIEW_MARK, VIEW_FULL } from '../lib/logo';

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

/* Ponto roxo do logo, usado como "ponto final" dos títulos. */
export function Dot() {
  return <span className="vdot" aria-hidden="true" />;
}

/* Marca "03" do logo (ponto branco, zero com ponto central e três), em SVG. */
export function Mark({ className = '' }: { className?: string }) {
  return (
    <svg className={`mark ${className}`} viewBox={VIEW_MARK} aria-hidden="true" focusable="false">
      <path className="mk-dot" d={DOT} />
      <path className="mk-zero" d={ZERO} fillRule="evenodd" />
      <path className="mk-three" d={THREE} />
    </svg>
  );
}

/* Logo completo (empilhado), como no arquivo original. */
export function LogoFull({ className = '' }: { className?: string }) {
  return (
    <svg className={`logo-full ${className}`} viewBox={VIEW_FULL} role="img" aria-label="03 Agency">
      <path d={DOT} /><path d={ZERO} fillRule="evenodd" /><path d={THREE} />
      <path d={LINE} /><path d={AGENCY} fillRule="evenodd" />
      <circle cx={VIOLET.cx} cy={VIOLET.cy} r={VIOLET.r} fill="var(--violet)" />
    </svg>
  );
}

/* Versão horizontal para o menu: marca + AGENCY + ponto roxo. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`logo ${className}`}>
      <Mark />
      <span className="logo-word">Agency<Dot /></span>
    </span>
  );
}

const links = [
  { href: '#experimente', label: 'Demonstração' },
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
