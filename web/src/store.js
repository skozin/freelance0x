import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import sagas from '~/sagas'

const sagaMiddleware = createSagaMiddleware({
  onError: (err) => {
    console.error(err.stack)
  }
})

const middlewareEnchancer = applyMiddleware(
  sagaMiddleware
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

export default store
