import React from 'react'
import { Text } from 'react-native'

import PhoneNumber from '@/components/inputs/phoneNumber'
import PrimaryButton from '@/components/buttons/primary'
import { PHONE_NUMBER_VALIDATOR } from '@/constants'
import APICalls from '@/apis/APICalls'
import { RED } from '@/theme/colors'

import AuthScreenWrapper from '../../shared/AuthScreenWrapper'
import sharedStyles from '../../shared/sharedStyles'

const ResetScreen = ({ navigation }) => {
  const [number, setNumber] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const resetPassword = React.useCallback(() => {
    if (
      !number ||
      isLoading ||
      isNaN(Number(number.replace('+', ''))) ||
      !number.match(PHONE_NUMBER_VALIDATOR)
    )
      return
    setLoading(true)
    APICalls.resetPassword(number.replace('+', '')).then((res) => {
      setLoading(false)
      if (res.success) {
        navigation.push('PhoneVerification', {
          phone_number: number,
        })
      }
    })
  }, [number, navigation, isLoading])

  return (
    <AuthScreenWrapper loading={isLoading} hasBack>
      <Text style={[sharedStyles.title, sharedStyles.mb27]}>
        Введите номер телефона для восстановление пароля
      </Text>
      <PhoneNumber onChange={setNumber} value={number.replace(/\D+/g, '')} />
      {number && isNaN(Number(number.replace('+', ''))) ? (
        <Text style={[sharedStyles.smallText, { color: RED }]}>
          Номер телефона должен содержать только цифры
        </Text>
      ) : number && !number.match(PHONE_NUMBER_VALIDATOR) ? (
        <Text style={[sharedStyles.smallText, { color: RED }]}>Неверный формат</Text>
      ) : (
        <Text style={sharedStyles.smallText}>{'Отправим на этот номер код подтверждения'}</Text>
      )}
      <PrimaryButton onPress={resetPassword} label={'Получить SMS с кодом'} />
    </AuthScreenWrapper>
  )
}

export default ResetScreen
