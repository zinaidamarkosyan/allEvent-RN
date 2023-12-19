import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { BUTTON_OPACITY } from '@/constants'

const Row = ({
  children,
  onPress,
  wrapped = false,
  wrapperStyle,
  touchable = false,
  justifyContent,
}) => {
  const Element = touchable ? TouchableOpacity : View
  return (
    <Element
      onPress={onPress && onPress}
      activeOpacity={BUTTON_OPACITY}
      style={[
        styles.row,
        wrapped && { flexWrap: 'wrap' },
        justifyContent && { justifyContent },
        wrapperStyle,
      ]}
    >
      {children}
    </Element>
  )
}

export default Row

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})
