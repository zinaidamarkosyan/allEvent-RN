import React from 'react'
import { Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import PrimaryButton from '@/components/buttons/primary'
import Biometric from '@/components/buttons/Biometric'
import { LOGIN_WITH_BIOMETRICS } from '@/constants'
import Row from '@/components/masks/Row'

import AuthScreenWrapper from '../../shared/AuthScreenWrapper'
import sharedStyles from '../../shared/sharedStyles'

const ConfigurationScreen = ({ navigation, route: { params } }) => {
  const onSuccess = React.useCallback(() => {
    AsyncStorage.setItem(LOGIN_WITH_BIOMETRICS, LOGIN_WITH_BIOMETRICS)
  }, [])

  const onError = React.useCallback(() => {
    console.warn('err')
  }, [])

  return (
    <AuthScreenWrapper hasBack wrapperStyle={sharedStyles.wrapper}>
      <Text style={sharedStyles.configurationTitle}>Настроить</Text>
      <Row justifyContent={'center'} wrapperStyle={sharedStyles.biometric}>
        <Biometric onSuccess={onSuccess} onError={onError} />
      </Row>
      <PrimaryButton
        label={'Пропустить'}
        onPress={() =>
          navigation.push('PinCode', {
            ...params,
          })
        }
      />
    </AuthScreenWrapper>
  )
}

export default ConfigurationScreen
