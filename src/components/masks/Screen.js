import React from 'react'
import { StatusBar, StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import { DARK_GREEN, GREEN, TRANSPARENT } from '@/theme/colors'

const BGMask = ({ children, color }) => {
  return (
    <LinearGradient colors={color ? color : [GREEN, DARK_GREEN]} style={styles.wrapper}>
      <StatusBar translucent={true} backgroundColor={TRANSPARENT} />
      {children}
    </LinearGradient>
  )
}

export default BGMask

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
