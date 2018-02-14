import React, { Component } from 'react';
import './bloqueado.css';
import { FontIcon, Dialog, FlatButton, TextField } from 'material-ui';

class BloqueadoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, senha: ''};
    console.log('**** BloqueadoComponet ****');
    this.title = null;
    this.icon = null;
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  // input do campo de texto.
  inputSenha(e) {
    this.setState({senha: e.target.value});
  }

  submit() {
    this.setState({open: false}, () => {
      if(this.props.check)
        this.props.input(this.state.senha, 1);
      else
        this.props.input(this.state.senha, 0);
    });
  }

  modalRender() {
    if(this.props.check) {
      this.title = 'Desbloquear - Digite a senha';
      this.icon = 'lock_outline';
    }
    else {
      this.title = 'Bloquear - Digite a senha';
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
        onClick={this.submit.bind(this)}
      />,
    ];

    return (
      <div>
        <FontIcon style={{color: "#6A6A6A"}} onClick={this.handleOpen} 
          className="material-icons ">{this.icon}
        </FontIcon>

        <Dialog
          title={this.title}
          actions={actions}
          modal={false}
          open={this.state.open}
        >
          <TextField hintText=""
            fullWidth={true} 
            underlineFocusStyle={{borderColor: "cornflowerblue"}} 
            floatingLabelFocusStyle={{color: "cornflowerblue"}}
            floatingLabelText="Senha..." 
            value={this.state.senha}
            onChange={this.inputSenha.bind(this)}
            type="password" />
        </Dialog>
      </div>
    );
  }
}

export default BloqueadoComponent;
