import {take, takeEvery, actionChannel, call, fork, join, select, all} from 'redux-saga/effects'
import {buffers} from 'redux-saga'
import {push} from 'react-router-redux'

import $dispatch from '~/utils/saga-dispatch'
import mapValues from '~/utils/map-values'

import * as Actions from '~/actions'
import sel from '~/selectors'


export default function* $contractsListPersistenceSaga() {
  const {address} = yield take(Actions.connected.type)
  if (!address) {
    console.error(`Not logged in`)
    return
  }
  yield call($loadContracts)
  yield fork($saveContractsOnChange)
}


function* $loadContracts() {
  const contractsByAddress = loadContracts()
  yield* $dispatch(Actions.setContractsList(contractsByAddress))

  const addresses = Object.keys(contractsByAddress)
  const tasks = yield all(addresses.map(address => fork($fetchContract, address)))

  if (tasks.length) {
    yield join(...tasks)
  }

  yield* $dispatch(Actions.initialFetchCompleted())

  const contracts = yield select(sel.contracts)
  yield call(saveContracts, contracts.toJS())
}


function* $fetchContract(address) {
  yield* $dispatch(Actions.fetchContract(address))
  while (true) {
    const action = yield take([
      Actions.updateContract.type,
      Actions.contractOperationFailed.type,
    ])
    const updatedAddress = action.address || action.contract.address
    if (updatedAddress == address) {
      return
    }
  }
}


function* $saveContractsOnChange() {
  const actionsChan = yield actionChannel('*', buffers.sliding(1))
  let contracts = yield select(sel.contracts)

  while (true) {
    yield take(actionsChan)
    const newContracts = yield select(sel.contracts)
    if (newContracts != contracts) {
      contracts = newContracts
      yield call(saveContracts, contracts.toJS())
    }
  }
}


function loadContracts() {
  const contractsJSON = localStorage.contracts || '{}'
  return JSON.parse(contractsJSON)
}


function saveContracts(contracts) {
  const contractsJSON = JSON.stringify(mapValues(contracts, contract => {
    const {error, updating, ...otherProps} = contract
    return otherProps
  }))
  localStorage.contracts = contractsJSON
}
