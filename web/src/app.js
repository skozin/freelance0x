
import React from 'react'

import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'

import Layout from './components/layout'
import WelcomeScreen from './components/welcome-screen'
import NewContract from './components/new-contract'
import Contract from './components/contract'
import FreelancerLayout from './components/freelancer-layout'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Route exact path='/' component={WelcomeScreen} />
        <Route exact path='/new' component={NewContract} />
        <Route exact path='/contract' component={Contract} />
        <Route exact path='/freelancer' component={FreelancerLayout} />
      </Layout>
    </BrowserRouter>
  )
}
