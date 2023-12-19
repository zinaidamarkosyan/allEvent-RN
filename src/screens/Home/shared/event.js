import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'

import { BUTTON_OPACITY, getFileFromUrl } from '@/constants'

import styles from './sharedStyles'

const Event = ({ item, index }) => {
  const navigation = useNavigation()

  const _openEvents = () => {
    navigation.push('Events', {
      id: item?._id,
    })
  }

  return (
    <TouchableOpacity
      onPress={_openEvents}
      activeOpacity={BUTTON_OPACITY}
      style={[styles.eventCard, styles.row]}
    >
      <FastImage
        style={styles.eventCardImg}
        resizeMode={FastImage.resizeMode.contain}
        source={{ uri: getFileFromUrl(item?.avatar) }}
      />
      <View style={styles.aboutEvent}>
        <Text style={styles.eventTitle}>{item?.name}</Text>
        <Text numberOfLines={3} ellipsizeMode={'tail'} style={styles.eventDescription}>
          {item?.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default Event
