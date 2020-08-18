import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';

import UsuarioProvider from './context/UsuarioProvider';
import LibrosProvider from './context/LibrosProvider';

ReactDOM.render(
  <React.StrictMode>
    <UsuarioProvider>
      <LibrosProvider>
        <App />
      </LibrosProvider>
    </UsuarioProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
