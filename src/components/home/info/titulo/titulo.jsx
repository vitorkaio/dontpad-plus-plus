import React, { Component } from 'react';
import './titulo.css';

import { TextField, RaisedButton } from 'material-ui';

class TituloComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {url: ""};
  }

  // Entrada da url
  inputUrl = (e) => {
    this.setState({url: e.target.value});
  }

  navigateToUrl = (event) => {
    event.preventDefault(); // Impede de submeter o formulário

    try {
      this.props.navigate.push(this.state.url);
    } catch (error) {
      this.props.navigate.push("/");
    }
  }

  render() {
    return (
      <div className="home-titulo">
        <h1 id="titulo">Dontpad ++</h1>
        <div className="home-titulo-cont">
          <div>
            <form className="home-titulo-input" onSubmit={this.navigateToUrl}>
              <TextField value={this.state.url} onChange={this.inputUrl} hintText="Digite uma url..." />
              <RaisedButton label="Acessar" primary={true} style={{marginLeft: 15}} onClick={this.navigateToUrl} />
            </form>
          </div>
          <div className="home-titulo-exemplo">
            <span>Exemplo: curso/provas</span>
            <span>Crie pastas, curso/provas/matemática</span>
            <span>Bloqueie sua url</span>
            <span>Faça upload de arquivos (max - 2mb)</span>
          </div>
        </div>
      </div>
    );
  }
}

export default TituloComponent;
