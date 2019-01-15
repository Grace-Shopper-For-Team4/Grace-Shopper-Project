import React from 'react'

import {Navbar, FooterPage} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <FooterPage />
    </div>
  )
}

export default App
