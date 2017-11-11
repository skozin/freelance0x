import {fromJS} from 'immutable'
import * as Actions from '~/actions'


const INITIAL_STATE = connectionReducer.INITIAL_STATE = fromJS({
  // if isConnecting is false, and isConnected is false, then user has no Metamask/geth
  // if isConnected is true, and account is null, then user is not logged in in Metamask
  isConnecting: true,
  isConnected: false,
  account: null,
})


export default function connectionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.connected.type: {
      return state.merge({
        isConnecting: false,
        isConnected: true,
        account: action.address,
      })
    }
    case Actions.failedToConnect.type: {
      return state.merge({
        isConnecting: false,
        isConnected: false,
      })
    }
  }
  return state
}
