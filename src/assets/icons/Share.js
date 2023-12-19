import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Svg, Path } from 'react-native-svg'

import { BUTTON_OPACITY } from '@/constants'
import { RW, RH } from '@/theme/utils'

const ShareIcon = ({ color = '#A3A3A3', size = 29, onPress, wrapperStyle }) => {
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
      activeOpacity={BUTTON_OPACITY}
      onPress={onPress && onPress}
    >
      <Svg
        width={RW(size)}
        height={RH(size)}
        viewBox="0 0 29 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M15.319 6.63869C11.4645 6.83821 7.86064 8.44278 5.09568 11.2078C2.13558 14.1678 0.505371 18.0898 0.505371 22.2511V28L2.58792 23.1992C5.02036 18.3523 9.95313 15.1388 15.319 14.8398V21.4651L28.4782 10.7163L15.319 0V6.63869ZM16.9589 8.25737V3.45032L25.8835 10.7182L16.9589 18.0081V13.177H16.1389C13.0298 13.177 9.97669 14.0512 7.30969 15.7051C5.29001 16.9576 3.56922 18.6089 2.2483 20.5485C3.09054 13.632 8.99877 8.25737 16.1389 8.25737H16.9589Z"
          fill={color}
        />
      </Svg>
    </TouchableOpacity>
  )
}

export default ShareIcon
