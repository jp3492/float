import axios from 'axios'

import { GET_USER, LOGIN } from './types'

export const register = (email, password) => async dispatch => {
  console.log(email, password);
  const res = await axios.post('/auth/register', { email, password })
  dispatch({ type: LOGIN, payload: res.data })
}

export const getUser = () => async dispatch => {
  const res = await axios.get('/auth/currentUser')
  dispatch({ type: GET_USER, payload: res.data })
}
