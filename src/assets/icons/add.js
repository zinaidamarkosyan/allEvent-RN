import React from 'react'
import { Svg, Path } from 'react-native-svg'

import { RW } from '@/theme/utils'

const AddIcon = ({ color = '#00ADA6', size = 20 }) => {
  return (
    <Svg
      width={RW(size)}
      height={RW(size)}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path d="M10.2939 1.48535V18.2317" stroke={color} strokeWidth={RW(2)} strokeLinecap="round" />
      <Path
        d="M18.6671 9.8584L1.92076 9.8584"
        stroke={color}
        strokeWidth={RW(2)}
        strokeLinecap="round"
      />
    </Svg>
  )
}

export default AddIcon
