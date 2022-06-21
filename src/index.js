import React from 'react';
import ReactDOM from 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import CryptoState from './CryptoState';
import 'react-alice-carousel/lib/alice-carousel.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>

    <BrowserRouter>
      <CryptoState>
        <App />
      </CryptoState>
    </BrowserRouter>
  </React.StrictMode>

);
