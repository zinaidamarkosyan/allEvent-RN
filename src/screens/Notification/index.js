import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NAV_HEADER_OPTION } from '@/constants'

import NotificationsScreen from './screens/Home'
import ProfileScreen from './screens/Profile'
import UsersScreen from './screens/Users'

const Stack = createNativeStackNavigator()

const NotificationsStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION} initialRouteName={'Home'}>
      <Stack.Screen name={'Home'} component={NotificationsScreen} />
      <Stack.Screen
        name={'Users'}
        component={UsersScreen}
        // listeners={({ navigation }) => ({
        //   blur: () =>
        //     navigation.setParams({
        //       parent: undefined,
        //       refScreen: undefined,
        //       type: undefined,
        //       event_id: undefined,
        //       data: undefined,
        //     }),
        // })}
      />
      <Stack.Screen
        name={'Profile'}
        component={ProfileScreen}
        // listeners={({ navigation }) => ({
        //   blur: () => navigation.setParams({ event_id: undefined, user: undefined }),
        // })}
      />
    </Stack.Navigator>
  )
}

export default NotificationsStackScreen
