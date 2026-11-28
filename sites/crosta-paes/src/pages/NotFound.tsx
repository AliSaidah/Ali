import { Link, Arrow } from '../components/ui';
import { nav } from '../routes';

export default function NotFound() {
  return (
    <header className="phead nf">
      <div className="wrap">
        <p className="eyebrow">Erro 404</p>
        <h1 className="h1">Essa fornada <em>não saiu.</em></h1>
        <p className="lead">A página que você procurou não existe ou mudou de endereço.</p>
        <ul className="nf-links">
          <li><Link href="/" className="btn btn--crust">Página inicial <Arrow /></Link></li>
          {nav.map((n) => <li key={n.path}><Link href={n.path} className="link-under">{n.label}</Link></li>)}
        </ul>
      </div>
    </header>
  );
}
