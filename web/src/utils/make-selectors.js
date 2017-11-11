import mapValues from './map-values'


export default function makeSelectors(sel) {
  return mapValues(sel, path => {
    switch (typeof path) {
      case 'string': return memoizeKey(path)
      case 'function': return path
      default: return Array.isArray(path) ? memoizePath(path) : makeSelectors(path)
    }
  })
}


function memoizePath(path) {
  let prevState = null
  let prevResult = null
  return (state) => {
    // TODO: use isImmutable instead of checking ad-hoc __mutable flag when Immutable.js 4.0 is out,
    // see github.com/facebook/immutable-js/pull/1113.
    if (state === prevState && !state.__mutable) {
      return prevResult
    }
    prevState = state
    return prevResult = state.getIn(path)
  }
}


function memoizeKey(key) {
  let prevState = null
  let prevResult = null
  return (state) => {
    // TODO: use isImmutable instead of checking ad-hoc __mutable flag when Immutable.js 4.0 is out,
    // see github.com/facebook/immutable-js/pull/1113.
    if (state === prevState && !state.__mutable) {
      return prevResult
    }
    prevState = state
    return prevResult = state.get(key)
  }
}
