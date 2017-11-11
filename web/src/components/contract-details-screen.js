import React from 'react'
import styled from 'styled-components'
import {withRouter} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'


export function ContractDetailsScreen({contract: immutableContract}) {
  if (!immutableContract) {
    return <div>No contract with this address!</div>
  }
  const contract = immutableContract.toJS()
  return (
    <div>
      <div>Address: {contract.address}</div>
      <div>Name: {contract.name}</div>
      <div>Client address: {contract.clientAddress}</div>
      <div>Contractor address: {contract.contractorAddress}</div>
      <div>Executed at: {contract.executionDate}</div>
      <div>Ended at: {contract.endDate}</div>
      <div>Hourly rate: {'' + contract.hourlyRate}</div>
      <div>Time cap (minutes): {contract.timeCapMinutes}</div>
      <div>Prepay (%): {Math.round(contract.prepayFraction * 100)}</div>
      <div>Total reported (minutes): {contract.minutesReported}</div>
      <div>Balance: {'' + contract.balance}</div>
    </div>
  )
}


ContractDetailsScreen.mapStateToProps = (state, props) => {
  const {address} = props.match.params
  return {
    contract: sel.contractWithAddress(state, address)
  }
}


export default withRouter(connect(ContractDetailsScreen))
