import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components';

const DEFAULT_PLACES_COUNT = 5;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App placesCount={DEFAULT_PLACES_COUNT} />
  </React.StrictMode>,
);
