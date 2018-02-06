import axios from 'axios';
import { Observable } from 'rxjs';

// Classe com metódos para acessar a api-compartment-files
class ApiService {

  static postMessage(url, data) {
    return Observable.create(obs => {
      axios.post(`http://localhost:3001/compartimento/arquivos${url}`, {msg: data}).then(res => {
        obs.next(res.data);
        obs.complete();
      }).catch(err => {
        obs.error(err);
      });
    });
  }

}// Fim da classe.

export default ApiService;