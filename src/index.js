import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import './style/globals.scss';
import { BrowserRouter } from 'react-router-dom';
import { Trouvaille } from './Trouvaille';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Trouvaille/>
    </BrowserRouter>
  </>
);