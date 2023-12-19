import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image'

import { BUTTON_OPACITY, getFileFromUrl } from '@/constants'

import styles from './sharedStyles'

const Category = ({ onPress, item, id }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item?._id)}
      style={[styles.centred, id !== item?._id && styles.opacity5]}
      activeOpacity={BUTTON_OPACITY}
    >
      <FastImage
        style={styles.image}
        resizeMode={FastImage.resizeMode.contain}
        source={{ uri: getFileFromUrl(item?.avatar) }}
      />
      <Text style={styles.categoryTitle}>{item?.name}</Text>
    </TouchableOpacity>
  )
}

export default Category
