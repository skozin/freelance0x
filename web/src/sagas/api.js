import {take, takeEvery, call, fork, select} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import $dispatch from '~/utils/saga-dispatch'

import * as Actions from '~/actions'
import ProjectContract, {getAccount} from '~/contract'


let contractsByAddress = {}


export default function* $apiSaga() {
  yield fork($setAccount)
  yield takeEvery(Actions.createContract.type, $handleCreateContract)
  yield takeEvery(Actions.startContract.type, $handleStartContract)
}


function* $setAccount() {
  let address
  try {
    address = yield call(getAccount)
  } catch (err) {
    console.error(`Cannot get account: ${err.message}`)
    yield* $dispatch(Actions.failedToConnect(err.message))
    return
  }
  yield* $dispatch(Actions.connected(address || null))
}


function* $handleCreateContract(action) {
  yield* $dispatch(push(`/contract/${action.ephemeralAddress}`))
  let contract
  try {
    contract = yield call(ProjectContract.deploy, action.name)
  } catch (err) {
    yield* $dispatch(Actions.contractCreationFailed(action.ephemeralAddress, err.message))
    setTimeout(() => {throw err}, 0)
    return
  }
  contractsByAddress[contract.address] = contract
  yield* $dispatchUpdateContract(contract, action.ephemeralAddress)
  yield* $dispatch(push(`/contract/${contract.address}`))
}


function* $handleStartContract(action) {
  const contract = contractsByAddress[action.address]
  if (!contract) {
    console.error(`Contract with address ${action.address} is not found in list`)
    return
  }
  try {
    yield call(() => contract.start())
  } catch (err) {
    console.error(`Failed to start contract ${action.address}: ${err.message}`)
    return
  }
  yield* $dispatchUpdateContract(contract)
}


function* $dispatchUpdateContract(contract, ephemeralAddress) {
  yield* $dispatch(Actions.updateContract(contract.serialize(), ephemeralAddress))
}
