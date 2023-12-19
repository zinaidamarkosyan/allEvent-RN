import React from 'react'
import { Text, View } from 'react-native'

import PrimaryButton from '@/components/buttons/primary'
import PincodeInput from '@/components/inputs/pincode'
import Link from '@/components/buttons/Link'
import { DARK_YELLOW } from '@/theme/colors'
import APICalls from '@/apis/APICalls'
import Lock from '@/assets/icons/lock'

import AuthScreenWrapper from '../../shared/AuthScreenWrapper'
import sharedStyles from '../../shared/sharedStyles'

const PinCodeScreen = ({ navigation, route: { params } }) => {
  const [pin, setPin] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const complete = React.useCallback(() => {
    if (isLoading || !pin) return
    setLoading(true)
    const request = params.role ? APICalls.signUp : APICalls.newPassword
    request({
      password: pin,
      role: params.role,
      expiration_token: params.token,
    })
      .then((res) => {
        setLoading(false)
        if (res.success) {
          navigation.push('SignIn')
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [params, pin, navigation, isLoading, setLoading])

  return (
    <AuthScreenWrapper loading={isLoading} hasBack wrapperStyle={sharedStyles.centered}>
      <View style={sharedStyles.lock}>
        <Lock />
      </View>
      <Text style={sharedStyles.pageTitle}>Придумайте пин-код</Text>
      <Text style={[sharedStyles.smallText, sharedStyles.sub]}>
        пин код должен быть четырехзначным
      </Text>
      <PincodeInput secure value={pin} onChange={setPin} />
      <PrimaryButton onPress={complete} label={'Подтвердить'} wrapperStyle={sharedStyles.mt27} />
      <PrimaryButton
        label={'Назад'}
        wrapperStyle={sharedStyles.back}
        labelStyle={sharedStyles.backLabel}
        onPress={() => navigation.goBack()}
      />
      <Link
        color={DARK_YELLOW}
        label={'Восстановить пароль '}
        customStyle={sharedStyles.pinCodeLink}
        onPress={() => navigation.push('Reset')}
      />
    </AuthScreenWrapper>
  )
}

export default PinCodeScreen
