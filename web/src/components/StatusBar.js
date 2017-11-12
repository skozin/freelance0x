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

const getColor = (state) => {
  
}


const Circle = styled.div`
  background: ${ (props) => {
    switch(props.status) {
      case 'active':
      case '1':
      case 1:
        return '#8AE7B0'
      case 'pending':
      case '0':
      case 0:
        return '#FFE53A'
      default:
        return '#8AA0E7'
      }
    }};
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
`

export default class Status extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props)
  }
  renderStatus () {

    if (this.props.status === 'active' || this.props.status == 1) {
      return  <StatusBar><Circle status={this.props.status} /> ACTIVE</StatusBar>
    } if (this.props.status === 'pending' || this.props.status == 0) {
      return  <StatusBar><Circle status={this.props.status} /> PENDING</StatusBar>
    } else {
      return  <StatusBar><Circle />COMPLETED</StatusBar>
    }
  }

  render() {
    return (
    <div>
      {
        this.renderStatus()
      }
    </div>
    )

  }
}


