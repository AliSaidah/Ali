import { fullAddress, mapsUrl, hours, closedLabel, phoneLabel, wa, faqVisit, orderInfo, photos } from '../content';
import { Img, Arrow, Oven, OrderForm } from '../components/ui';
import { PageHead, Faq } from '../components/blocks';

export default function Contato() {
  return (
    <>
      <PageHead kicker="Contato · Redentora, São José do Rio Preto" title={<>Passa aqui, <em>o forno está ligado.</em></>} intro="Endereço, horários e WhatsApp da Crosta. Para encomendas, use o formulário: ele monta a mensagem para você." />
      <section className="contact">
        <div className="wrap contact-grid">
          <div className="ccard" data-reveal>
            <h2 className="ccard-h">Endereço</h2>
            <address className="ccard-big">{fullAddress}</address>
            <a className="btn btn--crust" href={mapsUrl} target="_blank" rel="noopener noreferrer">Abrir no Google Maps <Arrow /></a>
          </div>
          <div className="ccard" data-reveal>
            <h2 className="ccard-h">Horários</h2>
            <ul className="hours">
              {hours.map((h) => <li key={h.label}><span>{h.label}</span><span>{h.opens.slice(0, 2)}h às {h.closes.slice(0, 2)}h</span></li>)}
            </ul>
            <p className="ccard-note">{closedLabel}</p>
            <Oven />
          </div>
          <div className="ccard ccard--dark" data-reveal>
            <h2 className="ccard-h">WhatsApp</h2>
            <p className="ccard-big">{phoneLabel}</p>
            <a className="btn btn--flour" href={wa('Olá, Crosta! Vim pelo site.')} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <Arrow /></a>
          </div>
        </div>
      </section>
      <section className="order-band">
        <div className="wrap order-grid">
          <div>
            <h2 className="h2" data-split>Fazer uma encomenda</h2>
            <p className="lead" data-reveal>{orderInfo.text}</p>
            <div className="order-img" data-photo><Img photo={photos.croissant} sizes="(max-width: 860px) 100vw, 45vw" /></div>
          </div>
          <div data-reveal><OrderForm options={orderInfo.options} /></div>
        </div>
      </section>
      <Faq items={faqVisit} title="Antes de vir" />
    </>
  );
}
