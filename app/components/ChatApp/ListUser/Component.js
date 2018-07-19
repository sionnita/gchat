import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, TextInput, TouchableOpacity, Text } from 'react-native'

import translations from '../../../i18n'

import styles from './Styles'

class CodeComponent extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.user),
    };
  }

  render() {
    return (
      <View
        style={styles.container}>

        <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
      />

      </View>
    )
  }
}

CodeComponent.propTypes = {
  buttonTitle: PropTypes.string.isRequired,
  onButtonPress: PropTypes.func.isRequired,
}

export default CodeComponent
