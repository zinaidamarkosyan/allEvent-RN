import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW, RH } from '@/theme/utils'

const PolygonIcon = ({ color = '#575757', size = 12 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RH(6)}
      viewBox="0 0 12 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M5.98658 5.40869L0.802058 0.295504L11.1711 0.295505L5.98658 5.40869Z" fill={color} />
    </Svg>
  )
}

export default PolygonIcon
