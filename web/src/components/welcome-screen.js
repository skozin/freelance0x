import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const WelcomeScreenContainer = styled.div`
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

export default function WelcomeScreen() {
  return (
    <WelcomeScreenContainer>
      <NewContractLink to='/new'>New contract</NewContractLink>
      <ParticipateLink to='/participate'>Participate in a contract</ParticipateLink>
    </WelcomeScreenContainer>
  )
}
