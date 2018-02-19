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

  // Deleta um arquivo.
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
    console.log(this.props.disable);
    return(
      <div className="upload-deletar-arquivo" onClick={this.deletaArquivo}>
        <IconButton tooltip={`Deletar - ${this.props.nome}`} disabled={this.props.disable}>
          <FontIcon className="material-icons"
           color="crimson">delete
          </FontIcon>
        </IconButton>
      </div>
    );
  }
}// Fim do component.

export default DeletarArquivoComponent;