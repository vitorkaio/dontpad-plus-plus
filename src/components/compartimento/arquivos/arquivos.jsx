import React, { Component } from 'react';
import './arquivos.css';
import { Map } from 'immutable';
import { FlatButton, FontIcon, IconButton } from 'material-ui';
import DeletarArquivoComponent from './deletar/deletar.jsx';
import texto_upload from './../../../lib/imgs/texto_upload.svg';
import app_upload from './../../../lib/imgs/app_upload.svg';
import other_upload from './../../../lib/imgs/other_upload.svg';
import { connect } from 'react-redux';
import * as senhaActions from './../../../redux/actions/senhaActions';


class ArquivosComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {loading: false, erroSize: false, arquivo: Map({nome: null, size: null, type: null, 
      lastModified: null, data: null}), loadDeleta: false};
    this.subsUploadArquivo = null;
    this.arq = null;
    this.icon = "cloud_upload";

    // console.log(this.props.arquivos);
  }

  // ************************************ Input file ************************************
  // input para imagens.
  inputImagem = (e) => {
    const file = e.target.files[0];

    if(file !== undefined) {
      // Se o arquivo tiver mais que 2mb(2097152) bloqueia.
      if(file.size > 2097152)
        this.setState({erroSize: true, arquivo: this.state.arquivo.set("nome", file.name).set("size", file.size).set("type", file.type
        ).set("lastModified", file.lastModified).set("data", null)});
      else
        this.setState({erroSize: false, arquivo: this.state.arquivo.set("nome", file.name).set("size", file.size).set("type", file.type
        ).set("lastModified", file.lastModified).set("data", null)});
      
      this.arq = file;
    }   
  }

  // ************************************ Submit arquivo ************************************
  submitArquivo = () => {

    // Transforma o arquivo em bytes.
    let reader = new FileReader();
    reader.onload = (e) => {
      this.icon = "cached";
      this.setState({loading: true, arquivo: this.state.arquivo.set("data", e.target.result)}, () => {
        this.props.apiService.uploadArquivo(this.state.arquivo.toJS()).then(snap => {
          console.log(snap, "upload");
          this.icon = "cloud_upload";
          this.setState({loading: false, arquivo: this.state.arquivo.set("nome", null).set("size", null).set("type", null
          ).set("lastModified", null).set("data", null)});
        }).catch(err => {
          console.log(err, "upload");
          this.setState({loading: false});
        });
      });
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    reader.readAsDataURL(this.arq);
  }

  // ************************************ Renderiza lista de arquivos. ************************************
  // Renderiza os arquivos vindo do banco de dados.
  renderListaArquivos = () => {
    if(this.props.arquivos.arqs === null || this.props.arquivos.arqs === undefined)
      return;
    const lista = [];
    let contador = 0;

    for(contador = 0; contador <  Object.keys(this.props.arquivos.arqs).length; contador++)
      ;

    for(let x = 0; x < contador; x++) {
      const data = this.props.arquivos.arqs[Object.keys(this.props.arquivos.arqs)[x]].data;
      const nome = this.props.arquivos.arqs[Object.keys(this.props.arquivos.arqs)[x]].nome;
      const howType = this.props.arquivos.arqs[Object.keys(this.props.arquivos.arqs)[x]].type;
      const id = Object.keys(this.props.arquivos.arqs)[x];
      // console.log(id);
      let showType = null;

      // Imagem que vai aparecer ao renderizar arquivos.
      if(howType.startsWith("text"))
        showType = texto_upload;
      else if(howType.startsWith("application"))
        showType = app_upload;
      else if(howType.startsWith("image"))
        showType = data;
      else
        showType = other_upload;

      lista.push(
        <div key={x} className="upload-lista-itens">
          <span id="upload-nome-span">{nome}</span>
          <img src={showType} width="150" height="150" alt={nome}/>
          <div id="upload-botoes">
            <a href={data} download={nome}>
              <IconButton tooltip={`Baixar - ${nome}`}>
                <FontIcon className="material-icons" color="#6A6A6A">cloud_download</FontIcon>
              </IconButton>
            </a>
            <DeletarArquivoComponent disable={this.props.senhaReducer.get("isBlock")} apiService={this.props.apiService} nome={nome} id={id}/>
          </div>
        </div>
      );
    }
    return lista;
  
  }

  // Senha check
  senhaCheck = (op) => {
    console.log(op);
  }

  // ************************************ render ************************************
  render() {
    // console.log("** Render arquivos **", this.state.erroSize, this.state.arquivo.get("size"));
    return(
      <div className="arquivo-compartimento">
        <div id="input-upload-arquivo" style={{display: this.props.senhaReducer.get("isBlock") ? "none" : null}} >
          <FontIcon className="material-icons" color="#6A6A6A" style={{marginRight: 5}}>file_upload</FontIcon>
          <label htmlFor="upload-photo">Input arquivo</label>
          <input style={{opacity: 0, position: 'absolute', zIndex: -1}} type="file" name="photo" id="upload-photo" onChange={this.inputImagem.bind(this)} />
        </div>
        {
          this.state.arquivo.get("nome") === null ? null : 
          <div className="upload-arquivos-input">
            <div className="upload-arquivo-dados">
              <p id="upload-arquivo-nome">{this.state.arquivo.get("nome")} - </p>
              <p>{(this.state.arquivo.get("size") / 1024).toFixed(2)} kb - </p>
              <p>{this.state.arquivo.get("type")}</p>
            </div>

            {
              this.state.erroSize === true ? <p style={{color: "crimson", marginTop: 5}}>Erro - Arquivo tem mais de 2mb</p> :
              <FlatButton icon={
                <FontIcon className={"material-icons " + (this.state.loading === true ? "upload-loading-arquivo" : "")}>
                  {this.icon}
                </FontIcon>
              }label="Upload" primary={true} onClick={this.submitArquivo} style={{marginTop: 5}}/>
            }
          </div>
        }

        <div className="upload-lista-arquivo">
          {this.renderListaArquivos()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ArquivosComponent);
