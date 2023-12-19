import React from 'react'
import { StyleSheet, TextInput as Input, View, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import { GRAY, LIGHT_GRAY, RED } from '@/theme/colors'
import { font, RH, RW } from '@/theme/utils'
import { BUTTON_OPACITY } from '@/constants'

const send = require('@/assets/icons/ic_send.png')

const TextInput = React.forwardRef(
  (
    {
      Icon,
      placeholder,
      withSend = false,
      lines = 1,
      onChange,
      wrapperStyle,
      value,
      err,
      validateError,
      maxLength,
      onPress,
      disabled = false,
      onSend = () => undefined,
    },
    ref,
  ) => {
    return (
      <View
        style={[
          styles.wrapper,
          lines === 1 && { paddingVertical: RH(15) },
          wrapperStyle,
          withSend && styles.pr15,
          err && styles.error,
        ]}
      >
        {!!Icon && <FastImage source={Icon} style={styles.icon} />}
        <Input
          ref={ref}
          value={value}
          editable={!disabled}
          multiline={lines > 1}
          numberOfLines={lines}
          maxLength={maxLength}
          placeholderTextColor={GRAY}
          onPressIn={onPress && onPress}
          placeholder={placeholder || ''}
          style={[
            styles.label,
            {
              paddingLeft: !!Icon ? RW(5) : 0,
              textAlignVertical: lines > 1 ? 'top' : 'center',
            },
            lines > 1 && { height: lines * RH(50) },
            withSend && { width: '88%' },
            validateError && { color: RED },
          ]}
          onChangeText={(text) => {
            onChange?.(text)
          }}
        />
        {withSend && (
          <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={onSend}>
            <FastImage
              source={send}
              resizeMode={FastImage.resizeMode.contain}
              style={styles.send}
            />
          </TouchableOpacity>
        )}
      </View>
    )
  },
)

export default TextInput

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderWidth: RW(1),
    borderRadius: RH(30),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: LIGHT_GRAY,
    // paddingVertical: RH(13.5),
    paddingHorizontal: RW(24),
  },
  label: {
    width: '100%',
    paddingVertical: 0,
    ...font('e.regular', 16, GRAY, 20),
  },
  send: {
    width: RW(25),
    height: RW(25),
  },
  pr15: {
    paddingRight: RW(15),
    justifyContent: 'space-between',
  },
  error: {
    borderColor: RED,
  },
  icon: {
    width: RW(20),
    height: RW(20),
  },
})
