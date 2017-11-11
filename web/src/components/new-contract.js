import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'

const NewContractScreen = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px;
`

const NewContractForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 360px;
  margin-top: 20px;
  padding: 0 10px;
`

const NewContractBtn = styled.a`
  display: block;
  width: 80px;
  align-self: flex-end;
  padding: 5px;
  border: 1px solid;
  border-radius: 2px; 
  cursor: pointer;
`

const Input = styled.input`
  display: block;
  margin: 10px 0;
`

const Label = styled.label`
  display: block;
  margin: 5px 0;
  font-size: 12px;
`

const ContractorAddress = Input.extend``
const ClientAddress = Input.extend``
const ContractName = Input.extend``
const HourlyRate = Input.extend``
const HoursHardCap = Input.extend``
const Prepayment = Input.extend``

const ContractorAddressLabel = Label.extend``
const ClientAddressLabel = Label.extend``
const ContractNameLabel = Label.extend``
const HourlyRateLabel = Label.extend``
const HoursHardCapLabel = Label.extend``
const PrepaymentLabel = Label.extend``

export class NewContract extends React.Component {

  static mapStateToProps(state) {
    return {
      isCreatingProject: state.get('isCreatingProject'),
      hasProject: !!state.get('project'),
    }
  }

  render() {
    return (
      <NewContractScreen>
        <NewContractForm>
          <ContractorAddressLabel>{ 'Contractor Address' }</ContractorAddressLabel>
          <ContractorAddress disabled ref={node => this.contractorAddressInput = node} />
          <ClientAddressLabel>{ 'Client Address' }</ClientAddressLabel>
          <ClientAddress ref={node => this.clientAddressInput = node} />
          <ContractNameLabel>{ 'Contract Name' }</ContractNameLabel>
          <ContractName ref={node => this.contractNameInput = node} />
          <HourlyRateLabel>{ 'Hourly Rate' }</HourlyRateLabel>
          <HourlyRate ref={node => this.hourlyRateInput = node} />
          <HoursHardCapLabel>{ 'Hours Hard Cap' }</HoursHardCapLabel>
          <HoursHardCap ref={node => this.hoursHardCapInput = node} />
          <PrepaymentLabel>{ 'Prepayment' }</PrepaymentLabel>
          <Prepayment type='range' ref={node => this.prepaymentInput = node} />
          
          <NewContractBtn onClick={this.createProject}>Create</NewContractBtn>
        </NewContractForm>

      </NewContractScreen>
    )
  }

  createProject = () => {
    this.props.actions.createProject(this.nameInput.value)
  }

}


export default connect(NewContract)
