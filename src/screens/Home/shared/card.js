import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { BUTTON_OPACITY } from '@/constants'
import { font, RH, RW } from '@/theme/utils'
import { WHITE } from '@/theme/colors'

const EventCard = ({ id, image, title = '', wrapperStyle, navigation }) => {
  const _onPress = React.useCallback(() => {
    navigation?.push('Detail', {
      id,
    })
  }, [navigation, id])

  return (
    <TouchableOpacity onPress={_onPress} activeOpacity={BUTTON_OPACITY}>
      <ImageBackground
        source={{ uri: image }}
        imageStyle={styles.img}
        style={[styles.imgContainer, wrapperStyle]}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default EventCard

const styles = StyleSheet.create({
  imgContainer: {
    width: RW(140),
    height: RH(187),
  },
  img: {
    borderRadius: RW(5),
  },
  titleContainer: {
    left: 0,
    right: 0,
    bottom: RH(8),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: RW(7),
  },
  title: {
    fontWeight: '700',
    ...font('e.bold', 10, WHITE, 14),
  },
})
