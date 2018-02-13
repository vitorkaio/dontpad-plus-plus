import React, { Component } from 'react';
import './compartimento.css';
import DesbloquearComponent from './desbloquear/desbloquear';
import LinksComponent from './links/links.jsx';
import TextoComponent from './texto/texto.jsx';
import ImagemComponent from './imagens/imagem';
import { Tab, Tabs, FontIcon } from 'material-ui';
import ApiService from './../../shared/services/apiService';

class CompartimentoComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {value: 'a'};
    this.rota = this.props.location.pathname;
    this.apiService = new ApiService(this.rota);
  }

  handleChange = (value) => {
    this.setState({value: value});
  };

  componentDidMount() {
    console.log('Did mount - compartimento jsx');
  }

  render() {
    // console.log('**** CompartimentoComponent render ****');
    return (
      <div className="tudo-compartimento">
       
        <DesbloquearComponent />
        <LinksComponent apiService={this.apiService} rota={this.rota} navigate={this.props.history}/>
        
        <div className="container-compartimento">

          <Tabs value={this.state.value} onChange={this.handleChange} style={{width: "100%"}} 
            inkBarStyle={{backgroundColor: '#6E6E6E'}} tabItemContainerStyle={{backgroundColor: '#EEEEEE'}}>

            <Tab value="a" icon={<FontIcon className="material-icons" style={{color: "#6A6A6A"}}>text_fields</FontIcon>} style={{color: "#6A6A6A"}}>
              <TextoComponent apiService={this.apiService} rota={this.rota}/>
            </Tab>

            <Tab value="b" icon={<FontIcon className="material-icons" style={{color: "#6A6A6A"}}>add_a_photo</FontIcon>} style={{color: "#6A6A6A"}}>
              <ImagemComponent />
            </Tab>

            <Tab value="c" icon={<FontIcon className="material-icons" style={{color: "#6A6A6A"}}>insert_drive_file</FontIcon>} style={{color: "#6A6A6A"}}>
              <div>
                <h2>Controllable Tab C</h2>
                <p>
                  Tabs are also controllable if you want to programmatically pass them their values.
                  This allows for more functionality in Tabs such as not
                  having any Tab selected or assigning them different values.
                </p>
              </div>
            </Tab>

          </Tabs>

        </div>
      </div>
    );
  }
}

export default CompartimentoComponent;
