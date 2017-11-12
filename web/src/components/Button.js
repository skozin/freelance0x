import React from 'react'
import styled, { css } from 'styled-components'

const Button = ({ thin, transparent, children, onClick }) => (
  <ButtonView onClick={onClick} thin={thin} transparent={transparent}>
    {children}
  </ButtonView>
)

export default Button

const ButtonView = styled.div`
  padding: 16px 16px 14px;

  font-family: 'Muller';
  font-weight: ${props => props.thin ? '500' : 'bold'};;

  font-size: 16px;
  color: ${props => props.thin ? '#F44336' : '#FFFFFF'};
  letter-spacing: -0.48px;
  text-align: center;
  cursor: pointer;
  user-select: none;

  ${props => !props.thin && css`
    border: 1px solid #5E69D7;
    background: ${props => props.transparent ? 'transparent' : '#5E69D7'};
    border-radius: 3px;
    min-width: ${props => props.transparent ? '149px' : '194px'};

    transition: background 0.2s;
    will-change: background;

    &:hover {
      background-color: #5964CC;
    }

    &:active {
      background-color: #5660C4;
    }
  `}

  ${props => props.transparent && css`
    color: #5E69D7;
  `}
`