import { Map } from 'immutable';

let senhaInitial = Map({senha: undefined, controle: false, isBlock: false});

const senhaReducer = (state = senhaInitial, action) => {
  switch (action.type) {
    case 'ADD_SENHA':
      state = state.set("senha", action.payload);
      break;

    case 'POP_SENHA':
      state =  state.set("senha", action.payload).set("isBlock", false);
    break;

    case 'BLOCK':
      state = state.set("isBlock", action.payload);
    break;

    case 'DESBLOCK':
      state = state.set("isBlock", action.payload);
    break;

    case 'SET_CONTROLE':
      state = state.set("controle", action.payload);
    break;

    case 'POP_CONTROLE':
      state = state.set("controle", action.payload);
    break;

    default:
      break;
  }

  return state;

}// Fim do reducers

export default senhaReducer 
