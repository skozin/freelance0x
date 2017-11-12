import {fromJS} from 'immutable'
import * as Actions from '~/actions'

import {routerReducer} from 'react-router-redux'

import connectionReducer from './connection'
import contractsReducer from './contracts'


const INITIAL_STATE = fromJS({
  connection: connectionReducer.INITIAL_STATE,
  contracts: contractsReducer.INITIAL_STATE,
  initialFetchComplete: false,
})


export default function rootReducer(state = INITIAL_STATE, action) {
  console.debug(`[action]`, action)

  const wrapReducer = (reducer, ...args) => state => reducer(state, action, ...args)
  const newRouterState = routerReducer(state, action)

  state = state.update('connection', wrapReducer(connectionReducer))
  state = state.update('contracts', wrapReducer(contractsReducer))

  if (action.type == Actions.initialFetchCompleted.type) {
    state = state.set('initialFetchComplete', true)
  }

  // state = state.merge({router: newRouterState})
  state.router = newRouterState

  return state
}
