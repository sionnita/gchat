import { StackNavigator } from 'react-navigation'

import CodeFormContainer from './Container'

const routeConfig = {
    CodeFormContainer: { screen: CodeFormContainer }
}

export default StackNavigator(routeConfig)
