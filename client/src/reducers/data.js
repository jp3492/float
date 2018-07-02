import { SOCKET_MESSAGE, SOCKET_CONNECTED } from '../actions/types'

const init = {
  appointments: [],
  socket: null
}

export default function ( state = init, action ){
  const { type, payload } = action
  switch (type) {
    case SOCKET_CONNECTED:
      return { ...state, socket: payload}
    default:
      return state
  }
}
