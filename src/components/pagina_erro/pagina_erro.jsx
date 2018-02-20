import React, { Component } from 'react';
import './pagina_erro.css';
import { FlatButton } from 'material-ui';

class ErroServidorComponent extends Component {

  navigateToHome = () => {
    this.props.history.push("/");
  }

render() {
  return(
    <div className="erro-servidor-500">
      <h1>500</h1>
      <h2>Erro interno no servidor</h2>
      <div id="erro-servidor-voltar" onClick={this.navigateToHome}>
        Voltar
      </div>
    </div>
  );
}

}// Fim do componente.

export default ErroServidorComponent