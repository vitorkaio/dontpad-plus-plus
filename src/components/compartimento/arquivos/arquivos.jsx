import React, { Component } from 'react';
import './arquivos.css';
/*import { TextField, FontIcon } from 'material-ui';
import Rx from 'rxjs/Rx';
import ApiService from './../../../shared/services/apiService';*/

class ArquivosComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {progress: 0, img: {nome: null, data: null}};
    this.arq = null
    this.subsUploadArquivo = null;
  }

  // input para imagens.
  inputImagem(e) {
    const file = e.target.files[0];
    console.log(file.name);

    // Pega a imagem do campo.
    this.arq = file;
    this.setState({img: {nome: file.name, data: null}});
  }

  submitArquivo = () => {
    const obs = {
      next: (snap) => {
        console.log(snap, "upload");
      },
      error: (err) => {
        console.log(err, "upload");
      },
      complete: () => {
        console.log("** Arquivo upado **");
      }
    }
    // this.subsUploadArquivo = this.props.apiService.uploadArquivo(this.state.arq).subscribe(obs);
    // this.props.apiService.uploadArquivo(this.state.arq);

    let reader = new FileReader();
    reader.onload = (e) => {
      // console.log(e.target.result);
      this.setState({img: {nome: this.state.img.nome, data: e.target.result}}, () => {
        this.subsUploadArquivo = this.props.apiService.uploadArquivo(this.state.img).subscribe(obs);
      });
      // let b = new Buffer(e.target.result, "base64");
      // console.log(b.toString());
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };

    reader.readAsDataURL(this.arq);
  }

  render() {
    return(
      <div className="imagem-compartimento">
        <div id="input-upload-image">
          <label htmlFor="upload-photo">Input arquivo</label>
          <input style={{opacity: 0, position: 'absolute', zIndex: -1}} type="file" name="photo" id="upload-photo" onChange={this.inputImagem.bind(this)} />
        </div>
        <button style={{marginTop: 10}} onClick={this.submitArquivo}>Upload</button>
        <h3>{this.state.progress}</h3>
        {this.state.img.data === null ? null : 
        <div><img src={this.state.img.data}/> <a href={this.state.img.data} download={this.state.img.nome}>Download</a></div>}
      </div>
    );
  };
}

export default ArquivosComponent;