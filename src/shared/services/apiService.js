import { Observable } from 'rxjs';

const io = require('socket.io-client');
const socket = io.connect("http://localhost:3001");

// Classe com metódos para acessar a api-compartment-files
class ApiService {

  constructor(url) {
    this.url = url.substr(1); // Retira a primeira barra. Ex: /tsi/redes -> tsi/redes
  }

  // Retorna uma lista de links da url se houver.
  getSubFolders() {
    socket.emit('getLinks', this.url);

    return Observable.create(obs => {
      socket.on('getReactLinks', (res) => {
        if(res !== false)
          obs.next(res);
        else if(res === null)
          obs.error(res);
        else
          obs.next(false);
      });
    });
  }

  // Retorna o texto setado na url passada no construtor.
  getText() {
    socket.emit('getText', this.url);
    
    return Observable.create(obs => {
      socket.on('getReactApp', (res) => {
        if(res !== false)
          obs.next(res);
        else if(res === null)
          obs.error(res);
        else
          obs.next(false);
      });
      // Fica escutando pra vê se tem algum erro.
      socket.on("connect_error", res => {
        obs.error(null);
      });
    });
  }

  // Fecha um cliente.
  closeCliente() {
    socket.emit('close');
  }

  postMessage(url, data) {
    url = url.substr(1);
    // console.log(data);
    return new Promise((resolve, reject) => {
      socket.emit('postText', url, data);
      socket.on('postReactApp', (res) => {
        resolve(res);
      });
      socket.on("connect_error", res => {
        reject(null);
      });
    });
  }

}// Fim da classe.

export default ApiService;