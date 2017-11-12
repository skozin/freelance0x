import React from 'react'
import styled from 'styled-components'

import ContractLayout from './freelancer-layout'
import ContractDetails from './contract-header'
import Button from './Button'

export default class ActiveClientScreen extends React.Component {
  render () {
    return (
      <ContractLayout>
        <ContractDetails />
        <Progress>
          <ProgressTitle>Current Progress</ProgressTitle>
          <Bar>
            <BarHead>
              <BarLabel>TIME SPENT</BarLabel>
              <BarHours>3.5 / 10 hours</BarHours>
            </BarHead>
            <BarLine>
              <BarLineInner hardCap={10} trackedHours={3.5}/>
            </BarLine>
          </Bar>
          <Comment>
            <CommentTitle>COMMENT</CommentTitle>
            <CommentText>
              {
                `I’ve done with the following tasks:
                — Layout without any logic
                — Integration API to layout
                `
              }
            </CommentText>
          </Comment>
          {/* <Editing>
            <Comment>
              <CommentTitle>COMMENT</CommentTitle>
              <CommentTextarea>
                {
                  `I’ve done with the following tasks:
                  — Layout without any logic
                  — Integration API to layout
                `
                }
              </CommentTextarea>
            </Comment>
            <BarEditing>
              <BarLabel>TIME SPENT</BarLabel>
              <BarHoursEditing>
                <BarInput type="number" placeholder="3" />
                <span>/</span>
                10 hours
              </BarHoursEditing>
            </BarEditing>
          </Editing> */}
        </Progress>
        <Footer>
          <ButtonsWrapper>
            <Button>APPROVE CONTRACT</Button>
            <Button thin>CANCEL CONTRACT</Button>
          </ButtonsWrapper>
        </Footer>

        {/* <Footer>
          <ButtonsWrapper>
            <Button>EDIT</Button>
          </ButtonsWrapper>
          <ButtonsWrapper>
            <Available>
              <AvailableLabel>AVAILABLE</AvailableLabel>
              <AvailableText>
                <span>Ξ</span>
                0.912381123
              </AvailableText>
            </Available>
            <Button transparent>WITHDRAW</Button>
          </ButtonsWrapper>
        </Footer> */}

        {/* <Footer>
          <ButtonsWrapper>
            <Button>UPDATE</Button>
            <Button thin>CANCEL EDITING</Button>
          </ButtonsWrapper>
        </Footer> */}
      </ContractLayout>
    )
  }
}

const Progress = styled.div`
  margin-top: 56px;
`

const ProgressTitle = styled.div`
  font-family: 'Muller';
  font-weight: bold;
  font-size: 26px;
  color: #242737;
  letter-spacing: -0.79px;

  padding-bottom: 24px;
  margin-bottom: 32px;
  position: relative;

  &:after {
    content: '';
    height: 2px;
    width: 70px;
    background: #5E69D7;
    position: absolute;
    left: 0;
    bottom: 0;
  }
`

const Bar = styled.div`
  margin-bottom: 24px;
`

const BarEditing = styled.div`
  margin-left: 48px;
`

const BarHead = styled.div`
  margin-bottom: 16px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`

const BarLabel = styled.div`
  font-family: 'Muller';
  font-weight: 500;
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;
`

const BarHours = styled.div`
  font-family: 'Muller';
  font-weight: 500;
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;
`

const BarHoursEditing = styled.div`
  font-family: 'Muller';
  font-weight: 500;
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;

  margin-top: 16px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  span {
    margin-right: 8px;
  }
`

const BarInput = styled.input`
  margin-right: 12px;
  padding: 14px 16px 15px;
  max-width: 54px;
  border-radius: 3px;
  resize: none;
  box-sizing: border-box;
  border: 1px solid #E0E0E0;
  outline: none;
  text-align: center;

  font-family: 'Proxima Nova';
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;

  transition: border-color .2s ease;
  will-change: border-color;

  &:focus {
    border-color: #5E69D7;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
  }
`

const BarLine = styled.div`
  background: #E0E0E0;
  position: relative;
  width: 100%;
  height: 3px;
`

const BarLineInner = styled.div`
  background: #5E69D7;
  width: ${props => (props.trackedHours / props.hardCap) * 100 + '%'};
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

const Comment = styled.div`
  margin-bottom: 24px;
  flex: 0 0 70%;
`

const CommentTitle = styled.div`
  margin-bottom: 16px;
  font-family: 'Muller';
  font-weight: 500;
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;
`

const CommentText = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;
  line-height: 22px;
  white-space: pre-line;
`

const CommentTextarea = styled.textarea`
  font-family: 'Proxima Nova';
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;
  line-height: 22px;
  white-space: pre-line;

  padding: 14px 16px 15px;
  border-radius: 3px;
  min-height: 95px;
  resize: none;
  box-sizing: border-box;
  border: 1px solid #E0E0E0;
  outline: none;
  width: 100%;

  transition: border-color .2s ease;
  will-change: border-color;

  &:focus {
    border-color: #5E69D7;
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  & > div:nth-child(2) {
    margin-left: 16px;
  }
`

const Footer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
`

const Available = styled.div`
  margin-right: 24px;
`

const AvailableLabel = styled.div`
  font-family: 'Muller';
  font-weight: bold;
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.72px;
  margin-bottom: 9px;
`

const AvailableText = styled.div`
  font-family: 'Proxima Nova';
  font-size: 16px;
  color: #242737;
  letter-spacing: -0.48px;

  span {
    font-family: 'Arial';
    margin-right: 8px;
  }
`

const Editing = styled.div`
  display: flex;
  flex-flow: row nowrap;
`