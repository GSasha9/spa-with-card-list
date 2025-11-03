import { StrictMode } from 'react';
import * as ReactDom from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/store';

import 'normalize.css';
import './styles/main.scss';

const container = document.getElementById('root');

if (!container) throw new Error('Root container not found');

ReactDom.createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/spa-with-card-list">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
