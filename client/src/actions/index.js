import axios from 'axios'

import { GET_USER, LOGIN, LOGOUT, SOCKET_CONNECTED, SOCKET_MESSAGE } from './types'

export const logout = () => async dispatch => {
  const res = await axios.get('/auth/logout')
  dispatch({ type: LOGOUT })
}

export const login = (email, password) => async dispatch => {
  const res = await axios.post('/auth/login', { email, password })
  dispatch({ type: LOGIN, payload: res.data })
}

export const register = (email, password) => async dispatch => {
  const res = await axios.post('/auth/register', { email, password })
}

export const getUser = () => async dispatch => {
  const res = await axios.get('/auth/user')
  dispatch({ type: GET_USER, payload: res.data })
  const status = (res === false) ? false: true
  if (status === true) {
    let socket = new WebSocket('ws://localhost:7000')
    socket.addEventListener('open', () => {
      socket.send('client is connected')
      dispatch({ type: SOCKET_CONNECTED, payload: socket })
    })
    socket.addEventListener('close', async () => {
      dispatch({ type: SOCKET_CONNECTED, payload: null })
    })
    socket.addEventListener('message', msg => {
      console.log(msg);
    })
  }
}
