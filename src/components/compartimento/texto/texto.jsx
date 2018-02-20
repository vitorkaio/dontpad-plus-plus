import React, { Component } from 'react';
import './texto.css';
import { TextField, FontIcon, IconButton } from 'material-ui';
import Rx from 'rxjs/Rx';
import { connect } from 'react-redux';
import * as senhaActions from './../../../redux/actions/senhaActions';

class TextoComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false, alturaTela: Math.round((window.innerHeight) / 24) - 5};
    this.loading = false;
    this.icons = "save";
    this.tooltip = 'Conteúdo salvo';
    this.texto = null;

    this.senha = undefined;

    this.subscription = null;
    this.entradaRxjs = new Rx.Subject();

    this.subscriptionGetText = null;

    // Adiciona um listener pra escutar toda vez que o height muda.
    // Caso o height mude, calcule novamente o tamanho da textarea.
    window.addEventListener("resize", this.getInnerHeight.bind(this));

  }

  // Determina a largura da tela e renderiza a navbar correta.
  getInnerHeight() {
    this.setState({alturaTela: Math.round((window.innerHeight) / 24) - 5});
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
          const arqs = res[Object.keys(res)[0]].arqs;

          // Se a senha é 0 então é desbloqueada automaticamente.
          // this.senha = this.senha === '0' ? undefined : this.senha;
          if(this.senha === '0')
            this.props.desblockComponente();
          
          else if(this.senha !== this.props.senhaReducer.get("senha") && this.senha !== undefined) {
            this.props.blockComponente();
            this.props.insertSenha(this.senha);
          }

          else
            this.props.desblockComponente();

          this.props.insertArquivos(this.senha, arqs);

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
        else {
          this.props.navigate.push("/3a46d48036bd86d55c72bbfee99bbbf6-erro-404");
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
    const check = this.props.senhaReducer.get("isBlock") || this.texto === null ? true : false;
    return(
      <div className="entrada-compartimento">
        <textarea placeholder="Digite algo" onChange={this.entrada} value={this.texto} readOnly={check} 
        rows={this.state.alturaTela} id="text-area"/>
        
        <div className="entrada-senha">
          <IconButton tooltip={this.tooltip}>
            <FontIcon style={{color: "#6A6A6A"}} 
              className={"material-icons " + (this.state.loading === true ? "loading-texto" : "")}>{this.icons}
            </FontIcon>
          </IconButton>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    senhaReducer: state.senhaReducer
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    insertSenha: (senha) => {
      dispatch(senhaActions.insertSenha(senha))
    },
    blockComponente: () => {
      dispatch(senhaActions.blockComponente())
    },
    desblockComponente: () => {
      dispatch(senhaActions.desblockComponente())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextoComponent);
