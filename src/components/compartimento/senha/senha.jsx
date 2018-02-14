import React, { Component } from 'react';
import './senha.css';
import { FontIcon } from 'material-ui';
import BloqueadoComponent from './bloqueado/bloqueado.jsx';

class SenhaComponent extends Component {

  constructor(props) {
    super(props);
    this.senha = null;
  }

  // Desbloqueia uma url.
  desbloqueia(senha, op) {
    this.senha = senha;

    if(op === 1) { // Indica que é para desbloqueio.
      if(this.props.situacao === this.senha)
        this.props.block(1);
    }
    else { // Caso contrário é para bloqueio
      this.props.apiService.postSenha(this.senha).then(res => { // Adicionar uma senha na url corrente.
        if(res !== false) {
          this.senha = null; // Reseta a senha.
          this.props.block(0);
        }
        else
          console.log('Erro ao add senha');
      }).catch(err => {
        console.log('Erro ao add senha');
      });
    }
  }
  render() {
    console.log('senha.jsx', this.senha, this.props.situacao);

    // Se a senha estiver vazia: desbloquea.
    const bloqueado = this.props.situacao !== undefined && this.senha !== this.props.situacao ? true : false;
    return (
      <BloqueadoComponent input={this.desbloqueia.bind(this)} check={bloqueado} />
    );
  }
}

export default SenhaComponent;
