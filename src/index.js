import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

import '@fortawesome/fontawesome-free/css/solid.css';
import '@fortawesome/fontawesome-free/css/fontawesome.css';

import './base.css';

require('dotenv').config();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={configureStore()}>
        <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
