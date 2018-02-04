import axios from 'axios'

// Classe com metódos para acessar a api-compartment-files
class ApiService {

  static postMessage(url, data) {
    axios.post(`http://localhost:3001/compartimento/arquivos${url}`, {msg: data}).then(res => {
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  };

}// Fim da classe.

export default ApiService;