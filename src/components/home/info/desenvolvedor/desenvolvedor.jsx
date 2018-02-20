import React, { Component } from 'react';
import './desenvolvedor.css';
import githubImg from "./../../../../lib/imgs/info/github.svg";
import programadorImg from './../../../../lib/imgs/info/programador.svg';
import gmailImg from './../../../../lib/imgs/info/gmail.svg';
// import ExemploTextoComponent from './info/exemplo_texto/exemploTexto.jsx'

class DesenvolvedorComponent extends Component {

  // Mostrar info do desenvolvedor.
  showDeveloper = () => {
    this.props.showInfo();
  }

  render() {
    return (
      <div className="home-desenvolvedor">
        <h1 id="titulo-desenvolvedor">Desenvolvedor</h1>
        <div className="conteudo-desenvolvedor">
          <span><img src={programadorImg} width="25" height="25" alt="github"/> Web app desenvolvido por <b>Vítor Caio</b></span>
          <span><img src={gmailImg} width="20" height="20" alt="github"/> vitorcaiodepaula@gmail.com </span>
          <span>
            <a href="https://github.com/vitorkaio" rel="noopener noreferrer" target="_blank" style={{color: "#6A6A6A"}}> 
              <img src={githubImg} width="20" height="20" alt="github"/> vitorkaio
            </a> 
          </span>
        </div>
        <div className="voltar-desenvolvedor" onClick={this.showDeveloper}><span>Voltar</span></div>
      </div>
    );
  }
}

export default DesenvolvedorComponent;
