import {createStore,applyMiddleware} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise';

let store = applyMiddleware(logger,thunk,promise)(createStore)(reducers);

window.store = store;
export default store;