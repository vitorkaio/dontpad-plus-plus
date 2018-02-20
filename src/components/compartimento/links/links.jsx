import React, { Component } from 'react';
import './links.css';
import { FontIcon } from 'material-ui';

const sep = '@@-@3';

class LinksComponent extends Component {

  constructor(props) {
    super(props);

    this.lista = [];
    this.erro = false;
  }

  navegaLink(link) {
    link = link.split(sep).join('/');
    // console.log(link);
    this.props.navigate.replace('/' + link);
    this.props.navigate.go('/' + link);
  }

  // Renderiza uma lista.
  renderizaLinks() {
    const list = [];

    for(let x = 0; x < this.lista.length; x++) {
      const links = this.lista[x].split(sep).join('');
      const aux = links.split('/');
      const link = aux[aux.length - 1];
      list.push(
        <div key={x} onClick={() => {this.navegaLink(this.lista[x])}} id="meuChip">
          <span><FontIcon className="material-icons">folder</FontIcon></span>
          <p>{link}</p>
        </div>
      )
    }
    return list;
  }

  render() {
    // console.log('**** Render links.jsx ****');
    this.lista = [...this.props.lista];
    return(
      <div className="links-compartimento">
        {this.renderizaLinks()}
      </div>
    );
  };
}

export default LinksComponent;