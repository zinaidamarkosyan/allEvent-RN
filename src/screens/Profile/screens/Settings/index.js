import React from 'react'
import { Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image'

import ScreenWrapperWithNavigation from '@/components/wrappers/screen'
import { ORGANIZER, PHONE_NUMBER_VALIDATOR } from '@/constants'
import PhoneNumber from '@/components/inputs/phoneNumber'
import PrimaryButton from '@/components/buttons/primary'
import PincodeInput from '@/components/inputs/pincode'
import CheckBox from '@/components/buttons/CheckBox'
import { useAuth, useSettings } from '@/hooks'
import Row from '@/components/masks/Row'
import APICalls from '@/apis/APICalls'
import { RED } from '@/theme/colors'
import { RW } from '@/theme/utils'

import phoneIcon from '@/assets/icons/ic_phone.png'

import { SETTINGS } from '../../shared/constants'
import styles from '../../shared/sharedStyles'
import ProfileModal from '../../shared/modal'

const SettingsScreen = ({ navigation }) => {
  const {
    me: { roles },
  } = useAuth()
  const [code, setCode] = React.useState('')
  const { action, settings } = useSettings()
  const [error, setError] = React.useState('')
  const [number, setNumber] = React.useState('')
  const [isValid, setIsValid] = React.useState(false)
  const [pinSended, setSendedPin] = React.useState(false)
  const [showPhoneNumber, setShowPhone] = React.useState(false)

  const { name: role } = roles || {}

  const sendMessage = React.useCallback(() => {
    if (
      !number ||
      !isValid ||
      isNaN(Number(number.replace('+', ''))) ||
      !number.match(PHONE_NUMBER_VALIDATOR)
    )
      return
    APICalls.updatePhone(number.replace('+', '')).then((res) => {
      if (res.success) {
        setSendedPin(true)
      } else {
        setError(res.message)
      }
    })
  }, [number, isValid])

  const verifyPhone = React.useCallback(() => {
    if (code.length === 4) {
      APICalls.confirmUpdatePhone(code).then((res) => {
        if (res.success) {
          setShowPhone(true)
        }
      })
    }
  }, [code])

  const isOrganizer = role === ORGANIZER
  return (
    <ScreenWrapperWithNavigation hasBack>
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Настройки</Text>
      </View>
      <KeyboardAwareScrollView
        enableOnAndroid
        contentContainerStyle={styles.pb20}
        showsVerticalScrollIndicator={false}
        style={styles.settingsWrapper}
      >
        {SETTINGS.map((setting, index) => {
          const Icon = setting.icon
          if (!setting.forCreator && isOrganizer) {
            return null
          }
          return (
            <Row key={index.toString()} wrapperStyle={[setting.styles]}>
              <Icon />
              <View style={styles.ml20}>
                <Text style={[styles.docText, styles.mb8]}>{setting.title}</Text>
                {settings[setting.key].map((sub, idx) => {
                  return (
                    <Row key={idx.toString()} wrapperStyle={styles.mt12}>
                      <CheckBox
                        withIcon
                        isActive={sub?.confirmed}
                        itemStyle={styles.checkBox}
                        onCheck={() => action(sub.id, sub?.confirmed, setting.key)}
                      />
                      <Text style={styles.settingsNotify}>{sub.name}</Text>
                    </Row>
                  )
                })}
              </View>
            </Row>
          )
        })}
        <Row wrapperStyle={[{ alignItems: 'flex-start', width: RW(280) }, styles.mt32]}>
          <FastImage source={phoneIcon} style={styles.icon} />
          <View style={styles.ml20}>
            <Text style={styles.docText}>Сменить номер телефона</Text>
            <PhoneNumber
              value={number}
              onChange={(_number) => {
                setError('')
                setNumber(_number)
              }}
              setIsValid={setIsValid}
              wrapperStyle={[styles.mt17, { width: RW(280) }]}
            />
            {number && isNaN(Number(number.replace('+', ''))) ? (
              <Text style={[styles.smallText, { color: RED, marginBottom: 0 }]}>
                Номер телефона должен содержать только цифры
              </Text>
            ) : number && !number.match(PHONE_NUMBER_VALIDATOR) ? (
              <Text style={[styles.smallText, { color: RED, marginBottom: 0 }]}>
                Неверный формат
              </Text>
            ) : !!error ? (
              <Text style={[styles.smallText, { color: RED, marginBottom: 0 }]}>{error}</Text>
            ) : null}
            <PrimaryButton
              onPress={sendMessage}
              wrapperStyle={[styles.send]}
              label={'Получить SMS с кодом'}
            />
            <View style={[pinSended ? { display: 'flex' } : { display: 'none' }]}>
              <PincodeInput onChange={setCode} value={code} />
              <Text style={styles.smallText}>на номер {number} отправлен код подтверждения </Text>
              <PrimaryButton
                label={'Подтвердить'}
                onPress={verifyPhone}
                wrapperStyle={styles.submit}
              />
            </View>
          </View>
        </Row>
      </KeyboardAwareScrollView>
      {showPhoneNumber && (
        <ProfileModal
          withButtons={false}
          title={'Ваш номер телефона\nуспешно подтвержден.'}
          onClose={() => {
            setShowPhone(false)
            navigation.goBack()
          }}
        />
      )}
    </ScreenWrapperWithNavigation>
  )
}

export default SettingsScreen
