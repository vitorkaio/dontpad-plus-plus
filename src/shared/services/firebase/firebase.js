import * as fire from 'firebase';
import { firebaseConfig } from './firebaseConfig';

let instance = null;

class FireService {
  constructor() {
    if(!instance) {
      this.app = fire.initializeApp(firebaseConfig);
      instance = this;
    }

    return instance;
  }
}

const FirebaseService = new FireService().app;
export default FirebaseService;