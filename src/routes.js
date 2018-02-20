import React from 'react'
import { Switch, Route } from 'react-router-dom'

import HomeComponent from './components/home/home.jsx';
import CompartimentoComponent from './components/compartimento/compartimento.jsx';
import ErroServidorComponent from './components/pagina_erro/pagina_erro.jsx';

// Declaration of routes for at sub-routes of app.

const Routes = () => (
  <main>
    <Switch>
      <Route exact path='/' component={HomeComponent}/>
      <Route exact path='/3a46d48036bd86d55c72bbfee99bbbf6-erro-404' component={ErroServidorComponent}/>
      <Route exact path='/*' component={CompartimentoComponent}/>
    </Switch>
  </main>
)

export default Routes