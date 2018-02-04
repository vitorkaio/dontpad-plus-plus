import React, { Component } from 'react';
import './compartimento.css';
import ApiService from './../../shared/services/apiService';

class CompartimentoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {texto: ""};
  }

  entrada(e) {
    this.setState({texto: e.target.value});
  }

  submit() {
    if(this.state.texto.length !== 0) {
      ApiService.postMessage(this.props.location.pathname, this.state.texto);
      this.setState({texto: ""});
    }
  }

  render() {
    return (
      <div>
        <h3>CompartimentoComponent</h3>
        <div className="entrada-compartimento">
          <textarea cols="50" rows="10" value={this.state.texto} 
           placeholder="Digite..." onChange={this.entrada.bind(this)} />
          <button onClick={this.submit.bind(this)}>Send</button>
        </div>
      </div>
    );
  }
}

export default CompartimentoComponent;
