import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW, RH } from '@/theme/utils'

const ClockIcon = ({ color = '#A3A3A3', size = 18 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RH(size)}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.65654 17.3131C13.4374 17.3131 17.3131 13.4374 17.3131 8.65654C17.3131 3.87566 13.4374 0 8.65654 0C3.87566 0 0 3.87566 0 8.65654C0 13.4374 3.87566 17.3131 8.65654 17.3131ZM9.25649 3.85449C9.25649 3.52312 8.98787 3.25449 8.65649 3.25449C8.32512 3.25449 8.05649 3.52312 8.05649 3.85449V9.60553V9.829L8.20268 9.99802L10.9495 13.174C11.1662 13.4246 11.5452 13.4521 11.7958 13.2353C12.0464 13.0185 12.0739 12.6396 11.8571 12.389L9.25649 9.38206V3.85449Z"
        fill={color}
      />
    </Svg>
  )
}

export default ClockIcon
