import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { BUTTON_OPACITY } from '@/constants'
import { RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'

import backIcon from '@/assets/icons/ic_arrow_back.png'

const NavBack = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.headerWrapper}>
      <TouchableOpacity
        activeOpacity={BUTTON_OPACITY}
        onPress={() => navigation.canGoBack() && navigation.goBack()}
      >
        <FastImage source={backIcon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  )
}

export default NavBack

const styles = StyleSheet.create({
  headerWrapper: {
    paddingVertical: RH(20),
    paddingHorizontal: RW(20),
    backgroundColor: WHITE,
  },
  icon: {
    width: RW(32),
    height: RW(32),
  },
})
