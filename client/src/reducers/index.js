import { combineReducers } from 'redux'

import auth from './auth'
import data from './data'
import display from './display'

export default combineReducers({
  auth,
  data,
  display
})
