import * as types from './actionTypes'
import firebase from 'react-native-firebase'

const FIREBASE_REF_MESSAGES = firebase.database().ref('Messages')
const FIREBASE_REF_MESSAGES_LIMIT = 20

export const sendMessage = message => {
  return (dispatch) => {
    dispatch(chatMessageLoading())

    let currentUser = firebase.auth().currentUser
    let createdAt = new Date().getTime()
    let chatMessage = {
      text: message,
      createdAt: createdAt,
      user: {
        id: currentUser.uid,
        phoneNumber: currentUser.phoneNumber
      }
    }

    FIREBASE_REF_MESSAGES.push().set(chatMessage, (error) => {
      if (error) {
        dispatch(chatMessageError(error.message))
      } else {
//         const message = new firebase.messaging.RemoteMessage()
//           .setMessageId('unique id')
//           .setTo(currentUser.uid+'@gcm.googleapis.com')
//           .setData(chatMessage);
// // Send the message
// firebase.messaging().sendMessage(message);
        dispatch(chatMessageSuccess())
      }
    })
  }
}

export const updateMessage = text => {
  return (dispatch) => {
    dispatch(chatUpdateMessage(text))
  }
}

export const loadMessages = () => {
  return (dispatch) => {
    firebase.database().ref('Messages').orderByChild('createdAt','desc').on('value', (snapshot) => {
      const data = snapshot.val();

      dispatch(loadMessagesSuccess(data))
    }, (errorObject) => {
      dispatch(loadMessagesError(errorObject.message))
    })
  }
}

const chatMessageLoading = () => ({
  type: types.CHAT_MESSAGE_LOADING
})

const chatMessageSuccess = () => ({
  type: types.CHAT_MESSAGE_SUCCESS
})

const chatMessageError = error => ({
  type: types.CHAT_MESSAGE_ERROR,
  error
})

const chatUpdateMessage = text => ({
  type: types.CHAT_MESSAGE_UPDATE,
  text
})

const loadMessagesSuccess = messages => ({
  type: types.CHAT_LOAD_MESSAGES_SUCCESS,
  messages
})

const loadMessagesError = error => ({
  type: types.CHAT_LOAD_MESSAGES_ERROR,
  error
})
