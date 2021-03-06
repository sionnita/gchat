import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'

import { connect } from 'react-redux'

import { verifikasi } from '../../../store/session'

import CodeComponent from './Component'

import translations from '../../../i18n'


class CodeFormContainer extends Component {

  // static navigationOptions = {
  //   tabBarLabel: translations.t('login'),
  //   tabBarIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../../../../images/ic_person_outline.png')}
  //       style={{tintColor: tintColor}}
  //     />
  //   )
  // }

  render() {
    return (
      <CodeComponent
      onButtonPress={this.props.code} 
        buttonTitle={translations.t('login')}/>
    )
  }
}

CodeFormContainer.propTypes = {
  code: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  code: verifikasi
}

export default connect(null, mapDispatchToProps)(CodeFormContainer)
