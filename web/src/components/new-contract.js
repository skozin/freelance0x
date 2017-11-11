import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'


const NewContractScreen = styled.div`
  // TODO
`

const NewContractBtn = styled.a`
  display: block;
  cursor: pointer;
`

const ProjectNameInput = styled.input`
  // TODO
`

export class NewContract extends React.Component {

  render() {
    return (
      <NewContractScreen>
        <NewContractBtn onClick={this.createContract}>Create</NewContractBtn>
        <ProjectNameInput innerRef={node => this.nameInput = node} />
      </NewContractScreen>
    )
  }

  createContract = () => {
    this.props.actions.createContract(this.nameInput.value,
      '0x5aeda56215b167893e80b4fe645ba6d5bab767de',
      '1000000000000000000',
      '6000',
      '300',
    )
  }

}


export default connect(NewContract)
