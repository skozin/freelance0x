import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

const NewContractScreen = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px;
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

const FormTitle = styled.h2`
  color: #242737;
  font-size: 36px;
  margin-bottom: 28px;
  align-self: center;
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
  jusstify-content: space-between;
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
  top: 30px;
  left: 182px;
  border-radius: 2px;
  cursor: pointer;
`

export class NewContract extends React.Component {

  componentDidMount = () => {
    this.updateRangeValue()
  }

  render() {
    return (
      <NewContractScreen>

        <NewContractForm>
          <FormTitle>Contract Form</FormTitle>
          <FormDescription>
            <Paragraph>Select your prefered payment methodand enter your details.</Paragraph>
            <Paragraph>We use this info for account verification, your credit card won't be charged now.</Paragraph>
          </FormDescription>
          <ContractorAddress disabled innerRef={node => this.contractorAddressInput = node} value='0x00b3a4e828d0d8bc873dcd33fdcebb7ed2e6edb5' />
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
        </NewContractForm>

      </NewContractScreen>
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
        contractorAddress: this.contractorAddressInput.value,
        clientAddress: this.clientAddressInput.value,
        contractName: this.contractNameInput.value,
        hourlyRate: this.hourlyRateInput.value,
        hoursHardCap: this.hoursHardCapInput.value,
        prepayment: this.prepaymentInput.value,
      };

      console.log(requestObj);
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
