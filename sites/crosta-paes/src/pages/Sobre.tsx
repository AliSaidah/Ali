import { about, photos } from '../content';
import { Img, Link, Arrow } from '../components/ui';
import { PageHead } from '../components/blocks';

export default function Sobre() {
  return (
    <>
      <PageHead kicker="Sobre a Crosta · São José do Rio Preto" title={<>Pão que leva <em>tempo.</em></>} intro={about.intro} />
      <div className="wrap about-photo" data-photo><Img photo={photos.shelves} eager sizes="(max-width: 1360px) 100vw, 1360px" /></div>
      <section className="about">
        <div className="wrap about-grid">
          <h2 className="h2" data-split>Da véspera até o forno.</h2>
          <div className="about-text">
            {about.paragraphs.map((p) => <p key={p.slice(0, 20)} data-reveal>{p}</p>)}
          </div>
        </div>
      </section>
      <section className="manifest manifest--light">
        <div className="wrap">
          <p className="eyebrow" data-reveal>Quatro ingredientes</p>
          <ul className="value-grid">
            {about.values.map((v, i) => (
              <li key={v.title} data-reveal>
                <span className="value-num">0{i + 1}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="split-cta">
        <div className="wrap split-grid">
          <div className="split-img" data-photo><Img photo={photos.display} sizes="(max-width: 860px) 100vw, 50vw" /></div>
          <div>
            <h2 className="h2" data-split>Venha provar.</h2>
            <p className="lead" data-reveal>A loja abre de terça a domingo, a partir das 7h, com a primeira fornada do dia.</p>
            <div className="visit-actions" data-reveal>
              <Link href="/cardapio/" className="btn btn--crust">Ver o cardápio <Arrow /></Link>
              <Link href="/contato/" className="link-under">Endereço e horários</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
