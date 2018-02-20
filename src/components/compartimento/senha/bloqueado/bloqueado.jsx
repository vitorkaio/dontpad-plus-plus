import React, { Component } from 'react';
import './bloqueado.css';
import { FontIcon, Dialog, FlatButton, TextField, IconButton } from 'material-ui';

class BloqueadoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, senha: ''};
    this.senha = '';
    this.title = null;
    this.icon = null;
    this.tooltip = null;
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.senha = '';
    this.setState({open: false});
  };

  // input do campo de texto.
  inputSenha = (e) => {
    this.senha = e.target.value;
    this.setState({senha: e.target.value});
  }

  // Envia a senha, 1 para desbloqueio e 0 para bloquear.
  submit = () => {
    this.setState({open: false}, () => {
      if(this.props.check)
        this.props.input(this.senha, 1);
      else
        this.props.input(this.senha, 0);
      
      this.senha = '';
    });
  }

  // Se check for true: desbloquea, caso contrário bloquea.
  modalRender() {
    if(this.props.check) {
      this.title = 'Desbloquear - Digite a senha';
      this.tooltip = 'Desbloquear url';
      this.icon = 'lock_outline';
    }
    else {
      this.title = 'Bloquear - Digite a senha';
      this.tooltip = 'Bloquear url';
      this.icon = 'lock_open';
    }
  }

  render() {
    this.modalRender();
    const actions = [
      <FlatButton
        label="Cancelar"
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Ok"
        primary={true}
        onClick={this.submit}
      />,
    ];

    return (
      <div id="bloquado-botao">
        <IconButton tooltip={this.tooltip} tooltipPosition="top-center">
          <FontIcon style={{color: "#6A6A6A"}} onClick={this.handleOpen} style={{cursor: 'pointer'}} 
            className="material-icons ">{this.icon}
          </FontIcon>
        </IconButton>

        <Dialog
          title={this.title}
          actions={actions}
          modal={false}
          open={this.state.open}
        >
          <TextField hintText=""
            fullWidth={true} 
            floatingLabelText="Senha..." 
            value={this.senha}
            onChange={this.inputSenha}
            type="password" />
        </Dialog>
      </div>
    );
  }
}

export default BloqueadoComponent;
