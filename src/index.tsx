import React, { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { App } from './app';
import { store } from './store';
import { Provider } from 'react-redux';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080/api';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
