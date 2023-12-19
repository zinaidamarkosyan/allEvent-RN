import React from 'react'
import { Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'

import { ORGANIZER, PHONE_NUMBER_VALIDATOR, VISITOR } from '@/constants'
import PhoneNumber from '@/components/inputs/phoneNumber'
import PrimaryButton from '@/components/buttons/primary'
import CheckBox from '@/components/buttons/CheckBox'
import Link from '@/components/buttons/Link'
import { openTerms } from '@/helpers/misc'
import APICalls from '@/apis/APICalls'
import { RED } from '@/theme/colors'

import logo from '@/assets/images/logo.png'

import AuthScreenWrapper from '../../shared/AuthScreenWrapper'
import sharedStyles from '../../shared/sharedStyles'

const SignUpScreen = ({ navigation }) => {
  const [role, setRole] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [iAgree, setAgree] = React.useState(false)
  const [isValid, setIsValid] = React.useState(false)
  const [isLoading, setLoading] = React.useState(false)

  const isInCorrect = React.useMemo(() => {
    return (
      !iAgree ||
      !role ||
      !number ||
      isLoading ||
      !isValid ||
      isNaN(Number(number.replace('+', ''))) ||
      !number.match(PHONE_NUMBER_VALIDATOR)
    )
  }, [isValid, iAgree, isLoading, number, role])

  const signUp = React.useCallback(() => {
    if (isInCorrect) return
    setLoading(true)
    APICalls.verifyPhone(number.replace('+', '')).then(
      (res) => {
        setLoading(false)
        if (res.success) {
          navigation.push('PhoneVerification', {
            role,
            phone_number: number,
          })
        }
      },
      () => {
        setLoading(false)
      },
    )
  }, [number, role, navigation, isInCorrect])

  return (
    <AuthScreenWrapper loading={isLoading} scrollEnabled>
      <FastImage
        source={logo}
        style={sharedStyles.logo}
        resizeMode={FastImage.resizeMode.contain}
      />
      <Text style={sharedStyles.signUpTitle}>
        {
          'С приложением ALLEVEN вы можете создавать и искать события вокруг себя. Станьте организатором или посетителем.'
        }
      </Text>
      <Text style={sharedStyles.title}>Выберите роль</Text>
      <CheckBox
        value={ORGANIZER}
        onCheck={setRole}
        label={'Организатор событий'}
        isActive={role === ORGANIZER}
        wrapperStyle={[sharedStyles.ml20]}
      />
      <CheckBox
        value={VISITOR}
        onCheck={setRole}
        label={'Посетитель'}
        isActive={role === VISITOR}
        wrapperStyle={[sharedStyles.ml20, sharedStyles.mt10]}
      />
      <Text style={[sharedStyles.title, sharedStyles.mt45]}>
        Введите номер телефона для регистрации
      </Text>
      <PhoneNumber
        setIsValid={setIsValid}
        value={number.replace(/\D+/g, '')}
        onChange={setNumber}
      />
      {number && isNaN(Number(number.replace('+', ''))) ? (
        <Text style={[sharedStyles.smallText, { color: RED }]}>
          Номер телефона должен содержать только цифры
        </Text>
      ) : number && !number.match(PHONE_NUMBER_VALIDATOR) ? (
        <Text style={[sharedStyles.smallText, { color: RED }]}>Неверный формат</Text>
      ) : (
        <Text style={sharedStyles.smallText}>Отправим на этот номер код подтверждения</Text>
      )}
      <CheckBox
        value={true}
        isActive={iAgree}
        onCheck={setAgree}
        wrapperStyle={[sharedStyles.ml20]}
        label={
          <Text style={sharedStyles.useterms}>
            Я согласен с условиями{' '}
            <Text style={{ fontWeight: '700' }} onPress={openTerms}>
              пользовательского соглашения
            </Text>
          </Text>
        }
      />
      <PrimaryButton
        onPress={signUp}
        label={'Получить SMS с кодом'}
        labelStyle={isInCorrect && sharedStyles.disabledLabel}
        wrapperStyle={[isInCorrect && sharedStyles.disabled, sharedStyles.mt18]}
      />
      <View>
        <Text style={[sharedStyles.title, { textAlign: 'center' }]}>
          Если вы зарегистрированный пользователь{' '}
          <Link label={'войдите в приложение'} onPress={() => navigation.goBack()} />
        </Text>
      </View>
    </AuthScreenWrapper>
  )
}

export default SignUpScreen
