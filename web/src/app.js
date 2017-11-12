import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

import Layout from './components/layout'
import WelcomeScreen from './components/welcome-screen'
import ContractLayout from './components/new-contract'
import Contract from './components/contract'
import ContractFeedback from './components/contract-feedback'
import ContractList from './components/contract-list'
import ActiveClientScreen from './components/active-client-screen'
import ContractContainer from './components/contract-container'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={WelcomeScreen} />
        <Route exact path='/new' component={ContractLayout} />
        <Route exact path='/contract' component={Contract} />
        <Route exact path='/feedback' component={ContractFeedback} />
        <Route exact path='/contract-list' component={ContractList} />
        <Route exact path='/active-client-screen' component={ActiveClientScreen} />
        <Route exact path='/container' component={ContractContainer} />
      </Layout>
    </BrowserRouter>
  )
}
