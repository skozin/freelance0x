import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'
import {State as ContractState} from '~/contract'

import ContractDetails from './contract'


export class ContractDetailsScreen extends React.Component {

  static mapStateToProps = (state, props) => {
    const {address} = props.match.params
    return {
      contract: sel.contractWithAddress(state, address),
      initialFetchComplete: sel.initialFetchComplete(state),
    }
  }

  componentWillMount() {
    this.fetchContractIfNeeded(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.fetchContractIfNeeded(nextProps)
  }

  fetchContractIfNeeded(props) {
    if (props.initialFetchComplete && !props.contract) {
      props.actions.fetchContract(props.match.params.address)
    }
  }

  render() {
    const {contract: immutableContract, actions} = this.props

    if (!immutableContract) {
      return null
    }

    const contract = immutableContract.toJS()

    if (contract.state == ContractState.NotFound) {
      return <div>No contract with this address!</div>
    }

    return <ContractDetails {...contract} role='contractor' />

    // const start = () => actions.startContract(contract.address)
    // return (
    //   <div>
    //     <div>Address: {contract.address}</div>
    //     <div>Name: {contract.name}</div>
    //     <div>State: {contract.state}</div>
    //     <div>Client address: {contract.clientAddress}</div>
    //     <div>Contractor address: {contract.contractorAddress}</div>
    //     <div>Executed at: {contract.executionDate}</div>
    //     <div>Ended at: {contract.endDate}</div>
    //     <div>Hourly rate: {'' + contract.hourlyRate}</div>
    //     <div>Time cap (minutes): {contract.timeCapMinutes}</div>
    //     <div>Prepay (%): {Math.round(contract.prepayFraction * 100)}</div>
    //     <div>Total reported (minutes): {contract.minutesReported}</div>
    //     <div>Balance: {'' + contract.balance}</div>
    //     <a href='#' onClick={start}>Start</a>
    //   </div>
    // )
  }

}


export default connect(ContractDetailsScreen)
