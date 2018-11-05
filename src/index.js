import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';

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
