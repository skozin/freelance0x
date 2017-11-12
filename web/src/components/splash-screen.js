import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import logo from 'assets/freelance0x_logo.svg'
import Spinner from 'react-spinkit'

const SplshScreenContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #242737;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Centered = styled.div`
  width: 400px;
  height: 600px;

`
const Logo = styled.div`
  width: 400px;
  height: 400px;
  background-image: url('${logo}');
  background-size: cover;
  background-position: center;
`
const SpinnerWrapper = styled.div`
  width: 400px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function WelcomeScreen() {
  return (
    <SplshScreenContainer>
      <Centered>
        <Logo />
        <SpinnerWrapper>
          <Spinner name='double-bounce' color='#A3DAFD' />
        </SpinnerWrapper>
      </Centered>
    </SplshScreenContainer>
  )
}
