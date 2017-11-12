import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import background from '../../assets/background.png'
import Status from './StatusBar'

const Item = styled.div`
  display: flex; 
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;
`

const Name = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  font-weight: 100;
  width: 70%;
`

const ExecutionDate = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  font-weight: 100;
  width: 70%;
  color: #242737;
`

const Name = styled.div`
  font-family: 'Proxima Nova';
  font-size: 14px;
  font-weight: 100;
  width: 15%;
  color: #7C7C7C;

`

const StatusWrapper = styled.div`
  width: 15%;
`


export class ContractItem extends React.Component {
  render() {
    return (  
      <Item>
        <Name></Name>
        <ExecutionDate></ExecutionDate>
        <StatusWrapper>
          <Status />
        </StatusWrapper>
      </Item>
     )
    }
  }  
  