import React, { Component } from 'react';
import './desbloqueado.css';
import { FontIcon, Dialog, FlatButton, TextField } from 'material-ui';

class DesbloqueadoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false, senha: ''};
    console.log('**** DesbloqueadoComponet ****');
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
      this.props.inputBlock(this.state.senha);
    });
  }

  render() {
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
        <FontIcon style={{color: "#6A6A6A"}} 
            className="material-icons ">lock_open
        </FontIcon>

        <Dialog
          title="Bloquear - Digite a senha"
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

export default DesbloqueadoComponent;
