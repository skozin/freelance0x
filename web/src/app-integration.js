import React from 'react'

import {ConnectedRouter} from 'react-router-redux'
import {Route} from 'react-router-dom'

import history from './history'

import Layout from './components/layout'

import ContractsListScreen from './components/contracts-list-screen'
import NewContract from './components/new-contract'
import ContractDetailsScreen from './components/contract-details-screen'

export default function App() {
  return (
    <ConnectedRouter history={history}>
      <Layout>
        <Route exact path='/' component={ContractsListScreen} />
        <Route exact path='/new' component={NewContract} />
        <Route path='/contract/:address' component={ContractDetailsScreen} />
      </Layout>
    </ConnectedRouter>
  )
}
