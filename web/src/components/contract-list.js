import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import plus_circle from '../../assets/plus_circle.svg'
import empty_list from '../../assets/empty_list.svg'

import ContractLayout from './freelancer-layout'
import ContractItem from './contract-item'

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

const ItemWrapper = styled.div`
	display: flex;
	flex-flow: column nowrap;
`

export class ContractList extends React.Component {
	render() {
		return (
			<ContractLayout nopadding>
				<Header>
					<FormTitle>Contract List</FormTitle>
					<NewContract href='/new'>New Contract</NewContract>
				</Header>

				<ItemWrapper>
					<ContractItem />
					<ContractItem />
					<ContractItem />
					<ContractItem />
					<ContractItem />
					<ContractItem />
					<ContractItem />
					<ContractItem />
				</ItemWrapper>
			</ContractLayout>	
		)
	}
}


export default connect(ContractList)
