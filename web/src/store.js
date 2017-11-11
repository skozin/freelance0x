import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import history from './history'
import rootReducer from './reducers'
import sagas from '~/sagas'

const sagaMiddleware = createSagaMiddleware({
  onError: (err) => {
    console.error(err.stack)
  }
})

const middlewareEnchancer = applyMiddleware(
  sagaMiddleware,
  routerMiddleware(history),
)

const enchancers = [
  middlewareEnchancer
]

if ('function' == typeof devToolsExtension) {
  enchancers.push(devToolsExtension())
}

const createEnchancedStore = compose(...enchancers)(createStore)
const store = createEnchancedStore(rootReducer)

sagas.forEach($saga => sagaMiddleware.run($saga))

if (DEBUG) {
  window.store = store
}

export default store
