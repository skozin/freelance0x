import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import good_feedback from '../../assets/good_feedback.png'
import bad_feedback from '../../assets/bad_feedback.png'

import ContractLayout from './freelancer-layout'

const FormTitle = styled.h2`
  color: #242737;
  font-size: 36px;
  align-self: center;
`

const FormBtn = styled.a`
  display: block;
  width: 100%;
  align-self: flex-end;
  padding: 16px;
  margin-top: 20px;
  border: 1px solid;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  background-color: #5E69D7;
  color: white;
  text-transform: uppercase;
  border-radius: 3px;
  transition: background 0.2s;
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
  margin-bottom: 6px;
  font-size: 18px;
`

const MessageLabel = styled.label`
	text-transform: uppercase;
  font-size: 14px;
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

export class Feedback extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			bad: false,
			good: false
		};
	}

	render() {
		return (
      <ContractLayout>
      	<FormTitle>The greatest contract in the World</FormTitle>
      	<Separator/>
      	<FormDescription>
          <p>Please, give a feedback for freelancer.</p>
        </FormDescription>
      	<FeedbackOptions>
      		<GoodEmojiContainer data='good' onClick={((e) => this.chooseFeedbackType(e))} chosen={this.state.good}/>
      		or
      		<BadEmojiContainer data='bad' onClick={((e) => this.chooseFeedbackType(e))} chosen={this.state.bad}/>
      	</FeedbackOptions>
      	<MessageLabel>message</MessageLabel>
      	<MessageTextArea innerRef={node => this.messageText = node}/>
      	<FormBtn onClick={ this.sendFeedback }>Send a Feedback</FormBtn>
      </ContractLayout>
    )
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
		const type = this.state.bad ? 'bad' : 'good';
		const requestObj = {
      messageText: this.messageText.value,
      type: type
    };

    console.log(requestObj);
	}
}

export default connect(Feedback)
