import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import ContractLayout from './freelancer-layout'
import background from '../../assets/background.png'


const StatusBar = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  font-weight: 100;

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

export class Status extends React.Component {

  render() {
    return (
    <StatusBar>
      <Circle />
      ACTIVE
    </StatusBar>
    )

  }
}

export default connect(Status)
