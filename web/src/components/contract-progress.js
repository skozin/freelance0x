import React from 'react'
import styled, { css } from 'styled-components'

import Button from './Button'

export default class ContractProgress extends React.Component {
  state = {
    isEditing: false
  }

  onEditClick = () => {
    this.setState({
      isEditing: true
    })
  }

  onUpdateClick = (hours, comment) => {
    this.setState({
      isEditing: false
    })

    this.props.actions.setBillableTime(this.props.address, hours, comment)
  }

  onCancelClick = () => {
    this.setState({
      isEditing: false
    })
  }

  render () {
    const {
      role,
      state,
      name,
      clientAddress,
      contractorAddress,
      hourlyRate,
      timeCapMinutes,
      prepayFraction,
      minutesReported,
      comment,
      available,
      totalContractEth,
    } = this.props
    const { isEditing } = this.state

    return (
      <Progress>
        <ProgressTitle>Current Progress</ProgressTitle>
        {
          isEditing ?
            <IsEditing>
              <Editing>
                <Comment>
                  <CommentTitle>COMMENT</CommentTitle>
                  <CommentTextarea
                    innerRef={comment => this.comment = comment}
                    defaultValue={comment} />
                </Comment>
                <BarEditing>
                  <BarLabel>TIME SPENT</BarLabel>
                  <BarHoursEditing>
                    <BarInput
                      innerRef={node => this.hours = node}
                      type="number"
                      placeholder="3"
                      defaultValue={Number(minutesReported) / 60} />
                    <span>/</span>
                    {Number(timeCapMinutes) / 60} hours
                  </BarHoursEditing>
                </BarEditing>
              </Editing>
              <Footer isEditing>
                <ButtonsWrapper>
                  <Button onClick={() => this.onUpdateClick(this.hours.value, this.comment.value)}>
                    UPDATE
                  </Button>
                  <Button onClick={() => this.onCancelClick()} thin>
                    CANCEL EDITING
                  </Button>
                </ButtonsWrapper>
              </Footer>
            </IsEditing>
            :
            <IsNotEditing>
              <Bar>
                <BarHead>
                  <BarLabel>TIME SPENT</BarLabel>
                  <BarHours>{Number(minutesReported) / 60} / {Number(timeCapMinutes) / 60} hours</BarHours>
                </BarHead>
                <BarLine>
                  <BarLineInner timeCapMinutes={timeCapMinutes} minutesReported={minutesReported} />
                </BarLine>
              </Bar>
              <Comment>
                <CommentTitle>COMMENT</CommentTitle>
                <CommentText>
                  { comment }
                </CommentText>
              </Comment>
              {
                role === 'contractor' &&
                  <Footer>
                    <ButtonsWrapper>
                      <Button onClick={() => this.onEditClick()}>EDIT</Button>
                    </ButtonsWrapper>
                  </Footer>
              }
            </IsNotEditing>
        }
      </Progress>
    )
  }
}

const Progress = styled.div`
  margin-top: 56px;
`

const ProgressTitle = styled.div`
  font-family: 'Muller';
  font-weight: 500;
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
  margin-left: 32px;
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
  padding: 14px 12px 15px;
  width: 100%;
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
  width: ${props => (Number(props.minutesReported) / Number(props.timeCapMinutes)) * 100 + '%'};
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
  margin-top: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  ${props => props.isEditing && css`
    margin-top: 35px;
    z-index: 5;
    background: #FFF;
    position: relative;
  `}
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

const IsEditing = styled.div`

`

const IsNotEditing = styled.div`

`
