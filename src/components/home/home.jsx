import React, { Component } from 'react';
import './home.css';
import { FontIcon } from 'material-ui';

import TituloComponent from './info/titulo/titulo.jsx';
// import ExemploTextoComponent from './info/exemplo_texto/exemploTexto.jsx'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="home-dontpad">
        <TituloComponent navigate={this.props.history} />
      </div>
    );
  }
}

export default HomeComponent;
