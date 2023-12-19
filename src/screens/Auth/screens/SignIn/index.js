import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import PhoneNumber from '@/components/inputs/phoneNumber'
import PrimaryButton from '@/components/buttons/primary'
import PincodeInput from '@/components/inputs/pincode'
import { PHONE_NUMBER_VALIDATOR } from '@/constants'
import Link from '@/components/buttons/Link'
import logo from '@/assets/images/logo.png'
import { GRAY, RED } from '@/theme/colors'
import APICalls from '@/apis/APICalls'
import { useAuth } from '@/hooks'

import AuthScreenWrapper from '../../shared/AuthScreenWrapper'
import sharedStyles from '../../shared/sharedStyles'

const SignInScreen = ({ navigation }) => {
  const [pin, setPin] = React.useState('')
  const { loggedIn, deviceToken } = useAuth()
  const [number, setNumber] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)

  const login = React.useCallback(() => {
    if (
      isLoading ||
      !pin ||
      !number ||
      isNaN(Number(number.replace('+', ''))) ||
      !number.match(PHONE_NUMBER_VALIDATOR)
    )
      return
    setLoading(true)
    APICalls.signIn({
      password: pin,
      phone_number: number.replace('+', ''),
      fcm_token: deviceToken,
    })
      .then((res) => {
        if (res.success) {
          loggedIn(res.data)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [number, pin, isLoading, setLoading, loggedIn, deviceToken])

  return (
    <AuthScreenWrapper loading={isLoading} scrollEnabled>
      <FastImage
        source={logo}
        resizeMode={FastImage.resizeMode.contain}
        style={[sharedStyles.logo, sharedStyles.mb27]}
      />
      <Text style={[sharedStyles.pageTitle, sharedStyles.signIn]}>Вход</Text>
      <PhoneNumber onChange={setNumber} value={number.replace(/\D+/g, '')} />
      {number && isNaN(Number(number.replace('+', ''))) ? (
        <Text style={[sharedStyles.smallText, { color: RED }]}>
          Номер телефона должен содержать только цифры
        </Text>
      ) : number && !number.match(PHONE_NUMBER_VALIDATOR) ? (
        <Text style={[sharedStyles.smallText, { color: RED }]}>Неверный формат</Text>
      ) : null}
      <PincodeInput secure wrapperStyle={sharedStyles.mv16} value={pin} onChange={setPin} />
      <Link
        color={GRAY}
        label={'Восстановить пароль'}
        onPress={() => navigation.push('Reset')}
        customStyle={[sharedStyles.ml20, sharedStyles.mv16]}
      />
      <PrimaryButton label={'Вход'} onPress={login} />
      <View style={sharedStyles.bottom}>
        <Text style={[sharedStyles.title, { textAlign: 'center' }]}>
          {'Eсли у вас нет учётной записи\n'}
          <Link label={'зарегистрируйтесь'} onPress={() => navigation.push('SignUp')} />
        </Text>
      </View>
    </AuthScreenWrapper>
  )
}

export default SignInScreen
