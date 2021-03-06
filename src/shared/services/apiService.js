import FirebaseApiService from './apiFirebaseAcess';

// const io = require('socket.io-client');
// const socket = io.connect("http://127.0.0.1:5000/");
// const socket = io.connect("http://localhost:3001");
// const socket = io.connect("https://servidor-node-socket.herokuapp.com/");


// Classe com metódos para acessar a api-compartment-files
class ApiService {

  constructor(url) {
    // Retira a primeira barra. Ex: /tsi/redes -> tsi/redes
    this.url = url[url.length - 1] === '/' ? url.substr(1) : url.substr(1) + '/';
  }

  // Retorna uma lista de links da url se houver.
  getSubFolders() {
    return new Promise((resolve, reject) => {
      FirebaseApiService.getRotaLinks(this.url).then(res => {
        if(res !== false)
          resolve(res);
        else if(res === null)
          reject(res);
        else
          resolve(false);
      }).catch(err => {
        reject(false);
      });
    });

    /*socket.emit('getLinks', this.url);
    return new Promise((resolve, reject) => {
      socket.on('getReactLinks', (res) => {
        if(res !== false)
          resolve(res);
        else if(res === null)
          reject(res);
        else
          resolve(false);
      });
    });*/
  }

  // Retorna o texto setado na url passada no construtor.
  getText() {
    return FirebaseApiService.getRotaTexto(this.url);
    /*socket.emit('getText', this.url);
    return Observable.create(obs => {
      socket.on('getReactApp', (res) => {
        // console.log(res);
        if(res !== false)
          obs.next(res);
        else if(res === null)
          obs.error(res);
        else
          obs.next(false);

        // obs.complete();
      });
      // Fica escutando pra vê se tem algum erro.
      socket.on("connect_error", res => {
        obs.error(false);
      });
    });*/
  }

  // Adiciona um senha.
  postSenha(senha) {
    return new Promise((resolve, reject) => {
      FirebaseApiService.postRotaSenha(this.url, senha).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    /*return new Promise((resolve, reject) => {
      socket.emit('postSenha', this.url, senha);
      
      socket.on('postReactSenha', (res) => {
        resolve(res);
      });
      
      socket.on("connect_error", res => {
        reject(null);
      });
    });*/
  }

  // Upload de arquivo.
  uploadArquivo(file) {
    return new Promise((resolve, reject) => {
      FirebaseApiService.uploadArquivo(this.url, file).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    // console.log(file);
    /*const sendJson = JSON.stringify(file);
    socket.emit("uploadArquivo", this.url, sendJson);

    return Observable.create(obs => {
      socket.on("uploadArquivoReact", snap => {
        if(snap === true)
          obs.complete();
        else if(snap === false)
          obs.error(false);
        else
          obs.next(snap);
      });

      socket.on("connect_error", res => {
        obs.error(false);
      });

    });*/

  }

  // Deleta um arquivo.
  deletaArquivo(nomeArquivo) {
    return new Promise((resolve, reject) => {
      FirebaseApiService.deletaArquivo(this.url, nomeArquivo).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    /*socket.emit("deletaArquivo", this.url, nomeArquivo);
    return new Promise((resolve, reject) => {
      socket.on("deletaArquivoReact", res => {
        return res === true ? resolve(res) : reject(res);
      });
      socket.on("connect_error", res => {
        reject(false);
      });
    });*/
  }

  // Fecha um cliente.
  /*closeCliente() {
    console.log("CLOSE CLOSE CLOSE CLOSE");
    socket.emit('close');
  }*/

  postMessage(data) {
    data = data === null ? 'Digite alguma coisa...' : data;
    return new Promise((resolve, reject) => {
      FirebaseApiService.postRotaTexto(this.url, data).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
    // socket.emit('postText', this.url, data);
    // const rota = url[url.length - 2] === '/' ? url.substr(1) : url.substr(1) + '/';
    // console.log(data);
    /*return new Promise((resolve, reject) => {
      socket.on('postReactApp', res => {
        if(res === true)
          resolve(res);
        reject(false);
      });
      socket.on("connect_error", res => {
        reject(false);
      });
    });*/
  }

}// Fim da classe.

export default ApiService;