import reducer from './reducer'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleWare from 'redux-promise-middleware'

export default createStore(reducer, applyMiddleware(promiseMiddleWare))