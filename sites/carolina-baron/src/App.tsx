import { useEffect, useState } from 'react';
import { startLenis, getLenis, ScrollTrigger } from './lib/motion';
import { Preloader, Cursor, Nav, Atmosphere } from './components/Chrome';
import { Hero, Marquee, Manifesto, Method, Procedures, Visit, Cta, Footer } from './components/Sections';
import { waBooking, preview, site } from './content';

function PreviewBadge() {
  if (!preview.enabled) return null;
  const href = preview.whatsapp
    ? `https://wa.me/${preview.whatsapp}?text=${encodeURIComponent(`Olá! Vi a prévia do site da ${site.title} ${site.name} e tenho interesse.`)}`
    : null;
  return (
    <div className="preview-badge" role="note">
      <span className="preview-dot" aria-hidden="true" />
      <span className="preview-text">Prévia feita para você{preview.agency ? ` · ${preview.agency}` : ''}</span>
      {href && <a href={href} target="_blank" rel="noopener noreferrer">Quero este site</a>}
    </div>
  );
}
import { Icon } from './components/ui';

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
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <Atmosphere />
      <a className="skip" href="#filosofia">Pular para o conteúdo</a>
      <Nav ready={ready} />
      {fonts && (
        <>
          <main>
            <Hero ready={ready} />
            <Marquee />
            <Manifesto />
            <Method />
            <Procedures />
            <Visit />
            <Cta />
          </main>
          <Footer />
        </>
      )}
      <PreviewBadge />
      <a className="float-wa" href={waBooking} target="_blank" rel="noopener noreferrer" aria-label="Agendar pelo WhatsApp">
        <Icon.WhatsApp /> <span>Agendar</span>
      </a>
    </>
  );
}
