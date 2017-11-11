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

  static mapStateToProps(state) {
    return {
      isCreatingProject: state.get('isCreatingProject'),
      hasProject: !!state.get('project'),
    }
  }

  render() {
    return (
      <NewContractScreen>
        <NewContractBtn onClick={this.createProject}>Create</NewContractBtn>
        <ProjectNameInput ref={node => this.nameInput = node} />
        {`isCreating: ${this.props.isCreatingProject}, hasProject: ${this.props.hasProject}`}
      </NewContractScreen>
    )
  }

  createProject = () => {
    this.props.actions.createProject(this.nameInput.value)
  }

}


export default connect(NewContract)
