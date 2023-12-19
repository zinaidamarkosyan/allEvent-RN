import React from 'react'
import { Text } from 'react-native'
import ReactNativeBiometrics from 'react-native-biometrics'

import PrimaryButton from '@/components/buttons/primary'
import PincodeInput from '@/components/inputs/pincode'
import APICalls from '@/apis/APICalls'

import AuthScreenWrapper from '../../shared/AuthScreenWrapper'
import sharedStyles from '../../shared/sharedStyles'

const PhoneVerificationScreen = ({ navigation, route: { params } }) => {
  const [code, setCode] = React.useState('')
  const [isLoading, setLoading] = React.useState(false)
  const [isAvailable, setIsAvailable] = React.useState(false)

  React.useEffect(() => {
    const isSensorAvailable = async () => {
      const { available } = await new ReactNativeBiometrics().isSensorAvailable()
      setIsAvailable(available)
    }
    isSensorAvailable()
  }, [])

  const confirmCode = React.useCallback(() => {
    if (code.length !== 4) return
    setLoading(true)
    const request = params.role ? APICalls.verifyCode : APICalls.confirmCode
    request({ phone_number: params.phone_number.replace('+', ''), phone_number_code: code })
      .then((res) => {
        setLoading(false)
        if (res.success) {
          navigation.push(!isAvailable ? 'Configuration' : 'PinCode', {
            code: code,
            role: params.role,
            token: res?.data?.expiration_token,
          })
        }
      })
      .catch(() => {
        setLoading(false)
      })
  }, [params, code, isAvailable, navigation])

  return (
    <AuthScreenWrapper hasBack loading={isLoading}>
      <Text style={[sharedStyles.title, sharedStyles.mb9]}>Введите код подтверждения</Text>
      <PincodeInput value={code} onChange={setCode} />
      <Text style={sharedStyles.smallText}>
        {`на номер ${params.phone_number} отправлен код подтверждения`}
      </Text>
      <PrimaryButton label={'Подтвердить'} onPress={confirmCode} />
    </AuthScreenWrapper>
  )
}

export default PhoneVerificationScreen
