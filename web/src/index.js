import 'styles/main.css'
import 'styles/normalize.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import {Provider} from 'react-redux'
import store from './store'

import App from '~/app'


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app')
  )
}


render(App)


if (module.hot) {
  module.hot.accept('~/app', () => {
    const App = require('~/app').default
    render(App)
  })
}
