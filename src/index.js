import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie';
import configureStore from './store';

import { BrowserRouter } from 'react-router-dom'

require('dotenv').config()

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
