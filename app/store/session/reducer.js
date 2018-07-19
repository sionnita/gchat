import * as types from './actionTypes'

const initialState = {
  restoring: false,
  loading: false,
  user: null,
  code:false,
  error: null,
  listUser : null
}

const session = (state = initialState, action) => {
  switch(action.type) {
    case types.SESSION_RESTORING:
      return { ...state, restoring: true }
    case types.SESSION_LOADING:
      return { ...state, code:false,restoring: false, loading: true, error: null }
    case types.SESSION_SUCCESS:
      return { code:false,restoring: false, loading: false, user: action.user, error: null, listUser:action.listUser }
    case types.SESSION_ERROR:
      return { code:false,restoring: false, loading: false, user: null, error: action.error }
    case types.SESSION_LOGOUT:
      return initialState
    case types.SESSION_CODE:
      return { code: true, loading: false, restoring: false, loading: false, user: null, error: null }
    default:
      return state
  }
}

export default session
