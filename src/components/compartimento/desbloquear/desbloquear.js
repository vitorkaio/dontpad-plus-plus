import React, { Component } from 'react';
import './desbloquear.css';
import { TextField, FontIcon } from 'material-ui'

class DesbloquearComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {senha: ""};
  }

  // input do campo de texto.
  inputSenha(e) {
    this.setState({senha: e.target.value});
  }

  // Submit senha.
  submit(event) {
    if(this.state.senha.length !== 0) 
      console.log(this.state.senha);
      // this.setState({senha: ""});
    event.preventDefault(); // Impede de submeter o formulário.
  }

  render() {
    return(
      <div>
      <form onSubmit={this.submit.bind(this)} className="senha-compartimento">
          <TextField hintText="" 
            underlineFocusStyle={{borderColor: "cornflowerblue"}} 
            floatingLabelFocusStyle={{color: "cornflowerblue"}}
            floatingLabelText="Senha..." 
            value={this.state.senha}
            onChange={this.inputSenha.bind(this)}
            type="password" />
          
          <div onClick={this.submit.bind(this)} className="meuBotao-desbloquear">
            <FontIcon className="material-icons" style={{color: "#6A6A6A"}}>lock_outline</FontIcon>
            <p>Desbloquear</p>
          </div>
        </form>
      </div>

    );
  };
}

export default DesbloquearComponent;