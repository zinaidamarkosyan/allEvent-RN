import React from 'react'
import { StyleSheet, View } from 'react-native'
import Input from 'react-native-phone-number-input'

import { GRAY, LIGHT_GRAY, RED, WHITE } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { IS_IOS } from '@/constants'

const PhoneNumber = ({ value, disabled, onChange, wrapperStyle, setIsValid }) => {
  const phoneInput = React.createRef()
  const [isValid, setValid] = React.useState(true)

  return (
    <View style={[styles.wrapper, wrapperStyle, !isValid && styles.error]}>
      <Input
        // autoFocus
        ref={phoneInput}
        layout={'second'}
        defaultCode={'RU'}
        disabled={disabled}
        defaultValue={value}
        placeholder={'XXX XXXX XXX'}
        codeTextStyle={styles.label}
        textInputStyle={styles.label}
        containerStyle={styles.container}
        countryPickerButtonStyle={styles.picker}
        textContainerStyle={styles.textContainer}
        onChangeFormattedText={(text) => {
          let valid = phoneInput.current?.isValidNumber(text)
          setValid(valid)
          onChange?.(text)
          setIsValid?.(valid)
        }}
      />
    </View>
  )
}

export default PhoneNumber

const styles = StyleSheet.create({
  wrapper: {
    height: RH(48),
    borderWidth: RW(1),
    borderRadius: RW(30),
    alignItems: 'center',
    borderColor: LIGHT_GRAY,
    justifyContent: 'center',
    paddingVertical: RH(13.5),
    paddingHorizontal: RW(24),
  },
  label: {
    paddingVertical: 0,
    ...font('e.regular', 16, GRAY, 20),
  },
  container: {
    width: '100%',
    height: RH(30),
  },
  textContainer: {
    paddingVertical: 0,
    backgroundColor: WHITE,
    paddingHorizontal: RW(IS_IOS ? 5 : 0),
  },
  picker: {
    width: RW(50),
  },
  error: {
    borderColor: RED,
    borderWidth: RW(1),
  },
})
