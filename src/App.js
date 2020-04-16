import React from 'react'
import AuthHeader from './Components/AuthHeader'
import Profile from './Components/Profile'
import Landing from './Components/Landing'
import './App.css'

function App(props) {
  return (
    <div className="App">
      <AuthHeader />
      <Landing />
    </div>
  )
}

export default App
