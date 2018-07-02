import { } from '../actions/types'

const init = {
  appointments: []
}

export default function ( state = init, action ){
  const { type, payload } = action
  switch (type) {
    default:
      return state
  }
}
