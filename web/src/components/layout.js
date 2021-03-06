import React from 'react'
import styled from 'styled-components'

import connect from '~/utils/connect'
import sel from '~/selectors'

import SplashScreen from './splash-screen'

const LayoutContainer = styled.div`
  background: url('./assets/background.png') no-repeat center / contain;
  font-face: sans-serif;
  font-size: 16px;
  height: 100%;
`

export class Layout extends React.Component {

  static mapStateToProps(state) {
    return {
      isConnected: sel.isConnected(state),
    }
  }

  render() {
    const {isConnected, children} = this.props
    return isConnected
      ? <LayoutContainer>{children}</LayoutContainer>
      : <SplashScreen />
  }
}


export default connect(Layout)
