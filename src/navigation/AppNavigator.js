import React, { useCallback, useMemo } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { NAV_HEADER_OPTION, ORGANIZER, TAB_BAR_HEIGHT } from '@/constants'
import AllEventsScreen from '@/screens/Profile/screens/AllEvents'
import { EVENT_TYPE } from '@/screens/Profile/shared/constants'
import NotificationsStackScreen from '@/screens/Notification'
import CreationScreen from '@/screens/Create/screens/Home'
import ProfileStackScreen from '@/screens/Profile'
import MapScreen from '@/screens/Map/screens/Home'
import NavHeader from './components/NavHeader'
import { GREEN, WHITE } from '@/theme/colors'
import HomeStackScreen from '@/screens/Home'
import { font, RH, RW } from '@/theme/utils'
import { useAuth } from '@/hooks'

import bookmarkInactive from '@/assets/icons/ic_bookmark_outline.png'
import profileInactive from '@/assets/icons/ic_profile_outline.png'
import createInactive from '@/assets/icons/ic_create_outline.png'
import homeInactive from '@/assets/icons/ic_home_outline.png'
import mapInactive from '@/assets/icons/ic_map_outline.png'
import bookmarkActive from '@/assets/icons/ic_bookmark.png'
import profileActive from '@/assets/icons/ic_profile.png'
import createActive from '@/assets/icons/ic_create.png'
import homeActive from '@/assets/icons/ic_home.png'
import mapActive from '@/assets/icons/ic_map.png'

import AuthNavigator from './AuthNavigator'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  const {
    me: { roles },
    isAuthenticated,
  } = useAuth()
  const { navigate } = useNavigation()

  global.preventAction = useCallback(
    (cb, successLogin) => {
      if (!isAuthenticated) {
        global.callback = successLogin
        return navigate('AuthNavigator')
      }
      cb?.()
    },
    [navigate, isAuthenticated],
  )

  global.navigate = navigate

  const { name: role } = roles || {}

  const listener = useMemo(
    () => ({
      tabPress: (e) => {
        if (!isAuthenticated) {
          e.preventDefault()
          global.preventAction()
        }
      },
    }),
    [isAuthenticated],
  )

  const isOrganizer = role === ORGANIZER
  return (
    <Tab.Navigator
      initialRouteName={'Главная'}
      backBehavior={'history'}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        activeTintColor: GREEN,
        inactiveTintColor: GREEN,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
        header: () => <NavHeader hasBack />,
        tabBarIcon: ({ focused }) => {
          let Icon

          if (route.name === 'Главная') {
            Icon = focused ? homeActive : homeInactive
          } else if (route.name === 'Карта') {
            Icon = focused ? mapActive : mapInactive
          } else if (route.name === 'Создать') {
            Icon = focused ? createActive : createInactive
          } else if (route.name === 'Профиль') {
            Icon = focused ? profileActive : profileInactive
          } else if (route.name === 'Избранное') {
            Icon = focused ? bookmarkActive : bookmarkInactive
          }

          return (
            <View style={styles.tab}>
              <FastImage source={Icon} style={styles.icon} />
              <Text style={[styles.tabLabel, focused && styles.tabFocused]}>{route.name}</Text>
            </View>
          )
        },
      })}
    >
      <Tab.Screen name={'Главная'} component={HomeStackScreen} options={NAV_HEADER_OPTION} />
      <Tab.Screen
        name={'Карта'}
        component={MapScreen}
        options={{ ...NAV_HEADER_OPTION }}
        listeners={({ navigation }) => ({
          blur: () =>
            navigation.setParams({
              coords: undefined,
              selectedId: undefined,
              refScreen: undefined,
            }),
        })}
      />
      <Tab.Screen
        name={isOrganizer ? 'Создать' : 'Избранное'}
        options={{ [!isOrganizer && 'header']: () => null }}
        component={isOrganizer ? CreationScreen : AllEventsScreen}
        initialParams={{ [!isOrganizer && 'type']: EVENT_TYPE.BOOKMARK }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ geometry: undefined }),
          ...listener,
        })}
      />
      <Tab.Screen
        name={'Уведомления'}
        component={NotificationsStackScreen}
        options={{ tabBarButton: () => null, ...NAV_HEADER_OPTION }}
        listeners={listener}
      />
      <Tab.Screen
        name={'Профиль'}
        listeners={listener}
        options={NAV_HEADER_OPTION}
        component={ProfileStackScreen}
      />
    </Tab.Navigator>
  )
}

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={NAV_HEADER_OPTION} initialRouteName="TabNavigator">
      <Stack.Screen name={'AuthNavigator'} component={AuthNavigator} />
      <Stack.Screen name={'TabNavigator'} component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  tabBar: {
    elevation: 3,
    height: TAB_BAR_HEIGHT,
    paddingVertical: RH(10),
    backgroundColor: WHITE,
  },
  tabLabel: {
    marginTop: RH(2),
    ...font('e.regular', 10, GREEN, 13),
  },
  icon: {
    width: RW(28),
    height: RW(28),
  },
})
