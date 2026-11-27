import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, reducedMotion } from '../lib/motion';
import { skins, steps, wa } from '../content';
import { Arrow, Dot } from './Chrome';

const CYCLE_MS = 3600;

const slug = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '') || 'seunegocio';

/* Momento uau (demonstração do conceito, não um construtor de sites): o visitante digita
   o nome do negócio e vê, na hora, um mini-site com esse nome em um dos 03 estilos conceito. Enquanto ninguém mexe,
   os estilos se alternam sozinhos. */
export function Builder() {
  const ref = useRef<HTMLElement>(null);
  const [name, setName] = useState('');
  const [idx, setIdx] = useState(0);
  const [touched, setTouched] = useState(false);
  const [inView, setInView] = useState(false);
  const skin = skins[idx];
  const shown = name.trim() || 'Seu Negócio';
  const cycling = !touched && inView && !reducedMotion;

  // Alterna os estilos só enquanto a seção está na tela e ninguém interagiu.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(ref.current!);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!cycling) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % skins.length), CYCLE_MS);
    return () => clearTimeout(t);
  }, [cycling, idx]);

  // Entrada da janela do navegador ao chegar na seção.
  useGSAP(() => {
    if (reducedMotion) return;
    gsap.fromTo('.mock', { y: 70, rotateX: 12, autoAlpha: 0 }, {
      y: 0, rotateX: 0, autoAlpha: 1, duration: 1.3, ease: 'expo.out',
      scrollTrigger: { trigger: '.b-stage', start: 'top 82%', toggleActions: 'play none none none' },
    });
  }, { scope: ref });

  // Troca de estilo: os elementos do mini-site entram em sequência.
  useGSAP(() => {
    if (reducedMotion) return;
    gsap.fromTo('.mock-page > *', { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.05, ease: 'power3.out', overwrite: true });
  }, { scope: ref, dependencies: [idx] });

  const pick = (i: number) => { setTouched(true); setIdx(i); };
  const fit = Math.min(1, 10 / Math.max(shown.length, 4));
  const href = wa(`Olá! Vim pelo site da 03 Agency e quero uma prévia de verdade do site ${name.trim() ? `para ${name.trim()}` : 'do meu negócio'}. Na demonstração, gostei do estilo ${skin.label}.`);

  return (
    <section ref={ref} className="builder" id="experimente">
      <div className="wrap builder-grid">
        <div className="b-head">
          <p className="eyebrow" data-fade>Demonstração</p>
          <h2 className="title" data-split>Veja como funciona a <span className="nw"><em>prévia</em><Dot /></span></h2>
          <p className="body" data-fade>Isto é só uma demonstração do conceito: digite o nome do seu negócio para ter uma ideia. O seu site de verdade é criado pela 03, do zero, e você recebe o link para ver.</p>
        </div>

        <div className="b-controls" data-fade>
          <label className="field">
            <span className="field-label">Teste com o nome do seu negócio</span>
            <input
              type="text" value={name} maxLength={28} placeholder="Ex.: Café Aurora" autoComplete="organization"
              onChange={(e) => { setName(e.target.value); setTouched(true); }}
            />
          </label>
          <div className="chips" role="radiogroup" aria-label="Estilo do site">
            {skins.map((s, i) => (
              <button
                key={s.id} type="button" role="radio" aria-checked={i === idx}
                className={`chip${i === idx ? ' is-active' : ''}`} onClick={() => pick(i)}
              >
                {i === idx && cycling && <span key={`${idx}`} className="chip-fill" aria-hidden="true" style={{ animationDuration: `${CYCLE_MS}ms` }} />}
                <span className="chip-num">0{i + 1}</span>
                <span className="chip-name">{s.label}</span>
                <span className="chip-seg">{s.segment}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="b-stage">
          <div className={`mock skin-${skin.id}`} style={{ '--fit': fit } as React.CSSProperties} aria-label={`Prévia do estilo ${skin.label} com o nome ${shown}`} role="img">
            <div className="mock-bar">
              <i /><i /><i />
              <span className="mock-url">{slug(name)}.com.br</span>
              <span className="mock-tag">Demonstração</span>
            </div>
            <div className="mock-page">
              <div className="mock-nav">
                <b className="mock-logo">{shown}</b>
                <span className="mock-links"><i /><i /><i /></span>
              </div>
              <div className="mock-art" />
              <div className="mock-hero">
                <p className="mock-kicker">{skin.kicker}</p>
                <p className="mock-title">{skin.id === 'linho' ? skin.line : shown}</p>
                {skin.id !== 'linho' && <p className="mock-line">{skin.line}</p>}
                <span className="mock-btn">{skin.cta}</span>
              </div>
              <div className="mock-cards"><i /><i /><i /></div>
            </div>
          </div>
          <p className="caption">Demonstração com estilos conceito. Na vida real:</p>
          <ol className="flow" aria-label="Como funciona na vida real">
            {steps.map((st) => st.title).map((t, i) => (
              <li key={t}><span>0{i + 1}</span>{t}</li>
            ))}
          </ol>
        </div>

        <div className="b-cta" data-fade>
          <a className="btn btn--violet" href={href} target="_blank" rel="noopener noreferrer">Quero a minha prévia de verdade <Arrow /></a>
        </div>
      </div>
    </section>
  );
}
