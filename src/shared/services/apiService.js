import axios from 'axios';
import { Observable } from 'rxjs';

const io = require('socket.io-client');
const socket = io.connect("http://localhost:3001");

// Classe com metódos para acessar a api-compartment-files
class ApiService {

  constructor(url) {
    url = url.substr(1);
    socket.emit('getText', url);
  }

  // Retorna o texto setado na url passada no construtor.
  getText() {
    return Observable.create(obs => {
      socket.on('getReactApp', (res) => {
        if(res !== false)
          obs.next(res);
        else
          obs.error(false);
      });
    });
  }

  // Fecha um cliente.
  closeCliente() {
    socket.emit('close');
  }

  postMessage(url, data) {
    url = url.substr(1);
    console.log(data);
    return new Promise((resolve, reject) => {
      socket.emit('postText', url, data);
      socket.on('postReactApp', (res) => {
        resolve(res);
      });
    });
  }

}// Fim da classe.

export default ApiService;