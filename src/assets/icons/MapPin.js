import React from 'react'
import FastImage from 'react-native-fast-image'

import { RH, RW } from '@/theme/utils'

const MapPin = ({ image, iconSize = 36 }) => {
  return (
    <FastImage
      source={{ uri: image }}
      resizeMode={FastImage.resizeMode.contain}
      style={{ height: RH(50), width: RW(iconSize) }}
    />
  )
}

export default MapPin
