import { plans, subscriptionSteps, orderInfo, faqOrders, photos, brl, wa } from '../content';
import { Img, Arrow, OrderForm } from '../components/ui';
import { PageHead, Faq } from '../components/blocks';

export default function Assinaturas() {
  return (
    <>
      <PageHead kicker="Assinatura de pães e encomendas em Rio Preto" title={<>Pão fresco toda semana, <em>sem fila.</em></>} intro="Assine e receba pão de fermentação natural toda semana ou a cada 15 dias. Para festas, cafés da manhã e eventos, faça uma encomenda." />

      <section className="plans" aria-labelledby="planos-t">
        <div className="wrap">
          <h2 id="planos-t" className="sr-only">Planos de assinatura</h2>
          <ul className="plan-grid">
            {plans.map((p) => (
              <li key={p.id} className={`plan${p.featured ? ' plan--featured' : ''}`} data-reveal>
                {p.featured && <span className="tag">Mais escolhido</span>}
                <h3 className="plan-name">{p.name}</h3>
                <p className="plan-desc">{p.desc}</p>
                <p className="plan-price"><strong>{brl(p.price)}</strong><span>/{p.period}</span></p>
                <ul className="plan-items">{p.items.map((it) => <li key={it}>{it}</li>)}</ul>
                <a className={`btn ${p.featured ? 'btn--flour' : 'btn--crust'}`} href={wa(`Olá, Crosta! Quero assinar o plano ${p.name} (${brl(p.price)}/${p.period}).`)} target="_blank" rel="noopener noreferrer">
                  Assinar pelo WhatsApp <Arrow />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="steps">
        <div className="wrap">
          <h2 className="h2" data-split>Como funciona a assinatura</h2>
          <ol className="step-list">
            {subscriptionSteps.map((s, i) => (
              <li key={s.title} data-reveal>
                <span className="step-num">{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="order-band" id="encomendar">
        <div className="wrap order-grid">
          <div>
            <p className="eyebrow" data-reveal>Encomendas</p>
            <h2 className="h2" data-split>{orderInfo.title}</h2>
            <p className="lead" data-reveal>{orderInfo.text}</p>
            <div className="order-img" data-photo><Img photo={photos.painChoc} sizes="(max-width: 860px) 100vw, 45vw" /></div>
          </div>
          <div data-reveal><OrderForm options={orderInfo.options} /></div>
        </div>
      </section>

      <Faq items={faqOrders} />
    </>
  );
}
