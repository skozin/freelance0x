import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import plus_circle from '../../assets/plus_circle.svg'
import empty from '../../assets/empty_list.svg'

import ContractLayout from './freelancer-layout'
import ContractItem from './contract-item'

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
        <NewContract to='/new'>New Contract</NewContract>
      </Header>
        {
          contracts.size < 1 ?
            <Empty>
              <span>😵</span>
              No one contract here
            </Empty>
            :
            <ItemWrapper>
              {contractsEls}
            </ItemWrapper>
        }
    </ContractLayout>
  )
}

export default connect(ContractsListScreen)

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 60px 30px 50px 30px;
`
const FormTitle = styled.h2`
  font-family: 'Muller';
  font-weight: 500;
  font-size: 28px;
  color: #242737;
  letter-spacing: -0.85px;
`
const NewContract = styled(Link)`
  text-decoration: none;
  color: black;
  cursor: pointer;

  &:before {
    content: url(${plus_circle});
    vertical-align: -25%;
    padding-right: 8px;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  flex: 1;
`

const Empty = styled.div`
  margin-bottom: 100px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  font-family: 'Proxima Nova';
  font-size: 28px;
  color: #242737;
  letter-spacing: -0.85px;

  span {
    font-family: 'Apple Color Emoji';
    font-size: 64px;
    margin-bottom: 24px;
  }
`