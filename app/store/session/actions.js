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

export const loginUser = (phoneNumber) => {
  return (dispatch) => {
    dispatch(sessionLoading())
    firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then(function (confirmationResult) {
 
      if(confirmationResult._auth._user){
        var token= null;
        firebase.auth()
          .onAuthStateChanged(user => {
 
            if (user) {
              updateUser(dispatch,user);
               
            }
          })
      }else{
        // console.warn("null");
        conp = confirmationResult;
          dispatch(sessionCode());
      }
    })
    .catch(function (error) {
      // console.warn("signup");
      dispatch(sessionError(error.message))
    });

    
  }
}

export const signupUser = (phoneNumber) => {
  return (dispatch) => {
    dispatch(sessionLoading())

    firebase.auth().signInWithPhoneNumber(phoneNumber)
    .then(function (confirmationResult) {
      if(confirmationResult._auth._user){

      firebase.auth()
          .onAuthStateChanged(user => {
            if (user) {
           saveUser(dispatch,user);
              
              // unsubscribe()
            }
          })
      }else{
        // console.warn("null");
        conp = confirmationResult;
          dispatch(sessionCode());
      }

    })
    .catch(function (error) {
      // console.warn("signup");
      dispatch(sessionError(error.message))
    });
  
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    dispatch(sessionLoading())
    
    firebase.auth()
      .signOut()
      .then(() => {
        // console.warn("logout");
        dispatch(sessionLogout())
      })
      .catch(error => {
        dispatch(sessionError(error.message))
      })
  }
}

export const verifikasi = (verificationCode) => {
  return (dispatch) => {
    dispatch(sessionLoading())
    conp.confirm(verificationCode)
    .then((user) => {
      if (user) {
        
       saveUser(dispatch, user);
      }else{
        dispatch(sessionError("Cannot Login"))
      }
    })
    .catch((error) => {
      // const { code, message } = error;
      dispatch(sessionError(error.message))
    });

   
  }
}

const sessionRestoring = () => ({
  type: types.SESSION_RESTORING
})

const sessionLoading = () => ({
  type: types.SESSION_LOADING
})

const sessionSuccess = (user,listUser) => ({
  type: types.SESSION_SUCCESS,
  user,
  listUser
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

const saveUser = function (dispatch, user) {
  firebase.messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
        token = fcmToken;

     let users = {
      id:user.uid,
      phoneNumber: user.phoneNumber,
      token: fcmToken
    }
 
    firebase.database().ref('Users').push().set(users, (error) => {
      if (error) {
        dispatch(sessionError(error.message))
      } else {
        dispatch(sessionSuccess(user, snapshot.val()))
      }
    })

    } 
  });
}

const updateUser = function (dispatch, user) {
  firebase.messaging().getToken()
  .then(fcmToken => {
    if (fcmToken) {
    //  console.warn("token"+fcmToken);
     token = fcmToken;
    users = {
      id:user.uid,
      phoneNumber: user.phoneNumber,
      token: token
    }

    jumlah =0;
    firebase.database().ref('Users/').on('value', (snapshot) => {
     
      // 

      snapshot.forEach((child) => {
        const key = child.key;
        const value = child.val();
    
          if(value.phoneNumber == user.phoneNumber){
            firebase.database().ref('Users/'+key+'/').update(users, (error) => {
              if (error) {
                dispatch(sessionError(error.message))
                  } else {
                    dispatch(sessionSuccess(user, snapshot.val()))
                  }
          })
          
            // console.warn("user"+user.phoneNumber);
          }
        
      })

      
      // firebase.database().ref('Users/'+user.phoneNumber+'/'+key).update(users, (error) => {
      //   if (error) {
          // dispatch(sessionError("salah"))
      //   } else {
      //     dispatch(sessionSuccess(user))
      //   }
      // })
    
    }, (errorObject) => {
      dispatch(sessionError(errorObject.message))
    })
    } 
  });
}