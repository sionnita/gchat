import React from 'react'
import PropTypes from 'prop-types'

import { ActivityIndicator } from 'react-native'

import DashboardNavigator from '../DashboardNavigator'
import AuthScreen from '../AuthScreen'
import Code from './Code'

import styles from './Styles'

const ChatAppComponent = props => {
  if (props.restoring) {
    return <ActivityIndicator style={styles.activityIndicator} />
  } else if(props.code){
    // console.warn("masuk");
    return <Code />
  }else{
    if (props.logged) {
      return <DashboardNavigator />
    } else {
      return <AuthScreen />
    }
  }
}

ChatAppComponent.propTypes = {
  restoring: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  code: PropTypes.bool.isRequired,
}

export default ChatAppComponent
