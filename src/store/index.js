import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';
import logger from 'redux-logger';
let store;
export function configureStore()
{
    //create Store requires two arguments reducer and the middleware
    store=createStore(reducer , applyMiddleware(thunk,logger));
    return store;
}