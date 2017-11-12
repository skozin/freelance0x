import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import background from '../../assets/background.png'
import logo from '../../assets/logo.svg'


const Contract = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 40px;
  background: url(${background}) no-repeat center / cover;
  color: #242738;
`

const Logo = styled(Link)`
  position: absolute;
  top: 60px;
  left: 70px;
  width: 85px;
  height: 85px;
  background: url(${logo}) no-repeat center / contain;
`

const Field = styled.div`
  font-family: 'Proxima Nova';
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 700px;
  height: 600px;
  margin: 100px 0;
  padding: ${props => props.nopadding ? '0 0' : '60px 30px'};
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(0, 0, 0, 0.1);
`


export class ContractLayout extends React.Component {

  render() {
    const {children} = this.props

    return (
      <Contract>
        <Logo to='/' />
        <Field nopadding={this.props.nopadding}>
          {children}
        </Field>
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

export default connect(ContractLayout)
