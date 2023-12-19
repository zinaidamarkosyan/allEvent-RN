import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RW } from '@/theme/utils'

const BookmarkIcon = ({
  disabled = false,
  color = '#A3A3A3',
  fill = null,
  size = 22,
  onPress,
  wrapperStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        wrapperStyle,
        {
          width: RW(size + 4),
          height: RW(size + 4),
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={onPress && onPress}
      activeOpacity={BUTTON_OPACITY}
      disabled={disabled || !onPress}
    >
      <Svg
        width={RW(size)}
        height={RW(size)}
        viewBox="0 0 17 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill={fill}
          d="M15.3189 1H2.71898H0.918945V21L8.11893 13.8L15.3189 21V1Z"
          stroke={color}
          strokeWidth={RW(1.5)}
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default BookmarkIcon
