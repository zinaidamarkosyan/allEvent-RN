import 'react-native-gesture-handler'
/**
 * @format
 */

import { AppRegistry } from 'react-native'
import messaging from '@react-native-firebase/messaging'

import { APP_NAME } from '@/constants'
import App from './App'

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage)
})

if (__DEV__) {
  // console.log = () => null
}

AppRegistry.registerComponent(APP_NAME, () => App)
