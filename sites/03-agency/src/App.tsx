import { useEffect, useState } from 'react';
import { startLenis, ScrollTrigger, SplitText, gsap, useGSAP, reducedMotion } from './lib/motion';
import { Nav, Arrow } from './components/Chrome';
import { Hero } from './components/Hero';
import { Builder } from './components/Builder';
import { Process, Included, Faq, Final, Footer } from './components/Sections';
import { contact } from './content';

export default function App() {
  const [fonts, setFonts] = useState(false);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    startLenis();
    // SplitText precisa das fontes finais para medir as linhas corretamente.
    const t = setTimeout(() => setFonts(true), 2500);
    document.fonts.ready.then(() => { clearTimeout(t); setFonts(true); });
    return () => clearTimeout(t);
  }, []);

  // Títulos de seção sobem palavra por palavra (com máscara); textos marcados com data-fade sobem e aparecem.
  useGSAP(() => {
    if (!fonts) return;
    document.documentElement.classList.add('is-ready');
    const float = ScrollTrigger.create({
      trigger: '.hero', start: 'bottom 70%', end: 'max',
      toggleClass: { targets: document.documentElement, className: 'show-float' },
    });
    // Barra do menu sólida (cor de papel) depois que o topo azul sai da tela.
    const solid = ScrollTrigger.create({
      trigger: '.hero', start: 'bottom 72px', end: 'max',
      toggleClass: { targets: '.nav-wrap', className: 'is-solid' },
    });
    if (reducedMotion) return () => { float.kill(); solid.kill(); };
    gsap.utils.toArray<HTMLElement>('[data-split]').forEach((el) => {
      const split = SplitText.create(el, { type: 'words', mask: 'words' });
      gsap.from(split.words, {
        yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.06,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      });
      const dot = el.querySelector('.vdot');
      if (dot) gsap.fromTo(dot, { scale: 0 }, {
        scale: 1, duration: 0.7, ease: 'back.out(3)', delay: 0.15 + split.words.length * 0.06,
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
      });
    });
    gsap.utils.toArray<HTMLElement>('[data-fade]').forEach((el) => {
      gsap.fromTo(el, { autoAlpha: 0, y: 26 }, {
        autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
      });
    });
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => { clearTimeout(id); float.kill(); solid.kill(); };
  }, { dependencies: [fonts] });

  return (
    <>
      <a className="skip" href="#experimente">Pular para o conteúdo</a>
      <Nav />
      {fonts && (
        <>
          <main>
            <Hero />
            <Builder />
            <Process />
            <Included />
            <Faq />
            <Final />
          </main>
          <Footer />
        </>
      )}
      <a className="float-cta" href={contact.href} target="_blank" rel="noopener noreferrer">
        Pedir prévia <Arrow />
      </a>
    </>
  );
}
