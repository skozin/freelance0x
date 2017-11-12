import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import connect from '~/utils/connect'
import sel from '~/selectors'

import ContractLayout from './freelancer-layout'

const FormTitle = styled.h2`
  color: #242737;
  font-size: 36px;
`

export class ContractList extends React.Component {
	render() {
		return (
			<ContractLayout>
				<FormTitle>Contract List</FormTitle>
			</ContractLayout>	
		)
	}
}


export default connect(ContractList)
