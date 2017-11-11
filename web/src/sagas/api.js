import {take, takeEvery, call, fork, select} from 'redux-saga/effects'
import $dispatch from '~/utils/saga-dispatch'

import * as Actions from '~/actions'
import ProjectContract from '~/contract'


let contract


export default function* $apiSaga() {
  yield takeEvery(Actions.createProject.type, $handleCreateProject)
}


function* $handleCreateProject(action) {
  contract = yield call(ProjectContract.deploy(action.name))
  yield* $dispatch(Actions.projectCreated(contract))
}
