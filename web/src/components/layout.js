import React from 'react'
import styled from 'styled-components'


const LayoutContainer = styled.div`
  font-face: sans-serif;
  font-size: 16px;
`


export default function Layout({children}) {
  return <LayoutContainer>{children}</LayoutContainer>
}
