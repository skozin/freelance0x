import {put} from 'redux-saga/effects'

//
// This function wraps redux-saga's `put` effect, and swallows all errors,
// re-throwing them from a separate stack frame instead. This serves two
// purposes:
//
// 1. sagas now don't cancel because of some error in a React component;
// 2. source maps are correctly applied to error stacks when viewing them in console.
//
export function* $dispatch(action) {
  try {
    yield put.resolve(action)
  } catch (e) {
    setTimeout(() => {throw e}, 0)
  }
}
