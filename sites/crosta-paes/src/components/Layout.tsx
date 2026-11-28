import { useEffect, useRef, useState } from 'react';
import { nav, type Route } from '../routes';
import { site, fullAddress, hours, closedLabel, mapsUrl, wa, phoneLabel } from '../content';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import { Link, Logo, Arrow, Oven } from './ui';

const orderHref = wa('Olá, Crosta! Vim pelo site e quero fazer um pedido.');

export function Nav({ current }: { current: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => ref.current?.classList.toggle('is-scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { document.documentElement.classList.toggle('menu-open', open); }, [open]);

  useGSAP(() => {
    if (!open || reducedMotion) return;
    gsap.fromTo('.mmenu li', { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.05 });
  }, { dependencies: [open] });

  const isCurrent = (p: string) => current === p || (p === '/blog/' && current.startsWith('/blog/'));

  return (
    <>
      <header ref={ref} className={`nav-wrap${current === '/' ? ' nav-wrap--hero' : ''}`}>
        <nav className="nav wrap" aria-label="Principal">
          <Link href="/" className="nav-logo" aria-label="Crosta, página inicial"><Logo /></Link>
          <ul className="nav-links">
            {nav.map((n) => (
              <li key={n.path}><Link href={n.path} aria-current={isCurrent(n.path) ? 'page' : undefined}>{n.label}</Link></li>
            ))}
          </ul>
          <a className="btn btn--sm btn--char nav-cta" href={orderHref} target="_blank" rel="noopener noreferrer">Pedir <Arrow /></a>
          <button className="menu-btn" aria-expanded={open} aria-controls="mmenu" onClick={() => setOpen(!open)}>
            <span>{open ? 'Fechar' : 'Menu'}</span>
          </button>
        </nav>
      </header>
      <div id="mmenu" className="mmenu" hidden={!open}>
        <ul>
          <li><Link href="/">Início</Link></li>
          {nav.map((n) => <li key={n.path}><Link href={n.path} aria-current={isCurrent(n.path) ? 'page' : undefined}>{n.label}</Link></li>)}
        </ul>
        <div className="mmenu-foot">
          <Oven />
          <a className="btn btn--crust" href={orderHref} target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp <Arrow /></a>
        </div>
      </div>
    </>
  );
}

export function Crumbs({ route }: { route: Route }) {
  if (!route.label) return null;
  return (
    <nav className="crumbs" aria-label="Você está em">
      <ol>
        <li><Link href="/">Início</Link></li>
        {route.page === 'post' && <li><Link href="/blog/">Blog</Link></li>}
        <li aria-current="page">{route.page === 'post' ? 'Artigo' : route.label}</li>
      </ol>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <p className="footer-big" data-split>Pão que leva <em>tempo.</em></p>
          <a className="btn btn--flour" href={orderHref} target="_blank" rel="noopener noreferrer">Pedir pelo WhatsApp <Arrow /></a>
        </div>
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="footer-tag">{site.tagline} Padaria artesanal em {site.address.city} – {site.address.state}.</p>
          </div>
          <div>
            <h2 className="footer-h">Visite</h2>
            <address><a href={mapsUrl} target="_blank" rel="noopener noreferrer">{fullAddress}</a></address>
            <p><a href={orderHref} target="_blank" rel="noopener noreferrer">WhatsApp {phoneLabel}</a></p>
          </div>
          <div>
            <h2 className="footer-h">Horários</h2>
            <ul className="footer-hours">
              {hours.map((h) => <li key={h.label}><span>{h.label}</span><span>{h.opens.slice(0, 2)}h–{h.closes.slice(0, 2)}h</span></li>)}
            </ul>
            <p className="footer-closed">{closedLabel}</p>
          </div>
          <div>
            <h2 className="footer-h">Páginas</h2>
            <ul className="footer-links">
              {nav.map((n) => <li key={n.path}><Link href={n.path}>{n.label}</Link></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 {site.fullName}</p>
          <p>{site.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}

export function FloatCta() {
  return (
    <a className="float-cta" href={orderHref} target="_blank" rel="noopener noreferrer">
      Pedir <Arrow />
    </a>
  );
}

/* Cortina de farinha: cobre a tela ao sair e se recolhe ao chegar. */
export function PageCurtain() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>('.pt');
    const html = document.documentElement;
    if (!el) return;
    if (html.classList.contains('pt-in')) {
      gsap.fromTo(el, { yPercent: 0 }, { yPercent: -100, duration: 0.7, ease: 'power3.inOut', delay: 0.05, onComplete: () => { html.classList.remove('pt-in'); gsap.set(el, { yPercent: 100, clearProps: 'visibility' }); } });
    }
    // Voltar pelo histórico (bfcache) com a cortina fechada: reabre.
    const onShow = (e: PageTransitionEvent) => { if (e.persisted) { html.classList.remove('pt-out', 'pt-in'); gsap.set(el, { yPercent: 100 }); } };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);
  return (
    <div className="pt" aria-hidden="true">
      <span className="pt-logo"><Logo /></span>
    </div>
  );
}
