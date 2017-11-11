import {take, takeEvery, call, fork, select} from 'redux-saga/effects'
import { delay } from 'redux-saga'
import $dispatch from '~/utils/saga-dispatch'

import * as Actions from '~/actions'
import ProjectContract, {getAccount} from '~/contract'


let contract


export default function* $apiSaga() {
  yield fork($setAccount)
  yield takeEvery(Actions.createProject.type, $handleCreateProject)
}


function* $setAccount() {
  try {
    const address = yield call(getAccount)
    yield delay(1)
    yield* $dispatch(Actions.connected(address || null))
  } catch (err) {
    console.error(`Cannot get account: ${err.message}`)
    yield* $dispatch(Actions.failedToConnect(err.message))
  }
}


function* $handleCreateProject(action) {
  contract = yield call(ProjectContract.deploy, action.name)
  yield* $dispatch(Actions.projectCreated(contract))
}
