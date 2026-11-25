import { useRef } from 'react';
import { gsap, useGSAP, reducedMotion, scrollToTarget } from '../lib/motion';
import { hero, contact } from '../content';
import { Arrow, Dot, Mark } from './Chrome';

/* Topo: o título "se monta" na frente do visitante.
   Primeiro surgem blocos de rascunho (como um site em construção), depois o texto
   sobe por dentro deles e os blocos se recolhem. O 03 gigante rola os dígitos até o 3. */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.set('.hl-txt', { yPercent: 108 })
      .fromTo('.hero-kicker > *', { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, 0)
      .fromTo('.hl-skel', { scaleX: 0 }, { scaleX: 1, duration: 0.7, stagger: 0.12, ease: 'power3.inOut' }, 0.05)
      .to('.hl-txt', { yPercent: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' }, 0.7)
      .set('.hl-skel', { transformOrigin: '100% 50%' }, 0.7)
      .to('.hl-skel', { scaleX: 0, duration: 0.6, stagger: 0.12, ease: 'power3.inOut' }, 0.78)
      // A marca do logo se monta: ponto branco, zero e três sobem, ponto central aparece.
      .fromTo('.hero-mark .mk-dot', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.8, ease: 'back.out(3)' }, 0.25)
      .fromTo('.hero-mark .mk-zero, .hero-mark .mk-three', { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 1.4, stagger: 0.12, ease: 'expo.out' }, 0.35)
      .fromTo('.hero-title .vdot', { scale: 0 }, { scale: 1, duration: 0.7, ease: 'back.out(3)' }, 1.5)
      .fromTo('.hero-lead, .hero-actions > *', { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 1.15);
  }, { scope: ref });

  return (
    <section ref={ref} className="hero" id="topo">
      <Mark className="hero-mark" />

      <div className="hero-inner wrap">
        <p className="hero-kicker">
          <span className="status"><span className="status-dot" aria-hidden="true" />{hero.status}</span>
          <span>{hero.kicker}</span>
        </p>

        <h1 className="hero-title">
          {hero.title.map((line, i) => (
            <span key={i} className="hl">
              <span className="hl-in">
                <span className="hl-skel" aria-hidden="true" />
                <span className="hl-txt">
                  {line.map((s, j) => ('dot' in s ? <Dot key={j} /> : 'em' in s && s.em ? <em key={j}>{s.t}</em> : <span key={j}>{s.t}</span>))}
                </span>
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-foot">
          <p className="hero-lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn--white" href={contact.href} target="_blank" rel="noopener noreferrer">Pedir minha prévia <Arrow /></a>
            <a className="link-under" href="#experimente" onClick={(e) => { e.preventDefault(); scrollToTarget('#experimente'); }}>
              Experimente com o seu nome <Arrow dir="down" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
