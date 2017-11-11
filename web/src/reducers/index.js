import {fromJS} from 'immutable'
import * as Actions from '~/actions'


const INITIAL_STATE = fromJS({
  isCreatingProject: false,
  project: null,
})


export default function rootReducer(state = INITIAL_STATE, action) {
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
