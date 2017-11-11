import {Map, List} from 'immutable'
import {createSelector} from 'reselect'

import makeSelectors from '~/utils/make-selectors'


let sel = makeSelectors({
  connection: 'connection',
  isConnecting: ['connection', 'isConnecting'],
  isConnected: ['connection', 'isConnected'],
  account: ['connection', 'account'],
  contracts: 'contracts',
})


sel.hasNoEthereumClientInstalled = (state) => {
  return !sel.isConnecting(state) && !sel.isConnected(state)
}


sel.needsToLogIn = (state) => {
  return sel.isConnected(state) && !sel.account(state)
}


sel.contractWithAddress = (state, address) => {
  return sel.contracts(state).get(address)
}


export default sel
