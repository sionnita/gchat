import React, { Component } from 'react'
import PropTypes from 'prop-types'
import firebase from 'react-native-firebase'
import MessageRow from './Component'

// import firebaseService from '../../../../../services/firebase'

class MessageRowContainer extends Component {

  render() {
    const isCurrentUser = firebase.auth().currentUser.phoneNumber == this.props.message.user.phoneNumber;
    // console.warn(this.props.message.user);
    return (
      <MessageRow
        message={this.props.message}
        isCurrentUser={isCurrentUser}/>
    );
  }
}

MessageRowContainer.propTypes = {
  message: PropTypes.object.isRequired,
}

export default MessageRowContainer
