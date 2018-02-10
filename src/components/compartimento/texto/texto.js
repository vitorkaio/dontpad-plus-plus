import React, { Component } from 'react';
import './texto.css';
import { TextField, FontIcon } from 'material-ui';
import Rx from 'rxjs/Rx';
import ApiService from './../../../shared/services/apiService';

class TextoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false};
    this.loading = false;
    this.icons = "save";
    this.texto = "";

    this.subscription = null;
    this.entradaRxjs = new Rx.Subject();

    this.rota = this.props.rota.location.pathname;

    this.subscriptionPostMessage = null;
    this.subscriptionGetText = null;

    this.api = new ApiService(this.rota);
  }

  // Observables para o acesso o método postMessage da api.
  getObsText() {
    const obs = {
      next: (res) => {
        this.texto = res[Object.keys(res)[0]].texto;
        this.icons = 'save';
        this.setState({loading: false});
      },
      error: (err) => {
        if(err === false) {
          this.api.postMessage(this.rota, 'vazio').then(res => {
            this.setState({loading: false});
          }).catch(erro => {

          });
        }
      },
      complete: () => {
        this.setState({loading: false});
      }
    }
    return obs;
  }

  // Observable para entrada de dados.
  getObs() {
    let obs = {
      next: (data) => {
        this.api.postMessage(this.rota, data).then(res => {
          console.log(res);
          this.setState({loading: false});
        });
      },
      error: (err) => {
        
      }
    };

    return obs;
  }

  componentDidMount() {
    console.log('*** Did mount ***');
    this.subscription = this.entradaRxjs
      .debounceTime(2000)
      .distinctUntilChanged((x, y) => {
        if(x === y) {
          this.icons="save"; 
          this.setState({loading: false}); 
          return true;
        } 
        else if(x !== y)
          return false;
      })
      .subscribe(this.getObs());
      //.distinctUntilChanged()
      this.subscriptionGetText = this.api.getText().subscribe(this.getObsText());
  }

  // Assim que sair do dom.
  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscriptionGetText.unsubscribe();
  }

  // entrada da textarea
  entrada(e) {
    this.icons = 'cached';
    this.texto = e.target.value;
      this.setState({loading: true}, () => {
        this.entradaRxjs.next(this.texto);
      });
  }

  componentWillUnmount() {
    this.api.closeCliente();
  }

  render() {
    return(
      <div className="entrada-compartimento">
        <TextField
        floatingLabelText="Digite..."
          rows={9}
          floatingLabelFocusStyle={{color: "cornflowerblue"}}
          underlineFocusStyle={{borderColor: "cornflowerblue"}}
          fullWidth={true}
          multiLine={true} value={this.texto}onChange={this.entrada.bind(this)}/>
        
        <FontIcon style={{color: "#6A6A6A"}} 
          className={"material-icons " + (this.state.loading === true ? "loading-texto" : "")}>{this.icons}
        </FontIcon>
      </div>
    );
  };
}

export default TextoComponent;