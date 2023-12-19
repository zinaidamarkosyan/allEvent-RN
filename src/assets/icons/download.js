import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const DownloadIcon = ({ color = '#A3A3A3', size = 27 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.1513 24.5833C12.737 25.1691 13.6868 25.1691 14.2726 24.5833L23.8185 15.0374C24.4043 14.4516 24.4043 13.5019 23.8185 12.9161C23.2327 12.3303 22.283 12.3303 21.6972 12.9161L13.2119 21.4014L4.72663 12.9161C4.14085 12.3303 3.1911 12.3303 2.60531 12.9161C2.01953 13.5019 2.01953 14.4516 2.60531 15.0374L12.1513 24.5833ZM11.7119 0.663086V23.5227H14.7119V0.663086H11.7119Z"
        fill={color}
      />
      <Path
        d="M0.0517578 24.0519C1.61734 24.0517 18.411 24.0518 26.6121 24.0519"
        stroke={color}
        strokeWidth={RW(3)}
      />
    </Svg>
  )
}

export default DownloadIcon
