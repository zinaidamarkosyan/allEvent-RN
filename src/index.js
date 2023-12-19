import React from 'react'
import { StatusBar } from 'react-native'

import PermissionsModal from '@/screens/Create/shared/permissionModal'
import { EventsProvider, SettingsProvider } from '@/context'
import NotificationService from '@/Notifications/service'
import AppNavigator from '@/navigation/AppNavigator'
import { TRANSPARENT } from '@/theme/colors'
import { useAuth } from '@/hooks'

const Alleven = () => {
  const { permission } = useAuth()

  return (
    <NotificationService>
      <StatusBar barStyle={'dark-content'} backgroundColor={TRANSPARENT} />
      <EventsProvider>
        <SettingsProvider>
          {!!permission && <PermissionsModal />}
          <AppNavigator />
        </SettingsProvider>
      </EventsProvider>
    </NotificationService>
  )
}

export default Alleven
