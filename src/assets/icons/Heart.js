import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RW, RH } from '@/theme/utils'

const HeartIcon = ({
  disabled = false,
  color = '#A3A3A3',
  fill = null,
  size = 23,
  wrapperStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        wrapperStyle,
        {
          width: RW(size + 4),
          height: RW(size + 4),
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      activeOpacity={BUTTON_OPACITY}
      onPress={onPress && onPress}
    >
      <Svg
        width={RW(size)}
        height={RH(size)}
        viewBox="0 0 23 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          fill={fill}
          d="M20.7146 3.17909C21.2355 3.96138 21.5434 4.86326 21.6117 5.796L21.6137 6.21023C21.6171 6.92595 21.4782 7.6352 21.205 8.29676L21.8983 8.58297L21.205 8.29676C20.9319 8.95831 20.53 9.55898 20.0227 10.0638L20.0138 10.0727L20.0053 10.0818L19.4239 10.7003L11.1848 18.9393L2.94578 10.7003L2.36436 10.0818L2.35642 10.0733L2.34822 10.0651C1.3249 9.04181 0.75 7.65388 0.75 6.20668C0.75 4.75948 1.3249 3.37155 2.34822 2.34823C3.37155 1.3249 4.75947 0.75 6.20667 0.75C7.65388 0.75 9.04181 1.3249 10.0651 2.34823L10.6921 2.97519L11.2391 3.52218L11.7689 2.95854L12.3501 2.34025C13.1101 1.58317 14.0771 1.06771 15.1295 0.858876C16.1856 0.649313 17.2801 0.757936 18.2744 1.17098C19.2686 1.58403 20.1179 2.28292 20.7146 3.17909Z"
          stroke={color}
          strokeWidth={RW(1.5)}
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default HeartIcon
