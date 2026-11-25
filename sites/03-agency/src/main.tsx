import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/oxanium';
import '@fontsource-variable/geist';
// Fraunces só aparece nos mini-sites conceito do simulador.
import '@fontsource-variable/fraunces';
import '@fontsource-variable/fraunces/wght-italic.css';
import './styles.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
