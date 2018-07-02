import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { LOGIN } from '../../actions/types'
import { getUser } from '../../actions'
import './log.css'

class Login extends Component{
  componentDidMount(){
    document.getElementById('submit').addEventListener('click', async () => {
      const { log, dispatch, history, action: { getUser } } = this.props
      const path = (log === 'in') ? '/auth/login': '/auth/register'
      let check = false
      if (document.getElementById('password_check') !== null) {
        check = (document.getElementById('password').value === document.getElementById('password_check').value) ? true: false
      }
      if ((log === 'new' && check === true) || log === 'in') {
        const res = await axios.post(path, {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
        })
        if (log === 'in') {
          getUser()
          history.push('/')
        } else {
          history.push('/login')
        }
      } else {
        console.log('password not matching or other error');
      }
    })
  }
  render(){
    const { log , dispatch, err } = this.props
    return (
      <div id="log">
        <h4>{(log === 'in') ? "Login": "Register"}</h4>
        <input id="email" type="email" placeholder="email"/>
        <input id="password" type="password" placeholder="password"/>
        {(log === 'new') ?
          <input id="password_check" type="password" placeholder="repeat password"/>: null
        }
        <div>{err}</div>
        <button id="submit">submit</button>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, display: { log } }) => {
  return { auth, log }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getUser }, dispatch), dispatch };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
