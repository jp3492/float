import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Login extends Component{
  render(){
    return (
      <div id="login">
        <input type="email" />
        <input type="password" />
        <button>submit</button>
      </div>
    )
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
