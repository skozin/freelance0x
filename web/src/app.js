import React from 'react'

import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

import Layout from './components/layout'
import WelcomeScreen from './components/welcome-screen'
import ContractLayout from './components/new-contract'
import Contract from './components/contract'
import Feedback from './components/feedback'
import ContractList from './components/contract-list'
import ActiveClientScreen from './components/active-client-screen'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={WelcomeScreen} />
        <Route exact path='/new' component={ContractLayout} />
        <Route exact path='/contract' component={Contract} />
        <Route exact path='/feedback' component={Feedback} />
        <Route exact path='/contract-list' component={ContractList} />
        <Route exact path='/freelancer' component={FreelancerLayout} />
        <Route exact path='/active-client-screen' component={ActiveClientScreen} />
      </Layout>
    </BrowserRouter>
}
