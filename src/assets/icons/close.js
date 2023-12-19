import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RW } from '@/theme/utils'

const CloseIcon = ({ color = '#B3B7C2', size = 17, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={BUTTON_OPACITY} onPress={onPress && onPress}>
      <Svg
        width={RW(size)}
        height={RW(size)}
        viewBox="0 0 17 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M1.51855 1.60352L15.5186 15.6035"
          stroke={color}
          strokeWidth={RW(3)}
          strokeLinecap="round"
        />
        <Path
          d="M15.5186 1.60352L1.51855 15.6035"
          stroke={color}
          strokeWidth={RW(3)}
          strokeLinecap="round"
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default CloseIcon
