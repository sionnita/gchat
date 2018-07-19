import * as types from './actionTypes'
// import firebase from 'firebase'
import firebase from 'react-native-firebase'

const FIREBASE_REF_USERS = firebase.database().ref('Users')
const FIREBASE_REF_USERS_LIMIT = 20

var conp;
var token;
export const restoreSession = () => {
  return (dispatch) => {
    dispatch(sessionRestoring())

   firebase.auth()
      .onAuthStateChanged(user => {
        if (user) {
          // dispatch(sessionSuccess(user))
          updateUser(dispatch,user);
        } else {
          dispatch(sessionLogout())
          // unsubscribe()
        }
      })

      
  }
}

export const listUser = (phoneNumber) => {
  return (dispatch) => {
    dispatch(sessionLoading())
    firebase.database().ref('Users/').on('value', (snapshot) => {
      dispatch(sessionSuccess())
    })

    
  }
}

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
})

const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = user => ({
  type: types.SESSION_SUCCESS,
  user
})

const sessionError = error => ({
  type: types.SESSION_ERROR,
  error
})

const sessionLogout = () => ({
  type: types.SESSION_LOGOUT
})

const sessionCode = () => ({
  type: types.SESSION_CODE
})
