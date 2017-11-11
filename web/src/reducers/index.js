import {fromJS} from 'immutable'
import * as Actions from '~/actions'

import connectionReducer from './connection'


const INITIAL_STATE = fromJS({
  connection: connectionReducer.INITIAL_STATE,
  isCreatingProject: false,
  project: null,
})


export default function rootReducer(state = INITIAL_STATE, action) {
  console.debug(`[action]`, action)

  let wrapReducer = (reducer, ...args) => state => reducer(state, action, ...args)

  state = state.update('connection', wrapReducer(connectionReducer))

  switch (action.type) {
    case Actions.createProject.type: {
      return state.set('isCreatingProject', true)
    }
    case Actions.projectCreated.type: {
      return state.merge({
        isCreatingProject: false,
        project: action.project,
      })
    }
  }

  return state
}
