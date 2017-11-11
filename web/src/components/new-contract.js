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
    this.props.actions.createContract(this.nameInput.value)
  }

}


export default connect(NewContract)
