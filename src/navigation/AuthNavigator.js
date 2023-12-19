import React from 'react'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { State, Directions, FlingGestureHandler } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

import PhoneVerificationScreen from '@/screens/Auth/screens/PhoneVerification'
import ConfigurationScreen from '@/screens/Auth/screens/Configuration'
import PinCodeScreen from '@/screens/Auth/screens/PinCode'
import SignUpScreen from '@/screens/Auth/screens/SignUp'
import SignInScreen from '@/screens/Auth/screens/SignIn'
import ResetScreen from '@/screens/Auth/screens/Reset'
import { NAV_HEADER_OPTION } from '@/constants'
const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  const navigation = useNavigation()
  return (
    <FlingGestureHandler
      direction={Directions.RIGHT}
      onHandlerStateChange={(ev) =>
        ev.nativeEvent.state === State.END && navigation.canGoBack() && navigation.goBack()
      }
    >
      <View style={{ flex: 1 }}>
        <Stack.Navigator screenOptions={NAV_HEADER_OPTION} initialRouteName={'SignIn'}>
          <Stack.Screen name={'SignIn'} component={SignInScreen} />
          <Stack.Screen name={'SignUp'} component={SignUpScreen} />
          <Stack.Screen name={'Reset'} component={ResetScreen} />
          <Stack.Screen name={'PinCode'} component={PinCodeScreen} />
          <Stack.Screen name={'PhoneVerification'} component={PhoneVerificationScreen} />
          <Stack.Screen name={'Configuration'} component={ConfigurationScreen} />
        </Stack.Navigator>
      </View>
    </FlingGestureHandler>
  )
}

export default AuthNavigator
