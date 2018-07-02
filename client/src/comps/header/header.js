import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './header.css'
import { DISPLAY } from '../../actions/types'
import { logout } from '../../actions'
import Log from '../auth/log'

class Header extends Component{
  componentWillMount(){
    const { auth, dispatch } = this.props
    if (window.location.href.includes('login') === true) {
      dispatch({ type: DISPLAY, payload: { key: 'log', value: 'in'} })
    } else if (window.location.href.includes('register') === true) {
      dispatch({ type: DISPLAY, payload: { key: 'log', value: 'new' } })
    }
  }
  componentDidMount(){
    const { history, dispatch } = this.props
    history.listen((location, action) => {
      if (location.pathname === '/login') {
        dispatch({ type: DISPLAY, payload: { key: 'log', value: 'in' } })
      } else if (location.pathname === '/register') {
        dispatch({ type: DISPLAY, payload: { key: 'log', value: 'new' } })
      }
    })
  }
  render(){
    const { auth, dispatch, log, action: { logout }, socket } = this.props
    return (
      <div id="header">
        {(auth === false) ?
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>:
          <a onClick={ () => { socket.send('disconnect'); socket.close(); logout(); } }>Logout</a>
        }
        {(log === false) ? null:
          <div>
            <div id="modal">
              <Log />
            </div>
          </div>
        }
        <a onClick={ () => { axios.post('/auth/ping') } }>Ping</a>
      </div>
    )
  }
}
const mapStateToProps = ({ auth, display: { log }, data: { socket } }) => {
  return { auth, log, socket }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ logout }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
