import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'

import './app.css'

import { getUser } from '../actions'

import Header from './header/header'
import Log from './auth/log'

class App extends Component {
  componentWillMount(){
    this.props.action.getUser()
  }
  render() {
    return (
      <BrowserRouter>
          <Route path='/' component={Header}>
            <Route path='/login' />
            <Route path='/register' />
          </Route>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = ({ auth }) => {
  return { auth }
}
const mapDispatchToProps = (dispatch) => {
  return { action: bindActionCreators({ getUser }, dispatch), dispatch };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
