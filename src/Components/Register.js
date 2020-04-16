import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {loginUser} from '../ducks/reducer'
import {connect} from 'react-redux'

class Register extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleInput = (event) => {
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleRegister = () => {
    const body = {email: this.state.email, password: this.state.password}
    axios.post('/auth/register', body).then(res => {
      this.props.loginUser(res.data)
      this.props.history.push('./dashboard')
    }).catch(() =>alert('Could not register'))
  }

  render() {
    return (
      <div className="app-body">
        <div className="input-container">
          <div className="flex-horizontal inputs">
            <div className="flex-vertical">
              <input
                maxLength="100"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => {
                  this.handleInput(e)
                }}
              />
              <input
                type="password"
                maxLength="20"
                placeholder="Enter Password"
                name="password"
                onChange={(e) => {
                  this.handleInput(e)
                }}
              />
            </div>
            <button
              onClick={() => {
                this.handleRegister()
              }}
              className="input-container-button"
            >
              Register
            </button>
          </div>
          <div className="flex-horizontal link">
            <span>Already have an account? login here: </span>
            <Link to='/' className='input-container-button'>Login</Link>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, {loginUser})(Register)
