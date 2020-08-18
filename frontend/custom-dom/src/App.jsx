import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import VistaAdmin from './components/VistaAdmin';
import AgregarLibros from './components/AgregarLibros';
import Libros from './components/Libros';

import { UsuarioContext } from './context/UsuarioProvider';

function App() {

  const { usuario } = useContext(UsuarioContext);

  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route path='/hi'>
          {
            usuario.rol === 'admin' && <VistaAdmin />
          }
          {
            usuario.rol === 'autor' && <AgregarLibros />
          }
          <Libros />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
