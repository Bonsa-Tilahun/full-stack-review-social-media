import React from 'react'
import AuthHeader from './Components/AuthHeader'
import Header from './Components/Header'
import routes from './routes'
import {connect} from 'react-redux'
import './App.css'

function App(props) {
  return (
    <div className="App">
      {!props.isLoggedIn ?
      <AuthHeader />:
      <Header/>
      }
      {routes}
    </div>
  )
}
const mapStateToProps = reduxState => reduxState

export default connect(mapStateToProps)(App)
