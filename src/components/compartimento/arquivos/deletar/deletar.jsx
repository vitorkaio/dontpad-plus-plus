import React, { Component } from 'react';
import './deletar.css';
import { Map } from 'immutable';
import { FlatButton, FontIcon, IconButton } from 'material-ui';
/*import Rx from 'rxjs/Rx';
import ApiService from './../../../shared/services/apiService';*/

class DeletarArquivoComponent extends Component {

  constructor(props) {
    super(props);
  }

  // deleta um arquivo.
  deletaArquivo = () => {
    if(window.confirm("Deletar o arquivo?")) {
      this.props.apiService.deletaArquivo(this.props.id).then(res => {
        ;
      }).catch(err => {
        window.alert("Não foi possível deletar o arquivo");
      });
    }
  }

  // ************************************ render ************************************
  render() {
    return(
      <div className="upload-deletar-arquivo" onClick={this.deletaArquivo}>
        <IconButton tooltip={`Deletar - ${this.props.nome}`}>
          <FontIcon className="material-icons"
           color="crimson">delete
          </FontIcon>
        </IconButton>
      </div>
    );
  }
}// Fim do component.

export default DeletarArquivoComponent;