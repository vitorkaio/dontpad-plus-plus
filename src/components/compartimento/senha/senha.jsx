import React, { Component } from 'react';
import './senha.css';
import BloqueadoComponent from './bloqueado/bloqueado.jsx';
import { connect } from 'react-redux';
import * as senhaActions from './../../../redux/actions/senhaActions';

class SenhaComponent extends Component {

  constructor(props) {
    super(props);
    this.senha = null;
    // console.log(this.props.senhaReducer);
  }

  // Desbloqueia uma url.
  desbloqueia = (senha, op) => {
    this.senha = senha;

    if(op === 1) { // Indica que é para desbloqueio.
      if(this.props.senhaReducer.get("senha") === this.senha) {
        this.props.desblockComponente();
        this.props.setControle();
      }
    }
    else { // Caso contrário é para bloqueio.
      this.props.insertSenha(undefined);
      this.props.popControle();
      this.props.apiService.postSenha(this.senha).then(res => { // Adicionar uma senha na url corrente.
        if(res !== false) {
          this.senha = null; // Reseta a senha.
          // this.props.block(0);
        }
        else
          console.log('Erro ao add senha');
      }).catch(err => {
        console.log('Erro ao add senha');
      });
    }
  }
  render() {
    // console.log('senha.jsx', this.senha, this.props.situacao);
    // Se a senha estiver vazia: desbloquea.
    const bloqueado = this.props.senhaReducer.get("isBlock");
    return (
      <BloqueadoComponent input={this.desbloqueia} check={bloqueado} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    senhaReducer: state.senhaReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insertSenha: (senha) => {
      dispatch(senhaActions.insertSenha(senha))
    },
    blockComponente: () => {
      dispatch(senhaActions.blockComponente())
    },
    desblockComponente: () => {
      dispatch(senhaActions.desblockComponente())
    },
    setControle: () => {
      dispatch(senhaActions.setControle())
    },
    popControle: () => {
      dispatch(senhaActions.popControle())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SenhaComponent);

