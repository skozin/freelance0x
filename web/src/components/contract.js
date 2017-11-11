import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import background from '../../assets/background.png'

const Contract = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px;
  background: url(${background}) no-repeat center / cover;
`

const NewContractForm = styled.form`
  font-family: 'Proxima Nova';
  display: flex;
  flex-direction: column;
  width: 700px;
  height: 600px;
  margin: 100px 0;
  padding: 60px 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`

const NewContractBtn = styled.a`
  display: block;
  width: 100%;
  align-self: flex-end;
  padding: 16px;
  border: 1px solid;
  border-radius: 2px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  background-color: #5E69D7;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;
`

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

const StatusBar = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

const Circle = styled.div`
  background: #8AE7B0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
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
  text-align: center;
  vertical-align: middle;
  margin-bottom: 6px;
  font-size: 18px;
`

const InputsContainer = styled.div`
  display: flex;
  jusstify-content: space-between;
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
`
const Prepayment = Input.extend``

export class NewContract extends React.Component {

  static mapStateToProps(state) {
    return {
      isCreatingProject: sel.isCreatingProject(state),
      hasProject: sel.hasProject(state),
    }
  }

  render() {
    return (
      <Contract>

        <NewContractForm>
          <Header>Contract Form
            <StatusBar>
              <Circle />
              ACTIVE
            </StatusBar>
          </Header>
          <Separator/>
          <FormDescription>
            <p>Select your prefered payment methodand enter your details.</p>
            <p>We use this info for account verification, your credit card won't be charged now.</p>
          </FormDescription>
          <ContractorAddress disabled innerRef={node => this.contractorAddressInput = node} />
          <InputsContainer>
            <ClientAddress innerRef={node => this.clientAddressInput = node} placeholder='Client Address' />
            <ContractName innerRef={node => this.contractNameInput = node} placeholder='Contract Name' />
          </InputsContainer>
          <InputsContainer>
            <HourlyRate innerRef={node => this.hourlyRateInput = node} placeholder='Hourly Rate' />
            <HoursHardCap innerRef={node => this.hoursHardCapInput = node} placeholder='Hours Hard Cap' />
          </InputsContainer>
          <InputsContainer>
            <PrepaymentCurrentValue id='paymentVal' disabled/>
            <Prepayment type='range' innerRef={node => this.prepaymentInput = node} onChange={this.updateRangeValue} />
          </InputsContainer>

          <NewContractBtn onClick={this.createProject}>Create Contract</NewContractBtn>
        </NewContractForm>

      </Contract>
    )
  }

  createProject = () => {
    const requestObj = {
      contractorAddress: this.contractorAddressInput.value,
      clientAddress: this.clientAddressInput.value,
      contractName: this.contractNameInput.value,
      hourlyRate: this.hourlyRateInput.value,
      hoursHardCap: this.hoursHardCapInput.value,
      prepayment: this.prepaymentInput.value,
    };
    console.log(requestObj)
  }

  updateRangeValue = () => {
    const val = this.prepaymentInput.value;
    document.getElementById('paymentVal').value = val + '% prepayment';
  }

}

export default connect(NewContract)
