import {connect as reduxConnect} from 'react-redux'
import * as actions from '~/actions'


const EMPTY = {}
const mapToEmptyProps = () => EMPTY


export default function connect(Container, opts) {
  const mapStateToProps = Container.mapStateToProps || mapToEmptyProps
  const mapDispatchToProps = Container.mapDispatchToProps || actions
  return reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps, opts)(Container)
}


function mergeProps(stateProps, dispatchProps, parentProps) {
  return {...parentProps, ...stateProps, actions: dispatchProps}
}
