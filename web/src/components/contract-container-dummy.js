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

class ContractContainer extends React.Component {

  static mapStateToProps(state) {
    const basicProps = {
      role: 'contractor',
      state: 1,
      name: 'The Greatest Contract in the World',
      clientAddress: '0x00b3a4e828d0d8bc873dcd33fdcebb7ed2e6edb6',
      contractorAddress: '0xfe2e794e7151690f3809aa76e553ecd581f858a3',
      hourlyRate: String(Number(0.25) * Math.pow(10, 18)),
      timeCapMinutes: String(Number(10) * 60),
      prepayFraction: '300',
      minutesReported: String(Number(5.5) * 60),
      comment: ` I’ve done with the following tasks:
        — Layout without any logic
        — Integration API to layout`,
      availableForWithdraw: String(Number(7.13455323) * Math.pow(10, 18)),
    }

    return {
      ...basicProps,
      actions2: {
        startContract: () => {
          console.log('Contract started!')
        },

        setBillableTime: (newMinutesReported, newComment) => {
          console.log('Updated with: new minutes ' + newMinutesReported + ', new comment ' + newComment)
        },

        approve: () => {
          console.log('Approved!')
        },

        withdraw: () => {
          console.log('Withdraw!')
        },

        cancel: () => {
          console.log('Cancel!')
        },

        leaveFeedback: (isGood, comment) => {
          console.log('Feedback: ' + isGood + ' Comment:' + comment)
        }
      }
    }
  }

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

    if (state === -2 || state === -1 || state === 0) {
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
        <ContractProgress {...this.props} />
        <ContractFooter {...this.props} />
      </ContractLayout>
    )
  }
}

export default connect(ContractContainer)

const SpinnerWrapper = styled.div`
  height: 700px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const ErrorMessage = styled.div`
  height: 700px;
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