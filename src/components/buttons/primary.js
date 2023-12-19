import React from 'react'
import { ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { GREEN, WHITE, YELLOW } from '@/theme/colors'
import { BUTTON_OPACITY } from '@/constants'
import { font, RH, RW } from '@/theme/utils'

const PrimaryButton = ({
  wrapperStyle,
  label,
  withOutOldStyles = false,
  labelStyle,
  onPress,
  disabled,
  loading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress && onPress}
      activeOpacity={BUTTON_OPACITY}
      style={[!withOutOldStyles && styles.wrapper, wrapperStyle]}
    >
      {loading ? (
        <ActivityIndicator style={{ height: RH(21) }} size={'small'} color={YELLOW} />
      ) : (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
    borderRadius: RW(30),
    backgroundColor: GREEN,
    justifyContent: 'center',
    paddingVertical: RH(13.5),
  },
  label: {
    ...font('e.regular', 16, WHITE, 21),
  },
})
