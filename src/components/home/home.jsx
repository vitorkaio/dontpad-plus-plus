import React, { Component } from 'react';
import './home.css';
import TituloComponent from './info/titulo/titulo.jsx';
import DesenvolvedorComponent from './info/desenvolvedor/desenvolvedor.jsx'

class HomeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {showDesenvolvedor: false};
  }

  infoDesenvolvedor = () => {
    this.setState({showDesenvolvedor: !this.state.showDesenvolvedor});
  }

  render() {
    return (
      <div className="home-dontpad">
      {
        this.state.showDesenvolvedor === false 
        ?
        <TituloComponent navigate={this.props.history} showInfo={this.infoDesenvolvedor}/>
        : 
        <DesenvolvedorComponent showInfo={this.infoDesenvolvedor}/>
      }
      </div>
    );
  }
}

export default HomeComponent;
