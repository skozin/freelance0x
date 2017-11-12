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

  border-top: 1px solid #E0E0E0;
  padding: 24px 30px; 
  box-sizing: border-box;

  &:hover {
    background: #5E69D7;
    color: #FFFFFF; 
  }
`

const Name = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  font-weight: 100;
  width: 55%;
`

const ExecutionDate = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  font-weight: 100;
  width: 25%;
  color: #7C7C7C;

  ${Item}:hover & {
    color: #FFFFFF; 
  }
`

const StatusWrapper = styled.div`
  width: 20%;
`


export default class ContractItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastActivityDate: (new Date(this.props.lastActivityDate * 1000)).toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'})
    };
  }

  render() {
    return (
      <Link to={ this.props.address }> 
        <Item>
          <Name>{ this.props.name }</Name>
          <ExecutionDate>{ this.state.lastActivityDate }</ExecutionDate>
          <StatusWrapper>
            <Status status={this.props.status}/>
          </StatusWrapper>
        </Item>
      </Link>
     )
    }
  }  
  