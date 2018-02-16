import React, { Component } from 'react';
import './compartimento.css';
import DesbloquearComponent from './desbloquear/desbloquear.jsx';
import LinksComponent from './links/links.jsx';
import TextoComponent from './texto/texto.jsx';
import ArquivosComponent from './arquivos/arquivos.jsx';
import { Tab, Tabs, FontIcon } from 'material-ui';
import ApiService from './../../shared/services/apiService';

class CompartimentoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {value: 'a'};
    this.rota = this.props.location.pathname;
    this.apiService = new ApiService(this.rota);

    this.senha = null;
  }

  handleChange = (value) => {
    this.setState({value: value});
  };

  componentDidMount() {
    console.log('Did mount - compartimento jsx');
  }

  // input da senha.
  senhaDesblock(senha) {
    this.senha = senha;
  }


  render() {
    // console.log('**** CompartimentoComponent render ****');
    return (
      <div className="tudo-compartimento">
        <LinksComponent apiService={this.apiService} rota={this.rota} navigate={this.props.history}/>
        
        <div className="container-compartimento">

          <Tabs value={this.state.value} onChange={this.handleChange} style={{width: "100%"}} 
            inkBarStyle={{backgroundColor: '#6E6E6E'}} tabItemContainerStyle={{backgroundColor: '#EEEEEE'}}>

            <Tab value="a" icon={<FontIcon className="material-icons" style={{color: "#6A6A6A"}}>text_fields</FontIcon>} style={{color: "#6A6A6A"}}>
              <TextoComponent apiService={this.apiService} rota={this.rota}/>
            </Tab>

            <Tab value="b" icon={<FontIcon className="material-icons" style={{color: "#6A6A6A"}}>insert_drive_file</FontIcon>} style={{color: "#6A6A6A"}}>
              <ArquivosComponent />
            </Tab>

          </Tabs>

        </div>
      </div>
    );
  }
}

export default CompartimentoComponent;
