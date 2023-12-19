import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'

import { DARK_GRAY, LIGHT_GRAY } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'

const PincodeInput = ({
  wrapperStyle,
  secure = false,
  value,
  onChange,
  textStyle,
  cellStyle,
  cellStyleFocused,
}) => {
  const inputRef = useRef(null)
  return (
    <TouchableOpacity
      style={[styles.wrapper, wrapperStyle]}
      activeOpacity={1}
      onPress={() => inputRef.current?.focus?.()}
    >
      <SmoothPinCodeInput
        value={value}
        ref={inputRef}
        cellSize={RH(21)}
        password={secure}
        cellSpacing={RW(12)}
        restrictToNumbers={true}
        onTextChange={(code) => onChange?.(code)}
        cellStyle={[styles.cellStyle, cellStyle]}
        textStyle={[styles.textStyle, textStyle]}
        cellStyleFocused={[styles.cellStyleFocused, cellStyleFocused]}
      />
    </TouchableOpacity>
  )
}

export default PincodeInput

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderWidth: RW(1),
    borderRadius: RW(30),
    alignItems: 'center',
    borderColor: LIGHT_GRAY,
    paddingVertical: RH(13.5),
    paddingHorizontal: RW(24),
  },
  cellStyle: {
    borderColor: DARK_GRAY,
    borderBottomWidth: RW(1),
  },
  cellStyleFocused: {
    borderBottomWidth: RW(1.5),
  },
  textStyle: {
    ...font('e.regular', 16, DARK_GRAY, 21),
  },
})
