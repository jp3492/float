import { GET_USER, LOGOUT } from '../actions/types'

const init = false

export default function ( state = init, action ){
  const { type, payload } = action
  switch (type) {
    case LOGOUT:
      return false
    case GET_USER:
      return payload
    default:
      return state
  }
}
