import { useEffect } from 'react';
import type { Route } from './routes';
import { Nav, Footer, FloatCta, Crumbs, PageCurtain } from './components/Layout';
import Home from './pages/Home';
import Cardapio from './pages/Cardapio';
import Assinaturas from './pages/Assinaturas';
import { BlogIndex, PostPage } from './pages/Blog';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import NotFound from './pages/NotFound';
import { gsap, ScrollTrigger, SplitText, startLenis, reducedMotion } from './lib/motion';

function Page({ route }: { route: Route }) {
  switch (route.page) {
    case 'home': return <Home />;
    case 'cardapio': return <Cardapio />;
    case 'assinaturas': return <Assinaturas />;
    case 'blog': return <BlogIndex />;
    case 'post': return <PostPage post={route.post!} />;
    case 'sobre': return <Sobre />;
    case 'contato': return <Contato />;
    default: return <NotFound />;
  }
}

/* Animações de entrada, iguais em todas as páginas:
   títulos [data-split] sobem palavra por palavra, blocos [data-reveal] aparecem,
   fotos [data-photo] se abrem de baixo para cima (clip-path limpo ao terminar). */
function useReveals() {
  useEffect(() => {
    (window as unknown as { __crosta?: boolean }).__crosta = true;
    startLenis();
    const html = document.documentElement;
    const float = ScrollTrigger.create({ start: 500, end: 'max', toggleClass: { targets: html, className: 'show-float' } });
    if (reducedMotion) return () => float.kill();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('main [data-split], footer [data-split]').forEach((el) => {
        const split = SplitText.create(el, { type: 'words', mask: 'words', aria: 'none' });
        gsap.set(el, { visibility: 'visible' });
        gsap.fromTo(split.words, { yPercent: 110 }, {
          yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: 0.05,
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
      gsap.utils.toArray<HTMLElement>('main [data-reveal]').forEach((el) => {
        gsap.fromTo(el, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' },
        });
      });
      gsap.utils.toArray<HTMLElement>('main [data-photo]').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(100% 0% 0% 0%)' }, {
          clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut',
          onComplete: () => { el.style.clipPath = 'none'; }, // sem recorte ativo durante a rolagem
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        });
      });
    });
    const id = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => { clearTimeout(id); float.kill(); ctx.revert(); };
  }, []);
}

export default function App({ route }: { route: Route }) {
  useReveals();
  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Nav current={route.path} />
      <main id="conteudo" className={`page page--${route.page}`}>
        {route.page !== 'home' && route.page !== 'notfound' && <div className="wrap"><Crumbs route={route} /></div>}
        <Page route={route} />
      </main>
      <Footer />
      <FloatCta />
      <PageCurtain />
    </>
  );
}
