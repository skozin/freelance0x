import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import plus_circle from '../../assets/plus_circle.svg'
import empty_list from '../../assets/empty_list.svg'

import ContractLayout from './freelancer-layout'
import ContractItem from './contract-item'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 30px 50px 30px;
`
const FormTitle = styled.h2`
  color: #242737;
  font-size: 36px;
`
const NewContract = styled.a`
  text-decoration: none;
  color: black;
  &:before {
    content: url(${plus_circle});
    vertical-align: -25%;
    padding-right: 5px;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`

ContractsListScreen.mapStateToProps = (state) => {
  return {
    contracts: sel.contracts(state)
  }
}

export function ContractsListScreen({contracts}) {
  const contractsEls = contracts.keySeq()
    .map(address => contracts.get(address).toJS())
    .sort((c1, c2) => c2.lastActivityDate - c1.lastActivityDate)
    .map(contract => {
      if (contract.state != -3) {
      return (
        <div key={contract.ephemeralAddress || contract.address}>
          <ContractItem address={`/contract/${contract.address}`} status={ contract.state } name={ contract.name } lastActivityDate={ contract.lastActivityDate } />
        </div>
      )}
    }
    )

  return (
    <ContractLayout nopadding>
      <Header>
        <FormTitle>Contract List</FormTitle>
        <NewContract href='/new'>New Contract</NewContract>
      </Header>
        <ItemWrapper>
        {contractsEls}
        </ItemWrapper>
    </ContractLayout>
  )
}

//<div key={contract.ephemeralAddress || contract.address}>
  //<Link to={`/contract/${contract.address}`}>{contract.name}: {contract.state} ({contract.address})</Link>
//</div>

export default connect(ContractsListScreen)
