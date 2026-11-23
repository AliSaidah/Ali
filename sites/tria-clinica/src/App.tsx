import { useEffect, useState } from 'react';
import { startLenis, getLenis, ScrollTrigger } from './lib/motion';
import { Intro, Nav } from './components/Chrome';
import { Hero, Concept, Venn, Pillars, Space, Contact, Footer } from './components/Sections';
import { contact, preview, site } from './content';

function PreviewBadge() {
  if (!preview.enabled) return null;
  const href = preview.whatsapp
    ? `https://wa.me/${preview.whatsapp}?text=${encodeURIComponent(`Olá! Vi a prévia do site da ${site.fullName} e tenho interesse.`)}`
    : null;
  return (
    <div className="preview-badge" role="note">
      <span className="preview-dot" aria-hidden="true" />
      <span className="preview-text">Prévia feita para você{preview.agency ? ` · ${preview.agency}` : ''}</span>
      {href && <a href={href} target="_blank" rel="noopener noreferrer">Quero este site</a>}
    </div>
  );
}

export default function App() {
  const [ready, setReady] = useState(false);
  const [fonts, setFonts] = useState(false);

  useEffect(() => {
    history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    const lenis = startLenis();
    lenis?.stop();
    // SplitText precisa das fontes finais para medir as linhas corretamente.
    const t = setTimeout(() => setFonts(true), 2500);
    document.fonts.ready.then(() => { clearTimeout(t); setFonts(true); });
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    getLenis()?.start();
    document.documentElement.classList.add('is-ready');
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    // O botão flutuante só aparece depois que o botão do topo sai da tela.
    const st = ScrollTrigger.create({
      trigger: '.hero', start: 'bottom 60%', end: 'max',
      toggleClass: { targets: document.documentElement, className: 'show-float' },
    });
    return () => { clearTimeout(id); st.kill(); };
  }, [ready]);

  return (
    <>
      <Intro onDone={() => setReady(true)} />
      <a className="skip" href="#conceito">Pular para o conteúdo</a>
      <Nav ready={ready} />
      {fonts && (
        <>
          <main>
            <Hero ready={ready} />
            <Concept />
            <Venn />
            <Pillars />
            <Space />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      <PreviewBadge />
      <a className="float-cta" href={contact.href} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Clínica Tria">
        Contato <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
