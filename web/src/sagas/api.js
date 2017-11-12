import {take, takeEvery, call, fork, select} from 'redux-saga/effects'
import {push} from 'react-router-redux'
import {delay} from 'redux-saga'
import $dispatch from '~/utils/saga-dispatch'

import * as Actions from '~/actions'
import ProjectContract, {getAccount} from '~/contract'


let contractsByAddress = {}


export default function* $apiSaga() {
  yield fork($setAccount)
  yield takeEvery(Actions.fetchContract.type, $handleFetchContract)
  yield takeEvery(Actions.createContract.type, $handleCreateContract)
  yield takeEvery(Actions.startContract.type, $handleStartContract)
  yield takeEvery(Actions.setBillableTime.type, $handleSetBillableTime)
  yield takeEvery(Actions.approve.type, $handleApprove)
  yield takeEvery(Actions.withdraw.type, $handleWithdraw)
  yield takeEvery(Actions.cancel.type, $handleCancel)
  yield takeEvery(Actions.leaveFeedback.type, $handleLeaveFeedback)
}


function* $setAccount() {
  let address
  try {
    address = yield call(getAccount)
    yield delay(1000)
  } catch (err) {
    console.error(`Cannot get account: ${err.message}`)
    yield* $dispatch(Actions.failedToConnect(err.message))
    return
  }
  yield* $dispatch(Actions.connected(address || null))
}


function* $handleFetchContract(action) {
  let contract = contractsByAddress[action.address]
  try {
    if (contract) {
      console.debug(`fetching contract ${contract.address}`)
      yield call(contract.fetch)
    } else {
      console.debug(`obtaining contract ${action.address}`)
      contract = yield call(ProjectContract.at, action.address)
      contractsByAddress[contract.address] = contract
    }
  } catch (err) {
    yield* $dispatch(Actions.contractOperationFailed(action.address, err.message, !contract))
    // setTimeout(() => {throw err}, 0)
    return
  }
  yield* $dispatchUpdateContract(contract, action.address)
}


function* $handleCreateContract(action) {
  yield* $dispatch(push(`/contract/${action.ephemeralAddress}`))
  let contract
  try {
    contract = yield call(ProjectContract.deploy,
      action.name,
      action.clientAddress,
      action.hourlyRate,
      action.timeCapMinutes,
      action.prepayFractionThousands,
    )
  } catch (err) {
    yield* $dispatch(Actions.contractOperationFailed(action.ephemeralAddress, err.message))
    // setTimeout(() => {throw err}, 0)
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


function* $handleSetBillableTime(action) {
  const contract = contractsByAddress[action.address]
  if (!contract) {
    console.error(`Contract with address ${action.address} is not found in list`)
    return
  }
  try {
    yield call(() => contract.setBillableTime(60 * Number(action.hours), action.comment))
  } catch (err) {
    console.error(`Error with contract ${action.address}: ${err.message}`)
    return
  }
  yield* $dispatchUpdateContract(contract)
}


function* $handleApprove(action) {
  const contract = contractsByAddress[action.address]
  if (!contract) {
    console.error(`Contract with address ${action.address} is not found in list`)
    return
  }
  try {
    yield call(() => contract.approve())
  } catch (err) {
    console.error(`Error with contract ${action.address}: ${err.message}`)
    return
  }
  yield* $dispatchUpdateContract(contract)
}


function* $handleWithdraw(action) {
  const contract = contractsByAddress[action.address]
  if (!contract) {
    console.error(`Contract with address ${action.address} is not found in list`)
    return
  }
  try {
    yield call(() => contract.withdraw())
  } catch (err) {
    console.error(`Error with contract ${action.address}: ${err.message}`)
    return
  }
  yield* $dispatchUpdateContract(contract)
}


function* $handleCancel(action) {
  const contract = contractsByAddress[action.address]
  if (!contract) {
    console.error(`Contract with address ${action.address} is not found in list`)
    return
  }
  try {
    yield call(() => contract.cancel())
  } catch (err) {
    console.error(`Error with contract ${action.address}: ${err.message}`)
    return
  }
  yield* $dispatchUpdateContract(contract)
}


function* $handleLeaveFeedback(action) {
  const contract = contractsByAddress[action.address]
  if (!contract) {
    console.error(`Contract with address ${action.address} is not found in list`)
    return
  }
  try {
    yield call(() => contract.leaveFeedback(action.positive, action.comment))
  } catch (err) {
    console.error(`Error with contract ${action.address}: ${err.message}`)
    return
  }
  yield* $dispatchUpdateContract(contract)
}


function* $dispatchUpdateContract(contract, ephemeralAddress) {
  yield* $dispatch(Actions.updateContract(contract.serialize(), ephemeralAddress))
}
