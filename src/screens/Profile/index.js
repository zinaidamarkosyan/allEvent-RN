import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NAV_HEADER_OPTION } from '@/constants'

import AllEventsScreen from './screens/AllEvents'
import SettingsScreen from './screens/Settings'
import SupportScreen from './screens/Support'
import ProfileScreen from './screens/Home'
import DocsScreen from './screens/Docs'

const Stack = createNativeStackNavigator()

const ProfileStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION} initialRouteName={'Home'}>
      <Stack.Screen name={'Home'} component={ProfileScreen} />
      <Stack.Screen name={'AllEvents'} component={AllEventsScreen} />
      <Stack.Screen name={'Support'} component={SupportScreen} />
      <Stack.Screen name={'Docs'} component={DocsScreen} />
      <Stack.Screen name={'Settings'} component={SettingsScreen} />
    </Stack.Navigator>
  )
}

export default ProfileStackScreen
