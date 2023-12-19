import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReactNativeBiometrics from 'react-native-biometrics'
import { SheetManager } from 'react-native-actions-sheet'

import Loader from '@/components/FullScreenLoader/loading'
import { LOGIN_WITH_BIOMETRICS } from '@/constants'
import BGMask from '@/components/masks/Screen'
import { useAuth } from '@/hooks'

const Splash = ({ setIsVisible }) => {
  const timer = React.useRef(null)
  const { token, isAuthenticated, onSuccess } = useAuth()

  const isSensorAvailable = React.useCallback(async () => {
    const { available } = await new ReactNativeBiometrics().isSensorAvailable()
    const biometricLogin = await AsyncStorage.getItem(LOGIN_WITH_BIOMETRICS)
    if (token && !isAuthenticated && available && !!biometricLogin) {
      SheetManager.show('biometricLogin')
    } else if (!available && token) {
      onSuccess()
    } else {
      timer.current = setTimeout(() => {
        setIsVisible?.(false)
      }, 2000)
    }
  }, [isAuthenticated, token, setIsVisible, onSuccess])

  React.useEffect(() => {
    isSensorAvailable()
    return () => {
      clearTimeout(timer.current)
    }
  }, [isSensorAvailable])

  return <BGMask children={<Loader />} />
}

export default Splash
