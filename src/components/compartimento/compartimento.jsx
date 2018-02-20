import React, { Component } from 'react';
import './compartimento.css';
import LinksComponent from './links/links.jsx';
import TextoComponent from './texto/texto.jsx';
import ArquivosComponent from './arquivos/arquivos.jsx';
import { Tab, Tabs, FontIcon, IconButton } from 'material-ui';
import ApiService from './../../shared/services/apiService';
import SenhaComponent from './senha/senha.jsx';

class CompartimentoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = { value: 'a', lista: [], arquivo: { senha: null, arqs: [] }, carregando: true };
    this.rota = this.props.location.pathname;
    this.apiService = new ApiService(this.rota);

    // console.log("COMPARTIMENTO.JSX CONSTRUCTOR");
  }

  handleChange = (value) => {
    this.setState({ value: value });
  };

  componentWillMount() {
    this.apiService.getSubFolders().then(data => {
      if (data !== false)
        this.setState({ lista: [...data] });
      else ;
        // console.log('Parabéns Kleytola');
    }).catch(err => {
      ;
      // console.log(err);
    });
  }

  // Set array de arquivos e a senha no state.
  setArquivos = (senha, arqs) => {
    this.setState({ arquivo: { senha: senha, arqs: arqs }, carregando: false });
  }

  render() {
    // console.log('**** CompartimentoComponent render ****');
    // console.log(this.state.carregando);
    return (
      <div className="tudo-compartimento">
        {
          this.state.lista.length !== 0
            ?
            <LinksComponent lista={this.state.lista} rota={this.rota} navigate={this.props.history} />
            :
            null
        }
        <div className="container-compartimento">
          <Tabs value={this.state.value} onChange={this.handleChange} style={{ width: "100%" }}
            inkBarStyle={{ backgroundColor: '#6E6E6E' }} tabItemContainerStyle={{ backgroundColor: '#EEEEEE' }}>

            <Tab value="a" icon={<FontIcon className="material-icons" style={{ color: "#6A6A6A" }}>text_fields</FontIcon>}
              style={{ color: "#6A6A6A" }}>
              <TextoComponent apiService={this.apiService} rota={this.rota} navigate={this.props.history} insertArquivos={this.setArquivos} />
            </Tab>

            <Tab value="b" icon={<FontIcon className="material-icons" style={{ color: "#6A6A6A" }}>insert_drive_file</FontIcon>}
              style={{ color: "#6A6A6A" }}>
              <ArquivosComponent apiService={this.apiService} arquivos={this.state.arquivo} />
            </Tab>

          </Tabs>

        </div>
        <footer className="foo">
          {
            this.state.carregando === true 
            ?
            <IconButton style={{marginRight: "2%"}} tooltip="Carregando dados..." tooltipPosition="top-center">
              <FontIcon className="material-icons" id="carregando-dados">cached</FontIcon>
            </IconButton>
            :
            <SenhaComponent apiService={this.apiService} />
            
          }
        </footer>
      </div>
    );
  }
}

export default CompartimentoComponent;
