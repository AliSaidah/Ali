import { useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion, scrollToTarget } from '../lib/motion';
import { steps, included, faq, contact, agency } from '../content';
import { Arrow, LogoFull, Dot } from './Chrome';

/* ---------- Processo: 03 passos, com os dígitos rolando até o número do passo ---------- */
export function Process() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.utils.toArray<HTMLElement>('.step').forEach((row, i) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 82%', toggleActions: 'play none none none' } });
      tl.from(row.querySelector('.step-rule'), { scaleX: 0, duration: 1.1, ease: 'expo.inOut' }, 0)
        .fromTo(row.querySelector('.sn-roll'), { y: 0, yPercent: 0 }, { y: 0, yPercent: (-100 * (i + 1)) / (i + 2), duration: 1.3, ease: 'power4.inOut' }, 0.1)
        .fromTo(row.querySelectorAll('.step-title, .step-text'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: 'power3.out' }, 0.35);
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="process" id="processo">
      <div className="wrap">
        <div className="sec-head">
          <p className="eyebrow" data-fade>Processo</p>
          <h2 className="title" data-split>Da prévia ao site no ar, em <em>03</em> <span className="nw">passos<Dot /></span></h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-rule" aria-hidden="true" />
              <span className="sn" aria-hidden="true">
                <span>0</span>
                <span className="sn-mask"><span className="sn-roll" style={{ transform: `translateY(${(-100 * (i + 1)) / (i + 2)}%)` }}>{Array.from({ length: i + 2 }, (_, d) => <span key={d}>{d}</span>)}</span></span>
              </span>
              <h3 className="step-title"><span className="sr-only">Passo {i + 1}: </span>{s.title}</h3>
              <p className="step-text">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="sec-cta" data-fade>
          <a className="btn btn--violet" href={contact.href} target="_blank" rel="noopener noreferrer">Começar pelo passo 01 <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------- O que vem em todo site ---------- */
export function Included() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (reducedMotion) return;
    gsap.fromTo('.inc', { autoAlpha: 0, y: 36 }, {
      autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: { each: 0.08 },
      scrollTrigger: { trigger: '.inc-grid', start: 'top 80%', toggleActions: 'play none none none' },
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="included" id="inclui">
      <div className="wrap">
        <div className="sec-head sec-head--split">
          <h2 className="title" data-split>O que vem em <em>todo</em> <span className="nw">site<Dot /></span></h2>
          <p className="body" data-fade>Cada projeto tem a sua cara, mas estes cuidados estão sempre lá.</p>
        </div>
        <ul className="inc-grid">
          {included.map((it, i) => (
            <li key={it.title} className="inc">
              <span className="inc-num">0{i + 1}</span>
              <h3 className="inc-title">{it.title}</h3>
              <p className="inc-text">{it.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Perguntas ---------- */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="faq" id="perguntas">
      <div className="wrap faq-grid">
        <div className="sec-head">
          <p className="eyebrow" data-fade>Perguntas</p>
          <h2 className="title" data-split>Antes de você <span className="nw"><em>perguntar</em><Dot /></span></h2>
        </div>
        <div className="faq-list" data-fade>
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`qa${isOpen ? ' is-open' : ''}`}>
                <h3>
                  <button type="button" className="qa-q" aria-expanded={isOpen} aria-controls={`qa-${i}`} id={`qa-q-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                    <span>{f.q}</span>
                    <span className="qa-icon" aria-hidden="true"><i /><i /></span>
                  </button>
                </h3>
                <div className="qa-a" id={`qa-${i}`} role="region" aria-labelledby={`qa-q-${i}`}>
                  <div><p>{f.a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Chamada final + rodapé ---------- */
export function Final() {
  return (
    <section className="final" id="contato">
      <div className="wrap">
        <p className="eyebrow" data-fade>Próximo passo</p>
        <h2 className="final-title" data-split>Vamos fazer o <em>seu?</em></h2>
        <div className="final-foot" data-fade>
          <p className="body">Mande o nome e o Instagram do seu negócio pelo WhatsApp. A gente responde e começa a sua prévia.</p>
          <a className="btn btn--violet btn--lg" href={contact.href} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <Arrow /></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const phone = agency.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <LogoFull />
        <p>{agency.tagline}</p>
        <a href={contact.href} target="_blank" rel="noopener noreferrer">WhatsApp {phone}</a>
        <p>© {agency.year} {agency.name}</p>
        <button type="button" className="link-under" onClick={() => scrollToTarget('#topo')}>Voltar ao topo</button>
      </div>
    </footer>
  );
}
