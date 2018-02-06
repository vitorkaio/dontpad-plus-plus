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

    console.log(this.props.rota.location.pathname);
  }

  // Observable para entrada de dados.
  getObs() {
    let obs = {
      next: (data) => {
        // console.log(data);
        this.fakeApi(data);
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

  // Send text for api.
  fakeApi(data) {
    setTimeout(()=> {
      this.icons = "save";
      console.log(data);
      this.setState({loading: false});
    }, 500);
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
        <FontIcon className={"material-icons " + (this.state.loading === true ? "loading-texto" : "")}>{this.icons}</FontIcon>
        <TextField
        floatingLabelText="Digite..."
          rows={9}
          fullWidth={true}
          multiLine={true} value={this.texto}onChange={this.entrada.bind(this)}/>
      </div>
    );
  };
}

export default TextoComponent;