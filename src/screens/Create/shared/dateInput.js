import React from 'react'
import { TouchableOpacity } from 'react-native'
import MaskInput from 'react-native-mask-input'
import FastImage from 'react-native-fast-image'

import { BUTTON_OPACITY } from '@/constants'
import { GREEN } from '@/theme/colors'

import styles from './sharedStyles'
import { RW } from '@/theme/utils'

const DateInput = ({
  Icon,
  size,
  value,
  onPress,
  onChange,
  labelStyle,
  wrapperStyle,
  iconColor = GREEN,
  mask = [[/\d/], [/\d/], '/', [/\d/], [/\d/], '/', [/\d/], [/\d/], [/\d/], [/\d/]],
  placeholder = 'ДД/ММ/ГГГГ',
}) => {
  return (
    <TouchableOpacity
      onPress={onPress && onPress}
      activeOpacity={BUTTON_OPACITY}
      style={[styles.inputWrapper, wrapperStyle]}
    >
      {!!Icon && (
        <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={onPress}>
          <FastImage
            source={Icon}
            style={[
              styles.calendarIcon,
              iconColor && { tintColor: iconColor },
              size && { width: RW(size), height: RW(size) },
            ]}
          />
        </TouchableOpacity>
      )}
      <MaskInput
        editable={false}
        mask={mask}
        value={value}
        onChangeText={(masked, unmasked) => {
          onChange?.(unmasked)
        }}
        onPressIn={onPress}
        placeholder={placeholder || ''}
        style={[styles.inputLabel, labelStyle]}
      />
    </TouchableOpacity>
  )
}

export default DateInput
