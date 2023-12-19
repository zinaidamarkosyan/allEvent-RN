import React from 'react'
import { SafeAreaView } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { SheetProvider } from 'react-native-actions-sheet'
import Toast from 'react-native-toast-message'
// import moment from 'moment-timezone'

import LinkingConfig from '@/navigation/LinkingConfig'
import { AppProvider, AuthProvider } from '@/context'
import { WHITE } from '@/theme/colors'
import Alleven from '@/index'
import Splash from '@/splash'
import '@/components/sheets'

// moment.tz.setDefault('Europe/Moscow')

const App = () => {
  const [isVisible, setIsVisible] = React.useState(true)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <NavigationContainer linking={LinkingConfig}>
          <AuthProvider setIsVisible={setIsVisible}>
            <SheetProvider>
              {isVisible ? (
                <Splash setIsVisible={setIsVisible} />
              ) : (
                <SafeAreaView style={{ flex: 1, backgroundColor: WHITE }}>
                  <Alleven />
                </SafeAreaView>
              )}
            </SheetProvider>
          </AuthProvider>
        </NavigationContainer>
      </AppProvider>
      <Toast topOffset={80} position={'top'} visibilityTime={3000} />
    </GestureHandlerRootView>
  )
}

export default App
