import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { register } from '../../actions'

class Register extends Component{
  componentDidMount(){
    document.getElementById('register').addEventListener('click', () => {
      const email = document.getElementById('email').value
      const pws = document.getElementById('pws').value
      const cpws = document.getElementById('cpws').value
      console.log(email, pws, cpws);
      if (pws === cpws) {
        const { action: { register } } = this.props
        register(email, pws)
      }
    })
  }
  render(){
    return (
      <div>
        <input id="email" type="email" />
        <input id="pws" type="password" />
        <input id="cpws" type="password" />
        <button id="register">submit</button>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ register }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
