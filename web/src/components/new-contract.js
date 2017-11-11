import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'


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

  static mapStateToProps(state) {
    return {
      isCreatingProject: sel.isCreatingProject(state),
      hasProject: sel.hasProject(state),
    }
  }

  render() {
    return (
      <NewContractScreen>
        <NewContractBtn onClick={this.createProject}>Create</NewContractBtn>
        <ProjectNameInput innerRef={node => this.nameInput = node} />
        {`isCreating: ${this.props.isCreatingProject}, hasProject: ${this.props.hasProject}`}
      </NewContractScreen>
    )
  }

  createProject = () => {
    this.props.actions.createProject(this.nameInput.value)
  }

}


export default connect(NewContract)
