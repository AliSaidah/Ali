import { hydrateRoot } from 'react-dom/client';
import '@fontsource/young-serif/400.css';
import '@fontsource-variable/instrument-sans';
import './styles.css';
import App from './App';
import { findRoute } from './routes';

const start = () => hydrateRoot(document.getElementById('root')!, <App route={findRoute(location.pathname)} />);
// As animações medem o texto: espera as fontes (no máximo 1,5 s).
Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]).then(start);
