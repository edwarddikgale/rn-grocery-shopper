import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { getFirebase } from 'react-redux-firebase'
import rootReducer from './rootReducer';

const fbConfig = {} // your firebase config
const middlewares = [
  thunk.withExtraArgument(getFirebase)
]

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(...middlewares),
  )
);

export default store;