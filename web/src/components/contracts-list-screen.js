import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

const ContractsScreenContainer = styled.div`
  margin-top: 10px;
  line-height: 25px;
  text-align: center;
`

const NewContractLink = styled(Link)`
  display: block;
  color: #666;
`

const ParticipateLink = styled(Link)`
  display: block;
  color: #666;
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
    .map(contract => (
      <div key={contract.ephemeralAddress || contract.address}>
        <Link to={`/contract/${contract.address}`}>{contract.name}: {contract.state} ({contract.address})</Link>
      </div>
    ))
  return (
    <ContractsScreenContainer>
      <NewContractLink to='/new'>New contract</NewContractLink>
      <ParticipateLink to='/participate'>Participate in a contract</ParticipateLink>
      <hr />
      {contractsEls}
    </ContractsScreenContainer>
  )
}

export default connect(ContractsListScreen)
