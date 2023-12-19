import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { GREEN } from '@/theme/colors'
import { font } from '@/theme/utils'

const Link = ({ label, onPress, customStyle, color }) => {
  return (
    <Text style={[styles.link, customStyle, color && { color }]} onPress={onPress && onPress}>
      {label}
    </Text>
  )
}

export default Link

const styles = StyleSheet.create({
  link: {
    fontWeight: '600',
    ...font('e.medium', 14, GREEN, 20),
  },
})
