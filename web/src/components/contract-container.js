import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import ContractLayout from './freelancer-layout'
import ContractHeader from './contract-header'
import ContractFooter from './contract-footer'



// Created: 0,
//   Active: 1,
//     Approved: 2,
class ContractContainer extends React.Component {

  static mapStateToProps(state) {
    return {
      role: "freelancer",
      state: 0,
    }
  }

  render () {
    const { role, state } = this.props

    return (
      <ContractLayout>
        <ContractHeader role={role} state={state} />
        <ContractFooter role={role} state={state} />
      </ContractLayout>
    )
  }
}

export default connect(ContractContainer)