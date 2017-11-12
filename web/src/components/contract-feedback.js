import React from 'react'
import styled from 'styled-components'

import good_feedback from '../../assets/good_feedback.png'
import bad_feedback from '../../assets/bad_feedback.png'

import Button from './Button'

export default class ContractFeedback extends React.Component {
	state = {
		good: true,
		bad: false
	}

	onWithdrawClick = () => {
		this.props.actions.withdraw(this.props.address)
	}

	chooseFeedbackType = (e) => {
		const data = e.target.getAttribute('data');

		if (data === 'good') {
			this.setState({
				bad: false,
				good: true
			})
		} else if (data === 'bad') {
			this.setState({
				bad: true,
				good: false
			})
		}
	}

	sendFeedback = () => {
		this.props.actions.leaveFeedback(this.props.address, !this.state.bad, this.messageText.value)
	}

	render () {
		const { availableForWithdraw, role } = this.props

		return (
			<ContractFeedbackView>
      	<FormTitle>The greatest contract in the World</FormTitle>
      	<Separator/>
      	<FormDescription>
					<p>Please, give a feedback for {role === 'client' ? 'client' : 'contractor'}.</p>
        </FormDescription>
      	<FeedbackOptions>
					<GoodEmojiContainer
						data='good'
						onClick={((e) => this.chooseFeedbackType(e))}
						chosen={this.state.good} />
      		or
					<BadEmojiContainer
						data='bad'
						onClick={((e) => this.chooseFeedbackType(e))}
						chosen={this.state.bad} />
      	</FeedbackOptions>
				<Message>
					<MessageLabel>message</MessageLabel>
					<MessageTextArea innerRef={node => this.messageText = node}/>
				</Message>
      	<FormBtn onClick={() => this.sendFeedback()}>Leave a Feedback</FormBtn>

				<Footer>
					<ButtonsWrapper>
						<Available>
							<AvailableLabel>AVAILABLE</AvailableLabel>
							<AvailableText>
								<span>Ξ</span>
								{Number(availableForWithdraw) / Math.pow(10, 18)}
              </AvailableText>
						</Available>
						<Button transparent onClick={() => this.onWithdrawClick()}>WITHDRAW</Button>
					</ButtonsWrapper>
				</Footer>
			</ContractFeedbackView>
    )
	}
}

const ContractFeedbackView = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
`

const FormTitle = styled.h2`
	font-family: 'Muller';
	font-weight: 500;
	font-size: 28px;
	color: #242737;
	letter-spacing: -0.85px;
	align-self: center;
`

const FormBtn = styled.a`
  display: block;
  width: 100%;
  align-self: flex-end;
  padding: 16px 16px 14px;
  margin-top: 20px;
  cursor: pointer;
  background-color: #5E69D7;
  text-transform: uppercase;
  border-radius: 3px;

	font-family: 'Muller';
	font-size: 16px;
	font-weight: bold;
	color: #FFFFFF;
	letter-spacing: -0.48px;
  text-align: center;

	transition: background-color 0.2s ease;
	will-change: background-color;

  &:hover {
    background-color: #5964CC;
	}

  &:active {
    background-color: #5660C4;
  }
`

const Separator = styled.div`
	content: '';
	display: block;
	width: 70px;
	height: 2px;
	border-radius: 3px;
	background: #5E69D7;
	margin-top: 24px;
	margin-bottom: 32px;
	align-self: center;
	letter-spacing: 0.76px;
`

const FormDescription = styled.div`
  text-align: center;
  vertical-align: middle;

	font-family: 'Proxima Nova';
	font-size: 16px;
	color: #242737;
	letter-spacing: -0.42px;
	line-height: 22px;
`

const Message = styled.div`
	width: 100%;
`

const MessageLabel = styled.label`
	text-transform: uppercase;
	font-size: 14px;
	font-family: 'Muller';
	font-weight: bold;
`
const MessageTextArea = styled.textarea`
	height: 130px;
  margin: 10px 0;
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #cccccc;
	resize: none;

  &:focus {
    outline: none;
    border-color: #5E69D7;
  }
`
const FeedbackOptions = styled.div`
	display: flex;
	align-items: center;
	align-self: center;
	margin: 50px 0;
`
const GoodEmojiContainer = styled.div`
	width: 64px;
	height: 64px;
	background: url(${good_feedback}) no-repeat center / contain;
	margin-right: 20px;
	opacity: 0.6;

	&:hover {
		opacity: 1;
	}

	cursor: pointer;
	opacity: ${props => props.chosen ? '1' : '0.6'};
	transition: opacity 0.2s;
`
const BadEmojiContainer = styled.div`
	width: 64px;
	height: 64px;
	background: url(${bad_feedback}) no-repeat center / contain;
	margin-left: 20px;
	opacity: 0.6;
	&:hover {
		opacity: 1;
	}
	cursor: pointer;
	opacity: ${props => props.chosen ? '1' : '0.6'};
	transition: opacity 0.2s;
`

const ButtonsWrapper = styled.div`
	width: 100%;
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
