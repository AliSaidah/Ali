import { ReactNode, useRef } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';

export function MagneticLink({
  href, children, className = '', strength = 0.35, cursor, onClick,
}: { href: string; children: ReactNode; className?: string; strength?: number; cursor?: string; onClick?: (e: React.MouseEvent) => void }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useGSAP(() => {
    const el = ref.current!;
    if (reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;
    const inner = el.querySelector('.mag-inner');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' });
    const ixTo = inner ? gsap.quickTo(inner, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' }) : null;
    const iyTo = inner ? gsap.quickTo(inner, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' }) : null;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * strength); yTo(dy * strength); ixTo?.(dx * strength * 0.4); iyTo?.(dy * strength * 0.4);
    };
    const leave = () => { xTo(0); yTo(0); ixTo?.(0); iyTo?.(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, { scope: ref });

  const external = href.startsWith('http');
  return (
    <a ref={ref} href={href} className={className} data-cursor={cursor} onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span className="mag-inner">{children}</span>
    </a>
  );
}

export const Icon = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.03c-.24.68-1.42 1.3-1.96 1.35-.5.05-.97.23-3.28-.68-2.78-1.1-4.54-3.95-4.68-4.13-.13-.18-1.11-1.48-1.11-2.83 0-1.35.71-2.01.96-2.29.25-.27.55-.34.73-.34l.52.01c.17 0 .39-.06.61.47.23.55.77 1.9.84 2.04.07.14.11.3.02.48-.09.18-.14.3-.27.46-.14.16-.29.36-.41.48-.14.14-.28.29-.12.56.16.27.71 1.17 1.52 1.9 1.05.93 1.93 1.22 2.2 1.36.27.14.43.11.59-.07.16-.18.68-.8.86-1.07.18-.27.36-.23.61-.14.25.09 1.59.75 1.86.89.27.14.45.2.52.32.07.11.07.66-.17 1.33Z"/></svg>
  ),
  Arrow: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M8 6h10v10"/></svg>
  ),
  Star: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z"/></svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z"/></svg>
  ),
};
