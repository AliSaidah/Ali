import { renderToString } from 'react-dom/server';
import App from './App';
import { routes, findRoute } from './routes';
import { headFor } from './seo';
import { SITE_URL, posts } from './content';

export function render(path: string) {
  return renderToString(<App route={findRoute(path)} />);
}

export { routes, headFor, SITE_URL, posts };
