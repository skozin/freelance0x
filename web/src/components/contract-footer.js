import React from 'react'
import styled, { css } from 'styled-components'

import Button from './Button'

export default class ContractFooter extends React.Component {
  renderPendingFooter () {
    if (this.props.role === 'client') {
      return (
        <NewContractBtn onClick={() => this.props.actions2.startContract()}>
          Pay
        </NewContractBtn>
      )
    }

    if (this.props.role === 'contractor') {
      return (
        <StateOneMessage>
          Please, wait for client payment.
        </StateOneMessage>
      )
    }

    return null
  }


  renderActiveFooter () {
    if (this.props.role === 'client') {
      return (
        <Footer>
          <ButtonsWrapper>
            <Button onClick={() => this.props.actions2.approve()}>APPROVE CONTRACT</Button>
            <Button thin onClick={() => this.props.actions2.cancel()}>CANCEL CONTRACT</Button>
          </ButtonsWrapper>
        </Footer>
      )
    }

    if (this.props.role === 'contractor') {
      return (
        <Footer absolute>
          <ButtonsWrapper absolute>
            <Available>
              <AvailableLabel>AVAILABLE</AvailableLabel>
              <AvailableText>
                <span>Ξ</span>
                {Number(this.props.availableForWithdraw) / Math.pow(10, 18)}
              </AvailableText>
            </Available>
            <Button transparent onClick={() => this.props.actions2.withdraw()}>WITHDRAW</Button>
          </ButtonsWrapper>
        </Footer>
      )
    }
  }

  render () {
    const { role, state } = this.props


    if (state == 0 ) {
      return this.renderPendingFooter()
    }

    if (state == 1) {
      return this.renderActiveFooter()
    }

    return null
  }
}

const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  & > div:nth-child(2) {
    margin-left: 16px;
  }

  ${props => props.absolute && css`
    position: absolute;
    right: 0;
    bottom: 100%;
  `}
`

const Footer = styled.div`
  position: relative;
  margin-top: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  ${props => props.absolute && css`
    margin-top: 0;
  `}
`

const Available = styled.div`
  margin-right: 24px;
`

const AvailableLabel = styled.div`
  font-family: 'Muller';
  font-weight: bold;
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.72px;
  margin-bottom: 9px;
`

const AvailableText = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;

  span {
    font-family: 'Arial';
    margin-right: 8px;
  }
`

const StateOneMessage = styled.div`
  font-family: 'Proxima Nova';
  font-weight: normal;
  margin-top: 60px;
`

const NewContractBtn = styled.a`
  display: block;
  width: 100%;
  align-self: flex-end;
  padding: 16px;
  margin-top: 60px;
  border: 1px solid;
  border-radius: 2px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  background-color: #5E69D7;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;

  &:hover {
    background-color: #5964CC;
  }

  &:active {
    background-color: #5660C4;
  }
`