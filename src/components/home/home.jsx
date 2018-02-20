import React, { Component } from 'react';
import './home.css';
import TituloComponent from './info/titulo/titulo.jsx';
// import ExemploTextoComponent from './info/exemplo_texto/exemploTexto.jsx'

class HomeComponent extends Component {

  render() {
    return (
      <div className="home-dontpad">
        <TituloComponent navigate={this.props.history} />
      </div>
    );
  }
}

export default HomeComponent;
