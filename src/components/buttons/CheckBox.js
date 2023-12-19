import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import { DARK_GRAY, DARK_YELLOW } from '@/theme/colors'
import { BUTTON_OPACITY } from '@/constants'
import { font, RW } from '@/theme/utils'

const check = require('@/assets/icons/ic_check.png')

const CheckBox = ({
  name,
  label,
  color,
  value,
  disabled = false,
  itemStyle,
  withIcon = false,
  labelStyle,
  isActive,
  wrapperStyle,
  onCheck,
}) => {
  const [checked, setChecked] = React.useState(false)

  React.useEffect(() => {
    if (checked !== isActive) {
      setChecked(isActive)
    }
  }, [isActive, checked])

  const _onCheck = React.useCallback(() => {
    !disabled && onCheck?.(checked ? null : value, name)
  }, [value, onCheck, name, checked, disabled])

  return (
    <View style={[styles.wrapper, wrapperStyle]}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.circle,
          itemStyle,
          checked && withIcon && { backgroundColor: color || DARK_YELLOW },
        ]}
        onPress={_onCheck}
        activeOpacity={BUTTON_OPACITY}
      >
        {checked &&
          (withIcon ? (
            <FastImage
              source={check}
              style={styles.icon}
              resizeMode={FastImage.resizeMode.contain}
            />
          ) : (
            <View style={[styles.dot, color && { backgroundColor: color }]} />
          ))}
      </TouchableOpacity>
      <Text style={[styles.label, labelStyle]} onPress={_onCheck}>
        {label}
      </Text>
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: RW(15),
    ...font('e.regular', 16, DARK_GRAY, 19),
  },
  circle: {
    width: RW(16),
    height: RW(16),
    borderWidth: RW(1),
    borderRadius: RW(8),
    alignItems: 'center',
    borderColor: DARK_YELLOW,
    justifyContent: 'center',
  },
  icon: {
    width: RW(16),
    height: RW(16),
  },
  dot: {
    width: RW(11),
    height: RW(11),
    borderRadius: RW(11 / 2),
    backgroundColor: DARK_YELLOW,
  },
})
