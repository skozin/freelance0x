import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'

import connect from '~/utils/connect'
import sel from '~/selectors'

import ContractLayout from './freelancer-layout'
import ContractHeader from './contract-header'
import ContractProgress from './contract-progress'
import ContractFooter from './contract-footer'

import ContractFeedback from './contract-feedback'

// Created: 0,
//   Active: 1,
//     Approved: 2,
class ContractContainer extends React.Component {

  render () {
    const { role, state } = this.props

    if (state === -3) {
      return (
        <ContractLayout>
          <ErrorMessage>
            <span>😢</span>
            Contract Not Found
          </ErrorMessage>
        </ContractLayout>
      )
    }

    if (state === -2 || state === -1) {
      return (
        <ContractLayout>
          <SpinnerWrapper>
            <Spinner name='double-bounce' color='#5E69D7' />
          </SpinnerWrapper>
        </ContractLayout>
      )
    }

    if (state === 2) {
      return (
        <ContractLayout>
          <ContractFeedback {...this.props} />
        </ContractLayout>
      )
    }

    return (
      <ContractLayout>
        <ContractHeader {...this.props} />
        {state !== 0 && <ContractProgress {...this.props} />}
        <ContractFooter {...this.props} />
      </ContractLayout>
    )
  }
}

export default connect(ContractContainer)

const SpinnerWrapper = styled.div`
  height: 480px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorMessage = styled.div`
  height: 480px;
  font-family: 'Muller';
  font-weight: 500;
  font-size: 26px;
  color: #242737;
  letter-spacing: -0.79px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  span {
    font-family: 'Apple Color Emoji';
    font-size: 64px;
    margin-bottom: 24px;
  }
`
