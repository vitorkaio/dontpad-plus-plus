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
  }

  // Observables para o acesso o método postMessage da api.
  getObsPostMessage() {
    const obs = {
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        this.icons = "warning";
        this.setState({loading: false});
      },
      complete: () => {
        console.log('done!');
        this.icons = "save";
        this.setState({loading: false});
      }
    }
    return obs;
  }

  // Observable para entrada de dados.
  getObs() {
    let obs = {
      next: (data) => {
        this.subscriptionPostMessage = ApiService.postMessage(this.rota, data).subscribe(this.getObsPostMessage());
      }
    };

    return obs;
  }

  componentDidMount() {
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
  }

  // Assim que sair do dom.
  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // entrada da textarea
  entrada(e) {
    this.icons = "cached";
    this.texto = e.target.value;
      this.setState({loading: true}, () => {
        this.entradaRxjs.next(this.texto);
      });
  }

  render() {
    return(
      <div className="entrada-compartimento">
        <FontIcon style={{color: "#6A6A6A"}} 
          className={"material-icons " + (this.state.loading === true ? "loading-texto" : "")}>{this.icons}</FontIcon>
        <TextField
        floatingLabelText="Digite..."
          rows={9}
          floatingLabelFocusStyle={{color: "cornflowerblue"}}
          underlineFocusStyle={{borderColor: "cornflowerblue"}}
          fullWidth={true}
          multiLine={true} value={this.texto}onChange={this.entrada.bind(this)}/>
      </div>
    );
  };
}

export default TextoComponent;