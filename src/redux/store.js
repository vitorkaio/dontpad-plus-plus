// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import logger from 'redux-logger';
import { createStore, combineReducers } from 'redux';


import senhaReducer from './reducers/senhaReducer';
import otherReducer from './reducers/otherReducer';

export default createStore(
  combineReducers({
    senhaReducer,
    otherReducer
  }),
  {},
  // applyMiddleware(logger)
);