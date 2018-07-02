import { DISPLAY } from '../actions/types'

const init = {
  log: false
}

export default function ( state = init, action ){
  const { type, payload } = action
  switch (type) {
    case DISPLAY:
      return { ...state, [payload]: !state[payload] }
    default:
      return state
  }
}
