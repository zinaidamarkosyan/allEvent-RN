import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SheetManager } from 'react-native-actions-sheet'
import Biometrics from 'react-native-touch-id'

import { DARK_GRAY, LIGHT_GRAY } from '@/theme/colors'
import { BUTTON_OPACITY } from '@/constants'
import { font, RH, RW } from '@/theme/utils'
import TouchID from '@/assets/icons/touchId'
import FaceID from '@/assets/icons/faceId'

const TYPES = {
  FaceID: {
    label: 'Face ID',
    icon: FaceID,
  },
  TouchID: {
    label: 'Touch ID',
    icon: TouchID,
  },
}

const Biometric = ({ onSuccess, onError }) => {
  const [type, setType] = React.useState('')

  React.useEffect(() => {
    const getType = async () => {
      setType(await Biometrics.isSupported())
    }
    getType()
  }, [])

  const onPress = React.useCallback(() => {
    Biometrics.authenticate()
      .then((res) => {
        onSuccess(res)
        SheetManager.hide('biometricLogin')
      })
      .catch((err) => {
        onError(err)
        SheetManager.hide('biometricLogin')
      })
  }, [onSuccess, onError])

  React.useEffect(() => {
    if (type) {
      onPress()
    }
  }, [type, onPress])

  if (!type) return null
  const Icon = TYPES[type].icon

  return (
    <View style={styles.wrapper} activeOpacity={BUTTON_OPACITY}>
      {!!Icon && <Icon />}
      <Text style={styles.label}>{TYPES?.[type]?.label}</Text>
    </View>
  )
}

export default Biometric

const styles = StyleSheet.create({
  wrapper: {
    width: RW(144),
    height: RW(144),
    borderWidth: RW(1),
    borderRadius: RW(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: LIGHT_GRAY,
  },
  label: {
    marginTop: RH(22),
    ...font('e.regular', 20, DARK_GRAY, 27),
  },
})
