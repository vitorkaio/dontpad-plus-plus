export function insertSenha(senha){
  return {
    type: 'ADD_SENHA',
    payload: senha
  }
}

export function removeSenha(){
  return {
    type: 'POP_SENHA',
    payload: undefined
  }
}

export function blockComponente(){
  return {
    type: 'BLOCK',
    payload: true
  }
}

export function desblockComponente(){
  return {
    type: 'DESBLOCK',
    payload: false
  }
}