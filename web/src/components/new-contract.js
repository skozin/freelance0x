import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import ContractLayout from './freelancer-layout'

const NewContractScreen = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px;
`

const Inner = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
`

const NewContractForm = styled.form`
  font-family: 'Proxima Nova';
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 600px;
  margin: 100px 0;
  padding: 70px 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
`

const NewContractBtn = styled.a`
  display: block;
  width: 100%;
  align-self: flex-end;
  padding: 16px 16px 14px;
  margin-top: 20px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  background-color: #5E69D7;
  color: white;
  text-transform: uppercase;
  border-radius: 3px;

  font-family: 'Muller';
  font-weight: bold;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: -0.48px;

  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5964CC;
  }

  &:active {
    background-color: #5660C4;
  }
`

const FormTitle = styled.h2`
  margin-bottom: 16px;
  align-self: center;

  font-family: 'Muller';
  font-weight: 500;
  font-size: 36px;
  color: #242737;
  letter-spacing: -0.38px;

  position: relative;
  padding-bottom: 16px;

  &:after {
    content: '';
    height: 2px;
    width: 70px;
    background: #5E69D7;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
`

const FormDescription = styled.div`
  text-align: center;
  vertical-align: middle;
  margin-bottom: 32px;
  font-size: 16px;
  color: #6B787D;
`

const Paragraph = styled.p`
  &:first-child {
    margin-bottom: 5px;
  }
`

const InputsContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`

const Input = styled.input`
  display: block;
  margin: 10px 0;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #cccccc;
  color: #242737;

  font-family: 'Proxima Nova';
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;
  line-height: 22px;

  &:focus {
    outline: none;
    border-color: #5E69D7;
  }
`

const ContractorAddress = Input.extend``
const ClientAddress = Input.extend`
  margin-right: 20px;
`
const ContractName = Input.extend``
const HourlyRate = Input.extend`
  margin-right: 20px;
`
const HoursHardCap = Input.extend``
const PrepaymentCurrentValue = Input.extend`
  width: 150px;
  margin-right: 20px;
  text-align: center;
  color: #9B9B9B;
`
const Prepayment = Input.extend`
  cursor: pointer;
`

const PaymentOverlay = styled.div`
  height: 5px;
  background-color: #5E69D7;
  width: 446px;
  position: absolute;
  top: 31px;
  left: 182px;
  border-radius: 2px;
  cursor: pointer;
`

export class NewContract extends React.Component {

  static mapStateToProps(state) {
    return {
      account: sel.account(state),
    }
  }

  componentDidMount = () => {
    this.updateRangeValue()
  }

  render() {
    return (
      <ContractLayout>
        <Inner>
          <FormTitle>Deploy Contract</FormTitle>
          <FormDescription>
            <Paragraph>Please, set contract details.</Paragraph>
          </FormDescription>
          <InputsContainer>
            <ClientAddress id='clientAddress' innerRef={node => this.clientAddressInput = node} placeholder='Client Address' />
            <ContractName id='contractName' innerRef={node => this.contractNameInput = node} placeholder='Contract Name' />
          </InputsContainer>
          <InputsContainer>
            <HourlyRate id='hourlyRate' innerRef={node => this.hourlyRateInput = node} placeholder='Hourly Rate' />
            <HoursHardCap id='hoursHardCap' innerRef={node => this.hoursHardCapInput = node} placeholder='Hours Hard Cap' />
          </InputsContainer>
          <InputsContainer>
            <PrepaymentCurrentValue id='paymentVal' disabled/>
            <Prepayment type='range' innerRef={node => this.prepaymentInput = node} onChange={this.updateRangeValue} />
            <PaymentOverlay id='paymentOverlay' />
          </InputsContainer>

          <NewContractBtn onClick={this.createProject}>Create Contract</NewContractBtn>
        </Inner>
      </ContractLayout>
    )
  }

  createProject = () => {
    const clientAddress = document.getElementById('clientAddress');
    const contractName = document.getElementById('contractName');
    const hourlyRate = document.getElementById('hourlyRate');
    const hoursHardCap = document.getElementById('hoursHardCap');
    let filled = true;

    if (clientAddress.value == '') {
      clientAddress.style.borderColor = '#F44336';
      filled = false;
    } else {
      clientAddress.style.borderColor = '#cccccc';
    }
    if (contractName.value == '') {
      contractName.style.borderColor = '#F44336';
      filled = false;
    } else {
      contractName.style.borderColor = '#cccccc';
    }
    if (hourlyRate.value == '') {
      hourlyRate.style.borderColor = '#F44336';
      filled = false;
    }else {
      hourlyRate.style.borderColor = '#cccccc';
    }
    if (hoursHardCap.value == '') {
      hoursHardCap.style.borderColor = '#F44336';
      filled = false;
    }else {
      hoursHardCap.style.borderColor = '#cccccc';
    }

    if (filled) {
      const requestObj = {
        contractorAddress: this.props.account,
        clientAddress: this.clientAddressInput.value,
        contractName: this.contractNameInput.value,
        hourlyRate: this.hourlyRateInput.value,
        hoursHardCap: this.hoursHardCapInput.value,
        prepayment: this.prepaymentInput.value,
      };

      console.log(requestObj);

      this.props.actions.createContract(
        requestObj.contractName,
        requestObj.clientAddress,
        String(Number(requestObj.hourlyRate) * Math.pow(10, 18)),
        String(Number(requestObj.hoursHardCap) * 60),
        String(Number(requestObj.prepayment ) * 10),
      )
    }
  }

  updateRangeValue = () => {
    const val = this.prepaymentInput.value;
    document.getElementById('paymentVal').value = val + '% prepayment';
    const paymentOverlay = document.getElementById('paymentOverlay');
    const newWidth = 446 * val / 100;
    paymentOverlay.style.width = newWidth + 'px';
  }

}

export default connect(NewContract)
