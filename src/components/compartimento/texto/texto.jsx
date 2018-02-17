import React, { Component } from 'react';
import './texto.css';
import { TextField, FontIcon, IconButton } from 'material-ui';
import Rx from 'rxjs/Rx';
import SenhaComponent from './../senha/senha.jsx';

class TextoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false, block: false, alturaTela: Math.round((window.innerHeight) / 24) - 10};
    this.loading = false;
    this.icons = "save";
    this.tooltip = 'Conteúdo salvo';
    this.texto = "";

    this.senha = null;

    this.subscription = null;
    this.entradaRxjs = new Rx.Subject();

    this.subscriptionGetText = null;

    // Adiciona um listener pra escutar toda vez que o height muda.
    // Caso o height mude, calcule novamente o tamanho da textarea.
    window.addEventListener("resize", this.getInnerHeight.bind(this));

  }

  // Determina a largura da tela e renderiza a navbar correta.
  getInnerHeight() {
    this.setState({alturaTela: Math.round((window.innerHeight) / 24) - 10});
  }

  componentDidMount() {
    // console.log('Did mount - texto jsx');
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
      .subscribe(this.getObsPostText());
      //.distinctUntilChanged()
      this.subscriptionGetText = this.props.apiService.getText().subscribe(this.getObsText());
  }

  // Assim que sair do dom.
  componentWillUnmount() {
    this.props.apiService.closeCliente();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscriptionGetText.unsubscribe();
  }

  // Observables para o acesso o método getText da api.
  getObsText() {
    const obs = {
      next: (res) => {
        if(res !== false) {
          this.texto = res[Object.keys(res)[0]].texto;
          this.senha = res[Object.keys(res)[0]].senha;

          // Se a senha é 0 então é desbloqueada automaticamente.
          this.senha = this.senha === '0' ? undefined : this.senha;

          this.icons = 'save';
          this.setState({loading: false});
        }
        else {
          this.props.apiService.postMessage(null).then(res => {
            this.setState({loading: false});
          }).catch(erro => {
            this.tooltip = 'Não foi possível carregar o conteúdo';
            this.icons = 'warning';
            this.setState({loading: false});
          });
        }
      },
      error: (err) => {
        if(err === null) {
          this.tooltip = 'Não foi possível carregar o conteúdo';
          this.icons = 'warning';
          this.setState({loading: false});
        }
      },
      complete: () => {
        this.setState({loading: false});
      }
    }
    return obs;
  }

  // Observable para entrada de dados.
  getObsPostText() {
    let obs = {
      next: (data) => {
        this.props.apiService.postMessage(data).then(res => {
          // console.log(res);
          this.setState({loading: false});
        }).catch(err => {
          this.icons = 'warning';
          this.tooltip = 'Não foi possível salvar o conteúdo';
          this.setState({loading: false});
        })
      },
    };
    return obs;
  }

  // entrada da textarea
  entrada = (e) => {
    this.icons = 'cached';
    this.texto = e.target.value;
      this.setState({loading: true}, () => {
        this.entradaRxjs.next(this.texto);
      });
  }

  // Ativar ou desativa o campo de texto.
  senhaCheck(op) {
    // console.log(op);
    if(op === 1)
      this.setState({block: true});
    else
      this.setState({block: false});
    
  }

  render() {
    const check = this.senha !== undefined && this.state.block === false ? true : false;
    return(
      <div className="entrada-compartimento">
        <TextField
        floatingLabelText="Digite..."
          readOnly={check}
          rows={this.state.alturaTela}
          floatingLabelFocusStyle={{color: "cornflowerblue"}}
          underlineFocusStyle={{borderColor: "cornflowerblue"}}
          fullWidth={true}
          multiLine={true} value={this.texto}onChange={this.entrada}/>
        
        <div className="entrada-senha">
          <div></div>
          <IconButton tooltip={this.tooltip}>
            <FontIcon style={{color: "#6A6A6A"}} 
              className={"material-icons " + (this.state.loading === true ? "loading-texto" : "")}>{this.icons}
            </FontIcon>
          </IconButton>
          <SenhaComponent situacao={this.senha} block={this.senhaCheck.bind(this)} apiService={this.props.apiService}/>
        </div>
      </div>
    );
  };
}

export default TextoComponent;