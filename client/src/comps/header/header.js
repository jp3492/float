import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import './header.css'
import { getUser } from '../../actions'
import Register from '../auth/register'
import Login from '../auth/login'

class Header extends Component{
  componentWillMount(){
    const { auth, action: { getUser } } = this.props
    if (auth === false) {
      getUser()
    }
  }
  render(){
    return (
      <div id="header">
        <Login />
        <Register />
        <a>Logout</a>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getUser }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
