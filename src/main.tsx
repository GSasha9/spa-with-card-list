import { StrictMode } from 'react';
import * as ReactDom from 'react-dom/client';
import { BrowserRouter } from 'react-router';

import App from './App';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

ReactDom.createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
