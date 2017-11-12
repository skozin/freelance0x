import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import ContractLayout from './freelancer-layout'
import background from '../../assets/background.png'
import Status from './StatusBar'


const Header = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
  font-family: 'Muller';
  font-weight: 500;
  color: #242737;
  font-size: 28px;
  align-self: left;
`

const Separator = styled.div`
    content: '';
    display: block;
    width: 70px;
    height: 2px;
    border-radius: 3px;
    background: #5E69D7;
    margin-top: 24px;
    margin-bottom: 32px;

    letter-spacing: 0.76px;
`

const FormDescription = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  text-align: left;
  margin-bottom: 6px;
  font-size: 16px;
`

const Contractor = styled.div`
  font-family: 'Muller';
  font-weight: 600;
  font-size: 16px;

  &:last-child {
    margin-top: 24px;
  }

  span {
    display: block;
    margin-top: 8px;
    font-family: 'Proxima Nova';
    font-weight: 100;

  }

`

const InputsContainer = styled.div`
  display: flex;
  jusstify-content: space-between;
`
const Wallets = styled.div`
  width: 70%;
`

const Payment = styled.div`
  width: 30%;
`


const Rate = styled.div`
  font-family: 'Muller';
  font-weight: 600;
  font-size: 16px;

    span {
      display: block;
      font-family: 'Proxima Nova';
      margin-top: 8px;
    }
`

const Prepayment = styled.div`
    font-family: 'Muller';
    font-weight: 600;
    font-size: 16px;
    margin-top: 24px;


  span {
      font-family: 'Proxima Nova';
      font-weight: normal;
      display: block;
      margin-top: 8px;
    }
`

const Total = styled.div`

  font-family: 'Muller';
  font-weight: 600;
  font-size: 16px;
  margin-top: 24px;

  span {
        font-family: 'Proxima Nova';
        font-weight: normal;
        display: block;
        margin-top: 8px;
      }
`

const Footer = styled.div`
  font-family: 'Proxima Nova';
  font-weight: normal;
`

const NewContractBtn = styled.a`
    display: block;
    width: 100%;
    align-self: flex-end;
    padding: 16px;
    margin-top: 20px;
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

const Inner = styled.div`

`



export default class ContractDetails extends React.Component {
  renderFooter() {
    if (this.props.role === 'contractor') {
      return <NewContractBtn onClick={this.createProject}>Pay</NewContractBtn>

    } if (this.props.role === 'client') {
      return <Footer>Please, wait for client payment.</Footer>
    } else {
      return null
    }

  }

  render() {
    const { name, state, clientAddress,
           contractorAddress, hourlyRate, timeCapMinutes,
           prepayFraction, minutesReported} = this.props
    return (
      <ContractLayout>
          <Inner>
            <Header>{name}
              <Status />
            </Header>
            <Separator/>
            <FormDescription>
              <Wallets>
                <Contractor>
                  CONTRACTOR ADDRESS
                  <span>{contractorAddress}</span>
                </Contractor>
                <Contractor>
                  CLIENT ADDRESS
                  <span>{clientAddress}</span>
                </Contractor>
              </Wallets>
              <Payment>
                <Rate>
                  HOURLY RATE
                  <span>Ξ {Number(hourlyRate) / Math.pow(10, 18)}</span>
                </Rate>
                <Prepayment>
                  PREPAYMENT
                  <span>{`${Number(prepayFraction) * 100}`}%</span>
                </Prepayment>
              </Payment>
              <Total>
                TOTAL
                <span>Ξ {Number(hourlyRate) / Math.pow(10, 18) * (Number(timeCapMinutes) / 60)}</span>
            </Total>
            </FormDescription>
          </Inner>
                {
                  this.renderFooter()
                }
      </ContractLayout>
    )
  }
}
