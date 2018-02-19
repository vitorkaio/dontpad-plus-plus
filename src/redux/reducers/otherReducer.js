let otherInitial = {
  numero: 0,
  listaNumeros: []
}
const otherReducer = (state = otherInitial, action) => {
  switch (action.type) {
    case 'ADD_NUMBER':
      state = {
        ...state,
        numero: action.payload
      }
      break;
  
    default:
      break;
  }
  return state;
}

export default otherReducer