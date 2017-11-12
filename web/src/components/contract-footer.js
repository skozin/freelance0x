import React from 'react'
import styled from 'styled-components'

const Footer = styled.div`
  font-family: 'Proxima Nova';
  font-weight: normal;
`

const NewContractBtn = styled.a`
  display: block;
  width: 100%;
  align-self: flex-end;
  padding: 16px;
  margin-top: 20px;
  border: 1px solid;
  border-radius: 2px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  background-color: #5E69D7;
  color: white;
  text-transform: uppercase;
  border-radius: 5px;

  &:hover {
    background-color: #5964CC;
  }

  &:active {
    background-color: #5660C4;
  }
`

export default class ContractHeader extends React.Component {
  renderFooter () {
    if (this.props.role === 'contractor') {
      return <NewContractBtn onClick={this.createProject}>Pay</NewContractBtn>

    } if (this.props.role === 'client') {
      return <Footer>Please, wait for client payment.</Footer>
    } else {
      return null
    }
  }

  render() {
    const { role, state } = this.props

    return (
      <div>
        {
          this.renderFooter()
        }
      </div>
    )
  }
}