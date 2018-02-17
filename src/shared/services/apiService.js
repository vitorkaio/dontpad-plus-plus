import { Observable } from 'rxjs';

const io = require('socket.io-client');
const socket = io.connect("http://localhost:3001");

// Classe com metódos para acessar a api-compartment-files
class ApiService {

  constructor(url) {
    // Retira a primeira barra. Ex: /tsi/redes -> tsi/redes
    this.url = url[url.length - 1] === '/' ? url.substr(1) : url.substr(1) + '/';
  }

  // Retorna uma lista de links da url se houver.
  getSubFolders() {
    socket.emit('getLinks', this.url);

    return new Promise((resolve, reject) => {
      socket.on('getReactLinks', (res) => {
        console.log(res);
        if(res !== false)
          resolve(res);
        else if(res === null)
          reject(res);
        else
          resolve(false);
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

  // Adiciona um senha.
  postSenha(senha) {
    return new Promise((resolve, reject) => {
      socket.emit('postSenha', this.url, senha);
      
      socket.on('postReactSenha', (res) => {
        resolve(res);
      });
      
      socket.on("connect_error", res => {
        reject(null);
      });
    });
  }

  // Fecha um cliente.
  closeCliente() {
    console.log("CLOSE CLOSE CLOSE CLOSE");
    socket.emit('close');
  }

  postMessage(data) {
    data = data === null ? 'vazio' : data;
    // const rota = url[url.length - 2] === '/' ? url.substr(1) : url.substr(1) + '/';
    // console.log(data);
    return new Promise((resolve, reject) => {
      socket.emit('postText', this.url, data);
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