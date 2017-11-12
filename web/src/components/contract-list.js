import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import plus_circle from '../../assets/plus_circle.svg'

import ContractLayout from './freelancer-layout'

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`
const FormTitle = styled.h2`
  color: #242737;
  font-size: 36px;
`
const NewContract = styled.a`
	text-decoration: none;
	color: black;
	&:before {
		content: url(${plus_circle});
    vertical-align: -25%;
    padding-right: 5px;
	}
`

export class ContractList extends React.Component {
	render() {
		return (
			<ContractLayout>
				<Header>
					<FormTitle>Contract List</FormTitle>
					<NewContract href='/new'>New Contract</NewContract>
				</Header>
			</ContractLayout>	
		)
	}
}


export default connect(ContractList)
