import {List, Map, fromJS} from 'immutable'
import * as Actions from '~/actions'

import {State as ContractState} from '~/contract'


const INITIAL_STATE = contractsReducer.INITIAL_STATE = Map()


export default function contractsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.setContractsList.type: {
      return state.merge(action.contractsById)
    }
    case Actions.createContract.type: {
      return state.set(action.ephemeralAddress, Map({
        name: action.name,
        state: ContractState.Creating,
        ephemeralAddress: action.ephemeralAddress,
      }))
    }
    case Actions.contractCreationFailed.type: {
      return state.setIn([action.ephemeralAddress, 'error'], action.errorMessage)
    }
    case Actions.updateContract.type: {
      const {address} = action.contract
      if (action.ephemeralAddress) {
        state = state.delete(action.ephemeralAddress)
      }
      return state.set(address, fromJS(action.contract))
    }
  }
  return state
}
