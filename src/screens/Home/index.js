import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NAV_HEADER_OPTION } from '@/constants'

import EventScreen from './screens/Events'
import DetailScreen from './screens/Detail'
import HomeScreen from './screens/Home'

const Stack = createNativeStackNavigator()

const HomeStackScreen = () => {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION} initialRouteName={'Home'}>
      <Stack.Screen name={'Home'} component={HomeScreen} />
      <Stack.Screen name={'Events'} component={EventScreen} />
      <Stack.Screen
        name={'Detail'}
        component={DetailScreen}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ geometry: undefined, refScreen: undefined }),
        })}
      />
    </Stack.Navigator>
  )
}

export default HomeStackScreen
