import React, { Component } from 'react';
import './imagem.css';
import { TextField, FontIcon } from 'material-ui';
import Rx from 'rxjs/Rx';
import ApiService from './../../../shared/services/apiService';

class ImagemComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {nameImg: ""};
  }

  // input para imagens.
  inputImagem(e) {
    const img = e.target.files;
    console.log(img[0].name);

    // Pega a imagem do campo.
    this.setState({nameImg: img[0].name});
  }

  render() {
    return(
      <div className="imagem-compartimento">
        <div id="input-upload-image">
          <label htmlFor="upload-photo">Input arquivo</label>
          <input style={{opacity: 0, position: 'absolute', zIndex: -1}} type="file" name="photo" id="upload-photo" onChange={this.inputImagem.bind(this)} />
        </div>
        <h3>{this.state.nameImg}</h3>
      </div>
    );
  };
}

export default ImagemComponent;