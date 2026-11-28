import { menu, brl, orderInfo } from '../content';
import { Img, Arrow, Oven, OrderForm } from '../components/ui';
import { PageHead } from '../components/blocks';
import { scrollToTarget } from '../lib/motion';

export default function Cardapio() {
  return (
    <>
      <PageHead kicker="Cardápio · Padaria artesanal em Rio Preto" title={<>Feito hoje, <em>desde ontem.</em></>} intro="Pães de fermentação natural, folhados laminados com manteiga, focaccias e cafés. Os preços são por unidade, salvo indicação.">
        <div className="phead-oven" data-reveal><Oven /></div>
      </PageHead>

      <nav className="menu-tabs" aria-label="Categorias do cardápio">
        <ul className="wrap">
          {menu.map((s) => (
            <li key={s.id}><a href={`#${s.id}`} onClick={(e) => { e.preventDefault(); scrollToTarget(`#${s.id}`, -140); }}>{s.title}</a></li>
          ))}
        </ul>
      </nav>

      {menu.map((s, i) => (
        <section key={s.id} id={s.id} className={`msec${i % 2 ? ' msec--alt' : ''}`} aria-labelledby={`${s.id}-t`}>
          <div className="wrap msec-grid">
            <div className="msec-media">
              <div className="msec-img" data-photo><Img photo={s.photo} sizes="(max-width: 860px) 100vw, 40vw" /></div>
            </div>
            <div className="msec-body">
              <p className="msec-num" data-reveal>0{i + 1}</p>
              <h2 id={`${s.id}-t`} className="h2" data-split>{s.title}</h2>
              <p className="lead" data-reveal>{s.intro}</p>
              <ul className="mlist">
                {s.items.map((it) => (
                  <li key={it.name} className="mitem" data-reveal>
                    <div className="mitem-row">
                      <h3 className="mitem-name">{it.name}</h3>
                      <span className="mitem-dots" aria-hidden="true" />
                      <span className="mitem-price">{brl(it.price)}</span>
                    </div>
                    <p className="mitem-desc">{it.desc}{it.tag && <span className="tag tag--inline">{it.tag}</span>}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="order-band" id="encomendar">
        <div className="wrap order-grid">
          <div>
            <p className="eyebrow" data-reveal>Encomendas</p>
            <h2 className="h2" data-split>Quer garantir o seu?</h2>
            <p className="lead" data-reveal>Monte o pedido aqui e envie pelo WhatsApp. Para festas e eventos, peça com 48 horas de antecedência.</p>
            <a className="link-under" href="/assinaturas-e-encomendas/" data-reveal>Assinaturas e encomendas <Arrow /></a>
          </div>
          <div data-reveal><OrderForm options={orderInfo.options} /></div>
        </div>
      </section>
    </>
  );
}
