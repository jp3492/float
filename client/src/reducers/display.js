import { DISPLAY, GET_USER } from '../actions/types'

const init = {
  log: false
}

export default function ( state = init, action ){
  const { type, payload } = action
  switch (type) {
    case GET_USER:
      return { ...state, log: false }
    case DISPLAY:
      return { ...state, [payload.key]: payload.value }
    default:
      return state
  }
}
