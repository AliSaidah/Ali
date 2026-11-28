import { useEffect, useState } from 'react';
import type { Photo } from '../content';
import { bakes, wa, site } from '../content';
import { gsap, reducedMotion } from '../lib/motion';

/* ---------- Link com transição de página ("cortina de farinha") ---------- */
export function go(href: string) {
  if (reducedMotion) { location.href = href; return; }
  try { sessionStorage.setItem('pt', '1'); } catch { /* sem armazenamento: só navega */ }
  document.documentElement.classList.add('pt-out');
  gsap.fromTo('.pt', { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: 'power3.inOut', onComplete: () => { location.href = href; } });
}

export function Link({ href, className, children, onClick, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const internal = href.startsWith('/') && !href.startsWith('//');
  return (
    <a
      href={href}
      className={className}
      onMouseEnter={() => internal && prefetch(href)}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || !internal || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        if (href.split('#')[0] === location.pathname && href.includes('#')) return;
        if (href === location.pathname) { e.preventDefault(); return; }
        e.preventDefault();
        go(href);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

const fetched = new Set<string>();
function prefetch(href: string) {
  if (fetched.has(href)) return;
  fetched.add(href);
  const l = document.createElement('link');
  l.rel = 'prefetch'; l.href = href;
  document.head.appendChild(l);
}

/* ---------- Seta e marca ---------- */
export function Arrow({ dir = 'ne' }: { dir?: 'ne' | 'right' | 'down' }) {
  const rot = { ne: 0, right: 45, down: 135 }[dir];
  return (
    <svg className="arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false" style={rot ? { rotate: `${rot}deg` } : undefined}>
      <path d="M4 12 L12 4 M5.5 4 H12 V10.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Pão redondo com o corte na casca: o símbolo da Crosta. */
export function Boule({ className = '' }: { className?: string }) {
  return (
    <svg className={`boule ${className}`} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path className="boule-cut" d="M14 31 C 19 22, 27 16, 35 14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="logo">
      <Boule />
      <span className="logo-text">Crosta<small>pães artesanais</small></span>
    </span>
  );
}

/* ---------- Foto responsiva (WebP em 800 e 1600 px) ---------- */
export function Img({ photo, sizes = '100vw', eager = false, className = '' }: { photo: Photo; sizes?: string; eager?: boolean; className?: string }) {
  return (
    <img
      className={className}
      src={`${photo.src}-1600.webp`}
      srcSet={`${photo.src}-800.webp 800w, ${photo.src}-1600.webp 1600w`}
      sizes={sizes}
      width={photo.w}
      height={photo.h}
      alt={photo.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      {...(eager ? { fetchpriority: 'high' } : {})}
    />
  );
}

/* ---------- Próxima fornada (fuso de Brasília, o mesmo de Rio Preto) ----------
   No HTML pré-renderizado mostra os horários fixos; no navegador calcula a próxima. */
function spNow() {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)!.value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, min: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const hLabel = (t: string) => `${Number(t.slice(0, 2))}h${t.slice(3) === '00' ? '' : t.slice(3)}`;

export function nextBake(): { text: string; live: boolean } {
  const { day, min } = spNow();
  const today = bakes[day];
  const fresh = today.find((t) => min >= toMin(t) && min < toMin(t) + 30);
  if (fresh) return { text: `Fornada das ${hLabel(fresh)} saindo agora`, live: true };
  const later = today.find((t) => toMin(t) > min);
  if (later) {
    const diff = toMin(later) - min;
    return { text: diff <= 90 ? `Próxima fornada em ${diff} min (${hLabel(later)})` : `Próxima fornada hoje às ${hLabel(later)}`, live: false };
  }
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (bakes[d].length) {
      const name = i === 1 ? 'amanhã' : ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][d];
      return { text: `Próxima fornada ${name} às ${hLabel(bakes[d][0])}`, live: false };
    }
  }
  return { text: '', live: false };
}

export function Oven({ className = '' }: { className?: string }) {
  const [state, setState] = useState<{ text: string; live: boolean } | null>(null);
  useEffect(() => {
    const tick = () => setState(nextBake());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <p className={`oven${state?.live ? ' is-live' : ''} ${className}`} aria-live="polite">
      <span className="oven-dot" aria-hidden="true" />
      {state?.text ?? 'Fornadas às 7h, 11h e 16h'}
    </p>
  );
}

/* ---------- Título com ponto de corte ---------- */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow" data-reveal>{children}</p>;
}

/* ---------- Formulário de encomenda que monta a mensagem do WhatsApp ---------- */
export function OrderForm({ options, compact = false }: { options: string[]; compact?: boolean }) {
  const [f, setF] = useState({ nome: '', item: options[0], qtd: '', data: '', obs: '' });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });
  const dataBR = f.data ? f.data.split('-').reverse().join('/') : '';
  const msg = [
    `Olá, Crosta! Quero fazer uma encomenda.`,
    f.nome && `Nome: ${f.nome}`,
    `Pedido: ${f.item}${f.qtd ? ` (${f.qtd})` : ''}`,
    dataBR && `Para: ${dataBR}`,
    f.obs && `Observações: ${f.obs}`,
  ].filter(Boolean).join('\n');
  return (
    <form className={`order${compact ? ' order--compact' : ''}`} onSubmit={(e) => { e.preventDefault(); window.open(wa(msg), '_blank', 'noopener'); }}>
      <label><span>Seu nome</span><input value={f.nome} onChange={set('nome')} autoComplete="name" required /></label>
      <label><span>O que você quer</span>
        <select value={f.item} onChange={set('item')}>{options.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label><span>Quantidade</span><input value={f.qtd} onChange={set('qtd')} placeholder="Ex.: 2 pães e 6 croissants" /></label>
      <label><span>Para quando</span><input type="date" value={f.data} onChange={set('data')} /></label>
      {!compact && <label className="wide"><span>Observações</span><textarea rows={3} value={f.obs} onChange={set('obs')} placeholder="Retirada ou entrega, endereço, alergias…" /></label>}
      <button className="btn btn--crust wide" type="submit">Enviar pelo WhatsApp <Arrow /></button>
      <p className="order-note wide">Você confere a mensagem no WhatsApp antes de enviar. Atendimento: {site.fullName}.</p>
    </form>
  );
}
